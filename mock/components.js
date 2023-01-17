const Mock = require('mockjs')
const list = [
  {
    label: '江苏省',
    value: '1',
    children: [
      {
        label: '南京市',
        value: '1-1',
        children: [
          {
            label: '雨花台区',
            value: '1-1-1',
            parentValue: '1-1'
          },
          {
            label: '秦淮区',
            value: '1-1-2',
            parentValue: '1-1'
          }
        ]
      },
      {
        label: '南通市',
        value: '1-2',
        children: [
          {
            label: '如皋区',
            value: '1-2-1',
            parentValue: '1-2'
          },
          {
            label: '如东区',
            value: '1-2-2',
            parentValue: '1-2'
          }
        ]
      }
    ]
  }
]
const selectList = []
const count = 100
for (let i = 0; i < count; i++) {
  selectList.push(Mock.mock({
    'value': (i + 1).toString(),
    'label': '@cname'
  }))
}
const tableList = []
for (let i = 0; i < count; i++) {
  tableList.push(Mock.mock({
    'id|+1': 1,
    'name': '@cname',
    'gender|1': ['1', '2'],
    'role': ['1'],
    date: +Mock.Random.date('T'),
    memo: '@string(2,50)'
  }))
}
module.exports = [
  {
    url: '/spacex-web-admin/Area/get',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: list
      }
    }
  },
  {
    url: '/spacex-web-admin/list/get',
    type: 'get',
    response: config => {
      const { my_listCount, key, id } = config.query
      let list = selectList
      if (key) {
        list = selectList.filter((item) => item.label.indexOf(key) > -1)
      } else {
        if (id) {
          list = selectList.filter((item) => id.indexOf(item.value) > -1)
        }
      }

      return {
        code: 20000,
        data: list.slice(0, my_listCount)
      }
    }
  },
  {
    url: '/vue-element-admin/allList/get',
    type: 'get',
    response: (config) => {
      const { page } = config.query
      return {
        code: 20000,
        data: {
          total: count,
          list: tableList.slice((page - 1) * 10, page * 10)
        }
      }
    }
  }

]
