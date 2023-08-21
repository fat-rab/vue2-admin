<template>
  <div>
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item label="radio" prop="radio">
        <el-radio-group v-model="form.radio">
          <el-radio label="线上品牌商赞助" />
          <el-radio label="线下场地免费" />
        </el-radio-group>
      </el-form-item>
    </el-form>
    <button @click="test">test</button>
  </div>

</template>

<script>

export default {
  data () {
    return {
      form: {
        radio: ''
      },
      rules: {
        radio: [{ required: true, trigger: 'blur', message: '请选择radio' }]
      }
    }
  },

  mounted () {
    // const ele = document.getElementById('video1')
    // console.log(ele, 'ele')
    // navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    //   ele.srcObject = stream
    // })
  },
  methods: {
    test () {
      this.$refs.formRef.validate()
    }
  }
}
</script>
<style>
/*#driver-highlighted-element-stage {*/
/*  opacity: 0.2*/
/*}*/
</style>

