import run from "aocrunner";

const parseInput = (rawInput) => rawInput.trim().split("\n").map(x => x.split(" "));

const part1 = (rawInput) => {
  const commands = parseInput(rawInput);

  var h = 0
  var d = 0
  commands.forEach(([dir, steps]) => {
    switch(dir) {
        case 'forward': h+=+steps; break
        case 'up': d-=steps; break;
        case 'down': d+=+steps; break;
        default: throw 1
    }
  })

  return h*d;
};

const part2 = (rawInput) => {
  const commands = parseInput(rawInput);

  var h = 0
  var d = 0
  var aim = 0
  commands.forEach(([dir, steps]) => {
    switch(dir) {
        case 'forward': h+=+steps; d+=aim*+steps; break
        case 'up': aim-=steps; break;
        case 'down': aim+=+steps; break;
        default: throw 1
    }
  })

  return h*d;
};

run({
  part1: {
    tests: [
      { input: `
forward 5
down 5
forward 8
up 3
down 8
forward 2`, expected: 150 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `
forward 5
down 5
forward 8
up 3
down 8
forward 2`, expected: 900 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
