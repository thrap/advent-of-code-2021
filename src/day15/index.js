import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map(row => row.split("").map(x => +x));

const bfs = (start, stop, board) => {
  const visited = new Set();
  const queue = [];

  const edges = new Map()

  const dirs = [[1,0],[-1,0],[0,1],[0,-1]]
  board.forEach((row, x) => row.forEach((_, y) => {
    edges[[x,y]] = dirs
      .map(([dx,dy]) => [x+dx, y+dy])
      .filter(([x,y]) => !(x >= board.length || x < 0 || y >= board.length || y < 0))
  }))

  queue.push({ node: start, dist: 0 });
  visited.add(start);

  var i = 0

  while (queue.length > 0) {
    const { node, dist } = queue.shift();
    if (++i % 10000 == 0)
      console.log(node, queue.length);
    //console.log(node);
    if (node[0] == stop[0] && node[1] == stop[1]) return dist;
    //console.log(edges[node]);
    for (let neighbour of edges[node]) {
      if (!visited.has(neighbour)) {
        queue.push({ node: neighbour, dist: dist + board[neighbour[0]][neighbour[1]] });
        visited.add(neighbour);
      }
    }
    queue.sort((a,b) => a.dist - b.dist)
  }
  return -1;
};

const part1 = (rawInput) => {
  const board = parseInput(rawInput);

  return bfs([0,0], [board.length-1, board[0].length-1], board)
};

const part2 = (rawInput) => {
  const board1 = parseInput(rawInput);
  const board = Array(board1.length*5).fill(0).map(_=> Array(board1[0].length*5).fill("."))

  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      for(var x = 0; x < board1.length; x++) {
        for (var y = 0; y < board1.length; y++) {
          board[i*board1.length+x][j*board1[0].length+y] = (board1[x][y]-1+i+j)%9
        }
      }
    }
  }
  for(var x = 0; x < board.length; x++) {
    for (var y = 0; y < board[0].length; y++) {
      board[x][y] = board[x][y] + 1
    }
  }

  return bfs([0,0], [board.length-1, board[0].length-1], board)
};

const part1Input = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 40 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: part2Input, expected: 315 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
