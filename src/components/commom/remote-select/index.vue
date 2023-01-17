<template>
  <div>
    <el-select
      v-model="selectDate"
      style="width: 100%"
      filterable
      remote
      reserve-keyword
      :clearable="clearable"
      placeholder="请输入关键词搜索"
      :multiple="multiple"
      :loading="loading"
      :disabled="disabled"
      :remote-method="remoteMethod"
      @change="changeSelect"
    >
      <el-option
        v-for="item in selectList"
        :key="item[props.value]"
        :label="item[props.label]"
        :value="item[props.value]"
      />
      <li :class="classObj" @click="showMoreList">{{ loadingText }}</li>
      <div slot="empty">
        <!--        element的bug，当使用了empty的插槽时，loading的时候，不显示加载中，所以需要手动显示-->
        <div v-show="loading" class="empty-slot">加载中</div>
        <!--        slot无法使用v-show，所以这里使用v-if-->
        <slot v-if="!loading" name="emptySlot">
          <div class="empty-slot">暂无数据</div>
        </slot>
      </div>
    </el-select>
  </div>
</template>

<script>
// 支持该远程查询组件的接口，都需要和后端沟通，
// 通过 my_listCount(避免出现传参属性重复)获取对应条数的数据
// 远程查询的回显，通过放在params参数中的id(或者其他字段)（多选传递id拼接的字符串）获取对应数据的下拉列表
// 需要注意的是，如果传递了id（或者类似的字段）用作回显，则不管my_listCount（可能会出现id数量超过my_listCount的情况），直接返回所有id相关数据
// 回显之后进行编辑，查询时，即传递了keyword，则不管传递的id，根据keyword和count来获取数据
// 这些都需要和后端的接口约定
import { debounce, cloneDeep } from 'lodash'

export default {
  name: 'RemoteSelect',
  props: {
    value: {
      type: [Array, String],
      required: true
    },
    api: {
      type: Function,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    params: {
      type: Object,
      default: () => {
        return {}
      }
    },
    props: {
      type: Object,
      default: () => {
        return {
          data: 'data',
          label: 'label',
          value: 'value',
          key: 'keyWord'
        }
      }
    }
  },
  data () {
    return {
      my_listCount: 10,
      loading: false,
      keyWord: '',
      selectDate: null,
      selectList: [],
      selectLoading: false
    }
  },
  computed: {
    classObj () {
      return {
        'click-option': !this.selectLoading,
        'finish-option': this.selectLoading
      }
    },
    loadingText () {
      return this.selectLoading ? '全部数据加载完毕' : '点击加载更多'
    }
  },
  mounted () {
    this.showChoosedSelect()
  },
  methods: {
    showChoosedSelect () {
      if (this.multiple && this.value && this.value.length) {
        this.selectDate = cloneDeep(this.value)
      }
      if (!this.multiple && this.value) {
        this.selectDate = this.value
      }
      // 这里不要调用防抖函数，否则如果一个页面有多个该组件的话，会出现调用一次接口的情况
      this.getSelectListFn()
    },
    showMoreList () {
      if (this.selectLoading) return
      this.my_listCount += 10
      this.getSelectListFn()
    },
    changeSelect (e) {
      this.$emit('update:value', e)
      this.$emit('changeSelect', e)
    },
    remoteMethod (query) {
      this.my_listCount = 10
      this.keyWord = query
      if (query !== '') {
        this.debounceGetSelectList()
      } else {
        this.selectList = []
      }
    },
    debounceGetSelectList: debounce(function () {
      this.loading = true
      if (this.keyWord) {
        const { key } = this.props
        this.params[key] = this.keyWord
      }
      this.getSelectListFn()
    }, 250),
    getSelectListFn () {
      this.api({ my_listCount: this.my_listCount, ...this.params }).then((res) => {
        this.selectList = res[this.props.data]
        if (this.selectList.length < this.my_listCount) {
          this.selectLoading = true
        }
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.click-option {
  height: 34px;
  line-height: 34px;
  color: $mainColor;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 20px;
  cursor: pointer;
}
.finish-option{
  height: 34px;
  line-height: 34px;
  color: #C0C4CC;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 20px;
  cursor: not-allowed;
}
.empty-slot{
  height: 34px;
  line-height: 34px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 20px;
}

</style>
