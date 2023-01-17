<template>
  <div>
    <el-card class="my-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>自适应尺寸table</span>
      </div>
      <p>引入方式和普通table组件保持一致</p>
      <p>卸载方式和普通table组件保持一致</p>
      <p>示例</p>
      <p>设置
        <el-tag size="small" type="info">autoSize</el-tag>
        属性为true，即可开启自适应属性，
        并且需要设置
        <el-tag size="small" type="info">height</el-tag>
        属性，（随意设置即可）
        可以通过 <el-tag size="small" type="info">bottomOffset</el-tag>属性，设置table距离底部的高度，默认50
      </p>
      <p>此功能是使用自定义指令通过监听窗口大小变化完成，不能对所有情况下生效（比如：splitpane中），不能生效的环境可能需要手动计算元素的高度，通过
        <el-tag size="small" type="info">height</el-tag>
        传入
      </p>
      <main-table
        :auto-size="true"
        :height="400"
        :table-data="tableData"
        :columns="columns"
        :show-pagination="false"
        :show-search-box="false"
      />
      <p>示例代码</p>
      <code-mirror :read-only="true" :code-text="showCodeText" />
    </el-card>
  </div>
</template>

<script>
import MainTable from '@/components/commom/main-table'
import CodeMirror from '@/components/commom/code-mirror'

export default {
  name: 'AutoSizeTable',
  components: {
    MainTable,
    CodeMirror
  },
  data () {
    return {
      columns: [
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
      tableData: [
        {
          name: 'clearSelection',
          param: '',
          type: '',
          description: '用于多选表格，清空用户的选择'
        },
        {
          name: 'clearSelection',
          param: '',
          type: '',
          description: '用于多选表格，清空用户的选择'
        },
        {
          name: 'clearSelection',
          param: '',
          type: '',
          description: '用于多选表格，清空用户的选择'
        },
        {
          name: 'clearSelection',
          param: '',
          type: '',
          description: '用于多选表格，清空用户的选择'
        },
        {
          name: 'clearSelection',
          param: '',
          type: '',
          description: '用于多选表格，清空用户的选择'
        },
        {
          name: 'clearSelection',
          param: '',
          type: '',
          description: '用于多选表格，清空用户的选择'
        },
        {
          name: 'clearSelection',
          param: '',
          type: '',
          description: '用于多选表格，清空用户的选择'
        },
        {
          name: 'clearSelection',
          param: '',
          type: '',
          description: '用于多选表格，清空用户的选择'
        },
        {
          name: 'clearSelection',
          param: '',
          type: '',
          description: '用于多选表格，清空用户的选择'
        },
        {
          name: 'clearSelection',
          param: '',
          type: '',
          description: '用于多选表格，清空用户的选择'
        },
        {
          name: 'clearSelection',
          param: '',
          type: '',
          description: '用于多选表格，清空用户的选择'
        },
        {
          name: 'clearSelection',
          param: '',
          type: '',
          description: '用于多选表格，清空用户的选择'
        },
        {
          name: 'clearSelection',
          param: '',
          type: '',
          description: '用于多选表格，清空用户的选择'
        },
        {
          name: 'clearSelection',
          param: '',
          type: '',
          description: '用于多选表格，清空用户的选择'
        },
        {
          name: 'clearSelection',
          param: '',
          type: '',
          description: '用于多选表格，清空用户的选择'
        }, {
          name: 'clearSelection',
          param: '',
          type: '',
          description: '用于多选表格，清空用户的选择'
        }
      ],
      showCodeText: '<main-table\n' +
        '        :auto-size="true"\n' +
        '        :height="400"\n' +
        '        :table-data="tableData"\n' +
        '        :columns="columns"\n' +
        '        :show-pagination="false"\n' +
        '        :show-search-box="false"\n' +
        '>'
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
