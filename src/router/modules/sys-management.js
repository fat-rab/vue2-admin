/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/sys-management',
  component: Layout,
  redirect: 'noRedirect',
  name: 'sys-management',
  alwaysShow: true,
  meta: {
    title: '系统管理',
    icon: 'el-icon-setting'
  },
  children: [
    {
      path: 'dict-management',
      component: () => import('@/views/sys-management/dict-management/index'),
      name: 'dict-management',
      meta: { title: '字典管理' }
    },
    {
      path: 'user-management',
      component: () => import('@/views/sys-management/user-management/index'),
      name: 'user-management',
      meta: { title: '用户管理' }
    },
    {
      path: 'login-log',
      component: () => import('@/views/sys-management/login-log/index'),
      name: 'login-log',
      meta: { title: '登陆日志' }
    },
    {
      path: 'operation-log',
      component: () => import('@/views/sys-management/operation-log/index'),
      name: 'operation-log',
      meta: { title: '操作日志' }
    },
    {
      path: 'error-log',
      component: () => import('@/views/sys-management/error-log/index'),
      name: 'error-log',
      meta: { title: '错误日志' }
    }
  ]
}

export default componentsRouter
