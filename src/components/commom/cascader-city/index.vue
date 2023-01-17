<template>
  <div>
    <el-cascader
      v-model="cascaderValue"
      style="width: 100%"
      collapse-tags
      :clearable="clearable"
      :filterable="filterable"
      :disabled="disabled"
      :options="optionArr"
      :props="{ multiple: multiple}"
      @change="changeCascader"
    />
  </div>
</template>

<script>
import { getAreaMessageList } from '@/api/components'
import { cloneDeep } from 'lodash'
export default {
  name: 'CascaderCity',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    cityArr: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      optionArr: [],
      cascaderValue: []
    }
  },
  component: {},
  computed: {},
  watch: {},
  created () {
    // 由于如果使用动态加载，多选情况下数据无法回显，所有暂时将所有数据全部显示
    // 动态加载使用函数渲染下拉框，回显无法使用函数，但是如果使用options属性渲染模版会存在重复渲染的bug
    this.getAreaMessageListFn()
  },
  mounted () {
    this.showChooseArea()
  },
  methods: {
    showChooseArea () {
      if (this.cityArr && this.cityArr.length) {
        this.cascaderValue = cloneDeep(this.cityArr)
      }
    },
    changeCascader (e) {
      this.$emit('update:cityArr', e)
      this.$emit('changeCascader', e)
    },
    getAreaMessageListFn () {
      getAreaMessageList().then(({ data }) => {
        this.optionArr = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
