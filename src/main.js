import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

Vue.use(Element)
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// 可以用来注册一些全局过滤器
// import * as filters from './filters' // global filters
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })
// 大文件上传组件，如果不需要可以不引入
import uploader from 'vue-simple-uploader'
Vue.use(uploader)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
