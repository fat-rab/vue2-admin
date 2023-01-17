const Mock = require('mockjs')

const userList = []
const loginLogList = []
const operationList = []
const errorList = []
const count = 20
for (let i = 0; i < count; i++) {
  userList.push(Mock.mock({
    id: '@string(6)',
    account: '@string(6)',
    name: '@cname',
    'gender|1': ['1', '2'],
    role: ['1'],
    phoneNumber: '15005478621',
    lastLoginDate: +Mock.Random.date('T'),
    memo: '@string(2,50)'
  }))
}
for (let i = 0; i < count; i++) {
  loginLogList.push(Mock.mock({
    id: '@string(6)',
    account: '@string(6)',
    ip: '@ip',
    loginDate: +Mock.Random.date('T'),
    status: 1,
    message: '@string(2,50)'
  }))
}
for (let i = 0; i < count; i++) {
  operationList.push(Mock.mock({
    id: '@string(6)',
    account: '@string(6)',
    ip: '@ip',
    operationDate: +Mock.Random.date('T'),
    message: '@string(2,50)',
    module: 'sys-management'
  }))
}
for (let i = 0; i < count; i++) {
  errorList.push(Mock.mock({
    id: '@string(6)',
    errorNode: '@string(6)',
    errorUrl: '@string(6)',
    errorInfo: '@string(10)',
    errorMessage: '@string(5)',
    errorStack: '@string(10)'
  }))
}
const list = [
  {
    id: '1',
    name: 'role',
    key: 'role',
    memo: '这是权限字典'
  },
  {
    id: '2',
    name: 'env',
    key: 'env',
    memo: '这是环境字典'
  },
  {
    id: '3',
    name: 'gender',
    key: 'gender',
    memo: '这是性别字典'
  },
  {
    id: '4',
    name: 'module',
    key: 'module',
    memo: '这是功能模块字典'
  }
]
const dictItemList = {
  role: [
    { id: '1', label: 'admin', value: '1' },
    { id: '2', label: 'common', value: '2' },
    { id: '3', label: 'dba', value: '3' }
  ],
  env: [
    { id: '1', label: '开发', value: '1' },
    { id: '2', label: '测试', value: '2' }
  ],
  gender: [
    { id: '1', label: '男', value: '1' },
    { id: '2', label: '女', value: '2' }
  ],
  module: [
    { id: '1', label: '系统管理', value: 'sys-management' }
  ]
}
module.exports = [
  {
    url: '/spacex-web-admin/dict/list',
    type: 'get',
    response: config => {
      const { currentPage, pageSize, name, key } = config.query
      let filterList = list
      if (name) {
        filterList = list.filter((item) => item.name === name)
      }
      if (key) {
        filterList = list.filter((item) => item.key === key)
      }
      return {
        code: 20000,
        data: {
          data: filterList.slice((currentPage - 1) * pageSize, pageSize),
          total: filterList.length,
          currentPage: Number(currentPage),
          pageSize: Number(pageSize)
        }

      }
    }
  },
  {
    url: '/spacex-web-admin/dict/add',
    type: 'post',
    response: config => {
      const obj = config.body
      obj.id = String(list.length + 1)
      list.push(obj)
      return {
        code: 20000,
        data: null
      }
    }
  },
  {
    url: '/spacex-web-admin/dict/edit',
    type: 'post',
    response: config => {
      const { id } = config.body
      let index = 0
      list.some((item, i) => {
        if (item.id === id) {
          index = i
          return true
        }
      })
      list.splice(index, 1, config.body)
      return {
        code: 20000,
        data: null
      }
    }
  },
  {
    url: '/spacex-web-admin/dict/del',
    type: 'post',
    response: config => {
      const { id } = config.body
      let index = 0
      list.some((item, i) => {
        if (item.id === id) {
          index = i
          return true
        }
      })
      list.splice(index, 1)
      return {
        code: 20000,
        data: null
      }
    }
  },
  {
    url: '/spacex-web-admin/allDict/get',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: dictItemList
      }
    }
  },
  {
    url: '/spacex-web-admin/dictItem/get',
    type: 'get',
    response: config => {
      const { key } = config.query
      return {
        code: 20000,
        data: dictItemList[key] || []
      }
    }
  },
  {
    url: '/spacex-web-admin/dictItem/add',
    type: 'post',
    response: config => {
      const { key, data } = config.body
      dictItemList[key].push({ id: String(dictItemList[key].length + 1), ...data })
      return {
        code: 20000,
        data: true
      }
    }
  },
  {
    url: '/spacex-web-admin/dictItem/edit',
    type: 'post',
    response: config => {
      const { key, data } = config.body
      let index = 0
      dictItemList[key].some((item, i) => {
        if (item.id === data.id) {
          index = i
          return true
        }
      })
      dictItemList[key].splice(index, 1, data)
      return {
        code: 20000,
        data: true
      }
    }
  },
  {
    url: '/spacex-web-admin/dictItem/del',
    type: 'post',
    response: config => {
      const { key, id } = config.body
      let index = 0
      dictItemList[key].some((item, i) => {
        if (item.id === id) {
          index = i
          return true
        }
      })
      dictItemList[key].splice(index, 1)
      return {
        code: 20000,
        data: null
      }
    }
  },
  {
    url: '/spacex-web-admin/user/list',
    type: 'get',
    response: config => {
      const { name, gender, account, phoneNumber, role, currentPage = 1, pageSize = 10 } = config.query

      const mockList = userList.filter(item => {
        if (name && item.name !== name) return false
        if (gender && item.gender !== gender) return false
        if (account && item.account !== account) return false
        if (phoneNumber && item.phoneNumber !== phoneNumber) return false
        // if (startTime && endTime &&item.date !== date) return false
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
    url: '/spacex-web-admin/user/add',
    type: 'post',
    response: config => {
      userList.unshift({ ...config.body, id: userList.length + 1 })
      return {
        code: 20000,
        data: true
      }
    }
  },
  {
    url: '/spacex-web-admin/user/edit',
    type: 'post',
    response: config => {
      let index = 0
      userList.some((item, i) => {
        if (item.id === config.body.id) {
          index = i
          return true
        }
      })
      userList.splice(index, 1, config.body)
      return {
        code: 20000,
        data: true
      }
    }
  },
  {
    url: '/spacex-web-admin/user/del',
    type: 'post',
    response: config => {
      const { id } = config.body
      let index = 0
      userList.some((item, i) => {
        if (item.id === id) {
          index = i
          return true
        }
      })
      userList.splice(index, 1)
      return {
        code: 20000,
        data: true
      }
    }
  },
  {
    url: '/spacex-web-admin/password/change',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        data: true
      }
    }
  },
  {
    url: '/spacex-web-admin/loginLog/list',
    type: 'get',
    response: config => {
      const { ip, account, currentPage = 1, pageSize = 10 } = config.query
      const mockList = loginLogList.filter(item => {
        if (ip && item.ip !== ip) return false
        if (account && item.account !== account) return false
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
    url: '/spacex-web-admin/operationLog/list',
    type: 'get',
    response: config => {
      const { account, module, currentPage = 1, pageSize = 10 } = config.query
      const mockList = operationList.filter(item => {
        if (account && item.account !== account) return false
        if (module && item.module !== module) return false
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
    url: '/spacex-web-admin/ErrorLog/list',
    type: 'get',
    response: config => {
      const { errorUrl, currentPage = 1, pageSize = 10 } = config.query
      const mockList = errorList.filter(item => {
        if (errorUrl && item.errorUrl !== errorUrl) return false
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
    url: '/spacex-web-admin/ErrorLog/submit',
    type: 'post',
    response: config => {
      const arr = config.body.errorArr
      errorList.push(...arr)
      return {
        code: 20000,
        data: errorList
      }
    }
  }
]
