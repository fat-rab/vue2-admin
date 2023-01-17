<template>
  <div style="margin-top: 50px">
    <p>示例代码</p>
    <code-mirror :read-only="true" :code-text="showCodeText" />
  </div>
</template>

<script>
import CodeMirror from '@/components/commom/code-mirror'

export default {
  name: 'Code',
  components: { CodeMirror },
  data () {
    return {
      showCodeText: '<template>\n' +
        '  <div>\n' +
        '    <el-card class="my-card" shadow="never">\n' +
        '      <div slot="header" class="clearfix">\n' +
        '        <span>普通table演示</span>\n' +
        '      </div>\n' +
        '      <main-table\n' +
        '        :table-loading="tableLoading"\n' +
        '        :total="pageObj.total"\n' +
        '        :current-page="pageObj.currentPage"\n' +
        '        :page-size="pageObj.pageSize"\n' +
        '        :table-data="tableData"\n' +
        '        :columns="columns"\n' +
        '        @changeCurrentPage="changeCurrentPage"\n' +
        '        @changePageSize="changePageSize"\n' +
        '      >\n' +
        '        <div slot="searchSlot">\n' +
        '          <el-form ref="form" :model="searchForm" label-width="80px">\n' +
        '            <el-row>\n' +
        '              <el-col :span="8">\n' +
        '                <el-form-item label="名字：" prop="name">\n' +
        '                  <el-input v-model="searchForm.name" />\n' +
        '                </el-form-item>\n' +
        '              </el-col>\n' +
        '              <el-col :span="8">\n' +
        '                <el-form-item label="性别：" prop="gender">\n' +
        '                  <el-radio-group v-model="searchForm.gender" size="small">\n' +
        '                    <el-radio-button\n' +
        '                      :label="null"\n' +
        '                    >\n' +
        '                      全部\n' +
        '                    </el-radio-button>\n' +
        '                    <el-radio-button\n' +
        '                      v-for="item in genderList"\n' +
        '                      :key="item.value"\n' +
        '                      :label="item.value"\n' +
        '                    >\n' +
        '                      {{ item.label }}\n' +
        '                    </el-radio-button>\n' +
        '                  </el-radio-group>\n' +
        '                </el-form-item>\n' +
        '              </el-col>\n' +
        '              <el-col v-show="isShowAll" :span="8">\n' +
        '                <el-form-item label="角色：" prop="role">\n' +
        '                  <el-select v-model="searchForm.role" style="width:100%" placeholder="请选择角色">\n' +
        '                    <el-option\n' +
        '                      v-for="item in roleList"\n' +
        '                      :key="item.value"\n' +
        '                      :label="item.label"\n' +
        '                      :value="item.value"\n' +
        '                    />\n' +
        '                  </el-select>\n' +
        '                </el-form-item>\n' +
        '              </el-col>\n' +
        '              <el-col v-show="isShowAll" :span="8">\n' +
        '                <el-form-item label="生日：" prop="date">\n' +
        '                  <el-date-picker\n' +
        '                    v-model="searchForm.date"\n' +
        '                    style="width: 100%"\n' +
        '                    type="datetime"\n' +
        '                    placeholder="选择日期时间"\n' +
        '                    value-format="timestamp"\n' +
        '                    :picker-options="pickerOptions"\n' +
        '                  />\n' +
        '                </el-form-item>\n' +
        '              </el-col>\n' +
        '              <el-col :span="isShowAll?24:8">\n' +
        '                <el-form-item :class="isShowAll?\'search-button-box\':\'\'">\n' +
        '                  <span>\n' +
        '                    <el-button size="small" type="primary" @click="searchList">搜索</el-button>\n' +
        '                    <el-button size="small" @click="resetList">清空</el-button>\n' +
        '                    <el-button\n' +
        '                      size="small"\n' +
        '                      :icon="isShowAll?\'el-icon-arrow-up\':\'el-icon-arrow-down\'"\n' +
        '                      type="text"\n' +
        '                      @click="isShowAll=!isShowAll"\n' +
        '                    >\n' +
        '                      {{ isShowAll ? \'收起\' : \'展开\' }}\n' +
        '                    </el-button>\n' +
        '                  </span>\n' +
        '                </el-form-item>\n' +
        '              </el-col>\n' +
        '            </el-row>\n' +
        '          </el-form>\n' +
        '        </div>\n' +
        '        <template slot="menuLeftSlot">\n' +
        '          <el-button size="small" type="primary" @click="openDialog(1)">新增</el-button>\n' +
        '        </template>\n' +
        '      </main-table>\n' +
        '    </el-card>\n' +
        '    <demo-dialog\n' +
        '      :is-dialog-show="isDialogShow"\n' +
        '      :dialog-obj="dialogObj"\n' +
        '      @handleClose="isDialogShow=false"\n' +
        '      @handleSubmit="searchList"\n' +
        '    />\n' +
        '  </div>\n' +
        '</template>\n' +
        '\n' +
        '\<script\>\n' +
        'import MainTable from \'@/components/commom/main-table\'\n' +
        'import { getDemoList, delDemo } from \'@/api/demo\'\n' +
        'import { parseTime } from \'@/utils/time\'\n' +
        'import { getDictStr, getDictStrFromArr } from \'@/utils/dict\'\n' +
        'import DemoDialog from \'./components/DemoDialog/index\'\n' +
        'export default {\n' +
        '  name: \'Demo\',\n' +
        '  components: {\n' +
        '    MainTable,\n' +
        '    DemoDialog\n' +
        '  },\n' +
        '  data () {\n' +
        '    return {\n' +
        '      isDialogShow: false,\n' +
        '      dialogObj: {\n' +
        '        title: \'新增\',\n' +
        '        data: null,\n' +
        '        type: 1\n' +
        '      },\n' +
        '      isShowAll: false,\n' +
        '      tableLoading: false,\n' +
        '      pageObj: {\n' +
        '        total: 1,\n' +
        '        currentPage: 1,\n' +
        '        pageSize: 10\n' +
        '      },\n' +
        '      columns: [\n' +
        '        {\n' +
        '          label: \'名字\',\n' +
        '          prop: \'name\',\n' +
        '          minWidth: 50,\n' +
        '          fixed: \'left\'\n' +
        '        },\n' +
        '        {\n' +
        '          label: \'性别\',\n' +
        '          prop: \'gender\',\n' +
        '          width: 80,\n' +
        '          formatter: (value) => {\n' +
        '            return getDictStr(this.genderList, value)\n' +
        '          }\n' +
        '        },\n' +
        '        {\n' +
        '          label: \'角色\',\n' +
        '          prop: \'role\',\n' +
        '          formatter: (value) => {\n' +
        '            return getDictStrFromArr(this.roleList, value)\n' +
        '          }\n' +
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
        '        },\n' +
        '        {\n' +
        '          label: \'操作\',\n' +
        '          align: \'center\',\n' +
        '          headerAlign: \'center\',\n' +
        '          width: 150,\n' +
        '          render: (h, param) => {\n' +
        '            return (\n' +
        '              <span>\n' +
        '                <el-button size=\'small\' class=\'mr10\' type=\'text\'\n' +
        '                  nativeOnClick={() => this.openDialog(2, param.row)}\n' +
        '                >\n' +
        '                  详情\n' +
        '                </el-button>\n' +
        '                <el-dropdown>\n' +
        '                  <span class=\'el-dropdown-link\'>\n' +
        '                    更多<i class=\'el-icon-arrow-down el-icon--right\'/>\n' +
        '                  </span>\n' +
        '                  <el-dropdown-menu slot=\'dropdown\'>\n' +
        '                    <el-dropdown-item nativeOnClick={() => this.openDialog(3, param.row)}>编辑</el-dropdown-item>\n' +
        '                    <el-dropdown-item nativeOnClick={() => this.delDemoFn(param.row)}>删除</el-dropdown-item>\n' +
        '                  </el-dropdown-menu>\n' +
        '                </el-dropdown>\n' +
        '              </span>\n' +
        '            )\n' +
        '          }\n' +
        '        }\n' +
        '      ],\n' +
        '      tableData: [],\n' +
        '      searchForm: {\n' +
        '        name: \'\',\n' +
        '        gender: null,\n' +
        '        role: \'\',\n' +
        '        date: \'\'\n' +
        '      },\n' +
        '      pickerOptions: {\n' +
        '        shortcuts: [{\n' +
        '          text: \'今天\',\n' +
        '          onClick (picker) {\n' +
        '            picker.$emit(\'pick\', new Date())\n' +
        '          }\n' +
        '        }, {\n' +
        '          text: \'昨天\',\n' +
        '          onClick (picker) {\n' +
        '            const date = new Date()\n' +
        '            date.setTime(date.getTime() - 3600 * 1000 * 24)\n' +
        '            picker.$emit(\'pick\', date)\n' +
        '          }\n' +
        '        }, {\n' +
        '          text: \'一周前\',\n' +
        '          onClick (picker) {\n' +
        '            const date = new Date()\n' +
        '            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)\n' +
        '            picker.$emit(\'pick\', date)\n' +
        '          }\n' +
        '        }]\n' +
        '      }\n' +
        '    }\n' +
        '  },\n' +
        '  component: {},\n' +
        '  computed: {\n' +
        '    roleList () {\n' +
        '      return [\n' +
        '        { label: \'admin\', value: \'1\' },\n' +
        '        { label: \'common\', value: \'2\' },\n' +
        '        { label: \'dba\', value: \'3\' }\n' +
        '      ]\n' +
        '    },\n' +
        '    genderList () {\n' +
        '      return [\n' +
        '        { label: \'男\', value: \'1\' },\n' +
        '        { label: \'女\', value: \'2\' }\n' +
        '      ]\n' +
        '    },\n' +
        '    titleObj () {\n' +
        '      return {\n' +
        '        1: \'新增\',\n' +
        '        2: \'详情\',\n' +
        '        3: \'删除\'\n' +
        '      }\n' +
        '    }\n' +
        '  },\n' +
        '  watch: {},\n' +
        '  created () {\n' +
        '  },\n' +
        '  mounted () {\n' +
        '    this.searchList()\n' +
        '  },\n' +
        '  methods: {\n' +
        '    openDialog (type, row) {\n' +
        '      this.isDialogShow = true\n' +
        '      this.dialogObj = {\n' +
        '        type: type,\n' +
        '        data: row,\n' +
        '        title: this.titleObj[type]\n' +
        '      }\n' +
        '    },\n' +
        '    delDemoFn (row) {\n' +
        '      this.$confirm(\'此操作将永久删除该数据, 是否继续?\', \'提示\', {\n' +
        '        confirmButtonText: \'确定\',\n' +
        '        cancelButtonText: \'取消\',\n' +
        '        type: \'warning\'\n' +
        '      }).then(() => {\n' +
        '        delDemo({ id: row.id }).then(() => {\n' +
        '          this.$message({\n' +
        '            type: \'success\',\n' +
        '            message: \'删除成功!\'\n' +
        '          })\n' +
        '          this.searchList()\n' +
        '        })\n' +
        '      })\n' +
        '    },\n' +
        '    searchList () {\n' +
        '      this.tableLoading = true\n' +
        '      this.pageObj.currentPage = 1\n' +
        '      this.getDemoListFn().finally(() => {\n' +
        '        this.tableLoading = false\n' +
        '      })\n' +
        '    },\n' +
        '    resetList () {\n' +
        '      this.$refs.form.resetFields()\n' +
        '      this.pageObj.pageSize = 10\n' +
        '      this.searchList()\n' +
        '    },\n' +
        '    changeCurrentPage (e) {\n' +
        '      this.pageObj.currentPage = e\n' +
        '      this.getDemoListFn()\n' +
        '    },\n' +
        '    changePageSize (e) {\n' +
        '      this.pageObj.currentPage = 1\n' +
        '      this.pageObj.pageSize = e\n' +
        '      this.getDemoListFn()\n' +
        '    },\n' +
        '    getDemoListFn () {\n' +
        '      const { currentPage, pageSize } = this.pageObj\n' +
        '      return getDemoList({\n' +
        '        currentPage,\n' +
        '        pageSize,\n' +
        '        ...this.searchForm\n' +
        '      }).then(({ data }) => {\n' +
        '        this.pageObj.total = data.total\n' +
        '        this.tableData = data.data\n' +
        '      })\n' +
        '    }\n' +
        '  }\n' +
        '}\n' +
        '\<\/script\>\n'
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
