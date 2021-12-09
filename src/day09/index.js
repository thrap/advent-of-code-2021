import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map(r => r.split("").map(x => +x));

const part1 = (rawInput) => {
  const board = parseInput(rawInput);
  var risk = 0
  for (var x = 0; x < board.length; x++) {
    for (var y = 0; y < board[0].length; y++) {
      const v = board[x][y]
      const dirs = [(board[x+1]||[])[y],(board[x-1]||[])[y],(board[x]||[])[y+1],(board[x]||[])[y-1]].filter(x => x != undefined)
      var isLow = dirs.reduce((acc, value) => acc && value > v, true)

      if (isLow) {
        risk += +(v + 1)
      }
    }
  }
  return risk;
};

const part2 = (rawInput) => {
  const board = parseInput(rawInput);
  const visited = Array(board.length).fill(true).map(_ => Array(board[0].length).fill(false))
  const basin = (x, y, v) => {
    if (x >= board.length || x < 0 || y >= board[0].length || y < 0)
      return []
    if (visited[x][y])
      return []
    visited[x][y] = true
    const get = (x,y) => (visited[x]||[])[y] ? undefined : (board[x]||[])[y]
    const dirs = [[x+1,y],[x-1,y],[x,y+1],[x,y-1]]
    const points = dirs.filter(([a,b]) => get(a,b) != undefined && get(a,b) != 9 && get(a,b) >= v);
    const all = [[x,y]].concat(points.reduce((acc, [a, b]) => acc.concat(basin(a,b, board[a][b])), []))
    return all
  }
  var l = []
  for (var x = 0; x < board.length; x++) {
    for (var y = 0; y < board[0].length; y++) {
      const v = board[x][y]
      const get = (x,y) => (board[x]||[])[y]
      const dirs = [[x+1,y],[x-1,y],[x,y+1],[x,y-1]]
      const points = dirs.map(([a,b]) => get(a,b)).filter(x => x != undefined);
      var isLow = points.reduce((acc, value) => acc && value > v, true)

      if (isLow) {
        const b = basin(x, y, v)
        l.push(b.length)
      }
    }
  }
  l.sort((a,b) => b-a)
  return l[0]*l[1]*l[2];
};

const part1Input = `2199943210
3987894921
9856789892
8767896789
9899965678`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 15 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: part2Input, expected: 1134 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
