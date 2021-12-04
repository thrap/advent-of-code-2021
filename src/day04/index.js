import run from "aocrunner";

const parseInput = (rawInput) => {
  const input = rawInput.split("\n");

  const numbers = input[0].split(",")
  const boards = []
  for(var i = 2; i < input.length; i+=size+1) {
    boards.push(
      [
        input.slice(i, i+size).map(row => row.trim().split(/ +/)),
        Array(size).fill(false).map(_ => Array(size).fill(false))
      ]
    )
  }
  return [numbers, boards]
};

const size = 5

const hasRowBingo = (found) => {
  for(var row = 0; row < size; row ++) {
    if (found[row].reduce((acc, x) => acc && x,true))
      return true
  }
  return false
}

const hasColumnBingo = (found) => {
  for(var col = 0; col < size; col ++) {
    var res = true
    for(var row = 0; row < size; row ++) {
      res &= found[row][col]
    }
    if (res)
      return true
  }
  return false
}

const isBingo = (found) => {
  return hasRowBingo(found) || hasColumnBingo(found)
}

const boardSum = (board, found) => {
  var sum = 0
  for (var d = 0; d < size; d++) {
    for (var j = 0; j < size; j++) {
      if(!found[j][d]) {
        sum += +board[j][d]
      }
    }
  }
  return sum
}

const markNumber = (board, found, number) => {
  board.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (cell == number) {
        found[x][y] = true
      }
    })
  })
}

const part1 = (rawInput) => {
  var [numbers, boards] = parseInput(rawInput)

  return numbers.reduce((acc, number) => {
    if (acc)
      return acc

    const board = boards.find(([board, found]) => {
      markNumber(board, found, number)
      return isBingo(found)
    })

    if (board) {
      return boardSum(...board) * number
    }
  }, null);
};

const part2 = (rawInput) => {
  var [numbers, boards] = parseInput(rawInput)

  var ans;

  numbers.some((number) => {
    boards = boards.filter(([board, found]) => {
      markNumber(board, found, number)

      if (isBingo(found)) {
        if (boards.length == 1) {
          ans = boardSum(board, found) * +number
        }
        return false
      }
      return true
    })
  });

  return ans;
};

run({
  part1: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
