import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map(row => row.split(""));

const spots = [[1,1],[1,2],[1,4],[1,6],[1,8],[1,10],[1,11]]
const rooms = [[2,3],[3,3],[2,5],[3,5],[2,7],[3,7],[2,9],[3,9]]
const all = spots.concat(rooms)
const openSpots = (board) => {
  return spots.filter(([x,y]) => board[x][y] == '.')
}

var GOALSTR = `#############
#...........#
###A#B#C#D###
  #A#B#C#D#
  #########`
var GOAL = parseInput(GOALSTR)

const canMoveTo = (board, [i0,j0], [iGoal,jGoal]) => {
  if (i0 == 1 && iGoal == 1)
    return false
  if (GOAL[iGoal][jGoal] != "." && GOAL[iGoal][jGoal] != board[i0][j0]) {
    return false
  }
  if (board[iGoal][jGoal] != '.') {
    return false
  }
  var i = i0
  while (board[i-1][j0] != "#") {
    i--
    if (board[i][j0] != ".") {
      return false
    }
  }
  var steps = Math.abs(i-i0)
  for (var j = j0; j != jGoal; j+=Math.sign(jGoal-j0)) {
    if (j == j0)
      continue
    if (board[i][j] != ".") {
      return false
    }
  }
  steps += Math.abs(jGoal-j0)
  if (i == iGoal) {
    return steps
  }
  if (i + 1 == iGoal) {
    if (board[i + 1][j] == "." && board[i + 2][j] == GOAL[i + 2][j])
      return steps + 1
    return false
  }
  else if (i + 2 == iGoal) {
    if (board[i + 1][j] == "." && board[i + 2][j] == ".")
      return steps + 2
    return false
  }

  throw 1
}

const print = (board) => {
  console.log(toString(board))
  console.log();
}
const toString = (board) => board.map(row => row.join("")).join("\n")
const copyBoard = (board) => {
  return parseInput(toString(board))
}

const score = {
  "A": 1,
  "B": 10,
  "C": 100,
  "D": 1000
}

const manhattan = (board) => {
  var sum = 0
  all.filter(([x,y]) => board[x][y] != ".").forEach(([x, y]) => {
    const c = board[x][y]

    const asd = x
    if (c == "D") {
      const yDiff = Math.abs(y-9)
      if (yDiff != 0) {
        sum += 1000*(yDiff+asd)
      }
    }
    if (c == "C") {
      const yDiff = Math.abs(y-7)
      if (yDiff != 0) {
        sum += 100*(yDiff+asd)
      }
    }
    if (c == "B") {
      const yDiff = Math.abs(y-5)
      if (yDiff != 0)
        sum += 10*(yDiff+asd)
    }
  })
  return sum
}

const brute = (boards, added={}) => {
  /*const toStr = toString(board)
  if (asd[toStr])
    return
  asd[toStr] = true
  if (toStr == GOALSTR) {
    console.log(board)
  }
  console.log(toStr)*/
  //print(board)
  var i = 0
  while (!found) {
    boards.sort((a, b) => (b[0]+b[1])-(a[0]+a[1]))
    var found = false
    const [weight, h, board] = boards.pop()
    if (++i % 1000 == 0) {
      console.log(i, weight + h)
    }
    const chars = all.filter(([x,y]) => board[x][y] != ".")
    chars.forEach((start) => {
      all.forEach((goal) => {
        const steps = canMoveTo(board, start, goal)
        if (!steps)
          return false
        var [x, y] = goal
        var [x0, y0] = start
        const cost = steps*score[board[x0][y0]]
        var newBoard = copyBoard(board)
        newBoard[x0][y0] = '.'
        newBoard[x][y] = board[x0][y0]

        const toStr = toString(newBoard)
        if (toStr == GOALSTR) {
          console.log(weight + cost)
          print(newBoard)
          found = weight + cost
        }
        if (!added[toStr]) {
          boards.push([weight + cost, manhattan(newBoard), newBoard])
          added[toStr] = true
        }
      })
    })
  }
  return found
}

const part1 = (rawInput) => {
  const board = parseInput(rawInput);
  return brute([[0, manhattan(board), board]])
};

const part2 = (rawInput) => {
  /*const asd = rawInput.split("\n")
  asd.splice(3, 0, "  #D#C#B#A#")
  asd.splice(4, 0, "  #D#B#A#C#")
  console.log(asd)
  const board = parseInput(rawInput);

  GOALSTR = `#############
#...........#
###A#B#C#D###
  #A#B#C#D#
  #A#B#C#D#
  #A#B#C#D#
  #########`
  GOAL = parseInput(GOALSTR)*/

  return;
};

const part1Input = `#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 12521 },
      { input: `#############
#.....D.D.A.#
###.#B#C#.###
  #A#B#C#.#
  #########`, expected: 7008 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: part2Input, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
