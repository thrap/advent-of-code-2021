import run from "aocrunner";
const abs = Math.abs

const parseInput = (rawInput) => rawInput.split("\n").map(line => line.split(" -> ").map(c => c.split(",").map(x => +x)));

const part1 = (rawInput, part2) => {
  const input = parseInput(rawInput);

  var grid = Array(1000).fill(0).map(_ => Array(1000).fill(0))

  input.forEach(([[x1, y1], [x2, y2]]) => {
    if (x1 == x2 || y1 == y2 || (part2 && abs(x2-x1) == abs(y2-y1))) {
      grid[y2][x2] += 1

      for (var dx = x1, dy = y1; dx != x2 || dy != y2; dx+=((x2-x1)/abs(x2-x1)||0), dy+=((y2-y1)/abs(y2-y1)||0)) {
        grid[dy][dx] += 1
      }
    }
  });

  return grid.reduce((acc, row) => acc + row.filter(x => x >= 2).length, 0);
};

const part2 = (rawInput) => {
  return part1(rawInput, true)
};

const part1Input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 5 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: part2Input, expected: 12 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
