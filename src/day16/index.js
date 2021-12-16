import run from "aocrunner";

const mapping = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: "1000",
  9: "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
}
const parseInput = (rawInput) => {
  if (rawInput.match(/^[01]+$/))
    return rawInput;
  return rawInput.split("").map(x => mapping[x]).join("")
}

const literal = (input, i) => {
  i+=6

  const vals = []
  while(i < input.length) {
    const val = input.substr(i, 5)
    i+=5
    vals.push(val)
    if (val[0] == "0")
      break
  }
  const value = vals.map((x, i) => Math.pow(16,vals.length-i-1)*parseInt(x.substr(1),2)).reduce((acc, x) => acc + x)
  return [i, value]
}

const operator = (input, i) => {
  i += 6
  const lengthTypeId = input.substr(i,1)
  i += 1
  if (lengthTypeId == "0") {
    const totalLengthInBits = parseInt(input.substr(i, 15),2)
    i+=15
    const beforeI = i
    const values = []
    while (i < beforeI + totalLengthInBits) {
      const subPacket = parse(input, i)
      values.push(subPacket[1])
      i = subPacket[0]
    }
    if (beforeI + totalLengthInBits != i) {
      throw 1
    }

    return [i, values];
  } else {
    const subPackets = parseInt(input.substr(i, 11),2)
    i += 11
    const values = []
    for (var j = 0; j < subPackets; j++) {
      const asd = parse(input, i)
      values.push(asd[1])
      i = asd[0]
    }
    return [i, values]
  }
}

const parse = (input, i) => {
  const version = parseInt(input.substr(i,3),2)
  versionSum += version
  const typeID = parseInt(input.substr(i+3,3),2)

  if (typeID == 4) {
    return literal(input, i)
  }
  const ans = operator(input, i)
  const [a,b] = ans[1]
  switch (typeID) {
    case 0:
      return [ans[0], ans[1].reduce((acc, x) => acc + x)];
    case 1:
      return [ans[0], ans[1].reduce((acc, x) => acc * x)];
    case 2:
      return [ans[0], Math.min(...ans[1])]
    case 3:
      return [ans[0], Math.max(...ans[1])]
    case 5:
      return [ans[0], a > b ? 1 : 0]
    case 6:
      return [ans[0], a < b ? 1 : 0]
    case 7:
      return [ans[0], a == b ? 1 : 0]
  }
}
var versionSum = 0
const part1 = (rawInput) => {
  versionSum = 0
  const input = parseInput(rawInput);
  parse(input, 0)
  return versionSum
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  var ans = parse(input, 0)

  return ans[1];
};

run({
  part1: {
    tests: [
      { input: "110100101111111000101000", expected: 6 },
      { input: "00111000000000000110111101000101001010010001001000000000", expected: 9 },
      { input: "11101110000000001101010000001100100000100011000001100000", expected: 14 },
      { input: "EE00D40C823060", expected: 14 },
      { input: "8A004A801A8002F478", expected: 16 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: "C200B40A82", expected: 3 },
      { input: "04005AC33890", expected: 54 },
      { input: "880086C3E88112", expected: 7 },
      { input: "CE00C43D881120", expected: 9 },
      { input: "D8005AC2A8F0", expected: 1 },
      { input: "F600BC2D8F", expected: 0 },
      { input: "9C005AC2F8F0", expected: 0 },
      { input: "9C0141080250320F1802104A08", expected: 1 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
