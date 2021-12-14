import run from "aocrunner";

const parseInput = (rawInput) => {
  const split = rawInput.split("\n")
  const template = split[0];
  const mapping = {}
  split.slice(2).forEach(row => {
    const [pair, to] = row.split(" -> ")
    mapping[pair] = to
  })
  return [template, mapping];
}

const iterate = (template, mapping) => {
  var str = ""
  for(var i = 0; i + 1 < template.length; i++) {
    const pair = template.substr(i,2)
    str += template[i]
    str += mapping[pair]
  }

  return str + template[template.length-1];
}

const part1 = (rawInput) => {
  var [template, mapping] = parseInput(rawInput);
  for(var step = 1; step <= 10; step++) {
    template = iterate(template, mapping)
  }

  const count = {}
  template.split("").forEach(c => {
    count[c] = (count[c]||0) + 1
  })

  var vals = Object.keys(count).map(key => count[key])

  return Math.max(...vals) - Math.min(...vals);
};

const iter = (map, mapping) => {
  const newMap = {}

  Object.keys(map).forEach(key => {
    const [a, b] = key.split("")
    const val = map[key]
    const c = mapping[key]
    newMap[a+c] = (newMap[a+c] || 0) + val
    newMap[c+b] = (newMap[c+b] || 0) + val
  })
  return newMap
}

const part2 = (rawInput) => {
  var [template, mapping] = parseInput(rawInput);
  var map = {}
  for(var i = 0; i + 1 < template.length; i++) {
    const pair = template.substr(i,2)
    map[pair] = (map[pair]||0) + 1
  }
  for(var step = 1; step <= 40; step++) {
    map = iter(map, mapping)
  }

  const count = {}
  Object.keys(map).map(pair => pair.split("")).forEach(([a, b]) => {
    count[a] = (count[a]||0) + map[a+b]
    count[b] = (count[b]||0) + map[a+b]
  })

  //every c in pair has been counted twice (except for the first and the last pair)
  var vals = Object.keys(count).map(key => (count[key]+count[key]%2)/2)

  return Math.max(...vals) - Math.min(...vals);
};

const part1Input = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 1588 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: part2Input, expected: 2188189693529 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
