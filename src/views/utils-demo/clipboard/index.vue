<template>
  <el-card class="my-card" shadow="never">
    <div slot="header" class="clearfix">
      <span>复制文本</span>
    </div>
    <div>
      路径：<el-tag size="small" type="info">@/utils/clipboard</el-tag>
      <p>函数：</p>
      <p>
        /** <br>
        * @description 复制文本 <br>
        * @param {String} text,需要复制的文本 <br>
        * @param {Object} event ，鼠标事件的参数 <br>
        */ <br>
      </p>
      <p>
        <el-tag size="small" type="info">clip(text, event)</el-tag>
      </p>
      <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
      <el-button size="small" type="primary" icon="el-icon-document" @click="handleCopy(inputData,$event)">
        复制
      </el-button>

    </div>
    <div>
      <p>自定义指令：</p>
      <p>
        使用<el-tag size="small" type="info">v-clipboard</el-tag>自定义指令:
        <el-tag size="small" type="info">v-clipboard:copy="text"</el-tag>
      </p>
      <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
      <el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" size="small" type="primary" icon="el-icon-document">
        复制
      </el-button>
    </div>
  </el-card>
</template>

<script>
import clip from '@/utils/clipboard' // use clipboard directly
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive

export default {
  name: 'ClipboardDemo',
  directives: {
    clipboard
  },
  data () {
    return {
      activeName: 'directly',
      inputData: 'https://github.com/PanJiaChen/vue-element-admin'
    }
  },
  methods: {
    handleCopy (text, event) {
      clip(text, event)
    },
    clipboardSuccess () {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>

