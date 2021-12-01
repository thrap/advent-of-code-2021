const measure = document.body.innerText.trim().split("\n").map(x => +x)
var prev = Number.MAX_VALUE;
var count = 0
measure.forEach(x => {
  count += x > prev
  prev = x;
});
console.log(count)
