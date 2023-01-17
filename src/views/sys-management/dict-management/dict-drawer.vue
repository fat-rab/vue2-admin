<template>
  <div>
    <el-drawer
      :title="drawerObj.title"
      :visible.sync="drawerShow"
      size="40%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px" :rules="rule">
        <el-form-item label="名字：" prop="name">
          <el-input v-model="form.name" :disabled="detailType" />
        </el-form-item>
        <el-form-item label="关键字：" prop="key">
          <el-input v-model="form.key" :disabled="detailType" />
        </el-form-item>
        <el-form-item label="备注：" prop="memo">
          <el-input v-model="form.memo" type="textarea" :disabled="detailType" />
        </el-form-item>
      </el-form>
      <div class="drawer-action-box">
        <el-button size="small" @click="handleClose">{{ detailType ? '确定' : '取消' }}</el-button>
        <el-button v-if="!detailType" size="small" type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-drawer>
  </div>
</template>
z
<script>
import { addDict, editDict } from '@/api/sys-management'
export default {
  name: 'DictDrawer',
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
      isDialogShow: false,
      dialogObj: {
        index: 0,
        title: '新增',
        data: null
      },
      form: {
        name: '',
        key: '',
        memo: ''
      },
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
      if (val && this.drawerObj.type !== 1) {
        this.$nextTick(() => {
          for (const key in this.form) {
            this.form[key] = this.drawerObj.data[key]
          }
        })
      }
    }
  },

  methods: {
    addDictFn () {
      return addDict(this.form).then(() => {
        this.$message.success('新增成功')
      })
    },
    editDictFn () {
      return editDict({ id: this.drawerObj.id, ...this.form }).then(() => {
        this.$message.success('编辑成功')
      })
    },
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.drawerObj.type === 1) {
            this.addDictFn().finally(() => {
              this.$emit('handleSubmit')
              this.handleClose()
            })
          } else {
            this.editDictFn().finally(() => {
              this.$emit('handleSubmit')
              this.handleClose()
            })
          }
        }
      })
    },
    handleClose () {
      this.$refs.form.resetFields()
      this.$emit('handleClose')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
