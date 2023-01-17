<template>
  <div>
    <el-dialog
      :title="dialogObj.title"
      :visible.sync="dialogShow"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px" :rules="rule">
        <el-form-item label="label：" prop="label">
          <el-input v-model="form.label" :disabled="detailType" />
        </el-form-item>
        <el-form-item label="value：" prop="value">
          <el-input v-model="form.value" :disabled="!addType" />
        </el-form-item>
      </el-form>
      <div class="drawer-action-box">
        <el-button size="small" @click="handleClose">{{ detailType ? '确定' : '取消' }}</el-button>
        <el-button v-if="!detailType" size="small" type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addDictItem, delDictItem, editDictItem } from '@/api/sys-management'
import { validatePositiveStr } from '@/utils/validate'

export default {
  name: 'DictItemDialog',
  props: {
    dialogShow: {
      type: Boolean,
      required: true
    },
    dialogObj: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      form: {
        label: '',
        value: ''
      },
      tableData: [],
      rule: {
        label: [
          { required: true, message: '请输入label', trigger: 'blur' }
        ],
        value: [
          { required: true, validator: validatePositiveStr, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    detailType () {
      return this.dialogObj.type === 2
    },
    addType () {
      return this.dialogObj.type === 1
    }
  },
  watch: {
    dialogShow (val) {
      if (val) {
        if (val && this.dialogObj.type !== 1) {
          this.$nextTick(() => {
            for (const key in this.form) {
              this.form[key] = this.dialogObj.data[key]
            }
          })
        }
      }
    }
  },

  methods: {
    addDictItemFn () {
      return addDictItem({ key: this.dialogObj.key, data: this.form }).then(() => {
        this.$message.success('新增成功')
      })
    },
    editDictItemFn () {
      return editDictItem({ key: this.dialogObj.key, data: { id: this.dialogObj.id, ...this.form }}).then(() => {
        this.$message.success('编辑成功')
      })
    },
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.dialogObj.type === 1) {
            this.addDictItemFn().finally(() => {
              this.$emit('handleSubmit')
              this.handleClose()
            })
          } else {
            this.$confirm('编辑该字典项可能会对业务产生影响, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.editDictItemFn().finally(() => {
                this.$emit('handleSubmit')
                this.handleClose()
              })
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
