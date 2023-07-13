function formatMoney(money: number): string {
  // 第一种 正则
  const part = String(money).split('.')
  part[0] = part[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return part.join('.')
  // 第二种
  // let result: string[] = []
  // let negativeFlag = ''
  // let tail = ''
  // let arr = [...String(money)]

  // if (arr[0] === '-') {
  //   negativeFlag = '-'
  //   arr.shift()
  // }

  // const dotIndex = arr.indexOf('.')
  // if (dotIndex !== -1) {
  //   tail = arr.splice(dotIndex, arr.length - dotIndex).join('')
  // }

  // // 处理整数部分加上千分位
  // const reverseArray = arr.reverse()
  // for (let i = 0; i < reverseArray.length; i++) {
  //   if ((i + 1) % 3 === 0 && i + 1 < reverseArray.length) {
  //     result[i] = ',' + reverseArray[i]
  //   } else {
  //     result[i] = reverseArray[i]
  //   }
  // }
  // return negativeFlag + result.reverse().join('') + tail
}

console.group('formatMoney')
console.log(formatMoney(-871231.3)) // -871,231.3
console.log(formatMoney(+8712310000.003)) // 8,712,310,000.003
console.groupEnd()
