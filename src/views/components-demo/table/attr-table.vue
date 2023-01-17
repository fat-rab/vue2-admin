<template>
  <div>
    <p>组件传参</p>
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
          name: 'tableData',
          type: 'Array',
          isRequired: '是',
          defaultValue: '',
          description: 'table展示的数据'
        },
        {
          name: 'columns',
          type: 'Array',
          isRequired: '是',
          defaultValue: '',
          description: '参数较多，参考columns文档'
        },
        {
          name: 'total',
          type: 'number',
          isRequired: '否',
          defaultValue: '0',
          description: '数据总长度'
        },
        {
          name: 'currentPage',
          type: 'number',
          isRequired: '否',
          defaultValue: '1',
          description: '当前页码'
        },
        {
          name: 'pageSize',
          type: 'number',
          isRequired: '否',
          defaultValue: '10',
          description: '每一页展示的数据长度'
        },
        {
          name: 'height',
          type: 'Number',
          isRequired: '否',
          defaultValue: '',
          description: 'table的高度'
        },
        {
          name: 'maxHeight',
          type: 'Number',
          isRequired: '否',
          defaultValue: '1000',
          description: 'table的最大高度'
        },
        {
          name: 'tableLoading',
          type: 'Boolean',
          isRequired: '否',
          defaultValue: 'false',
          description: 'table是否处于加载状态'
        },
        {
          name: 'showPagination',
          type: 'Boolean',
          isRequired: '否',
          defaultValue: 'true',
          description: '是否显示分页'
        },
        {
          name: 'showSelect',
          type: 'Boolean',
          isRequired: '否',
          defaultValue: 'false',
          description: '是否添加select列'
        },
        {
          name: 'showSearchBox',
          type: 'Boolean',
          isRequired: '否',
          defaultValue: 'true',
          description: '是否展示搜索框插槽'
        },
        {
          name: 'autoSize',
          type: 'Boolean',
          isRequired: '否',
          defaultValue: 'false',
          description: 'table是否自适应尺寸，此时需要设置table的高度'
        },
        {
          name: 'bottomOffset',
          type: 'Number',
          isRequired: '否',
          defaultValue: '50',
          description: '自适应尺寸时候的时候设置距离页面底部的高度'
        },
        {
          name: 'infinite',
          type: 'Boolean',
          isRequired: '否',
          defaultValue: 'false',
          description: 'table是否无限加载，此时需要设置table的高度'
        },
        {
          name: 'contextLoading',
          type: 'Boolean',
          isRequired: '否',
          defaultValue: 'false',
          description: '无限滚动加载时，是否处于加载中状态'
        },
        {
          name: 'contextLoadingFinish',
          type: 'Boolean',
          isRequired: '否',
          defaultValue: 'false',
          description: '无限滚动加载时，数据是否已经全部加载完成'
        },
        {
          name: 'align',
          type: 'String',
          isRequired: '否',
          defaultValue: 'left',
          description: '表格对齐方式，默认居左'
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
