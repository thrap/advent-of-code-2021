  const input = rawInput.split("\n");

  var countI = (arr, i) => arr.reduce((acc, c) => acc+(+c[i]), 0)

  const filter = (i, arr, b) => {
    if (arr.length <= 1)
      return parseInt(arr[0], 2)
    var c = (countI(arr, i) >= arr.length/2)^b
    return filter(i+1, arr.filter(x => x[i] == c), b)
  }

  return filter(0, input, true) * filter(0, input, false);
