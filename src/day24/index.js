import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

class ALU {
  constructor(obj) {
    if (obj) {
      this.variable = obj
    } else {
      this.variable = {w:0, x:0, y:0, z:0}
    }
  }

  simplified = []

  process(line, log = false) {
    const [op, a, b] = line.split(" ")
    if (!/^[wxyz]$/.test(a)) {
      throw 1
    }
    var varB = /^[wxyz]$/.test(b) ? this.variable[b] : parseInt(b)

    if (op == "add") {
      this.variable[a]+=varB
      if (log)
        console.log(a, "=", a, "+", b)
    } else if (op == "mul") {
      this.variable[a]*=varB
      if (log)
        console.log(a, "=", a, "*", b)
    } else if (op == "div") {
      this.variable[a]= Math.floor(this.variable[a]/varB)
      if (log && b != "1")
        console.log(a, "= Math.floor(", a, "/", b,")")
    } else if (op == "mod") {
      this.variable[a]%=varB
      if (log)
        console.log(a, "=", a, "%", b)
    } else if (op == "eql") {
      if (log)
        console.log(a, "=", a, "==", b, "? 1 : 0")
      this.variable[a] = (this.variable[a] == varB) ? 1 : 0
    } else {
      throw 1
    }
  }

  inp(a, i, x) {
    //console.log(a, "=", "UKJENT["+i+"]")
    this.variable[a] = x
  }
}

/*
var UKJENT = "13569193499999".split("").map(x => +x)
//            012345
var x = 0, y=0,z=0,w=9

x = 1
y = UKJENT[0] + 1
z = (UKJENT[0] + 1) * 26
y = UKJENT[1] + 11
x = 1
z = ((UKJENT[0] + 1) * 26 + UKJENT[1] + 11) * 26
y = UKJENT[2] + 1
z = ((UKJENT[0] + 1) * 26 + UKJENT[1] + 11) * 26 + UKJENT[2] + 1
z = (((UKJENT[0] + 1) * 26 + UKJENT[1] + 11) * 26 + UKJENT[2] + 1) * 26
y = UKJENT[3] + 11
z = (((UKJENT[0] + 1) * 26 + UKJENT[1] + 11) * 26 + UKJENT[2] + 1) * 26 + UKJENT[3] + 11
z = ((UKJENT[0] + 1) * 26 + UKJENT[1] + 11) * 26 + UKJENT[2] + 1

z = ((UKJENT[0] + 1) * 26 + UKJENT[1] + 11) * 26 + UKJENT[2] + 1

// UKJENT[3] + 3 == UKJENT[4]
// UKJENT[2] - 4 == UKJENT[5]
x = 0
y = 0
z = (UKJENT[0] + 1) * 26 + UKJENT[1] + 11

x = 1
z = ((UKJENT[0] + 1) * 26 + UKJENT[1] + 11) * 26
y = UKJENT[6] + 7
z = ((UKJENT[0] + 1) * 26 + UKJENT[1] + 11) * 26 + UKJENT[6] + 7
z = (UKJENT[0] + 1) * 26 + UKJENT[1] + 11

//UKJENT[6] - 6 == UKJENT[7]
//UKJENT[8] + 5 == UKJENT[9]


y = UKJENT[7] + 11
x = 1
z = ((UKJENT[0] + 1) * 26 + UKJENT[1] + 11) * 26
y = UKJENT[8] + 6
z = ((UKJENT[0] + 1) * 26 + UKJENT[1] + 11) * 26 + UKJENT[8] + 6
x = UKJENT[8] + 5
z = (UKJENT[0] + 1) * 26 + UKJENT[1] + 11


//UKJENT[8] + 5 == UKJENT[9]
x = 0
y = 0
x = 1
z = ((UKJENT[0] + 1) * 26 + UKJENT[1] + 11) * 26
y = UKJENT[10] + 7
z = ((UKJENT[0] + 1) * 26 + UKJENT[1] + 11) * 26 + UKJENT[10] + 7
x = UKJENT[10] + 2
z = (UKJENT[0] + 1) * 26 + UKJENT[1] + 11


//UKJENT[10] + 2 == UKJENT[11]
x = UKJENT[10] + 2 == UKJENT[11] ? 0 : 1
z = z * (25 * x + 1)
y = UKJENT[11] + 1
y = y * x
z = z + y
x = z % 26
z = Math.floor( z / 26 )
x = x - 4
x = x == UKJENT[12] ? 0 : 1
z = z * (25 * x + 1)
y = UKJENT[12] + 8
y = y * x
z = z + y
x = z % 26
z = Math.floor( z / 26 )
x = x - 8
x = x == UKJENT[13] ? 0 : 1
z = z * (25 * x + 1)
y = UKJENT[13] + 6
y = y * x
z = z + y

console.log(x,y,z)
console.log(0,0,30273774)
*/

const part1 = (rawInput) => {
  const lines = parseInput(rawInput);
  var meat = "9695934979"
  for (var s1 = 9; s1 >= 1; s1--) {
    for (var s2 = 9; s2 >= 1; s2--) {
      for (var s12 = 9; s12 >= 1; s12--) {
        for (var s13 = 9; s13 >= 1; s13--) {
          const youngAL = new ALU()
                      //   2332668800
          const input = s1+""+s2+"9695934979"+s12+""+s13
                       //01234567890123
                      //UKJENT[2] - 4 == UKJENT[5]
                      //UKJENT[3] + 3 == UKJENT[4]
                      //UKJENT[6] - 6 == UKJENT[7]
                      //UKJENT[8] + 5 == UKJENT[9]
                      //UKJENT[10] + 2 == UKJENT[11]
          var i = 0
          lines.forEach(line => {
            var [op, a] = line.split(" ")
            if (op == "inp") {
              youngAL.inp(a, i, parseInt(input[i++]))
            } else {
              youngAL.process(line)
            }
            /*if (a == "z")
            console.log(youngAL.variable)*/
          })
          //console.log(youngAL.variable);
          if (youngAL.variable.z == 0) {
            return input
          }
        }
      }
    }
  }
  return;
};

const part2 = (rawInput) => {
  const lines = parseInput(rawInput);
          //  2332668800
  var meat = "5141711613"
          //01234567890123
  for (var s1 = 1; s1 <= 9; s1++) {
    for (var s2 = 1; s2 <= 9; s2++) {
      for (var s12 = 1; s12 <= 9; s12++) {
        for (var s13 = 1; s13 <= 9; s13++) {
          const youngAL = new ALU()
          const input = s1+""+s2+meat+s12+""+s13

                      //UKJENT[2] - 4 == UKJENT[5]
                      //UKJENT[3] + 3 == UKJENT[4]
                      //UKJENT[6] - 6 == UKJENT[7]
                      //UKJENT[8] + 5 == UKJENT[9]
                      //UKJENT[10] + 2 == UKJENT[11]
          var i = 0
          lines.forEach(line => {
            var [op, a] = line.split(" ")
            if (op == "inp") {
              youngAL.inp(a, i, parseInt(input[i++]))
            } else {
              youngAL.process(line)
            }
            /*if (a == "z")
            console.log(youngAL.variable)*/
          })
          //console.log(youngAL.variable);
          if (youngAL.variable.z == 0) {
            return input
          }
        }
      }
    }
  }
  return;
};

const part1Input = ``
const part2Input = part1Input
run({
  part1: {
    tests: [
    ],
    solution: part1,
  },
  part2: {
    tests: [
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
