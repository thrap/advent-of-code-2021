const measure = document.body.innerText.trim().split("\n").map(x => +x)
var prev = Number.MAX_VALUE;
var count = 0

for(var i = 0; i < measure.length-2; i++) {
  var current = measure[i]+measure[i+1]+measure[i+2]
  count += current > prev
  prev = current;
}

console.log(count)
