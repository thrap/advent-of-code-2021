import run from "aocrunner";

const parse = (input) => input.split(",").map(x => +x);;

const solve = (numbers, distance) => {
  const max = Math.max(...numbers)
  var min = Number.MAX_VALUE
  for (let i = 0; i < max; i++) {
    const diff = numbers.reduce((acc, x) => acc + distance(Math.abs(x-i)),0)
    min = Math.min(diff, min)
  }

  return min;
}

const part1 = (input) =>
  solve(parse(input), x => x);

const part2 = (input) =>
  solve(parse(input), x => ((x+1)*x)/2)

const part1Input = `16,1,2,0,4,2,7,1,2,14`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 37 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: part2Input, expected: 168 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
