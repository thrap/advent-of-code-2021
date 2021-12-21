import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n').map(row => +row.split("position: ")[1]);

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  var [pos1, pos2] = input
  var [p1,p2] = [0,0]
  var dice = 0
  var incDice = () => {
    dice++
    if (dice > 100)
      dice-=100
    return dice
  }
  for (var i = 0; p1 < 1000 && p2 < 1000; i++) {
    var d1 = incDice()
    var d2 = incDice()
    var d3 = incDice()
    if (i % 2 == 0) {
      pos1 += d1+d2+d3
      while (pos1 > 10)
        pos1 -= 10
      p1 += pos1
    } else {
      pos2 += d1+d2+d3
      while (pos2 > 10)
        pos2 -= 10
      p2 += pos2
    }
  }
  return i*3*(p1 > p2 ? p2 : p1);
};

const LIMIT = 21
const memo = {}
const rec = (pos1, pos2, score1, score2, turn) => {
  if (score1 >= LIMIT) {
    return [0, 1]
  }
  if (score2 >= LIMIT) {
    return [1, 0]
  }
  var str = pos1 + " " + pos2 + " " + score1 + " " + score2 + " " + turn%2
  if (memo[str]) {
    return memo[str]
  }
  var sum = [0,0]
  for(var d1 = 1; d1 <= 3; d1++) {
    for(var d2 = 1; d2 <= 3; d2++) {
      for(var d3 = 1; d3 <= 3; d3++) {
        if (turn % 2 == 0) {
          var newpos1 = pos1 + d1+d2+d3
          while (newpos1 > 10)
            newpos1 -= 10
          const [w1, w2] = rec(newpos1, pos2, score1+newpos1, score2, turn+1)
          sum[0] += w1
          sum[1] += w2
        } else {
          var newpos2 = pos2 + d1+d2+d3
          while (newpos2 > 10)
            newpos2 -= 10
          const [w1, w2] = rec(pos1, newpos2, score1, score2+newpos2, turn+1)
          sum[0] += w1
          sum[1] += w2
        }
      }
    }
  }
  memo[str] = sum
  return sum
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  var [pos1, pos2] = input;
  var [score1, score2] = [0,0]
  const [w1,w2] = rec(pos1, pos2, score1, score2, 0)
  return w1 > w2 ? w1 : w2;
};

const part1Input = `Player 1 starting position: 4
Player 2 starting position: 8`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 739785 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: part2Input, expected: 444356092776315 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
