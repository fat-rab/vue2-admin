<template>
  <el-card class="my-card">
    <div slot="header" class="clearfix">
      <span>基于codemirror二次封装的代码编辑器</span>
    </div>
    <div>
      <p>引入方式</p>
      <p><el-tag size="small" type="info">import CodeMirror from '@/components/commom/code-mirror'</el-tag></p>
      <p><el-tag size="small" type="info">components: {CodeMirror}</el-tag></p>
      <p>卸载方式</p>
      <p>使用<el-tag size="small" type="info">npm uninstall codemirror</el-tag>卸载依赖包</p>
      <p>删除<el-tag size="small" type="info">@/components/commom/code-mirror</el-tag>文件夹</p>
      <h3>点击按钮，即可改变对应的属性或者调用对应的方法，可以尝试在点击前后可以通过在示例的编辑器中输入代码，查看对应效果</h3>
      <h2>编辑器显示值相关的属性和方法</h2>
      <p>通过设置
        <el-tag size="small" type="info">codeText</el-tag>
        属性即可设置初始化时编辑器显示的值
      </p>
      <p>通过调用
        <el-tag size="small" type="info">setCodeValue</el-tag>
        方法，也可以设置编辑器显示的值，但是通过这个方法设置的值，并不会赋值给
        <el-tag size="small" type="info">codeText</el-tag>
        ,
        这一点需要注意
      </p>
      <p>通过调用组件的
        <el-tag size="small" type="info">getCodeValue</el-tag>
        方法，可以获取当前编辑器的内容
      </p>
      <p>通过调用组件的
        <el-tag size="small" type="info">getChoosedCode</el-tag>
        方法，可以获取鼠标选中的编辑器中的内容
      </p>
      <el-button size="small" type="primary" @click="setCodeValue">setCodeValue</el-button>
      <el-button size="small" type="primary" @click="getCodeValue">getCodeValue</el-button>
      <el-button size="small" type="primary" @click="getChoosedCode">getChoosedCode</el-button>
      <p>示例</p>
      <code-mirror
        ref="codeMirror1"
        name="codeMirror1"
        :code-text="codeText1"
      />
      <p>示例代码</p>
      <code-mirror
        ref="showCode1"
        name="showCode1"
        read-only="nocursor"
        :code-text="showCodeText1"
      />
      <h2>是否只读</h2>
      <p>初始化时设置
        <el-tag size="small" type="info">readOnly</el-tag>
        属性或者后续调用组件
        <el-tag size="small" type="info">setOption</el-tag>
        方法，传入需要改变的属性和对应的值改变组件是否只读的状态
      </p>
      <p>
        如果设置
        <el-tag size="small" type="info">readOnly</el-tag>
        为
        <el-tag size="small" type="info">nocursor</el-tag>
        ,除了只读状态，点击编辑器的时候不会显示光标
      </p>
      <el-button size="small" type="primary" @click="setReadonlyOption(true)">readOnly:true</el-button>
      <el-button size="small" type="primary" @click="setReadonlyOption(false)">readOnly:false</el-button>
      <el-button size="small" type="primary" @click="setReadonlyOption('nocursor')">readOnly:nocursor</el-button>
      <p>示例</p>
      <code-mirror
        ref="codeMirror"
        :read-only="readOnly"
        :code-text="codeText"
      />
      <p>示例代码</p>
      <code-mirror
        ref="showCode"
        read-only="nocursor"
        name="showCode"
        :code-text="readOnlyText"
      />
      <h2>编辑器支持的代码类型</h2>
      <p>初始化时，通过设置
        <el-tag size="small" type="info">mode</el-tag>
        属性为
        <el-tag size="small" type="info">text/x-mysql</el-tag>
        （默认也是text/x-mysql，可以不传）
        ，设置编辑器支持的代码类型,此时在编辑器中输入代码，支持MYSQL的代码，
      </p>
      <p>点击按钮，通过调用
        <el-tag size="small" type="info">setOption</el-tag>
        方法，改变编辑器支持的代码类型
      </p>
      <p>改变编辑器支持的代码类型之后，可以尝试输入对应类型的代码，查看区别</p>
      <el-button size="small" type="primary" @click="changeCodeMode">
        mode:{{ mode }}
      </el-button>
      <p>示例</p>
      <code-mirror
        ref="codeMirror2"
        name="codeMirror2"
        :mode="mode"
        :code-text="codeText"
      />
      <p>示例代码</p>
      <code-mirror
        ref="showCode2"
        name="showCode2"
        read-only="nocursor"
        :code-text="showCodeText2"
      />
      <h2>输入代码时是否显示提示</h2>
      <p>通过设置
        <el-tag size="small" type="info">showTip</el-tag>
        属性为
        <el-tag size="small" type="info">true/false</el-tag>
        (默认true)，即可设置编辑器是否在输入代码时候是否显示提示，
        此属性不需要通过
        <el-tag size="small" type="info">setOption</el-tag>
        方法改变
      </p>
      <el-button size="small" type="primary" @click="showTip=!showTip">showTip:{{ showTip }}
      </el-button>
      <p>示例</p>
      <code-mirror
        ref="codeMirror3"
        name="codeMirror3"
        :show-tip="showTip"
        :code-text="codeText"
      />
      <p>示例代码</p>
      <code-mirror
        ref="showCode3"
        name="showCode3"
        read-only="nocursor"
        :code-text="showCodeText3"
      />
      <h2>自定义提示</h2>
      <p>有时候需要对表/列或者对象/属性进行自定义提示的时候，可以传入
        <el-tag size="small" type="info">tipObj</el-tag>
        属性并且调用
        <el-tag size="small" type="info">setHintOption</el-tag>
        ，
        设置自定义提示（只支持两个层级），本质上也是通过
        <el-tag size="small" type="info">setOption</el-tag>
        只不过对其进行了简单的封装
      </p>
      <p>可以自行尝试在设置自定义提示前后输入
        <el-tag size="small" type="info">points</el-tag>
        或者
        <el-tag size="small" type="info">attributes</el-tag>
        进行尝试
      </p>
      <el-button style="margin-top: 10px" size="small" type="primary" @click="setHintOption">setHintOption</el-button>
      <p>示例</p>
      <code-mirror
        ref="codeMirror4"
        name="codeMirror4"
        :tip-obj="tipObj"
        :code-text="codeText4"
      />
      <p>示例代码</p>
      <code-mirror
        ref="showCode4"
        name="showCode4"
        read-only="nocursor"
        :code-text="showCodeText4"
      />
      <div style="margin-top: 10px">
        <a target="_blank" href="https://codemirror.net/" class="title" style="color: blue;">codemirror文档地址</a>
        <p>仅对常用功能进行了封装，如果此组件不满足业务需求，可以自行对其改进</p>
        <p style="color: #ed5858">注：此组件并不是响应式组件，如果在编辑器中编辑代码，并不会同步到codeText参数中，
          如果初始化之后需要改变属性等，需要调用方法来实现
        </p>
      </div>
      <h2>组件传参</h2>
      <main-table :table-data="tableData" :columns="columns" :show-pagination="false" :show-search-box="false" />
      <h2>组件事件</h2>
      <main-table :table-data="tableData1" :columns="columns1" :show-pagination="false" :show-search-box="false" />
      <h2>组件函数</h2>
      <main-table :table-data="tableData2" :columns="columns2" :show-pagination="false" :show-search-box="false" />
    </div>

  </el-card>
</template>

<script>
import CodeMirror from '@/components/commom/code-mirror'
import MainTable from '@/components/commom/main-table'

export default {
  name: 'CodeMirrorDemo',
  components: {
    CodeMirror,
    MainTable
  },
  data () {
    return {
      codeText: 'SELECT vendor_id FROM instance WHERE vendor_id= 565234;\n' +
        'SELECT version FROM instance;\n' +
        'SELECT client_id FROM instance;',
      readOnlyText: '<el-button size="small" type="primary" @click="setReadonlyOption(true)">readOnly:true</el-button>\n' +
        '<el-button size="small" type="primary" @click="setReadonlyOption(false)">readOnly:false</el-button>\n' +
        '<el-button size="small" type="primary" @click="setReadonlyOption(\'nocursor\')">readOnly:nocursor</el-button>' +
        '<code-mirror\n' +
        '  ref="codeMirror"\n' +
        '  :read-only="readOnly"\n' +
        '/>\n' +
        '\<script\>\n' +
        'export default{\n' +
        '  data(){\n' +
        '    return{\n' +
        '      readOnly: false\n' +
        '    }\n' +
        '  },\n' +
        '  methods:{\n' +
        '    setReadonlyOption (value) {\n' +
        '      this.readOnly = value\n' +
        '      this.$refs.codeMirror.setOption(\'readOnly\', this.readOnly)' +
        '    }\n' +
        '  }\n' +
        '}\n' +
        '\<\/script\>',
      readOnly: false,
      codeText1: 'SELECT vendor_id FROM instance;\n' +
        'SELECT version FROM instance;\n' +
        'SELECT client_id FROM instance;',
      showCodeText1:
        '<el-button style="margin-top: 10px" size="small" type="primary" @click="setCodeValue">setCodeValue</el-button>\n' +
        '<el-button style="margin-top: 10px" size="small" type="primary" @click="getCodeValue">getCodeValue</el-button>\n' +
        '<el-button style="margin-top: 10px" size="small" type="primary" @click="getChoosedCode">getChoosedCode</el-button>\n' +
        '<code-mirror\n' +
        '   ref="codeMirror1"\n' +
        '   name="codeMirror1"\n' +
        '   :code-text="codeText1"\n' +
        '/>\n' +
        '\<script\>\n' +
        'export default{\n' +
        '  data(){\n' +
        '    return{\n' +
        '      readOnly: false\n' +
        '    }\n' +
        '  },\n' +
        '  methods:{\n' +
        '    setCodeValue () {\n' +
        '      const str = \'SELECT vendor_id FROM instance WHERE vendor_id= 1;\\n\' +\n' +
        '        \'SELECT version FROM instance WHERE version= 2;\\n\' +\n' +
        '        \'SELECT client_id FROM instance WHERE vendor_id= 3;\'\n' +
        '      this.$refs.codeMirror1.setCodeValue(str)\n' +
        '      this.codeText1 = str\n' +
        '    },\n' +
        '    getCodeValue () {\n' +
        '      const value = this.$refs.codeMirror1.getCodeValue()\n' +
        '      this.$message.info(`代码为:${value}`)\n' +
        '    },\n' +
        '    getChoosedCode (val) {\n' +
        '      const value = this.$refs.codeMirror1.getChoosedCode()\n' +
        '      if (val) {\n' +
        '        this.$message.info(`选中代码为:${value}`)\n' +
        '      } else {\n' +
        '          this.$message.warning(`请先选择代码`)\n' +
        '        }\n' +
        '    }\n' +
        '  }\n' +
        '}\n' +
        '\<\/script>',
      mode: 'text/x-mysql',
      showCodeText2: '<el-button style="margin-top: 10px" size="small" type="primary" @click="changeCodeMode">mode:{{ mode }}</el-button>\n' +
        '<code-mirror\n' +
        '   ref="codeMirror2"\n' +
        '   name="codeMirror2"\n' +
        '   :mode="mode"\n' +
        '/>\n' +
        '\<script\>\n' +
        'export default{\n' +
        '  data(){\n' +
        '    return{\n' +
        '      readOnly: false\n' +
        '    }\n' +
        '  },\n' +
        '  methods:{\n' +
        '    changeCodeMode () {\n' +
        '      this.mode = this.mode === \'text/x-mysql\' ? \'javascript\' : \'text/x-mysql\'\n' +
        '      this.$refs.codeMirror2.setOption(\'mode\', this.mode)\n' +
        '    }\n' +
        '  }\n' +
        '}\n' +
        '\<\/script>',
      showTip: true,
      showCodeText3: '<el-button style="margin-top: 10px" size="small" type="primary" @click="showTip=!showTip">showTip:{{ showTip }}\n' +
        '</el-button>\n' +
        '<code-mirror\n' +
        '   ref="codeMirror3"\n' +
        '   name="codeMirror3"\n' +
        '   :show-tip="showTip"\n' +
        '/>',
      codeText4: 'SELECT vendor_id FROM points.point_a1;\n' +
        'SELECT version FROM points.point_a2;\n' +
        'SELECT client_id FROM points.point_a3;',
      tipObj: {
        'points': [
          'point_a1',
          'point_a2',
          'point_a3'
        ],
        'attributes': [
          'attribute_a1',
          'attribute_a2',
          'attribute_a3'
        ]
      },
      showCodeText4: '<el-button style="margin-top: 10px" size="small" type="primary" @click="setHintOption">setHintOption</el-button>\n' +
        '<p>示例</p>\n' +
        '<code-mirror\n' +
        '   ref="codeMirror4"\n' +
        '   name="codeMirror4"\n' +
        '   :tip-obj="tipObj"\n' +
        '/>\n' +
        '\<script\>\n' +
        'export default{\n' +
        '  data(){\n' +
        '    return{\n' +
        '      tipObj: {\n' +
        '         \'points\': [\n' +
        '           \'point_a1\',\n' +
        '           \'point_a2\',\n' +
        '           \'point_a3\'\n' +
        '          ],\n' +
        '          \'attributes\': [\n' +
        '            \'attribute_a1\',\n' +
        '            \'attribute_a2\',\n' +
        '            \'attribute_a3\'\n' +
        '          ]\n' +
        '     }\n' +
        '    }\n' +
        '  },\n' +
        '  methods:{\n' +
        '    setHintOption () {\n' +
        '       this.$refs.codeMirror4.setHintOptions()\n' +
        '    }\n' +
        '  }\n' +
        '}\n' +
        '\<\/script>',
      columns: [
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
      tableData: [
        {
          name: 'mode',
          type: 'string',
          isRequired: '否',
          defaultValue: 'text/x-mysql',
          description: '编辑器初始化时的支持的代码类型，如果设置为其他值，需要在组件中引入对应的依赖包(代码包和提示包)'
        },
        {
          name: 'codeText',
          type: 'string',
          isRequired: '否',
          defaultValue: '',
          description: '编辑器初始化时显示的代码'
        },
        {
          name: 'readonly',
          type: 'Boolean',
          isRequired: '否',
          defaultValue: 'false',
          description: '编辑器初始化时是否是只读状态'
        },
        {
          name: 'name',
          type: 'String',
          isRequired: '否',
          defaultValue: 'codeMirror',
          description: '编辑器的ref，默认通过时间戳随机生成，如果在一个页面需要使用多个编辑器的时候，也可以自行设置此参数'
        },
        {
          name: 'showTip',
          type: 'Boolean',
          isRequired: '否',
          defaultValue: 'true',
          description: '编辑器是否显示代码提示'
        },
        {
          name: 'tipObj',
          type: 'Object',
          isRequired: '否',
          defaultValue: '{}',
          description: '编辑器自定义提示代码'
        }
      ],
      columns1: [
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
      tableData1: [
        {
          name: 'focusCodeMirror',
          param: 'value',
          description: '编辑器聚焦的时候触发，返回当前编辑器的值'
        },
        {
          name: 'blurCodeMirror',
          param: 'value',
          description: '编辑器失焦的时候触发，返回当前编辑器的值'
        }
      ],
      columns2: [
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
      tableData2: [
        {
          name: 'setCodeValue',
          param: 'val',
          type: 'String',
          description: '设置编辑器的显示的代码,如果通过此方法改变编辑器显示的值，请注意，此时codeText的值并没有跟着改变'
        },
        {
          name: 'getCodeValue',
          param: 'val',
          type: 'String',
          description: '获取编辑器显示的代码'
        },
        {
          name: 'getChoosedCode',
          param: 'val',
          type: 'String',
          description: '获取鼠标选中的编辑器显示的代码'
        },
        {
          name: 'setHintOptions',
          param: 'tipObj',
          type: 'Object',
          description: '设置编辑器的自定义提示（sql语句的表列/js对象属性联动等等）,只支持两层结构，'
        },
        {
          name: 'refreshCodeMirror',
          param: '',
          type: '',
          description: '刷新编辑器，当给编辑器设置属性或者进行其他操作时，如果编辑器没有出现想要的效果，可能需要在setTimeout中调用此函数'
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
    setCodeValue () {
      const str = 'SELECT vendor_id FROM instance WHERE vendor_id= 1;\n' +
        'SELECT version FROM instance WHERE version= 2;\n' +
        'SELECT client_id FROM instance WHERE vendor_id= 3;'
      this.$refs.codeMirror1.setCodeValue(str)
      this.codeText1 = str
    },
    getCodeValue () {
      const value = this.$refs.codeMirror1.getCodeValue()
      this.$message.info(`代码为:${value}`)
    },
    getChoosedCode () {
      const value = this.$refs.codeMirror1.getChoosedCode()
      if (value) {
        this.$message.info(`选中代码为:${value}`)
      } else {
        this.$message.warning(`请先选择代码`)
      }
    },
    changeCodeMode () {
      this.mode = this.mode === 'text/x-mysql' ? 'javascript' : 'text/x-mysql'
      this.$refs.codeMirror2.setOption('mode', this.mode)
    },
    setReadonlyOption (value) {
      this.readOnly = value
      this.$refs.codeMirror.setOption('readOnly', this.readOnly)
    },
    setHintOption () {
      this.$refs.codeMirror4.setHintOptions()
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
