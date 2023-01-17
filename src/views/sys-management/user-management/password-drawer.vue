<template>
  <div>
    <el-drawer
      title="修改密码"
      :visible.sync="drawerShow"
      size="40%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="100px" :rules="rule">
        <el-form-item label="新密码：" prop="password">
          <el-input v-model="form.password" show-password />
        </el-form-item>
        <el-form-item label="确认密码：" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" show-password />
        </el-form-item>
      </el-form>
      <div class="drawer-action-box">
        <el-button size="small" @click="handleClose">取消</el-button>
        <el-button size="small" type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-drawer>
  </div>
</template>
z
<script>
import { changePassword } from '@/api/sys-management'

export default {
  name: 'PasswordDrawer',
  props: {
    drawerShow: {
      type: Boolean,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      form: {
        password: '',
        confirmPassword: ''
      },
      rule: {
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
  },

  methods: {
    changePasswordFn () {
      changePassword({ id: this.id, password: this.form.password }).then(() => {
        this.$message.success('密码修改成功')
        this.handleClose()
      })
    },
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.password !== this.form.confirmPassword) {
            this.$message.error('两次密码输入不一致')
          } else {
            this.changePasswordFn()
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
