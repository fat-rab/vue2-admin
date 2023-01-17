<template>
  <div>
    <el-card class="my-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>登陆日志</span>
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
                <el-form-item label="登陆账号：" prop="account">
                  <el-input v-model="searchForm.account" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="登陆ip：" prop="ip">
                  <el-input v-model="searchForm.ip" />
                </el-form-item>
              </el-col>
              <el-col v-show="isShowAll" :span="12">
                <el-form-item label="登陆时间：" prop="timeRange">
                  <el-date-picker
                    v-model="timeRange"
                    type="datetimerange"
                    align="right"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="timestamp"
                    :picker-options="pickerOptions"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="isShowAll?24:8">
                <el-form-item :class="isShowAll?'search-button-box':''">
                  <span>
                    <el-button size="small" type="primary" @click="searchList">搜索</el-button>
                    <el-button size="small" @click="resetList">清空</el-button>
                    <el-button
                      size="small"
                      :icon="isShowAll?'el-icon-arrow-up':'el-icon-arrow-down'"
                      type="text"
                      @click="isShowAll=!isShowAll"
                    >
                      {{ isShowAll ? '收起' : '展开' }}
                    </el-button>
                  </span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <template slot="menuLeftSlot">
          <el-button size="small" type="primary" @click="openDrawer(1)">新增</el-button>
        </template>
      </main-table>
    </el-card>
  </div>
</template>

<script>
import MainTable from '@/components/commom/main-table'
import { getLoginLogList } from '@/api/sys-management'
import { parseTime } from '@/utils/time'

export default {
  name: 'UserManagement',
  components: {
    MainTable
  },
  data () {
    return {
      isShowAll: false,
      tableLoading: false,
      pageObj: {
        total: 1,
        currentPage: 1,
        pageSize: 10
      },
      columns: [
        {
          label: '登陆时间',
          prop: 'loginDate',
          minWidth: 100,
          fixed: 'left',
          formatter: (value) => {
            return parseTime(value)
          }
        },
        {
          label: '登陆账号',
          prop: 'account',
          minWidth: 100,
          fixed: 'left'
        },
        {
          label: '登陆IP',
          prop: 'ip',
          minWidth: 100
        },
        {
          label: '状态',
          prop: 'status',
          minWidth: 100,
          formatter (value) {
            return value === 1 ? '成功' : '失败'
          }
        },
        {
          label: '信息',
          prop: 'message',
          minWidth: 200
        }
      ],
      tableData: [],
      timeRange: [],
      searchForm: {
        account: '',
        ip: '',
        startTime: '',
        endTime: ''
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
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
      this.getLoginLogListFn().finally(() => {
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
      this.getLoginLogListFn()
    },
    changePageSize (e) {
      this.pageObj.currentPage = 1
      this.pageObj.pageSize = e
      this.getLoginLogListFn()
    },
    getLoginLogListFn () {
      const { currentPage, pageSize } = this.pageObj
      const [startTime, endTime] = this.timeRange || []
      return getLoginLogList({
        currentPage,
        pageSize,
        ...this.searchForm,
        startTime,
        endTime
      }).then(({ data }) => {
        this.pageObj.total = data.total
        this.tableData = data.data
      })
    }
  }
}
</script>
