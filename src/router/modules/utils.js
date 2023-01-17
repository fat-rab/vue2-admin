/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const utilsRouter = {
  path: '/utils',
  component: Layout,
  redirect: 'noRedirect',
  name: 'UtilsDemo',
  alwaysShow: true,
  meta: {
    title: '工具类',
    icon: 'component'
  },
  children: [
    {
      path: 'clipborad',
      component: () => import('@/views/utils-demo/clipboard'),
      name: 'clipborad',
      meta: { title: '复制文本' }
    },
    {
      path: 'data',
      component: () => import('@/views/utils-demo/data'),
      name: 'data',
      meta: { title: '转换数据类' }
    },
    {
      path: 'time',
      component: () => import('@/views/utils-demo/time'),
      name: 'time',
      meta: { title: '时间类' }
    },
    {
      path: 'judge',
      component: () => import('@/views/utils-demo/judge'),
      name: 'judge',
      meta: { title: '判断类' }
    },
    {
      path: 'validate',
      component: () => import('@/views/utils-demo/validate'),
      name: 'validate',
      meta: { title: 'validate类' }
    },
    {
      path: 'url',
      component: () => import('@/views/utils-demo/url'),
      name: 'url',
      meta: { title: 'url类' }
    }
  ]
}

export default utilsRouter
