<template>
  <div class="code-box">
    <textarea :ref="name" />
  </div>
</template>
<script>
import * as CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/sql/sql' // 对应代码类型
import 'codemirror/addon/hint/sql-hint'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint'

export default {
  props: {
    tipObj: {
      type: Object,
      default: () => {
      }
    },
    readOnly: {
      type: [Boolean, String],
      default: () => false
    },
    codeText: {
      type: String,
      default: () => ''
    },
    mode: {
      type: String,
      default: () => 'text/x-mysql'
    },
    showTip: {
      type: Boolean,
      default: () => true
    },
    name: {
      type: String,
      default: function () {
        return 'code-mirror-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    }
  },
  data () {
    return {
      codeMirror: null,
      choosedCode: ''
    }
  },
  computed: {
    ignoreKeyArr () {
      return [
        '',
        '#',
        '!',
        '-',
        '=',
        '@',
        '$',
        '%',
        '&',
        '+',
        ';',
        '(',
        ')',
        '*',
        '`',
        '~',
        '·',
        '   ',
        ' ',
        ',',
        'Enter',
        'Backspace'
      ]
    },
    tipCodeKeyArr () {
      return [110, 190]
    }
  },
  mounted () {
    this.createCodeMirror()
  },
  beforeDestroy () {
    this.codeMirror.off('keyup')
    this.codeMirror.off('blur')
  },
  methods: {
    refreshCodeMirror () {
      this.codeMirror.refresh()
    },
    // 设置属性
    setOption (option, value) {
      this.codeMirror.setOption(option, value)
    },
    // 自定义提示字段
    setHintOptions () {
      this.codeMirror.setOption('hintOptions', {
        completeSingle: false,
        tables: this.tipObj
      })
    },
    setCodeValue (val) {
      this.codeMirror.setValue(val)
    },
    getCodeValue () {
      return this.codeMirror.getValue()
    },
    getChoosedCode () {
      return this.codeMirror.getSelection()
    },
    createCodeMirror () {
      this.codeMirror = CodeMirror.fromTextArea(this.$refs[this.name], {
        mode: this.mode,
        lineNumbers: true, // 显示行号
        line: true,
        readOnly: this.readOnly,
        hintOptions: {
          completeSingle: false, // 当匹配只有一项的时候是否自动补全
          tables: {}
        }
      })
      this.codeMirror.on('keyup', (cm, event) => {
        if (!this.showTip) return
        if (this.readOnly) return
        if (
          (event.keyCode >= 65 && event.keyCode <= 90) ||
          this.tipCodeKeyArr.includes(event.keyCode)
        ) {
          cm.showHint()
        }
      })
      // 聚焦时触发
      this.codeMirror.on('focus', () => {
        this.$emit('focusCodeMirror', this.codeMirror.getValue())
      })
      // 失焦时触发
      this.codeMirror.on('blur', () => {
        this.$emit('blurCodeMirror', this.codeMirror.getValue())
      })
      if (this.codeText) {
        this.setCodeValue(this.codeText)
      }
    }
  }
}
</script>

<style lang="scss">
.CodeMirror-hints {
  z-index: 9999;
}
</style>

<style lang="scss" scoped>
.code-box {
  height: 200px;

  ::v-deep.CodeMirror {
    height: 100%;
    border: 1px solid #eee;
    font-size: 14px;
    line-height: 20px;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Arial, sans-serif;
  }

  ::v-deep.CodeMirror-scroll {
    height: 100%;
    overflow-y: hidden;
    overflow-x: auto;
  }
}
</style>
