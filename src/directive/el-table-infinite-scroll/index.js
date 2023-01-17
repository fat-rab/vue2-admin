import infiniteScroll from './infinite-scroll'

const install = function (Vue) {
  Vue.directive('el-table-infinite-scroll', infiniteScroll)
}

if (window.Vue) {
  window['el-height-adaptive-table'] = infiniteScroll
  Vue.use(install); // eslint-disable-line
}

infiniteScroll.install = install
export default infiniteScroll
