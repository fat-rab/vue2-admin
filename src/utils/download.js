/**
 *
 * @description 下载文件
 * @param {Blob} fileBlob
 * @param {string} fileName
 */
export const downloadFileStream = (fileBlob, fileName) => {
  const data = new Blob([fileBlob], { type: 'text/plain;charset=UTF-8' })
  const downloadUrl = window.URL.createObjectURL(data)
  const anchor = document.createElement('a')
  anchor.href = downloadUrl
  anchor.download = fileName
  if (getMyBrowser() === 'IE') {
    navigator.msSaveBlob(data, fileName)
  } else {
    const event = new MouseEvent('click')
    const eleLink = document.createElement('a')
    eleLink.download = fileName
    eleLink.href = URL.createObjectURL(data)
    eleLink.dispatchEvent(event)
  }
  window.URL.revokeObjectURL(data) // 释放createObjectURL 创建的url对象占用的内存
}
// 判断浏览器的类型
export const getMyBrowser = () => {
  const userAgent = navigator.userAgent
  if (userAgent.indexOf('OPR') > -1) {
    return 'Opera'
  }
  if (userAgent.indexOf('Firefox') > -1) {
    return 'FF'
  }
  if (userAgent.indexOf('Trident') > -1) {
    return 'IE'
  }
  if (userAgent.indexOf('Edge') > -1) {
    return 'Edge'
  }
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome'
  }
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari'
  }
}
