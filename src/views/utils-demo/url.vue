<template>
  <el-card class="my-card" shadow="never">
    <div slot="header">
      <span>url类</span>
    </div>
    <div>
      <h2>
        url类路径：
        <el-tag size="small" type="info">@/utils/url</el-tag>
      </h2>
      <p>
        /** <br>
        * @description 获取当前url或者传入url中的参数 <br>
        * @param {string} url <br>
        * @returns {object} <br>
        */
      </p>
      <p>
        <el-tag size="small" type="info">getQueryObject()</el-tag>
        =>
        <el-tag size="small" type="info">{}</el-tag>
      </p>
      <p>
        <el-tag size="small" type="info">getQueryObject('https://www.bing.com/search?q=decodeURIComponent&form=QBLH')</el-tag>
        =>
        <el-tag size="small" type="info">{q: "decodeURIComponent", form: "QBLH"}</el-tag>
      </p>
    </div>

  </el-card>
</template>

<script>

export default {
  name: 'Url',
  directives: {},
  data () {
    return {}
  },
  mounted () {
  },
  methods: {}
}
</script>

