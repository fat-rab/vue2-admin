import request from '@/utils/request'

export function getEncryptionKey (token) {
  return request({
    url: '/vue-element-admin/get/encryptionKey',
    method: 'get'
  })
}
