<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container" style="width:100%">
    <textarea :id="tinymceId" class="tinymce-textarea" />
  </div>
</template>

<script>
/**
 * docs:
 * http://tinymce.ax-z.cn/
 * https://github.com/tinymce/tinymce
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
import plugins from './plugins'
import toolbar from './toolbar'
import load from './dynamic-load-script'

// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.5/tinymce.min.js'

export default {
  name: 'Tinymce',
  props: {
    id: {
      type: String,
      default: function () {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    toolbar: {
      type: Array,
      default () {
        return []
      }
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table' // menubar 默认加载功能
    },
    plugins: {
      type: Array,
      default () {
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
    }
  },
  data () {
    return {
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false
    }
  },
  computed: {
    editor () {
      return window.tinymce.get(this.tinymceId)
    }
  },
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
    this.init()
  },
  activated () {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated () {
    this.destroyTinymce()
  },
  destroyed () {
    this.destroyTinymce()
  },
  methods: {
    init () {
      // 从cdn 动态加载 tinymce
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message)
          return
        }
        this.initTinymce()
      })
    },
    initTinymce () {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: 'zh_CN',
        height: this.height,
        body_class: 'panel-body ',
        readonly: this.readonly,
        object_resizing: false, // 是否开启调整图像/表格大小调整功能
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: this.plugins.length > 0 ? this.plugins : plugins,
        fontsize_formats: '10px 12px 14px 18px 24px 32px 48px',
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square', // 无序号列表样式
        advlist_number_styles: 'default', // 有序列表样式
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        // images_upload_url: 'dev-api/spacex-web-admin/file/upload', // 上传文件地址
        // images_upload_base_path: '/demo', // 指定文件的基本路径,
        // images_upload_credentials: true,
        images_upload_handler: function (blobInfo, succFun, failFun) { // 使用自定义函数处理图片上传
          const file = blobInfo.blob()// 转化为易于理解的file对象
          const xhr = new XMLHttpRequest()
          xhr.withCredentials = false
          xhr.open('POST', this.uploadUrl)
          xhr.onload = function () {
            if (xhr.status !== 200) {
              failFun('HTTP Error: ' + xhr.status)
              return
            }
            const json = JSON.parse(xhr.responseText)
            if (!json || typeof json.data.location !== 'string') {
              failFun('Invalid JSON: ' + xhr.responseText)
              return
            }
            succFun(json.data.location)
          }
          const formData = new FormData()
          formData.append('file', file, file.name)
          xhr.send(formData)
        },
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => { // 初始化的时候触发
          if (_this.value) {
            editor.setContent(_this.value)
          }
          window.tinymce.execCommand('fontSize', true, '12px') // 根据框架标准设置默认字体大小
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            _this.$emit('update:value', editor.getContent())
            _this.$emit('onchange', editor.getContent())
          })
          _this.$emit('initedEditor')
        },
        setup (editor) {
          editor.on('blur', () => {
            _this.$emit('onblur', editor.getContent())
          })
          editor.on('focus', () => {
            _this.$emit('onfocus', editor.getContent())
          })
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        },
        // 保证url的完整性
        // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
        // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
        convert_urls: false
      })
    },
    // 销毁编辑器
    destroyTinymce () {
      if (this.fullscreen) {
        this.editor.execCommand('mceFullScreen')
      }

      if (this.editor) {
        this.editor.destroy()
      }
    },
    // 设置编辑器显示的值
    setEditorContent (text) {
      this.editor.setContent(text)
    },
    // 获取编辑器的值
    getEditorContent () {
      return this.editor.getContent()
    },
    // 获取编辑器text
    getEditorText () {
      return this.editor.getContent({ format: 'text' })
    },
    // 设置编辑器是否只读
    setEditorReadonly (readonly) {
      const mode = readonly ? 'readonly' : 'design'
      this.editor.setMode(mode)
    },
    // 获取选中的内容
    getSelectionContent () {
      return this.editor.selection.getContent({ format: 'text' })
    },
    // tinymce似乎并没有清空内容的方法，所以使用设置内容的方法
    clearEditorContent () {
      this.editor.setContent('')
    },
    // 获取正在进行操作的编辑器实例
    getActivedEditor () {
      return window.tinymce.activeEditor()
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

.mce-text {
  font-size: 12px !important
}

.mce-container {
  .mce-reset * {
    font-size: 12px !important;
  }

  .mce-reset {
    .mce-btn {
      border-radius: 4px !important;
    }

    .mce-primary {
      background-color: $mainColor !important;
    }

    button {
      //padding: 8px 12px !important;
    }
  }
}

</style>
<style lang="scss" scoped>

.tinymce-container {
  position: relative;
  line-height: normal;

  ::v-deep .mce-txt {
    font-size: 12px
  }

}

.tinymce-container {
  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
</style>
