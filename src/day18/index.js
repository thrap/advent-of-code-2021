import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map(s => eval(s));

const add = (p1, p2) => {
  return [p1, p2]
}

const addToLeftmost = (pair, x) => {
  if (pair.length) {
    const [a, b] = pair
    return [addToLeftmost(a, x), b]
  }
  return pair+x
}

const addToRightmost = (pair, x) => {
  if (pair.length) {
    const [a, b] = pair
    return [a, addToRightmost(b, x)]
  }
  return pair+x
}

const depth = (pair) => {
  if (!pair.length)
    return 0
  const [a, b] = pair
  return 1 + Math.max(depth(a), depth(b))
}

var missingToLeft = 0
var missingToRight = 0
const explode = (pair, d=0) => {
  if (!pair.length)
    return pair
  const [a, b] = pair

  if (depth(a) == 1 && d >= 3) {
    missingToLeft = a[0]
    return [0, addToLeftmost(b,a[1])]
  } else if (depth(b) == 1 && d >= 3) {
    missingToRight = b[1]
    return [addToRightmost(a,b[0]), 0]
  }
  if (depth(a) + d >= 4) {
    const ex = explode(a, d + 1)
    const missing = missingToRight
    if (missing) {
      missingToRight = 0
      return [ex, addToLeftmost(b, missing)]
    }
    return [ex, b]
  } else if (depth(b) + d >= 4) {
    const ex = explode(b, d + 1)
    const missing = missingToLeft
    if (missing) {
      missingToLeft = 0
      return [addToRightmost(a, missing), ex]
    }
    return [a, ex]
  }
  throw 1
}

const above9 = x => {
  if (x.length) {
    return !!x.flat(Infinity).find(a => a > 9)
  }
  return x > 9
}

const split = (pair) => {
  if (!pair.length) {
    if (pair <= 9)
      return pair
    var x = Math.floor(pair/2)

    return [x, pair-x]
  }
  const [a, b] = pair
  if (above9(a)) {
    return [split(a), b]
  }
  if (above9(b)) {
    return [a, split(b)]
  }
}

const reduce = (pair) => {
  missingToLeft = 0
  missingToRight = 0
  if (depth(pair) - 1 >= 4) {
    return explode(pair)
  } else if (above9(pair)) {
    return split(pair)
  }
  return pair
}

const magn = (pairs) => {
  var sum = pairs[0]
  for (var i = 1; i < pairs.length; i++) {
    sum = add(sum, pairs[i])
    while (true) {
      var before = JSON.stringify(sum)
      sum = reduce(sum)
      if (before == JSON.stringify(sum))
        break
    }
  }
  const magnitude = (pair) => {
    if (!pair.length)
      return pair
    const [a, b] = pair
    return 3*magnitude(a)+2*magnitude(b)
  }
  return magnitude(sum);
}

const part1 = (rawInput) => {
  const pairs = parseInput(rawInput);
  return magn(pairs)
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  var max = 0
  for (var i = 0; i < input.length; i++) {
    if (i && i % 10 == 0)
      console.log(i + "/"+input.length)
    for (var j = 0; j < input.length; j++) {
      const a = input[i]
      const b = input[j]
      const ans = magn([a,b])
      if (ans > max) {
        max = ans
      }
    }
  }

  return max;
};

run({
  part1: {
    tests: [
      { input:
`[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]`, expected: 2736 },
      { input:
`[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
[7,[5,[[3,8],[1,4]]]]
[[2,[2,2]],[8,[8,1]]]
[2,9]
[1,[[[9,3],9],[[9,0],[0,7]]]]
[[[5,[7,4]],7],1]
[[[[4,2],2],6],[8,7]]`, expected: 3488 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input:
`[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`, expected: 3993 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
