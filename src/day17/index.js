import run from "aocrunner";

//sjekk at x er først og y sist
const parseInput = (rawInput) => rawInput.replace("target area: ","").replace(/[xy]=/g, "").split(", ").map(s => s.split("..").map(c => +c));

const rathe = (input) => {
  const [[minX, maxX], [minY, maxY]] = input
  var x = 0
  var y = 0
  var vx = 6
  var vy = 299
  var highest = 0
  for (var step = 0; step < 10000; step++) {
    highest = Math.max(y, highest)
    console.log("step:"+step, x, y, vx, vy, highest)
    if (y < minY)
      break
    if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
      ans = Math.max(highest, ans)
      break
    }
    x += vx
    y += vy

    vx -= Math.sign(vx)
    vy -= 1
  }
}

const part1 = (rawInput) => {
  if (false && rawInput != part1Input)
    return

    const input = parseInput(rawInput);
    return rathe(input)
    // sjekk at de er max og min
  console.log(input)
  const [[minX, maxX], [minY, maxY]] = input
  //const step = (x,y, vx, vy) => {

//  }


  var ans = 0
  for (var startvx = 0; startvx <= 200; startvx++) {
    console.log(startvx, ans)
    for (var startvy = -100; startvy <= 200; startvy++) {
      var x = 0
      var y = 0
      var vx = startvx
      var vy = startvy
      var highest = 0
      for (var step = 0; step < 10000; step++) {
        highest = Math.max(y, highest)
        if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
          ans = Math.max(highest, ans)
          console.log(x, y, vx, vy, highest)
          break
        }
        x += vx
        y += vy

        vx -= Math.sign(vx)
        vy -= 1
      }
    }
  }
  return ans;
};

const part2 = (rawInput) => {
  if (true)
    return
  const input = parseInput(rawInput);
  // sjekk at de er max og min
  console.log(input)
  const [[minX, maxX], [minY, maxY]] = input
  //const step = (x,y, vx, vy) => {

//  }


  var ans = 0
  for (var startvx = 0; startvx <= 200; startvx++) {
    console.log(startvx, ans)
    for (var startvy = -200; startvy <= 200; startvy++) {
      var x = 0
      var y = 0
      var vx = startvx
      var vy = startvy
      var highest = 0
      for (var step = 0; step < 10000; step++) {
        highest = Math.max(y, highest)
        if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
          ans ++
          console.log(x, y, vx, vy, highest)
          break
        }
        x += vx
        y += vy

        vx -= Math.sign(vx)
        vy -= 1
      }
    }
  }
  console.log(input);
  return ans;
};

const part1Input = `target area: x=20..30, y=-10..-5`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: "" },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: part2Input, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
