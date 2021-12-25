import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n').map(r => r.split(''));

const print = (board) => {
  console.log(board.map(row => row.join("")).join("\n"))
  console.log();
}

const part1 = (rawInput) => {
  var board = parseInput(rawInput);

  const moveEast = (board) => {
    const newBoard = parseInput(board.map(row => row.join("")).join("\n"))
    for(var i=0; i < newBoard.length; i++) {
      for (var j = 0; j < newBoard[0].length; j++) {
        if (board[i][j] == '>' && board[i][(j+1)%board[0].length] == '.') {
          newBoard[i][j] = '.'
          newBoard[i][(j+1)%board[0].length] = '>'
        }
      }
    }
    return newBoard
  }
  const moveSouth = (board) => {
    const newBoard = parseInput(board.map(row => row.join("")).join("\n"))
    for(var i=0; i < newBoard.length; i++) {
      for (var j = 0; j < newBoard[0].length; j++) {
        if (board[i][j] == 'v' && board[(i+1)%board.length][j] == '.') {
          newBoard[i][j] = '.'
          newBoard[(i+1)%board.length][j] = 'v'
        }
      }
    }
    return newBoard
  }
  const step = (board) => {
    board = moveEast(board)
    board = moveSouth(board)
    return board
  }
  //moveEast(board)
  for(var i = 1; true; i++) {
    var before = JSON.stringify(board)
    board = step(board)
    var after = JSON.stringify(board)
    if (before == after) {
      break
    }
  }
  return i;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

const part1Input = `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 58 },
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
