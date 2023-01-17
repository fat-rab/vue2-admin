import request from '@/utils/request'

export function getAreaMessageList (query) {
  return request({
    url: '/spacex-web-admin/Area/get',
    method: 'get',
    params: query
  })
}
export function getSelectList (query) {
  return request({
    url: '/spacex-web-admin/list/get',
    method: 'get',
    params: query
  })
}

export function uploadFile (data) {
  return request({
    url: '/spacex-web-admin/file/upload',
    method: 'post',
    data
  })
}
export function getAllList (query) {
  return request({
    url: '/vue-element-admin/allList/get',
    method: 'get',
    params: query
  })
}
