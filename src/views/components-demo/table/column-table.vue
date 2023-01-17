<template>
  <div>
    <p>columns属性</p>
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
          label: '属性名称',
          prop: 'name',
          fixed: 'left'
        },
        {
          label: '属性类型',
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
          name: 'label',
          type: 'String',
          isRequired: '是',
          defaultValue: '',
          description: '显示的标题'
        },
        {
          name: 'prop',
          type: 'String',
          isRequired: '是',
          defaultValue: '',
          description: '对应列内容的字段名'
        },
        {
          name: 'formatter',
          type: 'Function',
          isRequired: '否',
          defaultValue: '',
          description: '对显示数据的处理，回调参数为value,row'
        },
        {
          name: 'render',
          type: 'Function',
          isRequired: '否',
          defaultValue: '',
          description: '对该列表格进行处理，回调参数为h(render函数，如果使用jsx则不需要使用),param(此表格的数据)'
        },
        {
          name: 'hidden',
          type: 'Boolean',
          isRequired: '否',
          defaultValue: 'false',
          description: '是否隐藏该列'
        },
        {
          name: 'width',
          type: 'Number',
          isRequired: '否',
          defaultValue: '',
          description: '该列的宽度'
        },
        {
          name: 'minWidth',
          type: 'Number',
          isRequired: '否',
          defaultValue: '',
          description: '该列的最小宽度'
        },
        {
          name: 'align',
          type: 'String',
          isRequired: '否',
          defaultValue: '',
          description: '数据对齐方式，默认与table的align参数保持一致'
        },
        {
          name: 'headerAlign',
          type: 'Number',
          isRequired: '否',
          defaultValue: '',
          description: '表头对齐方式，默认与table的align参数保持一致'
        },
        {
          name: 'fixed',
          type: 'String',
          isRequired: '否',
          defaultValue: '',
          description: '列是否固定在左侧或者右侧(left,right)'
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
