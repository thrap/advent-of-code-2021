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
      { input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

      22 13 17 11  0
       8  2 23  4 24
      21  9 14 16  7
       6 10  3 18  5
       1 12 20 15 19

       3 15  0  2 22
       9 18 13 17  5
      19  8  7 25 23
      20 11 10 24  4
      14 21 16 12  6

      14 21 17 24  4
      10 16 15  9 19
      18  8 23 26 20
      22 11 13  6  5
       2  0 12  3  7`, expected: 4512 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

      22 13 17 11  0
       8  2 23  4 24
      21  9 14 16  7
       6 10  3 18  5
       1 12 20 15 19

       3 15  0  2 22
       9 18 13 17  5
      19  8  7 25 23
      20 11 10 24  4
      14 21 16 12  6

      14 21 17 24  4
      10 16 15  9 19
      18  8 23 26 20
      22 11 13  6  5
       2  0 12  3  7`, expected: 1924 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
