<template>
  <div :id="id" />
</template>

<script>
// https://www.wangeditor.com/doc/
import E from 'wangeditor'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

export default {
  name: 'WangEditor',
  props: {
    id: {
      type: String,
      default: function () {
        return 'wang-editor-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    menus: {
      type: Array,
      default: () => {
        return []
      }
    },
    excludeMenus: {
      type: Array,
      default: () => {
        return []
      }
    },
    height: {
      type: Number,
      default: 300
    },
    uploadUrl: {
      type: String,
      default: 'dev-api/spacex-web-admin/file/upload'
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      editor: null,
      hasInit: false
    }
  },
  component: {},
  computed: {},
  watch: {
    readonly (val) {
      if (this.hasInit) {
        // 只有在初始化之后会进行调用
        this.$nextTick(() => {
          this.setEditorReadonly(val)
        })
      }
    }
  },
  mounted () {
    this.initWangEditor()
  },
  beforeDestroy () {
    // 销毁编辑器
    this.editor.destroy()
    this.editor = null
  },
  methods: {
    initWangEditor () {
      const _this = this
      this.editor = new E(document.getElementById(this.id))
      // 历史记录使用兼容模式，兼容IE 和 旧版 Edge
      this.editor.config.compatibleMode = function () {
        // 返回 true 表示使用兼容模式；返回 false 使用标准模式
        return true
      }
      // 注意：不要同时使用 editor.config.menus 和 editor.config.excludeMenus，以免引起冲突和混乱。
      // 默认加载全部菜单栏，也可以配置需要的菜单和顺序
      if (this.menus.length) {
        this.editor.config.menus = this.menus
      }
      // 当需要剔除的菜单栏笔比较少的时候，可以配置不需要的菜单栏
      if (this.excludeMenus.length) {
        this.editor.config.excludeMenus = this.excludeMenus
      }
      // 配置编辑器高度
      this.editor.config.height = this.height
      // 配置fontSize ,可以根据框架标准进行更改
      this.editor.config.fontSizes = {
        'x-small': { name: '10px', value: '1' },
        'small': { name: '12px', value: '2' },
        'normal': { name: '14px', value: '3' },
        'large': { name: '18px', value: '4' },
        'x-large': { name: '24px', value: '5' },
        'xx-large': { name: '32px', value: '6' },
        'xxx-large': { name: '48px', value: '7' }
      }
      // 配置颜色（文字颜色、背景色）,可以根据框架标准进行更改
      this.editor.config.colors = [
        '#303133',
        '#3760F4',
        '#F5F7FA',
        '#e5e7ed',
        '#000000',
        '#eeece0',
        '#1c487f',
        '#4d80bf'
      ]
      // 配置代码高亮
      this.editor.highlight = hljs
      // 配置 onchange 回调函数,用户操作导致内容变化之后会触发
      this.editor.config.onchange = function (html) {
        _this.$emit('update:value', html)
        _this.$emit('onchange', html)
      }
      // 配置触发 onchange 的时间频率，// 修改为 500ms
      this.editor.config.onchangeTimeout = 500
      // 配置 onSelectionChange 回调函数，用户鼠标选中或者ctrl+a全选会触发
      this.editor.config.onSelectionChange = function ({ text }) {
        _this.$emit('onSelectionChange', text)
      }
      // 失焦触发
      this.editor.config.onblur = function (html) {
        _this.$emit('onblur', html)
      }
      // 聚焦触发
      this.editor.config.onfocus = function (html) {
        _this.$emit('onfocus', html)
      }

      // 配置 server 接口地址
      this.editor.config.uploadImgServer = this.uploadUrl
      this.editor.create()
      this.hasInit = true
      this.$emit('initedEditor')
      // 初始化之后，设置编辑器显示的值
      if (this.value) {
        this.setEditorContent(this.value)
      }
    },
    // 设置编辑器是否只读
    setEditorReadonly (readonly) {
      if (readonly) {
        this.editor.disable()
      } else {
        this.editor.enable()
      }
    },
    // 设置编辑器内容
    setEditorContent (text) {
      this.editor.txt.html(text)
    },
    // 添加编辑器内容
    appendEditorContent (text) {
      this.editor.txt.append(text)
    },
    // 获取编辑器html(不包含样式)
    getEditorContent () {
      return this.editor.txt.html()
    },
    // 获取编辑器text
    getEditorText () {
      return this.editor.txt.text()
    },
    clearEditorContent () {
      this.editor.txt.clear()
    }
  }
}
</script>

<style lang="scss" scoped>
 ::v-deep font[size="2"] {
   font-size: 12px;
 }
 ::v-deep font[size="3"] {
   font-size: 14px;
 }
</style>
