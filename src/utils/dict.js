/**
 * @description 通过字典项的value返回对应字典项的label
 * @param {Array} dictArr
 * @param {string|number} value
 * @returns {string|number}
 */
export function getDictStr (dictArr, value) {
  if (!value) return ''
  const obj = dictArr.find(item => item.value.toString() === value.toString())
  return obj && obj.label
}

/**
 * @description 通过多个字典项value组成的数组返回对应的label拼接而成的字符串
 * @param {Array} dictArr
 * @param {Array} arr
 * @returns {String}
 */
export function getDictStrFromArr (dictArr, arr) {
  if (!arr || !arr.length) return ''
  const strArr = []
  dictArr.forEach((item) => {
    if (arr.includes(item.value)) {
      strArr.push(item.label)
    }
  })
  return strArr.length && strArr.join(',')
}
