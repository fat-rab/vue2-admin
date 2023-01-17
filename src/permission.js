import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 判断是否已经登陆过
  const hasToken = getToken()
  if (hasToken) {
    // 首次登陆获取数据/防止页面刷新数据丢失（目前使用这个方法统一处理，也可以使用插件等方法处理）
    if (!store.getters.dict) {
      await store.dispatch('app/getDict')
    }
    if (to.path === '/login') {
      // 如果已经登陆，跳转到首页
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // 判断是否拥有角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户信息
          // 角色必须放在通过用户信息接口获取，并且必须是数组，例如['admin','common']
          const { roles } = await store.dispatch('user/getInfo')
          // 通过role获取可访问路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 动态添加可访问路由
          router.addRoutes(accessRoutes)
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // 移除token，并且跳转到登陆页面（后面添加重定向参数，再次登陆可以直接跳转到登出之前的页面）
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 没有token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // 跳转到白名单页面
      next()
    } else {
      // 如果想到访问非白名单页面，则需要重新登陆
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
