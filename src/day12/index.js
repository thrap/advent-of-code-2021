import run from "aocrunner";

const parseInput = (rawInput) => {
  const path = {}
  rawInput.split("\n").map(x => {
    const [start, end] = x.split("-")
    path[start] = path[start] || []
    path[end] = path[end] || []
    path[start].push(end)
    path[end].push(start)
  });
  return path
}

const part1 = (rawInput) => part2(rawInput, true)

const part2 = (rawInput, part1 = false) => {
  const children = parseInput(rawInput);
  var count = 0
  const traverse = (node, visited, two) => {
    if (node == "end") {
      count ++
      return
    }
    if (visited[node] && (two || node == "start"))
      return
    two ||= visited[node]
    visited[node] = node == node.toLowerCase()
    children[node].forEach(child =>
      traverse(child, {...visited}, two)
    )
  }
  traverse("start", {}, part1)
  return count;
};

const part1Input = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 10 },
      { input: `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`, expected: 19 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: part2Input, expected: 36 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
