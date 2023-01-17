<template>
  <div>
    <el-card class="my-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>字典管理</span>
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
          <el-form ref="form" :model="searchForm" label-width="80px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="名称：" prop="name">
                  <el-input v-model="searchForm.name" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="关键字：" prop="key">
                  <el-input v-model="searchForm.key" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <el-button size="small" type="primary" @click="searchList">搜索</el-button>
                  <el-button size="small" @click="resetList">清空</el-button>
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
    <dict-drawer
      :drawer-show="drawerShow"
      :drawer-obj="drawerObj"
      @handleSubmit="searchList"
      @handleClose="drawerShow=false"
    />
    <dict-item-drawer
      :drawer-show="dictItemDrawerShow"
      :drawer-obj="dictItemDrawerObj"
      @handleClose="dictItemDrawerShow=false"
    />
  </div>
</template>

<script>
import MainTable from '@/components/commom/main-table'
import DictDrawer from './dict-drawer'
import DictItemDrawer from './dict-item-drawer'
import { delDict, getDictList } from '@/api/sys-management'

export default {
  name: 'DictManagement',
  components: {
    MainTable,
    DictDrawer,
    DictItemDrawer
  },
  data () {
    return {
      dictItemDrawerShow: false,
      dictItemDrawerObj: {
        id: ''
      },
      drawerShow: false,
      drawerObj: {
        title: '新增',
        data: null,
        type: 1
      },
      tableLoading: false,
      pageObj: {
        total: 1,
        currentPage: 1,
        pageSize: 10
      },
      columns: [
        {
          label: '名字',
          prop: 'name',
          minWidth: 50,
          fixed: 'left'
        },
        {
          label: '关键字',
          prop: 'key',
          minWidth: 50,
          fixed: 'left'
        },
        {
          label: '备注',
          prop: 'memo',
          minWidth: 200
        },
        {
          label: '操作',
          align: 'center',
          headerAlign: 'center',
          width: 150,
          render: (h, param) => {
            return (
              <span>
                <span class='action-btn mr12' onClick={() => this.openDrawer(2, param.row)}>详情</span>
                <el-dropdown>
                  <span class='el-dropdown-link'>
                    更多<i class='el-icon-arrow-down el-icon--right'/>
                  </span>
                  <el-dropdown-menu slot='dropdown'>
                    <el-dropdown-item nativeOnClick={() => this.openDrawer(3, param.row)}>编辑</el-dropdown-item>
                    <el-dropdown-item nativeOnClick={() => this.openDictItemDrawer(param.row.key)}
                    >字典项管理</el-dropdown-item>
                    <el-dropdown-item nativeOnClick={() => this.delDictFn(param.row)}>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            )
          }
        }
      ],
      tableData: [],
      searchForm: {
        name: '',
        key: ''
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
    }
  },
  watch: {},
  created () {
  },
  mounted () {
    this.searchList()
  },
  methods: {
    openDictItemDrawer (key) {
      this.dictItemDrawerObj.key = key
      this.dictItemDrawerShow = true
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
    delDictFn (row) {
      this.$confirm('删除该字典可能会对业务产生影响, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delDict({ id: row.id }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.searchList()
        })
      })
    },
    searchList () {
      this.tableLoading = true
      this.pageObj.currentPage = 1
      this.getDictListFn().finally(() => {
        this.tableLoading = false
      })
    },
    resetList () {
      this.$refs.form.resetFields()
      this.pageObj.pageSize = 10
      this.searchList()
    },
    changeCurrentPage (e) {
      this.pageObj.currentPage = e
      this.getDictListFn()
    },
    changePageSize (e) {
      this.pageObj.currentPage = 1
      this.pageObj.pageSize = e
      this.getDictListFn()
    },
    getDictListFn () {
      const { currentPage, pageSize } = this.pageObj
      return getDictList({
        currentPage,
        pageSize,
        ...this.searchForm
      }).then(({ data }) => {
        console.log(data, 'data')
        this.pageObj.total = data.total
        this.tableData = data.data
      })
    }
  }
}
</script>
