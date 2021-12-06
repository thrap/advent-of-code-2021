import run from "aocrunner";

const getFish = (input) => input.split(",").reduce((acc, x) =>  ++acc[+x] && acc, Array(9).fill(0));

const solve = (fish, days) => {
  for(var day = 1; day <= days; day++) {
    const newFish = fish.shift()
    fish.push(newFish)
    fish[6] += newFish
  }
  return fish.reduce((acc, x) => acc+x);
}

const part1 = (input) => solve(getFish(input), 80)

const part2 = (input) => solve(getFish(input), 256)

const part1Input = `3,4,3,1,2`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 5934 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: part2Input, expected: 26984457539 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
