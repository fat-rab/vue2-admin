import request from '@/utils/request'
// 字典相关
export function getDictList (query) {
  return request({
    url: '/spacex-web-admin/dict/list',
    method: 'get',
    params: query
  })
}

export function addDict (data) {
  return request({
    url: '/spacex-web-admin/dict/add',
    method: 'post',
    data
  })
}
export function editDict (data) {
  return request({
    url: '/spacex-web-admin/dict/edit',
    method: 'post',
    data
  })
}
export function delDict (data) {
  return request({
    url: '/spacex-web-admin/dict/del',
    method: 'post',
    data
  })
}

export function getDictItemList (query) {
  return request({
    url: '/spacex-web-admin/dictItem/get',
    method: 'get',
    params: query
  })
}
export function addDictItem (data) {
  return request({
    url: '/spacex-web-admin/dictItem/add',
    method: 'post',
    data
  })
}
export function editDictItem (data) {
  return request({
    url: '/spacex-web-admin/dictItem/edit',
    method: 'post',
    data
  })
}
export function delDictItem (data) {
  return request({
    url: '/spacex-web-admin/dictItem/del',
    method: 'post',
    data
  })
}
export function getAllDict (query) {
  return request({
    url: '/spacex-web-admin/allDict/get',
    method: 'get',
    params: query
  })
}
// 用户管理相关
export function getUserList (query) {
  return request({
    url: '/spacex-web-admin/user/list',
    method: 'get',
    params: query
  })
}

export function addUser (data) {
  return request({
    url: '/spacex-web-admin/user/add',
    method: 'post',
    data
  })
}
export function editUser (data) {
  return request({
    url: '/spacex-web-admin/user/edit',
    method: 'post',
    data
  })
}
export function delUser (data) {
  return request({
    url: '/spacex-web-admin/user/del',
    method: 'post',
    data
  })
}
export function changePassword (data) {
  return request({
    url: '/spacex-web-admin/password/change',
    method: 'post',
    data
  })
}

// 登陆日志
export function getLoginLogList (query) {
  return request({
    url: '/spacex-web-admin/loginLog/list',
    method: 'get',
    params: query
  })
}
// 操作日志
export function getOperationLogList (query) {
  return request({
    url: '/spacex-web-admin/operationLog/list',
    method: 'get',
    params: query
  })
}

// 错误日志
export function getErrorLogList (query) {
  return request({
    url: '/spacex-web-admin/ErrorLog/list',
    method: 'get',
    params: query
  })
}
export function submitErrorLog (data) {
  return request({
    url: '/spacex-web-admin/ErrorLog/submit',
    method: 'post',
    data
  })
}
