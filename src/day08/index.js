import run from "aocrunner";

const parseInput = (rawInput) => rawInput.trim().replace(/ \|\n/g,"|").split("\n").map(row => row.trim().split("|")).map(([a,b]) => [a.trim(),b.trim().split(" ")]);

const part1 = (rawInput) => {
  const input = parseInput(rawInput).map(x => x[1]);
  const y = input.map(row => row.map(num => num.length).filter(x => x == 2 || x == 4 || x == 3 || x == 7).length)
  return y.flat().reduce((acc,x) => acc + (+x),0);
};

const getMapping = (patterns) => {
  var mapping = {
    a: new Set([...'abcdefg']),
    b: new Set([...'abcdefg']),
    c: new Set([...'abcdefg']),
    d: new Set([...'abcdefg']),
    e: new Set([...'abcdefg']),
    f: new Set([...'abcdefg']),
    g: new Set([...'abcdefg']),
  }

  const removeAll = (set, list) => {
    if (set.length == 1)
      return
    list.forEach(c => {
      set.delete(c)
    })
  }
  const removeAllz = (c) => {
    Object.keys(mapping).forEach(k => {
      if (typeof mapping[k] != "string")
        mapping[k].delete(c)
    })
  }

  const count = {}
  "abcdefg".split('').forEach(c => {
    count[c] = patterns.split(" ").filter(x => x.includes(c)).length
  });

  Object.keys(count).forEach(c => {
    if (count[c] == 9) {
      mapping[c] = 'f'
      removeAllz('f')
    }
    if (count[c] == 4) {
      mapping[c] = 'e'
      removeAllz('e')
    }
    if (count[c] == 6) {
      mapping[c] = "b"
      removeAllz('b')
    }
  })

  const filter = (pattern, possible, notPossible) => {
    "abcdefg".split("").forEach(c => {
      if (pattern.includes(c)) {
        removeAll(mapping[c], notPossible)
      } else {
        removeAll(mapping[c], possible)
      }
      if (mapping[c].size == 1) {
        const value = mapping[c].values().next().value
        mapping[c] = value
      }
    })
  }

  patterns.split(" ").forEach(pattern => {

    if (pattern.length == 2) {
      const notPossible = [..."abdeg"]
      const possible = [..."cf"]

      filter(pattern, possible, notPossible)
    }
    if (pattern.length == 3) {
      const notPossible = [..."bdeg"]
      const possible = [..."acf"]

      filter(pattern, possible, notPossible)
    }
    if (pattern.length == 4) {
      const notPossible = [..."aeg"]
      const possible = [..."bcdf"]

      filter(pattern, possible, notPossible)
    }
  })

  return mapping
}

const mapValue = (mapping, value) => {
  switch(value.split("").map(c => mapping[c]).sort().join("")) {
    case "abcefg": return 0
    case "cf": return 1
    case "acdeg": return 2
    case "acdfg": return 3
    case "bcdf": return 4
    case "abdfg": return 5
    case "abdefg": return 6
    case "acf": return 7
    case "abcdefg": return 8
    case "abcdfg": return 9
    default: throw 1
  }
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  return input.reduce((acc, [patterns, values]) => {
    const mapping = getMapping(patterns);
    return acc + (+values.map(value => mapValue(mapping, value)).join(""))
  }, 0)
};

const part1Input = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb |
fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec |
fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef |
cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega |
efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga |
gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf |
gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf |
cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd |
ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg |
gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc |
fgae cfgab fg bagce`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 26 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: part2Input, expected: 61229 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
