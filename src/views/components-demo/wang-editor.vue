<template>
  <div>
    <el-card class="my-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>WangEditor富文本编辑器</span>
      </div>
      <p>WangEditor是一个轻量级的富文本编辑器，此组件是通过wangEditor二次封装的组件，如果遇到需要使用富文本编辑器的场景，优先使用此组件，
        如果不能满足需求，则考虑tinymce富文本编辑器
      </p>
      <p>引入方式</p>
      <p><el-tag size="small" type="info">import WangEditor from '@/components/commom/wang-editor'</el-tag></p>
      <p><el-tag size="small" type="info">components: {WangEditor}</el-tag></p>
      <p>卸载方式</p>
      <p><el-tag size="small" type="info">npm uninstall wangeditor</el-tag></p>
      <p>删除<el-tag size="small" type="info">@/components/commom/wang-editor</el-tag>文件夹</p>
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
      <p>需要注意的是，wangEditor获取编辑器选中的text是通过
        <el-tag size="small" type="info">onSelectionChange</el-tag>事件获取，wangEditor并没有获取选中text的方法，
        所以通过事件获取然后赋值给变量并且使用之后要记得将变量置空
      </p>
      <div style="margin-bottom: 10px">
        <el-button size="small" type="primary" @click="setContent">设置编辑器值</el-button>
        <el-button size="small" type="primary" @click="appendContent">添加编辑器值</el-button>
        <el-button size="small" type="primary" @click="getContent">获取编辑器html</el-button>
        <el-button size="small" type="primary" @click="getText">获取编辑器text</el-button>
        <el-button size="small" type="primary" @click="getSelectionContent">获取编辑器选中的text</el-button>
        <el-button size="small" type="primary" @click="clearContent">清空编辑器</el-button>
        <el-button size="small" type="primary" @click="setReadonly">是否只读</el-button>
      </div>
      <wang-editor ref="wangEditor" :value.sync="content" :readonly="readonly" @onSelectionChange="changeSelection" />
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
  </div>
</template>
<script>
import WangEditor from '@/components/commom/wang-editor'
import CodeMirror from '@/components/commom/code-mirror'
import MainTable from '@/components/commom/main-table'
export default {
  name: 'WangEditorDemo',
  components: {
    WangEditor,
    CodeMirror,
    MainTable
  },
  data () {
    return {
      content: '<p>欢迎使用wangEditor编辑器</p>',
      readonly: false,
      selectionValue: '',
      showCodeText: '<div style="margin-bottom: 10px">\n' +
        '      <el-button size="small" type="primary" @click="setContent">设置编辑器值</el-button>\n' +
        '      <el-button size="small" type="primary" @click="appendContent">添加编辑器值</el-button>\n' +
        '      <el-button size="small" type="primary" @click="getContent">获取编辑器html</el-button>\n' +
        '      <el-button size="small" type="primary" @click="getText">获取编辑器text</el-button>\n' +
        '      <el-button size="small" type="primary" @click="getSelectionContent">获取编辑器选中的text</el-button>\n' +
        '      <el-button size="small" type="primary" @click="clearContent">清空编辑器</el-button>\n' +
        '      <el-button size="small" type="primary" @click="setReadonly">是否只读</el-button>\n' +
        '</div>\n' +
        '<wang-editor ref="wangEditor" :value.sync="content" :readonly="readonly" @onSelectionChange="changeSelection" />\n' +
        '\<script\>\n' +
        'import WangEditor from \'@/components/commom/wang-editor\'\n' +
        'export default{\n' +
        '  components: {\n' +
        '    WangEditor,\n' +
        '  },\n' +
        '  data(){\n' +
        '    return{\n' +
        '      content: \'<p>欢迎使用wangEditor编辑器</p>\',\n ' +
        '      readonly: false,\n' +
        '      selectionValue: \'\',' +
        '    }\n' +
        ' }\n' +
        ' methods:{\n' +
        '    changeSelection (text) {\n' +
        '      this.selectionValue = text\n' +
        '    },' +
        '    setContent () {\n' +
        '      this.$refs.tinymce.setEditorContent("<p style=\'font-size:12px\'>我设置了值</p>")\n' +
        '    },\n' +
        '    appendContent () {\n' +
        '      this.$refs.wangEditor.appendEditorContent(\'我添加了值\')\n' +
        '    },' +
        '    getContent () {\n' +
        '      this.$message.info(`当前值：${this.$refs.tinymce.getEditorContent()}`)\n' +
        '    },\n' +
        '    getText () {\n' +
        '      this.$message.info(`当前值：${this.$refs.tinymce.getEditorText()}`)\n' +
        '    },\n' +
        '    getSelectionContent () {\n' +
        '      this.$message.info(`当前选中值：${this.selectionValue}`)\n' +
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
          name: 'menus',
          type: 'Array',
          isRequired: '否',
          defaultValue: '[ ]',
          description: '编辑器的工具栏,默认加载全部，如果传值则加载需要加载的工具，不要和excludeMenus同时传值'
        },
        {
          name: 'excludeMenus',
          type: 'Array',
          isRequired: '否',
          defaultValue: '[ ]',
          description: '需要剔除的编辑器的工具栏,默认不剔除，如果只需要剔除几个可以使用这个参数，不要和menus同时传值'
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
        },
        {
          name: 'onSelectionChange',
          param: 'value',
          description: '鼠标选中或者ctrl+A选中的时候触发，返回选中的值'
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
          name: 'appendEditorContent',
          param: 'value',
          type: 'String',
          description: '在编辑器末尾添加值'
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
          name: 'clearEditorContent',
          param: '',
          type: '',
          description: '清空编辑器的值'
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
    changeSelection (text) {
      this.selectionValue = text
    },
    setContent () {
      this.$refs.wangEditor.setEditorContent('我设置了值')
    },
    appendContent () {
      this.$refs.wangEditor.appendEditorContent('我添加了值')
    },
    getContent () {
      this.$message.info(`当前值：${this.$refs.wangEditor.getEditorContent()}`)
    },
    getText () {
      this.$message.info(`当前值：${this.$refs.wangEditor.getEditorText()}`)
    },
    getSelectionContent () {
      this.$message.info(`当前选中值：${this.selectionValue}`)
    },
    clearContent () {
      this.$refs.wangEditor.clearEditorContent('')
    },
    setReadonly () {
      this.readonly = !this.readonly
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
