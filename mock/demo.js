const Mock = require('mockjs')

const List = []
const count = 200
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
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
    url: '/spacex-web-admin/demo/list',
    type: 'get',
    response: config => {
      const { name, gender, role, date, currentPage = 1, pageSize = 10 } = config.query

      const mockList = List.filter(item => {
        if (name && item.name !== name) return false
        if (gender && item.gender !== gender) return false
        if (date && item.date !== date) return false
        if (role && !item.role.includes(role)) return false
        return true
      })
      const pageList = mockList.filter((item, index) => index < pageSize * currentPage && index >= pageSize * (currentPage - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          data: pageList
        }
      }
    }
  },

  {
    url: '/spacex-web-admin/demo/add',
    type: 'post',
    response: config => {
      List.unshift({ ...config.body, id: List.length + 1 })
      return {
        code: 20000,
        data: true
      }
    }
  },
  {
    url: '/spacex-web-admin/demo/edit',
    type: 'post',
    response: config => {
      let index = 0
      List.some((item, i) => {
        if (item.id === config.body.id) {
          index = i
          return true
        }
      })
      List.splice(index, 1, config.body)
      return {
        code: 20000,
        data: true
      }
    }
  },
  {
    url: '/spacex-web-admin/demo/del',
    type: 'post',
    response: config => {
      const { id } = config.body
      let index = 0
      List.some((item, i) => {
        if (item.id === id) {
          index = i
          return true
        }
      })
      List.splice(index, 1)
      return {
        code: 20000,
        data: true
      }
    }
  }
]

