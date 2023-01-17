export function validatePositiveNum (rule, value, callback) {
  const boolean = new RegExp('^[1-9][0-9]*$').test(value)
  if (!boolean) {
    callback(new Error('请输入正整数'))
  }
  callback()
}
export function validatePositiveStr (rule, value, callback) {
  const num = Number(value)
  const boolean = new RegExp('^[1-9][0-9]*$').test(num)
  if (!boolean) {
    callback(new Error('请输入正整数类型的字符串'))
  }
  callback()
}
export function validateZeroInteger (rule, value, callback) {
  const boolean = new RegExp('^\\d+$').test(value)
  if (!boolean) {
    callback(new Error('请输入大于等于0的整数'))
  }
  callback()
}

export function validateIp (rule, value, callback) {
  const regIp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  const boolean = new RegExp(regIp).test(value)
  if (!boolean) {
    callback(new Error('请输入合法的IP地址'))
  }
  callback()
}
export function validatePhoneNumber (rule, value, callback) {
  const boolean = new RegExp(/^[1][3,4,5,7,8,9][0-9]{9}$/).test(value)
  if (!boolean) {
    callback(new Error('请输入正确的手机号码'))
  }
  callback()
}
export function validatePass (rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (!/[a-zA-Z0-9]/.test(value)) {
    callback(new Error('密码只能是数字和大小写字母组成'))
  } else {
    callback()
  }
}
