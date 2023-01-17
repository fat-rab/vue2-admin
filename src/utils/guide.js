import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
const steps = [
  {
    element: '#hamburger-container',
    popover: {
      title: '菜单缩放按钮',
      description: '用来展开/收缩菜单',
      position: 'bottom'
    }
  },
  {
    element: '#breadcrumb-container',
    popover: {
      title: '面包屑',
      description: '展示当前页面位置',
      position: 'bottom'
    }
  },
  {
    element: '#screenfull',
    popover: {
      title: '全屏按钮',
      description: '点击进入全屏页面',
      position: 'left'
    }
  },
  {
    element: '#tags-view-container',
    popover: {
      title: '快捷标签',
      description: '可以快速访问你曾今访问过的页面',
      position: 'bottom'
    },
    padding: 0
  }
]

const driver = new Driver({
  animate: true,
  opacity: 0,
  stageBackground: '#000000',
  doneBtnText: '完成',
  closeBtnText: '关闭',
  nextBtnText: '下一步',
  prevBtnText: '上一步'
})

function guide () {
  driver.defineSteps(steps)
  driver.start()
}
export default guide
