<template>
  <div>
    <p>组件方法</p>
    <main-table
      :table-data="tableData"
      :columns="columns"
      :show-pagination="false"
      :show-search-box="false"
    />
  </div>
</template>

<script>
import MainTable from '@/components/commom/main-table'

export default {
  name: 'AttrTable',
  components: { MainTable },
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
