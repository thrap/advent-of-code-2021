import run from "aocrunner";

const parseInput = (rawInput) => rawInput.trim().split("\n").map(x => +x);

const part1 = (rawInput) => {
  const measure = parseInput(rawInput)
  var prev = Number.MAX_VALUE;
  var count = 0
  measure.forEach(x => {
    count += x > prev
    prev = x;
  });
  return count;
};

const part2 = (rawInput) => {
  const measure = parseInput(rawInput)
  var prev = Number.MAX_VALUE;
  var count = 0

  for(var i = 0; i < measure.length-2; i++) {
    var current = measure[i]+measure[i+1]+measure[i+2]
    count += current > prev
    prev = current;
  }

  return count
};

run({
  part1: {
    tests: [
      { input:
`199
200
208
210
200
207
240
269
260
263`, expected: 7 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input:
`199
200
208
210
200
207
240
269
260
263`, expected: 5 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
