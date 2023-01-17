<template>
  <div>
    <el-drawer
      title="字典项管理"
      :visible.sync="drawerShow"
      size="40%"
      :before-close="handleClose"
    >
      <main-table
        :table-data="tableData"
        :columns="columns"
        :table-loading="tableLoading"
        :show-pagination="false"
        :show-search-box="false"
      >
        <template slot="menuLeftSlot">
          <el-button size="small" type="primary" @click="openDialog(1)">新增</el-button>
        </template>
      </main-table>
      <div class="drawer-action-box">
        <el-button size="small" @click="handleClose">确定</el-button>
      </div>
    </el-drawer>
    <dict-item-dialog
      :dialog-show="dialogShow"
      :dialog-obj="dialogObj"
      @handleClose="dialogShow=false"
      @handleSubmit="handleSubmit"
    />
  </div>
</template>
z
<script>
import MainTable from '@/components/commom/main-table'
import DictItemDialog from './dict-item-dialog'
import { delDictItem, getDictItemList } from '@/api/sys-management'

export default {
  name: 'DictDrawer',
  components: {
    MainTable,
    DictItemDialog
  },
  props: {
    drawerShow: {
      type: Boolean,
      required: true
    },
    drawerObj: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialogShow: false,
      dialogObj: {
        type: 1,
        key: '',
        title: '新增',
        id: '',
        data: null
      },
      tableLoading: false,
      tableData: [],
      columns: [
        {
          label: 'label',
          prop: 'label'
        },
        {
          label: 'value',
          prop: 'value'
        },
        {
          label: '操作',
          align: 'center',
          headerAlign: 'center',
          width: 150,
          render: (h, param) => {
            return (
              <span>
                <span class='action-btn mr12' onClick={() => this.openDialog(3, param.row)}>编辑</span>
                <span class='action-btn' onClick={() => this.delDictItemFn(param.row.id)}>删除</span>
              </span>
            )
          }
        }
      ],
      rule: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        key: [
          { required: true, message: '请输入关键字', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    detailType () {
      return this.drawerObj.type === 2
    },
    titleObj () {
      return {
        1: '新增',
        2: '详情',
        3: '编辑'
      }
    }
  },
  watch: {
    drawerShow (val) {
      if (val) {
        this.getDictItemListFn(this.drawerObj.key)
      }
    }
  },

  methods: {
    openDialog (type, row) {
      this.dialogShow = true
      this.dialogObj = {
        type,
        key: this.drawerObj.key,
        title: this.titleObj[type],
        id: row ? row.id : '',
        data: row
      }
    },
    handleSubmit () {
      this.getDictItemListFn(this.drawerObj.key)
    },
    delDictItemFn (id) {
      this.$confirm('删除该字典项可能会对业务产生影响, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delDictItem({ id, key: this.drawerObj.key }).then(() => {
          this.getDictItemListFn(this.drawerObj.key)
        })
      })
    },
    getDictItemListFn (key) {
      getDictItemList({ key }).then(({ data }) => {
        this.tableData = data
      })
    },
    handleClose () {
      this.$emit('handleClose')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
