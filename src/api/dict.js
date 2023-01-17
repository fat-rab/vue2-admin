import request from '@/utils/request'

export function getDict (query) {
  return request({
    url: '/spacex-web-admin/dict',
    method: 'get',
    params: query
  })
}
