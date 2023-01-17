<template>
  <el-card class="my-card" shadow="never">
    <div slot="header">
      <span>时间类</span>
    </div>
    <div>
      时间类路径：
      <el-tag size="small" type="info">@/utils/time</el-tag>
      <p>
        /** <br>
        * @description 格式化时间 <br>
        * @param {(Object|string|number)} time <br>
        * @param {string} cFormat ，默认'{y}-{m}-{d} {h}:{i}:{s}' <br>
        * @returns {string | null} <br>
        */
      </p>
      <p>
        <el-tag size="small" type="info">parseTime(new Date())</el-tag>
        =>
        <el-tag size="small" type="info">2021-07-28 15:07:23</el-tag>
      </p>
      <p>
        <el-tag size="small" type="info">parseTime('1548221490638')</el-tag>
        =>
        <el-tag size="small" type="info">2019-01-23 13:31:30</el-tag>
      </p>
      <p>
        <el-tag size="small" type="info">parseTime(1548221490638)</el-tag>
        =>
        <el-tag size="small" type="info">2019-01-23 13:31:30</el-tag>
      </p>
    </div>

  </el-card>
</template>

<script>

export default {
  name: 'Number',
  directives: {},
  data () {
    return {}
  },
  mounted () {
  },
  methods: {}
}
</script>

