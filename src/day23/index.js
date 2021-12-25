import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map(row => row.split(""));

const spots = [[1,1],[1,2],[1,4],[1,6],[1,8],[1,10],[1,11]]
const rooms = [[2,3],[3,3],[4,3],[5,3],[2,5],[3,5],[4,5],[5,5],[2,7],[3,7],[4,7],[5,7],[2,9],[3,9],[4,9],[5,9]]
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
  if (iGoal >= GOAL.length)
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
    if (
      board[i + 1][j] == "." &&
      board[i + 2][j] == GOAL[i + 2][j] &&
      board[i + 3][j] == GOAL[i + 3][j] &&
      (board[i + 4]||[])[j] == (GOAL[i + 4]||[])[j]
    ) {
      return steps + 1
    }
    return false
  }
  else if (i + 2 == iGoal) {
    if (
      board[i + 1][j] == "." &&
      board[i + 2][j] == "." &&
      board[i + 3][j] == GOAL[i + 3][j] &&
      (board[i + 4]||[])[j] == (GOAL[i + 4]||[])[j]
    ) {
      return steps + 2
    }
    return false
  }
  else if (i + 3 == iGoal) {
    if (
      board[i + 1][j] == "." &&
      board[i + 2][j] == "." &&
      board[i + 3][j] == "." &&
      (board[i + 4]||[])[j] == (GOAL[i + 4]||[])[j]
    ) {
      return steps + 3
    }
    return false
  }
  else if (i + 4 == iGoal) {
    if (
      board[i + 1][j] == "." &&
      board[i + 2][j] == "." &&
      board[i + 3][j] == "." &&
      (board[i + 4]||[])[j] == "."
    ) {
      return steps + 4
    }
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
  return board.map(x => [...x])
}

const score = {
  "A": 1,
  "B": 10,
  "C": 100,
  "D": 1000
}

const manhattan = (board) => {
  var sum = 0

  // her kan jeg få den ganske mye strengere
  all.forEach(([x, y]) => {
    const c = (board[x]||[])[y]
    if (c != "A" && c != "B" && c != "C" && c != "D")
      return


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
    if (c == "A") {
      const yDiff = Math.abs(y-3)
      if (yDiff != 0)
        sum += (yDiff+asd)
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
    var found = false
    const [weight, h, board] = boards.pop()
    if (++i % 1000 == 0) {
      console.log(i, weight + h, boards.length)
    }
    const chars = all

    for (var j = 0; j < chars.length; j++) {
      const start = chars[j]
      var [x0, y0] = start
      const c = (board[x0]||[])[y0]
      if (c != "A" && c != "B" && c != "C" && c != "D")
        continue

      for (var k = 0; k < all.length; k++) {
        const goal = all[k]
        const steps = canMoveTo(board, start, goal)
        if (!steps)
          continue
        var [x, y] = goal
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
          var man = manhattan(newBoard)
          var newCost = man + weight + cost
          var i = 0
          for(; i < boards.length; i++) {
            if (boards[i][0]+boards[i][1] < newCost)
              break
          }
          boards.splice(i, 0, [weight + cost, man, newBoard])
          added[toStr] = true
        }
      }
    }
  }
  return found
}

const part1 = (rawInput) => {
  const board = parseInput(rawInput);
  GOALSTR = `#############
#...........#
###A#B#C#D###
  #A#B#C#D#
  #########`
  GOAL = parseInput(GOALSTR)
  return brute([[0, manhattan(board), board]])
};

const part2 = (rawInput) => {
  const asd = rawInput.split("\n")
  asd.splice(3, 0, "  #D#C#B#A#")
  asd.splice(4, 0, "  #D#B#A#C#")
  console.log(asd)
  const board = parseInput(asd.join("\n"));
  print(board)

  GOALSTR = `#############
#...........#
###A#B#C#D###
  #A#B#C#D#
  #A#B#C#D#
  #A#B#C#D#
  #########`
  GOAL = parseInput(GOALSTR)

  return brute([[0, manhattan(board), board]]);
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
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
