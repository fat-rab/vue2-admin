<template>
  <div>
    <el-card class="my-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>错误日志</span>
      </div>
      <main-table
        :table-loading="tableLoading"
        :total="pageObj.total"
        :current-page="pageObj.currentPage"
        :page-size="pageObj.pageSize"
        :table-data="tableData"
        :columns="columns"
        @changeCurrentPage="changeCurrentPage"
        @changePageSize="changePageSize"
      >
        <div slot="searchSlot">
          <el-form ref="form" :model="searchForm" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="错误地址：" prop="errorUrl">
                  <el-input v-model="searchForm.errorUrl" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <span>
                    <el-button size="small" type="primary" @click="searchList">搜索</el-button>
                    <el-button size="small" @click="resetList">清空</el-button>
                  </span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </main-table>
    </el-card>
  </div>
</template>

<script>
import MainTable from '@/components/commom/main-table'
import { getErrorLogList } from '@/api/sys-management'
export default {
  name: 'ErrorLog',
  components: {
    MainTable
  },
  data () {
    return {
      tableLoading: false,
      pageObj: {
        total: 1,
        currentPage: 1,
        pageSize: 10
      },
      columns: [
        {
          label: '错误地址',
          prop: 'errorUrl',
          minWidth: 100,
          fixed: 'left'
        },
        {
          label: '错误节点',
          prop: 'errorNode',
          minWidth: 100
        },
        {
          label: 'vue特有错误信息',
          prop: 'errorInfo',
          minWidth: 100
        },
        {
          label: '错误信息',
          prop: 'errorMessage',
          minWidth: 100
        },
        {
          label: '错误堆栈',
          prop: 'errorStack',
          minWidth: 200
        }
      ],
      tableData: [],
      searchForm: {
        errorUrl: ''
      }
    }
  },
  created () {
    this.searchList()
  },
  methods: {
    searchList () {
      this.tableLoading = true
      this.pageObj.currentPage = 1
      this.getErrorLogListFn().finally(() => {
        this.tableLoading = false
      })
    },
    resetList () {
      this.timeRange = []
      this.$refs.form.resetFields()
      this.pageObj.pageSize = 10
      this.searchList()
    },
    changeCurrentPage (e) {
      this.pageObj.currentPage = e
      this.getErrorLogListFn()
    },
    changePageSize (e) {
      this.pageObj.currentPage = 1
      this.pageObj.pageSize = e
      this.getErrorLogListFn()
    },
    getErrorLogListFn () {
      const { currentPage, pageSize } = this.pageObj
      return getErrorLogList({
        currentPage,
        pageSize,
        ...this.searchForm
      }).then(({ data }) => {
        this.pageObj.total = data.total
        this.tableData = data.data
      })
    }
  }
}
</script>
