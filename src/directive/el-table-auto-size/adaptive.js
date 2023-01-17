import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event'
/**
 * 使用方法
 * <el-table height="100px" v-el-height-adaptive-table="{bottomOffset: 50}">...</el-table>
 * el-table height is must be set
 * bottomOffset: 50(default)   // 距离页面底部的高度，默认50，可根据业务自行调整
 */

const doResize = (el, binding, vnode) => {
  const { componentInstance: $table } = vnode
  const { value } = binding
  if (!$table.height) {
    throw new Error(`el-table必须设置高度`)
  }
  const bottomOffset = (value && value.bottomOffset) || 50

  if (!$table) return

  const height = window.innerHeight - el.getBoundingClientRect().top - bottomOffset
  $table.layout.setHeight(height)
  $table.doLayout()
}
export default {
  bind (el, binding, vnode) {
    const { arg } = binding
    // 动态判断是否使用自适应尺寸
    if (!arg) return
    el.resizeListener = () => {
      doResize(el, binding, vnode)
    }
    //  第一个参数必须是element
    addResizeListener(window.document.body, el.resizeListener)
  },
  inserted (el, binding, vnode) {
    const { arg } = binding
    // 动态判断是否使用自适应尺寸
    if (!arg) return
    el.resizeListener = () => {
      doResize(el, binding, vnode)
    }
    // 如果只在bind中添加监听的话，初次进入页面需要刷新才会有效果
    addResizeListener(window.document.body, el.resizeListener)
    // 页面渲染完成之后，手动改变一次table高度
    setTimeout(() => {
      doResize(el, binding, vnode)
    }, 0)
  },
  unbind (el) {
    removeResizeListener(window.document.body, el.resizeListener)
  }
}
