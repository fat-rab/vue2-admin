<template>
  <div>
    <el-dialog
      :title="dialogObj.title"
      :visible.sync="isDialogShow"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px" :rules="rule">
        <el-form-item label="名字：" prop="name">
          <el-input v-model="form.name" :disabled="detailType" />
        </el-form-item>
        <el-form-item label="性别：" prop="gender">
          <el-radio-group v-model="form.gender" size="small" :disabled="detailType">
            <el-radio-button
              v-for="item in genderList"
              :key="item.value"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>
          <!--          <el-select v-model="form.gender" style="width:100%" placeholder="请选择性别" :disabled="detailType">-->
          <!--            <el-option-->
          <!--              v-for="item in genderList"-->
          <!--              :key="item.value"-->
          <!--              :label="item.label"-->
          <!--              :value="item.value"-->
          <!--            />-->
          <!--          </el-select>-->
        </el-form-item>
        <el-form-item label="角色：" prop="role">
          <el-checkbox-group v-model="form.role" :disabled="detailType">
            <el-checkbox
              v-for="item in roleList"
              :key="item.value"
              :label="item.value"
            >
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="生日：" prop="date">
          <el-date-picker
            v-model="form.date"
            :disabled="detailType"
            style="width: 100%"
            type="datetime"
            placeholder="选择日期时间"
            value-format="timestamp"
          />
        </el-form-item>
        <el-form-item label="备注：" prop="memo">
          <el-input v-model="form.memo" type="textarea" :disabled="detailType" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">{{ detailType ? '确定' : '取消' }}</el-button>
        <el-button v-if="!detailType" size="small" type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
z
<script>
import { addDemo, editDemo } from '@/api/demo'

export default {
  name: 'ChangeDialog',
  props: {
    isDialogShow: {
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
        id: '',
        name: '',
        gender: '1',
        role: [],
        date: '',
        memo: ''
      },
      rule: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        role: [
          { type: 'array', required: true, message: '请选择角色', trigger: 'change' }
        ],
        date: [
          { required: true, message: '请选择生日', trigger: 'change' }
        ]
      }
    }
  },
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
    detailType () {
      return this.dialogObj.type === 2
    }
  },
  watch: {
    isDialogShow (val) {
      if (val && this.dialogObj.type !== 1) {
        this.$nextTick(() => {
          for (const key in this.form) {
            this.form[key] = this.dialogObj.data[key]
          }
        })
      }
    }
  },

  methods: {
    addDemoFn () {
      return addDemo(this.form).then(() => {
        this.$message.success('新增成功')
      })
    },
    editDemoFn () {
      return editDemo(this.form).then(() => {
        this.$message.success('编辑成功')
      })
    },
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.dialogObj.type === 1) {
            this.addDemoFn().finally(() => {
              this.$emit('handleSubmit')
              this.handleClose()
            })
          } else {
            this.editDemoFn().finally(() => {
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
