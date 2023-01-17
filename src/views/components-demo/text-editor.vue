<template>
  <el-card class="my-card" shadow="never">
    <div slot="header" class="clearfix">
      <span>tinymce富文本编辑器</span>
    </div>
    <p>tinymce是一个功能十分全面的富文本编辑器，此组件是通过tinymce二次封装的组件，如果遇到需要使用富文本编辑器的场景，优先使用wangEditor组件，
      如果不能满足需求，则考虑tinymce富文本编辑器
    </p>
    <p>引入方式</p>
    <p><el-tag size="small" type="info">import Tinymce from '@/components/commom/tinymce'</el-tag></p>
    <p><el-tag size="small" type="info">components: {Tinymce}</el-tag></p>
    <p>卸载方式</p>
    <p>tinymce是使用cdn的方式引入，所以直接删除<el-tag size="small" type="info">@/components/commom/tinymce</el-tag>文件夹即可</p>
    <p>示例</p>
    <p>
      当一个页面出现多个编辑器的时候，需要保证他们的
      <el-tag size="small" type="info">id</el-tag>
      不一致，组件通过时间戳随机生成了一个id，也可以自行传值
    </p>
    <p>
      通过传递
      <el-tag size="small" type="info">value</el-tag>
      来设置编辑器显示的值，需要注意的是，此组件并不是响应式的， 所以只有在初始化的时候传值才会 有效果，其他情况下需要调用
      <el-tag size="small" type="info">setEditorContent</el-tag>
      方法，但是手动通过编辑器更改内容，会自动更新到value(需要使用
      <el-tag size="small" type="info">.sync</el-tag>
      修饰符）
    </p>
    <p>
      通过传递
      <el-tag size="small" type="info">readonly</el-tag>
      ，来设置编辑器是否只读（已经通过watch监听，可以直接传值），也可以自行调用
      <el-tag size="small" type="info">setEditorReadonly</el-tag>
      方法来设置
    </p>
    <div style="margin-bottom: 10px">
      <el-button size="small" type="primary" @click="setContent">设置编辑器值</el-button>
      <el-button size="small" type="primary" @click="getContent">获取编辑器html</el-button>
      <el-button size="small" type="primary" @click="getText">获取编辑器text</el-button>
      <el-button size="small" type="primary" @click="getSelectionContent">获取选中的编辑器text</el-button>
      <el-button size="small" type="primary" @click="clearContent">清空编辑器</el-button>
      <el-button size="small" type="primary" @click="setReadonly">是否只读</el-button>
    </div>
    <tinymce ref="tinymce" :value.sync="content" :readonly="readonly" />
    <p>示例代码</p>
    <code-mirror :read-only="true" :code-text="showCodeText" />
    <h2>组件传参</h2>
    <main-table
      :table-data="tableData1"
      :columns="columns1"
      :show-pagination="false"
      :show-search-box="false"
    />
    <h2>组件事件</h2>
    <main-table
      :table-data="tableData2"
      :columns="columns2"
      :show-pagination="false"
      :show-search-box="false"
    />
    <h2>组件函数</h2>
    <main-table
      :table-data="tableData3"
      :columns="columns3"
      :show-pagination="false"
      :show-search-box="false"
    />
  </el-card>
</template>

<script>
import Tinymce from '@/components/commom/tinymce'
import CodeMirror from '@/components/commom/code-mirror'
import MainTable from '@/components/commom/main-table'
export default {
  name: 'TextEditorDemo',
  components: {
    Tinymce,
    CodeMirror,
    MainTable
  },
  data () {
    return {
      content: "<p style='font-size: 12px'>欢迎使用tinymce编辑器</p>",
      readonly: false,
      showCodeText: '<div style="margin-bottom: 10px">\n' +
        '      <el-button size="small" type="primary" @click="setContent">设置编辑器值</el-button>\n' +
        '      <el-button size="small" type="primary" @click="getContent">获取编辑器html</el-button>\n' +
        '      <el-button size="small" type="primary" @click="getText">获取编辑器text</el-button>\n' +
        '      <el-button size="small" type="primary" @click="getSelectionContent">获取选中的编辑器text</el-button>\n' +
        '      <el-button size="small" type="primary" @click="clearContent">清空编辑器</el-button>\n' +
        '      <el-button size="small" type="primary" @click="setReadonly">是否只读</el-button>\n' +
        '</div>\n' +
        '<tinymce ref="tinymce" :value.sync="content" :readonly="readonly" />\n' +
        '\<script\>\n' +
        'import Tinymce from \'@/components/commom/tinymce\'\n' +
        'export default{\n' +
        '  components: {\n' +
        '    Tinymce,\n' +
        '  },\n' +
        '  data(){\n' +
        '    return{\n' +
        '      content: \'<p style=\'font-size: 12px\'>欢迎使用tinymce编辑器</p>\',\n ' +
        '      readonly: false,\n' +
        '    }\n' +
        ' }\n' +
        ' methods:{\n' +
        '    setContent () {\n' +
        '      this.$refs.tinymce.setEditorContent("<p style=\'font-size:12px\'>我设置了值</p>")\n' +
        '    },\n' +
        '    getContent () {\n' +
        '      this.$message.info(`当前值：${this.$refs.tinymce.getEditorContent()}`)\n' +
        '    },\n' +
        '    getText () {\n' +
        '      this.$message.info(`当前值：${this.$refs.tinymce.getEditorText()}`)\n' +
        '    },\n' +
        '    getSelectionContent () {\n' +
        '      this.$message.info(`当前选中值：${this.$refs.tinymce.getSelectionContent()}`)\n' +
        '    },\n' +
        '    clearContent () {\n' +
        '      this.$refs.tinymce.setEditorContent(\'\')\n' +
        '    },\n' +
        '    setReadonly () {\n' +
        '      this.readonly = !this.readonly\n' +
        '    }\n' +
        ' }\n' +
        '\<\/script>',
      columns1: [
        {
          label: '参数名称',
          prop: 'name',
          fixed: 'left'
        },
        {
          label: '参数类型',
          prop: 'type'
        },
        {
          label: '是否必填',
          prop: 'isRequired'
        },
        {
          label: '参数默认值',
          prop: 'defaultValue'
        },
        {
          label: '说明',
          prop: 'description',
          minWidth: 200
        }
      ],
      tableData1: [
        {
          name: 'id',
          type: 'String',
          isRequired: '否',
          defaultValue: '随机生成',
          description: '生成组件div的id'
        },
        {
          name: 'value',
          type: 'String',
          isRequired: '否',
          defaultValue: '',
          description: '编辑器的显示的值'
        },
        {
          name: 'readonly',
          type: 'boolean',
          isRequired: '否',
          defaultValue: 'false',
          description: '编辑器是否只读'
        },
        {
          name: 'menubar',
          type: 'String',
          isRequired: '否',
          defaultValue: 'file edit insert view format table',
          description: '编辑器的菜单'
        },
        {
          name: 'toolbar',
          type: 'Array',
          isRequired: '否',
          defaultValue: '见组件toolbar.js文件',
          description: '编辑器的toolbar内容'
        },
        {
          name: 'plugins',
          type: 'Array',
          isRequired: '否',
          defaultValue: '见组件plugins.js文件',
          description: '编辑器的plugins内容'
        },
        {
          name: 'height',
          type: 'Number',
          isRequired: '否',
          defaultValue: '300',
          description: '编辑器初始化时候的高度'
        },
        {
          name: 'uploadUrl',
          type: 'String',
          isRequired: '否',
          defaultValue: 'dev-api/spacex-web-admin/file/upload',
          description: '图片上传地址'
        }
      ],
      columns2: [
        {
          label: '事件名称',
          prop: 'name',
          fixed: 'left'
        },
        {
          label: '回调参数',
          prop: 'param'
        },
        {
          label: '说明',
          prop: 'description',
          minWidth: 200
        }
      ],
      tableData2: [
        {
          name: 'initedEditor',
          param: '',
          description: '编辑器初始化成功时候触发'
        },
        {
          name: 'onchange',
          param: 'value',
          description: '改变编辑器的值的时候触发，返回当前编辑器的值'
        },
        {
          name: 'onblur',
          param: 'value',
          description: '编辑器失焦的时候触发，返回当前编辑器的值'
        },
        {
          name: 'onfocus',
          param: 'value',
          description: '编辑器聚焦的时候触发，返回当前编辑器的值'
        }
      ],
      columns3: [
        {
          label: '函数名称',
          prop: 'name',
          fixed: 'left'
        },
        {
          label: '参数',
          prop: 'param'
        },
        {
          label: '参数类型',
          prop: 'type'
        },
        {
          label: '说明',
          prop: 'description',
          minWidth: 200
        }
      ],
      tableData3: [
        {
          name: 'setEditorContent',
          param: 'value',
          type: 'String',
          description: '设置编辑器的值'
        },
        {
          name: 'getEditorContent',
          param: '',
          type: '',
          description: '获取编辑器html'
        },
        {
          name: 'getEditorText',
          param: '',
          type: '',
          description: '获取编辑器text'
        },
        {
          name: 'setEditorReadonly',
          param: 'readonly',
          type: 'Boolean',
          description: '设置编辑器是否只读'
        },
        {
          name: 'getSelectionContent',
          param: '',
          type: '',
          description: '获取编辑器选中的值'
        },
        {
          name: 'clearEditorContent',
          param: '',
          type: '',
          description: '清空编辑器的值'
        },
        {
          name: 'getActivedEditor',
          param: '',
          type: '',
          description: '获取正在操作的编辑器（当出现多个编辑器的时候可能需要使用）'
        }
      ]
    }
  },
  component: {},
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    setContent () {
      this.$refs.tinymce.setEditorContent("<p style='font-size:12px'>我设置了值</p>")
    },
    getContent () {
      this.$message.info(`当前值：${this.$refs.tinymce.getEditorContent()}`)
    },
    getText () {
      this.$message.info(`当前值：${this.$refs.tinymce.getEditorText()}`)
    },
    getSelectionContent () {
      this.$message.info(`当前选中值：${this.$refs.tinymce.getSelectionContent()}`)
    },
    clearContent () {
      this.$refs.tinymce.clearEditorContent('')
    },
    setReadonly () {
      this.readonly = !this.readonly
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
