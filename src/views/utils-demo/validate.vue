<template>
  <el-card class="my-card" shadow="never">
    <div slot="header">
      <span>正则类</span>
    </div>
    <div>
      <h2>
        正则类路径：
        <el-tag size="small" type="info">@/utils/validate</el-tag>
      </h2>
      <p>自定义正则，用于form表单中</p>
      <p>示例</p>
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
      <p>示例代码</p>
      <code-mirror :read-only="true" :code-text="showCodeText" />
    </div>

  </el-card>
</template>

<script>

import { validateIp, validatePhoneNumber, validatePositiveNum, validateZeroInteger } from '@/utils/validate'
import CodeMirror from '@/components/commom/code-mirror'
export default {
  name: 'Validate',
  components: { CodeMirror },
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
      },
      showCodeText: '<template>\n' +
        '  <el-form ref="ruleForm" :model="form" :rules="rules" label-width="150px" class="demo-ruleForm">\n' +
        '    <el-form-item label="年龄(正整数)" prop="age">\n' +
        '      <el-input v-model="form.age" type="number" />\n' +
        '    </el-form-item>\n' +
        '    <el-form-item label="工作经验(大于等于0)" prop="workYear">\n' +
        '      <el-input v-model="form.workYear" type="number" />\n' +
        '    </el-form-item>\n' +
        '    <el-form-item label="ip地址" prop="ip">\n' +
        '      <el-input v-model="form.ip" />\n' +
        '    </el-form-item>\n' +
        '    <el-form-item label="手机号码" prop="phoneNumber">\n' +
        '      <el-input v-model="form.phoneNumber" />\n' +
        '    </el-form-item>\n' +
        '  </el-form>\n' +
        '\n' +
        '</template>\n' +
        '\n' +
        '\<script\>\n' +
        '\n' +
        'import { validateIp, validatePhoneNumber, validatePositiveNum, validateZeroInteger } from \'@/utils/validate\'\n' +
        'export default {\n' +
        '  data () {\n' +
        '    return {\n' +
        '      form: {\n' +
        '        age: 1,\n' +
        '        workYear: 0,\n' +
        '        ip: \'\',\n' +
        '        phoneNumber: \'\'\n' +
        '      },\n' +
        '      rules: {\n' +
        '        age: [\n' +
        '          { required: true, validator: validatePositiveNum, trigger: \'blur\' }\n' +
        '        ],\n' +
        '        workYear: [\n' +
        '          { required: true, validator: validateZeroInteger, trigger: \'blur\' }\n' +
        '        ],\n' +
        '        ip: [\n' +
        '          { required: true, validator: validateIp, trigger: \'blur\' }\n' +
        '        ],\n' +
        '        phoneNumber: [\n' +
        '          { required: true, validator: validatePhoneNumber, trigger: \'blur\' }\n' +
        '        ]\n' +
        '      }\n' +
        '    }\n' +
        '  }\n' +
        '\n' +
        '}\n' +
        '\<\/script\>'
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

