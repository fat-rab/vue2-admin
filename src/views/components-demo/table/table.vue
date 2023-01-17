<template>
  <div>
    <el-card class="my-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>普通table演示</span>
      </div>
      <p>引入方式</p>
      <p>
        <el-tag size="small" type="info">import MainTable from '@/components/commom/main-table'</el-tag>
      </p>
      <p>
        <el-tag size="small" type="info">components: {MainTable}</el-tag>
      </p>
      <p>卸载方式</p>
      <p>删除
        <el-tag size="small" type="info">@/components/commom/main-table</el-tag>
        文件夹
      </p>
      <p>仅封装了部分常用功能和属性，可以自行根据业务进行改进</p>
      <p>
        通过
        <el-tag size="small" type="info">tableData</el-tag>
        参数来设置table显示的数据
      </p>
      <p>
        通过
        <el-tag size="small" type="info">columns</el-tag>
        参数来设置表头显示，具体配置见文档
      </p>
      <p>
        通过
        <el-tag size="small" type="info">total，currentPage，pageSize</el-tag>
        属性为分页相关参数
      </p>
      <p>表格获取数据之前通过设置属性
        <el-tag size="small" type="info">tableLoading</el-tag>
        :
        <el-tag size="small" type="info">true</el-tag>
        来显示加载状态，
        加载完成之后，通过置为
        <el-tag size="small" type="info">false</el-tag>
        ,来解除加载状态
      </p>
      <p>需要使用搜索条件的table中，如果搜索条件超过两个，则默认只显示两个，其他通过按钮来展开或者收缩，可以通过栅格完成，具体实现可以参考示例代码</p>

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
                <el-form-item label="名字：" prop="name">
                  <el-input v-model="searchForm.name" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
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
                <el-form-item label="生日：" prop="date">
                  <el-date-picker
                    v-model="searchForm.date"
                    style="width: 100%"
                    type="datetime"
                    placeholder="选择日期时间"
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
          <el-button size="small" type="primary" @click="openDialog(1)">新增</el-button>
        </template>
      </main-table>
      <code-show />
      <attr-table />
      <column-table />
      <event-table />
      <method-table />
    </el-card>
    <demo-dialog
      :is-dialog-show="isDialogShow"
      :dialog-obj="dialogObj"
      @handleClose="isDialogShow=false"
      @handleSubmit="searchList"
    />
  </div>
</template>

<script>
import MainTable from '@/components/commom/main-table'
import CodeShow from './code'
import AttrTable from './attr-table'
import EventTable from './event-table'
import ColumnTable from './column-table'
import MethodTable from './method-table'
import { delDemo, getDemoList } from '@/api/demo'
import { parseTime } from '@/utils/time'
import { getDictStr, getDictStrFromArr } from '@/utils/dict'
import DemoDialog from '../components/DemoDialog/index'

export default {
  name: 'Demo',
  components: {
    MainTable,
    DemoDialog,
    CodeShow,
    AttrTable,
    EventTable,
    ColumnTable,
    MethodTable
  },
  data () {
    return {
      isDialogShow: false,
      dialogObj: {
        title: '新增',
        data: null,
        type: 1
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
          label: '名字',
          prop: 'name',
          minWidth: 50,
          fixed: 'left'
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
        },
        {
          label: '操作',
          align: 'center',
          headerAlign: 'center',
          width: 150,
          render: (h, param) => {
            return (
              <span>
                <el-button size='small' type='text'
                  nativeOnClick={() => this.openDialog(2, param.row)}
                >
                  详情
                </el-button>
                <el-dropdown>
                  <span class='el-dropdown-link'>
                    更多<i class='el-icon-arrow-down el-icon--right'/>
                  </span>
                  <el-dropdown-menu slot='dropdown'>
                    <el-dropdown-item nativeOnClick={() => this.openDialog(3, param.row)}>编辑</el-dropdown-item>
                    <el-dropdown-item nativeOnClick={() => this.delDemoFn(param.row)}>删除</el-dropdown-item>
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
        gender: null,
        role: '',
        date: ''
      },
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  component: {},
  computed: {
    roleList () {
      return [
        { label: 'admin', value: '1' },
        { label: 'common', value: '2' },
        { label: 'dba', value: '3' }
      ]
    },
    genderList () {
      return [
        { label: '男', value: '1' },
        { label: '女', value: '2' }
      ]
    },
    titleObj () {
      return {
        1: '新增',
        2: '详情',
        3: '删除'
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
    openDialog (type, row) {
      this.isDialogShow = true
      this.dialogObj = {
        type: type,
        data: row,
        title: this.titleObj[type]
      }
    },
    delDemoFn (row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delDemo({ id: row.id }).then(() => {
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
      this.getDemoListFn().finally(() => {
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
      this.getDemoListFn()
    },
    changePageSize (e) {
      this.pageObj.currentPage = 1
      this.pageObj.pageSize = e
      this.getDemoListFn()
    },
    getDemoListFn () {
      const { currentPage, pageSize } = this.pageObj
      return getDemoList({
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
