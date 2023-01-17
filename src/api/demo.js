import request from '@/utils/request'

export function getDemoList (query) {
  return request({
    url: '/spacex-web-admin/demo/list',
    method: 'get',
    params: query
  })
}

export function addDemo (data) {
  return request({
    url: '/spacex-web-admin/demo/add',
    method: 'post',
    data
  })
}
export function editDemo (data) {
  return request({
    url: '/spacex-web-admin/demo/edit',
    method: 'post',
    data
  })
}
export function delDemo (data) {
  return request({
    url: '/spacex-web-admin/demo/del',
    method: 'post',
    data
  })
}
