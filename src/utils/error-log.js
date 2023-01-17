import Vue from 'vue'
import store from '@/store'
import { isString, isArray } from '@/utils/judge'
import settings from '@/settings'

// you can set in settings.js
// errorLog:'production' | ['production', 'development']
const { errorLog: needErrorLog, errTime } = settings

// 检查当前环境是否需要进行错误检测
function checkNeed () {
  const env = process.env.NODE_ENV
  if (isString(needErrorLog)) {
    return env === needErrorLog
  }
  if (isArray(needErrorLog)) {
    return needErrorLog.includes(env)
  }
  return false
}
if (checkNeed()) {
  Vue.config.errorHandler = function (err, vm, info) {
    // Don't ask me why I use Vue.nextTick, it just a hack.
    // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
    Vue.nextTick(() => {
      store.dispatch('errorLog/addErrorLog', {
        errorNode: vm.$vnode.tag,
        errorMessage: err.message,
        errorStack: err.stack,
        errorInfo: info,
        errorUrl: window.location.href
      })
      console.error(err, info)
    })
  }

  window.ERRORTIMER = setInterval(() => {
    store.dispatch('errorLog/submitErrorLog')
  }, errTime)
}

