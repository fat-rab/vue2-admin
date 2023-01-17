<template>
  <div>
    <p>组件事件</p>
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
      tableData: [
        {
          name: 'handleSizeChange',
          param: 'value',
          description: '改变pageSize的时候触发，回调参数为改变之后的pageSize'
        },
        {
          name: 'handleCurrentChange',
          param: 'value',
          description: '改变currentPage的时候触发，回调参数为改变之后的currentPage'
        },
        {
          name: 'changeSelect',
          param: 'data',
          description: '当用户手动勾选数据行的 Checkbox 时触发，回调参数为选中的数据（由于element-ui没有取消选中的回调，所以如果需要需要获取' +
            '不同页选中的数据时，建议触发该函数时，保存下每一页选中的数据，最后合并去重）'
        },
        {
          name: 'loadList',
          param: '',
          description: '无限滚动下，滚动到列表最后的时候触发，此时可以调用获取数据的函数'
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
