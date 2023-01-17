<template>
  <el-card class="my-card" shadow="never">
    <div slot="header" class="clearfix">
      <span>远程查询</span>
    </div>
    <p>引入方式</p>
    <p><el-tag size="small" type="info">import RemoteSelect from '@/components/commom/remote-select'</el-tag></p>
    <p><el-tag size="small" type="info">components: {RemoteSelect}</el-tag></p>
    <p>卸载方式</p>
    <p>删除<el-tag size="small" type="info">@/components/commom/remote-select</el-tag>文件夹</p>
    <h2>单选，插槽</h2>
    <p>示例</p>
    <p>默认初始状态下展示十条数据，点击下拉框最下方的展示更多，加载二十条，以此类推。也可以通过输入更精确的搜索条件提高搜索精度</p>
    <p>
      默认select为单选，
      通过传递
      <el-tag size="small" type="info">value</el-tag>
      ，用来绑定选中项，也可以用作回显，
      通过传递
      <el-tag size="small" type="info">api</el-tag>
      ，设置回去数据的接口函数来获取数据，
      通过传递
      <el-tag size="small" type="info">props</el-tag>
      属性，设置获取返回数据的字段(默认data)，
      select中的label(默认label)和value(默认label)的取值,查询时候的关键字key（默认key）
      插槽
      <el-tag size="small" type="info">emptySlot</el-tag>
      ，用来自定义没有数据时候的显示
    </p>
    <div style="width: 300px">
      <remote-select :api="getSelectList" :props="propsObj" :value.sync="chooseDate1">
        <template slot="emptySlot">
          <div class="no-data">暂时没有数据</div>
        </template>
      </remote-select>
    </div>
    <p>示例代码</p>
    <code-mirror :read-only="true" :code-text="showCodeText1" />
    <h2>多选，回显</h2>
    <p>示例</p>
    <p>
      通过设置
      <el-tag size="small" type="info">multiple</el-tag>
      为
      <el-tag size="small" type="info">true</el-tag>
      ，此时为多选，
    </p>
    <p>通过 <el-tag size="small" type="info">params</el-tag>属性，传递已经选择的数据的id，来进行回显</p>
    <div style="width: 300px">
      <remote-select
        :api="getSelectList"
        :props="propsObj"
        :value.sync="chooseDate2"
        :multiple="true"
        :params="paramsObj"
      />
    </div>
    <p>示例代码</p>
    <code-mirror ref="codeMirror2" :read-only="true" :code-text="showCodeText2" />
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
import RemoteSelect from '@/components/commom/remote-select'
import CodeMirror from '@/components/commom/code-mirror'
import MainTable from '@/components/commom/main-table'
import { getSelectList } from '@/api/components'

export default {
  name: 'RemoteSelectDemo',
  components: {
    RemoteSelect,
    CodeMirror,
    MainTable
  },
  data () {
    return {
      chooseDate1: '',
      propsObj: {
        data: 'data',
        label: 'label',
        value: 'value',
        key: 'key'
      },
      chooseDate2: ['11', '21'],
      paramsObj: {
        id: '11,21'
      },
      showCodeText1: '<div style="width: 300px">\n' +
        '  <remote-select :api="getSelectList" :props="propsObj" :value="chooseDate1">\n' +
        '     <template slot="emptySlot">\n' +
        '         <div class="no-data">暂时没有数据</div>\n' +
        '     </template>\n' +
        '  </remote-select>\n' +
        '</div>' +
        '\<script\>\n' +
        'import RemoteSelect from \'@/components/commom/remote-select\'\n' +
        'export default{\n' +
        '  components: {\n' +
        '    RemoteSelect,\n' +
        '  },\n' +
        '  data(){\n' +
        '    return{\n' +
        '      chooseDate1: \'\',\n ' +
        '      paramsObj: {\n' +
        '        id: \'11,21\'\n' +
        '      },' +
        '      propsObj: {\n' +
        '        data: \'data\',\n' +
        '        label: \'label\',\n' +
        '        value: \'value\',\n' +
        '        key: \'key\'\n' +
        '     }\n' +
        '    }\n' +
        ' }\n' +
        '\<\/script>',
      showCodeText2: '<div style="width: 300px">\n' +
        '  <remote-select :api="getSelectList" :props="propsObj" :value="chooseDate1" :multiple="true" :params="paramsObj">\n' +
        '  </remote-select>\n' +
        '</div>' +
        '\<script\>\n' +
        'import RemoteSelect from \'@/components/commom/remote-select\'\n' +
        'export default{\n' +
        '  components: {\n' +
        '    RemoteSelect,\n' +
        '  },\n' +
        '  data(){\n' +
        '    return{\n' +
        '      chooseDate2: [\'11\', \'21\'],\n' +
        '      propsObj: {\n' +
        '        data: \'data\',\n' +
        '        label: \'label\',\n' +
        '        value: \'value\',\n' +
        '        key: \'key\'\n' +
        '     }\n' +
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
          name: 'api',
          type: 'Function',
          isRequired: '是',
          defaultValue: '',
          description: '获取下拉数据的请求函数'
        },
        {
          name: 'value',
          type: 'Array, String',
          isRequired: '是',
          defaultValue: '',
          description: '选中数据的绑定值'
        },
        {
          name: 'clearable',
          type: 'boolean',
          isRequired: '否',
          defaultValue: 'true',
          description: '是否显示清空图标'
        },
        {
          name: 'disabled',
          type: 'boolean',
          isRequired: '否',
          defaultValue: 'false',
          description: '是否禁用组件'
        },
        {
          name: 'params',
          type: 'Object',
          isRequired: '否',
          defaultValue: '{}',
          description: '请求数据时候的传参'
        },
        {
          name: 'props',
          type: 'Object',
          isRequired: '否',
          defaultValue: '{\n' +
            '          data: \'data\',\n' +
            '          label: \'label\',\n' +
            '          value: \'value\',\n' +
            '          key: \'keyWord\'\n' +
            '        }',
          description: '获取显示查询数据时候的相关配置'
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
          name: 'changeSelect',
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
          name: 'showChoosedSelect',
          param: '',
          type: '',
          description: '多选时，绑定的数组类型是数组，由于深度监听数组存在性能问题，所以并没有监听选中项的绑定值，默认在组件mounted中会将传入的value' +
            '进行一次回显处理,如果出现了因为生命周期/懒加载等原因而导致的回显bug，可以使用此函数手动回显'
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
    getSelectList
  }
}
</script>

<style lang="scss" scoped>
.no-data {
  height: 34px;
  line-height: 34px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 20px;
}

</style>
