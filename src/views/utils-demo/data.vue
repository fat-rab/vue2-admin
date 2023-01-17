<template>
  <el-card class="my-card" shadow="never">
    <div slot="header">
      <span>数据类</span>
    </div>
    <div>
      <p>封装了部分常用方法，如果业务需要其他一些方法，可以使用lodash或者自行封装</p>
      <h3>
        数组工具类路径：
        <el-tag size="small" type="info">@/utils/array</el-tag>
      </h3>
      <p>
        /** <br>
        * @description 简单的一维数组去重 <br>
        * @param {Array} arr <br>
        * @returns {Array} <br>
        */ <br>
      </p>
      <p>
        <el-tag size="small" type="info">uniqueArr([1,2,3,1,2,3])</el-tag>
        =>
        <el-tag size="small" type="info">[1,2,3]</el-tag>
      </p>
      <h3>
        字典工具类路径：
        <el-tag size="small" type="info">@/utils/dict</el-tag>
      </h3>
      <p>
        /** <br>
        * @description 通过字典项的value返回对应字典项的label <br>
        * @param {Array} dictArr <br>
        * @param {string|number} value <br>
        * @returns {string|number} <br>
        */ <br>
      </p>
      <p>
        <el-tag size="small" type="info">getDictStr([{label:'a',value:'1'}],'1')</el-tag>
        =>
        <el-tag size="small" type="info">a</el-tag>
      </p>
      <p>
        /** <br>
        * @description 通过多个字典项value组成的数组返回对应的label拼接而成的字符串 <br>
        * @param {Array} dictArr <br>
        * @param {Array} arr <br>
        * @returns {string} <br>
        */ <br>
      </p>
      <p>
        <el-tag size="small" type="info">getDictStrFromArr([{label:'a',value:'1'},{label:'b',value:'2'}],['1','2'])
        </el-tag>
        =>
        <el-tag size="small" type="info">a,b</el-tag>
      </p>
      <h3>
        数字工具类路径：
        <el-tag size="small" type="info">@/utils/number</el-tag>
      </h3>
      <p>
        /** <br>
        * @description 数字格式化 <br>
        * @param {number} num <br>
        * @param {number} digits <br>
        * @returns {string} <br>
        */ <br>
      </p>
      <p>
        <el-tag size="small" type="info">numberFormatter(10123)</el-tag>
        =>
        <el-tag size="small" type="info">10k</el-tag>
      </p>
      <p>
        <el-tag size="small" type="info">numberFormatter(10123, 1)</el-tag>
        =>
        <el-tag size="small" type="info">10.1k</el-tag>
      </p>
      <p>
        <el-tag size="small" type="info"> numberFormatter(10123, 3)</el-tag>
        =>
        <el-tag size="small" type="info">10.123k</el-tag>
      </p>

      <p>
        /** <br>
        * @description 数字格式化成字符串 <br>
        * @param {number} num <br>
        * @returns {string} <br>
        */ <br>
      </p>
      <p>
        <el-tag size="small" type="info">toThousandFilter(10000)</el-tag>
        =>
        <el-tag size="small" type="info">"10,000"</el-tag>
      </p>
      <h3>
        字符串工具类路径：
        <el-tag size="small" type="info">@/utils/string</el-tag>
      </h3>
      <p>
        /** <br>
        * @description 将字符串的第一个字符大写 <br>
        * @param {String} String <br>
        * @returns {string} <br>
        */ <br>
      </p>
      <p>
        <el-tag size="small" type="info">uppercaseFirst('abc')</el-tag>
        =>
        <el-tag size="small" type="info">'Abc'</el-tag>
      </p>
    </div>

  </el-card>
</template>

<script>

export default {
  name: 'Array',
  directives: {},
  data () {
    return {}
  },
  mounted () {
  },
  methods: {

  }
}
</script>

