var h = 0
var d = 0
var aim = 0
var x = document.body.innerText.trim().split("\n").map(x => x.split(" "))
x.forEach(([dir, steps]) => {
  switch(dir) {
      case 'forward': h+=+steps; d+=aim*+steps; break
      case 'up': aim-=steps; break;
      case 'down': aim+=+steps; break;
      default: throw 1
  }
})
console.log(h*d)
