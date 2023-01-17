import Vue from 'vue'
import Clipboard from 'clipboard'

function clipboardSuccess () {
  Vue.prototype.$message({
    message: '复制成功',
    type: 'success',
    duration: 1500
  })
}

function clipboardError () {
  Vue.prototype.$message({
    message: '复制失败',
    type: 'error'
  })
}
/**
  * @description 复制文本
  * @param {String} text
  * @param {Object} event ，鼠标事件的参数
  */
export default function handleClipboard (text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
