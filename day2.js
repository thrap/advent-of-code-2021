var h = 0
var d = 0
var x = document.body.innerText.trim().split("\n").map(x => x.split(" "))
x.forEach(([dir, steps]) => {
  switch(dir) {
      case 'forward': h+=+steps; break
      case 'up': d-=steps; break;
      case 'down': d+=+steps; break;
      default: throw 1
  }
})
console.log(h*d)
