import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const removeChunks = (line) => {
  var next = line.replace("()","").replace("[]","").replace("{}","").replace("<>","")
  return line == next ? line : removeChunks(next)
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  var sum = 0
  const score = {")": 3, "]": 57, "}": 1197, ">": 25137}
  input.map(line => removeChunks(line)).forEach(line => {
    for (var i = 0; i < line.length; i ++) {
      const c = line[i]
      if (score[c]) {
        sum += score[c]
        break
      }
    }
  });

  return sum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const incomplete = input.map(line => removeChunks(line)).filter(line => {
    for (var i = 0; i < line.length; i ++) {
      const c = line[i]
      if (")]}>".includes(c)) {
        return false
      }
    }
    return true
  });
  const score = {"(": 1, "[": 2, "{": 3, "<": 4}
  var scores = incomplete.map(line => line.split("").reverse().reduce((acc, c) => acc * 5 + score[c], 0))
  scores.sort((a,b) => b-a)
  return scores[Math.floor(scores.length / 2)]
};

const part1Input = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 26397 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: part2Input, expected: 288957 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
