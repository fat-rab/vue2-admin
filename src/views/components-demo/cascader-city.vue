<template>
  <el-card class="my-card">
    <div slot="header">
      <span>省/市/区次联选择器</span>
    </div>
    <p>引入方式</p>
    <p><el-tag size="small" type="info">import CascaderCity from '@/components/commom/cascader-city'</el-tag></p>
    <p><el-tag size="small" type="info">components: {CascaderCity}</el-tag></p>
    <p>卸载方式</p>
    <p>删除<el-tag size="small" type="info">@/components/commom/cascader-city</el-tag>文件夹</p>
    <h2>单选</h2>
    <p>示例</p>
    <p>通过<el-tag size="small" type="info">cityArr</el-tag>属性设置组件绑定值</p>
    <p><el-tag size="small" type="info">multiple</el-tag>默认为<el-tag size="small" type="info">false</el-tag>,此时次联选择器为单选</p>
    <p>设置<el-tag size="small" type="info">clearable</el-tag>为<el-tag size="small" type="info">false</el-tag><el-tag size="small" type="info">此时次联选择器没有清空图标</el-tag></p>
    <p>设置<el-tag size="small" type="info">filterable</el-tag>为<el-tag size="small" type="info">false</el-tag><el-tag size="small" type="info">此时次联选择器无法过滤</el-tag></p>
    <div style="width: 300px">
      <cascader-city
        ref="cascaderCity"
        :city-arr.sync="cityArr1"
        :clearable="false"
        :filterable="false"
      />
    </div>
    <p>示例代码</p>
    <code-mirror :read-only="true" :code-text="showCodeText1" />
    <h2>多选</h2>
    <p>设置<el-tag size="small" type="info">multiple</el-tag>为<el-tag size="small" type="info">true</el-tag>,此时次联选择器为多选</p>
    <p>示例</p>
    <div style="width: 300px">
      <cascader-city ref="cascaderCity" :multiple="true" :city-arr.sync="cityArr2" />
    </div>
    <p>示例代码</p>
    <code-mirror ref="codemirror2" :read-only="true" :code-text="showCodeText2" />
    <h2>禁用状态</h2>
    <p>示例</p>
    <p>通过设置<el-tag size="small" type="info">disabled</el-tag>属性为<el-tag size="small" type="info">true</el-tag>，禁用组件</p>
    <div style="width: 300px">
      <cascader-city
        ref="cascaderCity"
        :city-arr.sync="cityArr1"
        :disabled="true"
      />
    </div>
    <p>示例代码</p>
    <code-mirror ref="codemirror2" :read-only="true" :code-text="showCodeText3" />
    <p>
      element-ui次联选择器:<a style="color: blue" target="_blank" href="https://element.eleme.cn/#/zh-CN/component/cascader">文档地址</a>
    </p>
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
import CascaderCity from '@/components/commom/cascader-city'
import CodeMirror from '@/components/commom/code-mirror'
import MainTable from '@/components/commom/main-table'
export default {
  name: 'CascaderCityDemo',
  components: {
    CascaderCity,
    CodeMirror,
    MainTable
  },
  data () {
    return {
      cityArr1: ['1', '1-1', '1-1-1'],
      cityArr2: [['1', '1-1', '1-1-1'], ['1', '1-2', '1-2-1']],
      showCodeText1: '<div style="width: 300px">\n' +
        '  <cascader-city\n' +
        '     ref="cascaderCity"\n' +
        '     :multiple="false"\n' +
        '     :city-arr.sync="cityArr1"\n' +
        '     :clearable="false"\n' +
        '     :filterable="false"\n' +
        '  />\n' +
        '</div>\n' +
        '\<script\>\n' +
        'export default{\n' +
        '  data(){\n' +
        '    return{\n' +
        '      cityArr1: [\'1\', \'1-1\', \'1-1-1\']\n' +
        '    }\n' +
        '  }\n' +
        '\<\/script>',
      showCodeText2: '<div style="width: 300px">\n' +
        '  <cascader-city ref="cascaderCity" :multiple="true" :city-arr.sync="cityArr2" />\n' +
        '</div>\n' +
        '\<script\>\n' +
        'export default{\n' +
        '  data(){\n' +
        '    return{\n' +
        '      cityArr1: [[\'1\', \'1-1\', \'1-1-1\'], [\'1\', \'1-2\', \'1-2-1\']]\n' +
        '    }\n' +
        '  }\n' +
        '\<\/script>',
      showCodeText3: '<div style="width: 300px">\n' +
        '  <cascader-city\n' +
        '     ref="cascaderCity"\n' +
        '     city-arr.sync="[]"\n' +
        '     :disabled="true"\n' +
        '  />\n' +
        '</div>',
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
          name: 'cityArr',
          type: 'array',
          isRequired: '是',
          defaultValue: '',
          description: '选中项的绑定值,单选为一维数组，多选为二维数组'
        },
        {
          name: 'multiple',
          type: 'boolean',
          isRequired: '否',
          defaultValue: 'false',
          description: '是否多选'
        },
        {
          name: 'clearable',
          type: 'boolean',
          isRequired: '否',
          defaultValue: 'true',
          description: '是否显示清空图标'
        },
        {
          name: 'filterable',
          type: 'boolean',
          isRequired: '否',
          defaultValue: 'true',
          description: '是否可以过滤'
        },
        {
          name: 'disabled',
          type: 'boolean',
          isRequired: '否',
          defaultValue: 'false',
          description: '是否禁用组件'
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
          name: 'changeCascader',
          param: 'value',
          description: '选择节点时候触发，返回当前选中项的value'
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
          name: 'showChooseArea',
          param: '',
          type: '',
          description: '由于深度监听数组存在性能问题，所以并没有监听选中项的绑定值，默认在组件mounted中会将传入的cityArr进行一次回显处理' +
            '如果出现了因为生命周期/懒加载等原因而导致的回显bug，可以使用此函数手动回显'
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
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>
