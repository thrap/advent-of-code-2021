import run from "aocrunner";

const parseInput = (rawInput) => {
  const rows = rawInput.split("\n");
  return [rows[0], rows.slice(2).map(x => x.split(""))]
}

const dirs = []
for(var i=-1; i <= 1; i++) {
  for(var j=-1; j <= 1; j++) {
    dirs.push([i, j])
  }
}

const pad = (image, N) => {
  var padded = Array(image.length+2*N).fill(".").map(_ => Array(image[0].length+2*N).fill("."))

  for (var x = 0; x < image.length; x++) {
    for (var y = 0; y < image[0].length; y++) {
      padded[x+N][y+N] = image[x][y]
    }
  }

  return padded
}

const IEA = (x, y, image) => {
  return parseInt(dirs.map(([dx,dy]) => (image[x+dx]||[])[y+dy] == "#" ? 1 : 0).join(''),2)
}

const iterate = (image, enhancementString) => {
  const newImage = Array(image.length-2).fill(true).map(_ => Array(image[0].length-2).fill("."))
  for (var x = 0; x < newImage.length; x++) {
    for (var y = 0; y < newImage[0].length; y++) {
      newImage[x][y] = enhancementString[IEA(x+1, y+1, image)]
    }
  }
  return newImage
}

const count = (image) => image.map(row => row.join('')).join('').split('').reduce((acc, c) => acc + (c=='#'), 0);

const part1 = (rawInput) => {
  const [s, image] = parseInput(rawInput);
  return count(iterate(iterate(pad(image, 2*2),s),s))
};

const part2 = (rawInput) => {
  var [enhancementString, image] = parseInput(rawInput);
  image = pad(image, 2*50)
  for (var i = 0; i < 50; i++) {
    image = iterate(image, enhancementString)
  }
  return count(image)
};

const part1Input = `..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 35 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: part2Input, expected: 3351 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
