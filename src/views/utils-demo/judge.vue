<template>
  <el-card class="my-card" shadow="never">
    <div slot="header">
      <span>判断类</span>
    </div>
    <div>
      <h2>
        判断类路径：
        <el-tag size="small" type="info">@/utils/judge</el-tag>
      </h2>
      <p>
        /** <br>
        * @description 是否是url <br>
        * @param {string} url <br>
        * @returns {Boolean} <br>
        */
      </p>
      <p>
        <el-tag size="small" type="info">validURL('https://cn.bing.com/')</el-tag>
        =>
        <el-tag size="small" type="info">true</el-tag>
      </p>
      <p>
        <el-tag size="small" type="info">validURL('https://cn.bing.sds/')</el-tag>
        =>
        <el-tag size="small" type="info">false</el-tag>
      </p>
      <p>
        /** <br>
        * @description 判断字符串是否都是小写 <br>
        * @param {string} str <br>
        * @returns {Boolean} <br>
        */
      </p>
      <p>
        <el-tag size="small" type="info">validLowerCase('abcd')</el-tag>
        =>
        <el-tag size="small" type="info">true</el-tag>
      </p>
      <p>
        <el-tag size="small" type="info">validLowerCase('Abcd')</el-tag>
        =>
        <el-tag size="small" type="info">false</el-tag>
      </p>
      <p>
        /** <br>
        * @description 判断字符串是否都是大写 <br>
        * @param {string} str <br>
        * @returns {Boolean} <br>
        */
      </p>
      <p>
        <el-tag size="small" type="info">validUpperCase('ABCD')</el-tag>
        =>
        <el-tag size="small" type="info">true</el-tag>
      </p>
      <p>
        <el-tag size="small" type="info">validUpperCase('Abcd')</el-tag>
        =>
        <el-tag size="small" type="info">false</el-tag>
      </p>
      <p>
        /** <br>
        * @description 判断字符串是否是完全由英文组成 <br>
        * @param {string} str <br>
        * @returns {Boolean} <br>
        */
      </p>
      <p>
        <el-tag size="small" type="info">validAlphabets('ABcd')</el-tag>
        =>
        <el-tag size="small" type="info">true</el-tag>
      </p>
      <p>
        <el-tag size="small" type="info">validAlphabets('Ab中文')</el-tag>
        =>
        <el-tag size="small" type="info">false</el-tag>
      </p>
      <p>js判断数据类型有很多方法，但是都不完美，所以需要根据情况来进行使用</p>
      <p><el-tag size="small" type="info">typeof</el-tag>：  无法判断Object类型</p>
      <p><el-tag size="small" type="info">instanceof</el-tag>： 无法判断基础类型，虽然typeof null 是object ,但是null并不是Object 实例，null instanceof Object 为false</p>
      <p><el-tag size="small" type="info">constructor</el-tag>：可以判断自定义类型，undefined,null没有这个方法，调用会报错 ，{a:1}.constructor.name = 'Object'</p>
      <p><el-tag size="small" type="info">Object.Prototype.toString.call()</el-tag> :检测对象内部属性的[[class]]属性，不可以检测自定义类型</p>
      <p>
        /** <br>
        * @description 判断是否是数组 <br>
        * @param {any} arg <br>
        * @returns {Boolean} <br>
        */
      </p>
      <p>
        <el-tag size="small" type="info">isArray([1])</el-tag>
        =>
        <el-tag size="small" type="info">true</el-tag>
      </p>
      <p>
        <el-tag size="small" type="info">isArray({a:1})</el-tag>
        =>
        <el-tag size="small" type="info">false</el-tag>
      </p>
      <p>
        /** <br>
        * @description 判断是否是对象（不是数组） <br>
        * @param {any} arg <br>
        * @returns {Boolean} <br>
        */
      </p>
      <p>
        <el-tag size="small" type="info">isObject({a:1})</el-tag>
        =>
        <el-tag size="small" type="info">true</el-tag>
      </p>
      <p>
        <el-tag size="small" type="info">isObject([1])</el-tag>
        =>
        <el-tag size="small" type="info">false</el-tag>
      </p>
    </div>

  </el-card>
</template>

<script>

import { isObject } from '@/utils/judge'

export default {
  name: 'Validate',
  directives: {},
  data () {
    return {}
  },
  mounted () {
    console.log(isObject([1]))
  },
  methods: {}
}
</script>

