/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  alwaysShow: true,
  meta: {
    title: '组件',
    icon: 'component'
  },
  children: [

    {
      path: 'splitpane',
      component: () => import('@/views/components-demo/splitpane'),
      name: 'splitpane',
      meta: { title: '分割面板' }
    },
    {
      path: 'dialog',
      component: () => import('@/views/components-demo/dialog'),
      name: 'dialog',
      meta: { title: '可拖拽dialog' }
    },
    {
      path: 'code-mirror',
      component: () => import('@/views/components-demo/code-mirror'),
      name: 'code-mirror',
      meta: { title: '代码编辑器' }
    },
    {
      path: 'cascader-city',
      component: () => import('@/views/components-demo/cascader-city'),
      name: 'cascader-city',
      meta: { title: '省/市/区次联选择器' }
    },
    {
      path: 'remote-select',
      component: () => import('@/views/components-demo/remote-select'),
      name: 'remote-select',
      meta: { title: '远程查询下拉框' }
    },
    {
      path: 'text-editor',
      component: () => import('@/views/components-demo/text-editor'),
      name: 'text-editor',
      meta: { title: 'tinymce编辑器' }
    },
    {
      path: 'wang-editor',
      component: () => import('@/views/components-demo/wang-editor'),
      name: 'wang-editor',
      meta: { title: 'wangEditor编辑器' }
    },
    {
      path: 'table',
      component: () => import('@/views/components-demo/table/table'),
      name: 'table',
      meta: { title: '普通table' }
    },
    {
      path: 'auto-size-table',
      component: () => import('@/views/components-demo/table/auto-size-table'),
      name: 'auto-size-table',
      meta: { title: '自适应尺寸table' }
    },
    {
      path: 'infinite-table',
      component: () => import('@/views/components-demo/table/infinite-table'),
      name: 'infinite-table',
      meta: { title: '无限滚动table' }
    },
    {
      path: 'upload',
      component: () => import('@/views/components-demo/upload'),
      name: 'upload',
      meta: { title: '大文件上传' }
    }
  ]
}

export default componentsRouter
