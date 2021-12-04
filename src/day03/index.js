import run from "aocrunner";

const part1 = (rawInput) => {
  const input = rawInput.split("\n")

  var count = Array(input[0].length).fill(0)
  input.forEach(binary => {
    binary.split('').forEach((c, i) => {
      count[i]+=+c
    })
  })
  var gamma = parseInt(count.map(c => +(c >= input.length/2)).join(""), 2)
  var epsilon = parseInt(count.map(c => +(c < input.length/2)).join(""), 2)
  return gamma*epsilon;
};

const part2 = (rawInput) => {
  const input = rawInput.split("\n");

  var countI = (arr, i) => arr.reduce((acc, c) => acc+(+c[i]), 0)

  const filter = (i, arr, b) => {
    if (arr.length <= 1)
      return parseInt(arr[0], 2)
    var c = (countI(arr, i) >= arr.length/2)^b
    return filter(i+1, arr.filter(x => x[i] == c), b)
  }

  return filter(0, input, true) * filter(0, input, false);
};

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
  trimTestInputs: true,
});
