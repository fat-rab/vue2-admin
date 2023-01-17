<template>
  <el-form ref="ruleForm" :model="form" :rules="rules" label-width="150px" class="demo-ruleForm">
    <el-form-item label="年龄(正整数)" prop="age">
      <el-input v-model="form.age" type="number" />
    </el-form-item>
    <el-form-item label="工作经验(大于等于0)" prop="workYear">
      <el-input v-model="form.workYear" type="number" />
    </el-form-item>
    <el-form-item label="ip地址" prop="ip">
      <el-input v-model="form.ip" />
    </el-form-item>
    <el-form-item label="手机号码" prop="phoneNumber">
      <el-input v-model="form.phoneNumber" />
    </el-form-item>
  </el-form>

</template>

<script>

import { validateIp, validatePhoneNumber, validatePositiveNum, validateZeroInteger } from '@/utils/validate'
export default {
  data () {
    return {
      form: {
        age: 1,
        workYear: 0,
        ip: '',
        phoneNumber: ''
      },
      rules: {
        age: [
          { required: true, validator: validatePositiveNum, trigger: 'blur' }
        ],
        workYear: [
          { required: true, validator: validateZeroInteger, trigger: 'blur' }
        ],
        ip: [
          { required: true, validator: validateIp, trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, validator: validatePhoneNumber, trigger: 'blur' }
        ]
      }
    }
  }

}
</script>

