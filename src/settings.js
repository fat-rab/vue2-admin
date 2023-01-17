module.exports = {
  title: '后台管理系统',

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: false,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,

  /**
   * @type {string | string[]} 'production' | ['production', 'development']
   * @description 是否需要捕捉代码错误功能.
   */
  errorLog: ['production', 'development'],
  /**
   * @type {number}
   * @description 提交错误信息间隔.
   */
  errTime: 600000
}
