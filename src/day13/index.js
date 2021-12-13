import run from "aocrunner";

const parseInput = (rawInput) => {
  const points = []
  var pointsDone = false
  const fold = []
  rawInput.split("\n").forEach(row => {
    if (row == "") {
      pointsDone = true
    } else if (!pointsDone) {
      const [x, y] = row.split(",")
      points.push([+x,+y])
    } else {
      fold.push(row)
    }
  })
  return [points, fold]
}

const uniquePoints = (points) => {
  const newPoints = []
  const added = {}
  const add = (x, y) => {
    const str = x + " " + y
    if (!added[str]) {
      newPoints.push([x,y])
    }
    added[str] = true
  }
  points.forEach(point => add(...point))
  return newPoints
}

const foldX = (line, points) => {
  return uniquePoints(points.map(([x,y]) => [x > line ? line-(x-line) : x, y]))
}

const foldY = (line, points) => {
  return uniquePoints(points.map(([x,y]) => [x, y > line ? line-(y-line) : y]))
}

const part1 = (rawInput) => {
  var [points, fold] = parseInput(rawInput);

  const [dir, value] = fold[0].replace("fold along ", "").split("=")
  if (dir == "y")
    return foldY(+value, points).length
  else
    return foldX(+value, points).length
};

const part2 = (rawInput) => {
  var [points, fold] = parseInput(rawInput);

  fold.forEach(f => {
    const [dir, value] = f.replace("fold along ", "").split("=")
    if (dir == "y")
      points = foldY(+value, points)
    else
      points = foldX(+value, points)
  })

  const board = Array(6).fill(true).map(_ => Array(40).fill(false))
  points.forEach(([x,y]) => board[y][x] = true)

  return (board.map(row => row.map(c => c ? "█":" ").join("")))
};

const part1Input = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`
run({
  part1: {
    tests: [
      { input: part1Input, expected: 17 },
    ],
    solution: part1,
  },
  part2: {
    solution: part2,
  },
  trimTestInputs: true,
});
