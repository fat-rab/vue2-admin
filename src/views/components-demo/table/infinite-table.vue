<template>
  <div>
    <el-card class="my-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>无限滚动table</span>
      </div>
      <p>引入方式和普通table组件保持一致</p>
      <p>卸载方式和普通table组件保持一致</p>
      <p>示例</p>
      <p>设置
        <el-tag size="small" type="info">infinite</el-tag>
        属性为true，即可开启自适应属性，
      </p>
      <p>需要搭配的属性为
        <el-tag size="small" type="info">contextLoading,contextLoadingFinish</el-tag>
        <el-tag size="small" type="info">contextLoading</el-tag>
        为下拉到底部时候，显示加载中（类似tableLoading）
        <el-tag size="small" type="info">contextLoadingFinish</el-tag>
        为数据全部加载完毕时，设置为true，
        下一次拉到底部显示数据全部加载完毕并且不会调用接口
      </p>
      <p>利用IntersectionObserver 通过自定义指令完成无限加载，并没有使用监听滚动条功能，可以参考
        <a href=" http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html">阮一峰的博客</a>
      </p>
      <p>由于是通过table的完成的无限滚动，所以有些优化不太好完成，比如随着下拉过程，dom越来越多，会变得卡顿，或者下拉到最后的过度效果
      </p>
      <main-table
        height="400px"
        :table-data="tableData"
        :infinite="true"
        :context-loading="contextLoading"
        :context-loading-finish="contextLoadingFinish"
        :table-loading="tableLoading"
        :columns="columns"
        :show-pagination="false"
        :show-search-box="false"
        @loadList="loadList"
      />
      <p>示例代码</p>
      <code-mirror :read-only="true" :code-text="showCodeText" />
    </el-card>
  </div>
</template>

<script>
import MainTable from '@/components/commom/main-table'
import CodeMirror from '@/components/commom/code-mirror'
import { parseTime } from '@/utils/time'
import { getAllList } from '@/api/components'

export default {
  name: 'AutoSizeTable',
  components: {
    MainTable,
    CodeMirror
  },
  data () {
    return {
      page: 1,
      total: 0,
      columns: [
        {
          label: '名字',
          prop: 'name',
          minWidth: 50,
          fixed: 'left'
        },
        {
          label: '生日',
          prop: 'date',
          formatter: (value) => {
            return parseTime(value)
          }
        },
        {
          label: '备注',
          prop: 'memo',
          minWidth: 200
        }
      ],
      tableData: [],
      contextLoading: false,
      contextLoadingFinish: false,
      tableLoading: false,
      showCodeText: '<template>\n' +
        '  <main-table\n' +
        '    height="400px"\n' +
        '    :table-data="tableData"\n' +
        '    :infinite="true"\n' +
        '    :context-loading="contextLoading"\n' +
        '    :context-loading-finish="contextLoadingFinish"\n' +
        '    :table-loading="tableLoading"\n' +
        '    :columns="columns"\n' +
        '    :show-pagination="false"\n' +
        '    :show-search-box="false"\n' +
        '    @loadList="loadList"\n' +
        '  />\n' +
        '</template>\n' +
        '\n' +
        '\<script\>\n' +
        'import MainTable from \'@/components/commom/main-table\'\n' +
        'import { parseTime } from \'@/utils/time\'\n' +
        'import { getAllList } from \'@/api/components\'\n' +
        '\n' +
        'export default {\n' +
        '  name: \'AutoSizeTable\',\n' +
        '  components: {\n' +
        '    MainTable\n' +
        '  },\n' +
        '  data () {\n' +
        '    return {\n' +
        '      page: 1,\n' +
        '      total: 0,\n' +
        '      columns: [\n' +
        '        {\n' +
        '          label: \'名字\',\n' +
        '          prop: \'name\',\n' +
        '          minWidth: 50,\n' +
        '          fixed: \'left\'\n' +
        '        },\n' +
        '        {\n' +
        '          label: \'生日\',\n' +
        '          prop: \'date\',\n' +
        '          formatter: (value) => {\n' +
        '            return parseTime(value)\n' +
        '          }\n' +
        '        },\n' +
        '        {\n' +
        '          label: \'备注\',\n' +
        '          prop: \'memo\',\n' +
        '          minWidth: 200\n' +
        '        }\n' +
        '      ],\n' +
        '      tableData: [],\n' +
        '      contextLoading: false,\n' +
        '      contextLoadingFinish: false,\n' +
        '      tableLoading: false\n' +
        '    }\n' +
        '  },\n' +
        '  mounted () {\n' +
        '    this.tableLoading = true\n' +
        '    this.getAllListFn().finally(() => {\n' +
        '      this.tableLoading = false\n' +
        '    })\n' +
        '  },\n' +
        '  methods: {\n' +
        '    loadList () {\n' +
        '      if (this.contextLoadingFinish) return\n' +
        '      this.contextLoading = true\n' +
        '      this.page++\n' +
        '      setTimeout(() => {\n' +
        '        this.getAllListFn().finally(() => {\n' +
        '          this.contextLoading = false\n' +
        '        })\n' +
        '      }, 2000)\n' +
        '    },\n' +
        '    getAllListFn () {\n' +
        '      return getAllList({ page: this.page }).then(({ data }) => {\n' +
        '        console.log(data, \'data\')\n' +
        '        const { list, total } = data\n' +
        '        this.tableData.push(...list)\n' +
        '        this.total = total\n' +
        '        if (this.tableData.length >= total) this.contextLoadingFinish = true\n' +
        '      })\n' +
        '    }\n' +
        '  }\n' +
        '}\n' +
        '\<\/script\>'
    }
  },
  mounted () {
    this.tableLoading = true
    this.getAllListFn().finally(() => {
      this.tableLoading = false
    })
  },
  methods: {
    loadList () {
      if (this.contextLoadingFinish) return
      this.contextLoading = true
      this.page++
      setTimeout(() => {
        this.getAllListFn().finally(() => {
          this.contextLoading = false
        })
      }, 2000)
    },
    getAllListFn () {
      return getAllList({ page: this.page }).then(({ data }) => {
        console.log(data, 'data')
        const { list, total } = data
        this.tableData.push(...list)
        this.total = total
        if (this.tableData.length >= total) this.contextLoadingFinish = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
