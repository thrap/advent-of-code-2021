const input = rawInput.split("\n")

var count = Array(input[0].length).fill(0)
input.forEach(binary => {
  binary.split('').forEach((c, i) => {
    count[i]+=+c
  })
})
var gamma = parseInt(count.map(c => +(c >= input.length/2)).join(""), 2)
var epsilon = parseInt(count.map(c => +(c < input.length/2)).join(""), 2)

return gamma*epsilon;
