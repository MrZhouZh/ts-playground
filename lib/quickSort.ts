function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr

  const left: number[] = []
  const right: number[] = []
  const pivotIndex = arr.length >> 1
  const privot = arr.splice(pivotIndex, 1)[0]

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < privot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return [...quickSort(left), privot, ...quickSort(right)]
}
console.group('quickSort');
console.time('quickSort')
console.log(quickSort([76, 21, 34, 98, 55, 123, 50]))
console.timeEnd('quickSort')
console.groupEnd()
