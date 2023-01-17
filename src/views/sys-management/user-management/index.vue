<template>
  <div>
    <el-card class="my-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>用户管理</span>
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
                <el-form-item label="账号：" prop="account">
                  <el-input v-model="searchForm.account" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="名字：" prop="name">
                  <el-input v-model="searchForm.name" />
                </el-form-item>
              </el-col>
              <el-col v-show="isShowAll" :span="8">
                <el-form-item label="性别：" prop="gender">
                  <el-radio-group v-model="searchForm.gender" size="small">
                    <el-radio-button
                      :label="null"
                    >
                      全部
                    </el-radio-button>
                    <el-radio-button
                      v-for="item in genderList"
                      :key="item.value"
                      :label="item.value"
                    >
                      {{ item.label }}
                    </el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col v-show="isShowAll" :span="8">
                <el-form-item label="角色：" prop="role">
                  <el-select v-model="searchForm.role" style="width:100%" placeholder="请选择角色">
                    <el-option
                      v-for="item in roleList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-show="isShowAll" :span="8">
                <el-form-item label="手机号码：" prop="account">
                  <el-input v-model="searchForm.phoneNumber" />
                </el-form-item>
              </el-col>
              <el-col v-show="isShowAll" :span="12">
                <el-form-item label="最后登陆时间：" prop="timeRange">
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
    <user-drawer
      :drawer-show="drawerShow"
      :drawer-obj="drawerObj"
      @handleSubmit="searchList"
      @handleClose="drawerShow=false"
    />
    <password-drawer
      :id="accountId"
      :drawer-show="passwordDrawerShow"
      @handleClose="passwordDrawerShow=false"
    />
  </div>
</template>

<script>
import MainTable from '@/components/commom/main-table'
import UserDrawer from './user-drawer'
import PasswordDrawer from './password-drawer'
import { delUser, getUserList } from '@/api/sys-management'
import { getDictStr, getDictStrFromArr } from '@/utils/dict'
import { parseTime } from '@/utils/time'
import { mapState } from 'vuex'

export default {
  name: 'UserManagement',
  components: {
    MainTable,
    UserDrawer,
    PasswordDrawer
  },
  data () {
    return {
      accountId: '',
      passwordDrawerShow: false,
      drawerShow: false,
      drawerObj: {
        title: '新增',
        data: null,
        type: 1,
        id: ''
      },
      isShowAll: false,
      tableLoading: false,
      pageObj: {
        total: 1,
        currentPage: 1,
        pageSize: 10
      },
      columns: [
        {
          label: '账号',
          prop: 'account',
          minWidth: 100,
          fixed: 'left'
        },
        {
          label: '名字',
          prop: 'name',
          minWidth: 100
        },
        {
          label: '性别',
          prop: 'gender',
          width: 80,
          formatter: (value) => {
            return getDictStr(this.genderList, value)
          }
        },
        {
          label: '角色',
          prop: 'role',
          formatter: (value) => {
            return getDictStrFromArr(this.roleList, value)
          }
        },
        {
          label: '手机号码',
          prop: 'phoneNumber',
          minWidth: 150
        },
        {
          label: '备注',
          prop: 'memo',
          minWidth: 200
        },
        {
          label: '最后登陆时间',
          prop: 'lastLoginDate',
          minWidth: 100,
          formatter: (value) => {
            return parseTime(value)
          }
        },
        {
          label: '操作',
          align: 'center',
          headerAlign: 'center',
          width: 150,
          render: (h, param) => {
            return (
              <span>
                <el-button size='small' class='mr10' type='text'
                  nativeOnClick={() => this.openDrawer(2, param.row)}
                >
                  详情
                </el-button>
                <el-dropdown>
                  <span class='el-dropdown-link'>
                    更多<i class='el-icon-arrow-down el-icon--right'/>
                  </span>
                  <el-dropdown-menu slot='dropdown'>
                    <el-dropdown-item nativeOnClick={() => this.openDrawer(3, param.row)}>编辑</el-dropdown-item>
                    <el-dropdown-item nativeOnClick={() => this.editPassword(param.row.id)}>修改密码</el-dropdown-item>
                    <el-dropdown-item nativeOnClick={() => this.delUserFn(param.row.id)}>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            )
          }
        }
      ],
      tableData: [],
      timeRange: [],
      searchForm: {
        account: '',
        name: '',
        gender: null,
        role: '',
        phoneNumber: '',
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
  component: {},
  computed: {
    titleObj () {
      return {
        1: '新增',
        2: '详情',
        3: '编辑'
      }
    },
    ...mapState({
      genderList: (state) => state.app.dict.gender,
      roleList: (state) => state.app.dict.role
    })
  },
  watch: {},
  created () {
  },
  mounted () {
    this.searchList()
  },
  methods: {
    editPassword (id) {
      this.accountId = id
      this.passwordDrawerShow = true
    },
    openDrawer (type, row) {
      this.drawerShow = true
      this.drawerObj = {
        type: type,
        id: row ? row.id : '',
        data: row,
        title: this.titleObj[type]
      }
    },
    delUserFn (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser({ id }).then(() => {
          this.searchList()
        })
      })
    },
    searchList () {
      this.tableLoading = true
      this.pageObj.currentPage = 1
      this.getUserListFn().finally(() => {
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
      this.getUserListFn()
    },
    changePageSize (e) {
      this.pageObj.currentPage = 1
      this.pageObj.pageSize = e
      this.getUserListFn()
    },
    getUserListFn () {
      const { currentPage, pageSize } = this.pageObj
      const [startTime, endTime] = this.timeRange || []
      return getUserList({
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
