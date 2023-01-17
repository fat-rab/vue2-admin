module.exports = [
  {
    url: '/spacex-web-admin/dict',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          data: {
            role: [
              { label: 'admin', value: '1' },
              { label: 'common', value: '2' },
              { label: 'dba', value: '3' }
            ]
          }
        }
      }
    }
  }
]
