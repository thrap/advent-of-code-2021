import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map(row => row.split("").map(o => +o));

const part1 = (rawInput) => {
  if (false && rawInput != part1Input)
    return
  const board = parseInput(rawInput);

  const increase = () => {
    for(var i = 0; i < board.length; i++) {
      for(var j = 0; j < board[0].length; j++) {
        board[i][j]++
      }
    }
  }
  const inc = (i, j) => {
    if ((board[i]||[])[j]) {
      board[i][j] += 1
    }
  }
  const dirs = [[0,1],[1,0],[-1,0],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]
  const flash = (last = 0,flashed = {}) => {
    for(var i = 0; i < board.length; i++) {
      for(var j = 0; j < board[0].length; j++) {
        if (board[i][j] >= 10) {
          board[i][j] = 0
          if (!flashed[i+" "+j]) {
            flashed[i+" "+j]=true
            dirs.forEach(([dx,dy]) => inc(i+dx, j+dy))
          }
        }
      }
    }
    const asd = Object.keys(flashed).length
    if (asd == last) {
      return asd
    } else {
      return flash(asd, flashed)
    }
  }
  const step = () => {
    increase()
    return flash()
  }

  const print = (board) => console.log(board.map(row => row.join("")).join("\n")+"\n")
  var sum = 0
  for (var i = 1; i<= 100; i++) {

    sum += step()
  }

  return sum;
};

const part2 = (rawInput) => {
  if (false && rawInput != part1Input)
    return
  const board = parseInput(rawInput);

  const increase = () => {
    for(var i = 0; i < board.length; i++) {
      for(var j = 0; j < board[0].length; j++) {
        board[i][j]++
      }
    }
  }
  const inc = (i, j) => {
    if ((board[i]||[])[j]) {
      board[i][j] += 1
    }
  }
  const dirs = [[0,1],[1,0],[-1,0],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]
  const flash = (last = 0,flashed = {}) => {
    for(var i = 0; i < board.length; i++) {
      for(var j = 0; j < board[0].length; j++) {
        if (board[i][j] >= 10) {
          board[i][j] = 0
          if (!flashed[i+" "+j]) {
            flashed[i+" "+j]=true
            dirs.forEach(([dx,dy]) => inc(i+dx, j+dy))
          }
        }
      }
    }
    const asd = Object.keys(flashed).length
    if (asd == last) {
      return asd
    } else {
      return flash(asd, flashed)
    }
  }
  const step = () => {
    increase()
    return flash()
  }

  const print = (board) => console.log(board.map(row => row.join("")).join("\n")+"\n")
  var i;
  for (i = 1; true; i++) {
    const s = step()
    if (s == board.length*board[0].length)
      break
  }

  return i;
};

const part1Input = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 1656 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: part2Input, expected: 195 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
