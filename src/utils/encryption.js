import JSEncrypt from 'jsencrypt'

/**
 * @description 使用JSEncrypt 对密码等进行RSA加密
 * @param {string} password
 * @param {string} publicKey
 * @returns {string}
 * */

export function EncryptedPassword (publicKey, password) {
  const encryptor = new JSEncrypt() // 创建加密对象实例
  encryptor.setPublicKey(publicKey)// 设置公钥
  return encryptor.encrypt(password) // 对密码进行加密
}
