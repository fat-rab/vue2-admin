module.exports = [
  {
    url: '/vue-element-admin/get/encryptionKey',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: '-----BEGIN PUBLIC KEY-----\n' +
          'MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGJEycKuQFRY75hmClmFiEYV66zb\n' +
          'gC4HotIytVgFyN/UgWo734aZwxT10MlP67kcSXi7IACeYRsonFYCepAOWIKDjEun\n' +
          'es2UqrfPlBzjHJDMo6sJxE2hdt/65BcdJDMXNSp/RwOqA5o3rRe4JYs3nB/Vq6Zu\n' +
          'YG6zhxCRXJVVC697AgMBAAE=\n' +
          '-----END PUBLIC KEY-----'
      }
    }
  }
]
