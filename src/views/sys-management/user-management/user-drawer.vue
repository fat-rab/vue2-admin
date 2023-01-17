<template>
  <div>
    <el-drawer
      :title="drawerObj.title"
      :visible.sync="drawerShow"
      size="40%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="100px" :rules="rule">
        <el-form-item label="账号：" prop="account">
          <el-input v-model="form.account" :disabled="detailType" />
        </el-form-item>
        <el-form-item v-if="addType" label="密码：" prop="password">
          <el-input v-model="form.password" show-password :disabled="detailType" />
        </el-form-item>
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
        <el-form-item label="手机号码：" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" :disabled="detailType" />
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
import { addUser, editUser } from '@/api/sys-management'
import { mapState } from 'vuex'
import { validatePhoneNumber } from '@/utils/validate'

export default {
  name: 'UserDrawer',
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
      form: {
        account: '',
        password: '',
        name: '',
        gender: '1',
        role: [],
        phoneNumber: '',
        memo: ''
      },
      rule: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        role: [
          { type: 'array', required: true, message: '请选择角色', trigger: 'change' }
        ],
        phoneNumber: [
          { required: true, validator: validatePhoneNumber, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    detailType () {
      return this.drawerObj.type === 2
    },
    addType () {
      return this.drawerObj.type === 1
    },
    ...mapState({
      genderList: (state) => state.app.dict.gender,
      roleList: (state) => state.app.dict.role
    })
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
    addUserFn () {
      return addUser(this.form).then(() => {
        this.$message.success('新增成功')
      })
    },
    editUserFn () {
      return editUser(this.form).then(() => {
        this.$message.success('编辑成功')
      })
    },
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.drawerObj.type === 1) {
            this.addUserFn().finally(() => {
              this.$emit('handleSubmit')
              this.handleClose()
            })
          } else {
            this.editUserFn().finally(() => {
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
