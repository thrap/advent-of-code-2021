import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map(row => {
  const [state, rest] = row.split(" ")
  return [state, rest.split(",").map(s => s.substring(2).split("..").map(c => parseInt(c)))]
});

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const cube = Array(101).fill(false).map(_ => Array(101).fill(false).map(_ => Array(101).fill(null)))

  input.forEach(([state, [[minX, maxX], [minY, maxY], [minZ, maxZ]]]) => {
    for(var x = Math.max(minX, -50); x <= Math.min(maxX, 50); x++) {
      for(var y = Math.max(minY, -50); y <= Math.min(maxY, 50); y++) {
        for(var z = Math.max(minZ, -50); z <= Math.min(maxZ, 50); z++) {
          cube[x+50][y+50][z+50] = state
        }
      }
    }
  });

  var count = 0
  for (var x = 0; x < cube.length; x++) {
    for (var y = 0; y < cube.length; y++) {
      for (var z = 0; z < cube.length; z++) {
        count += cube[x][y][z] === "on"
      }
    }
  }
  return count;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

const part1Input = `on x=10..12,y=10..12,z=10..12
on x=11..13,y=11..13,z=11..13
off x=9..11,y=9..11,z=9..11
on x=10..10,y=10..10,z=10..10`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 39 },
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
