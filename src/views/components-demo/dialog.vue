<template>
  <el-card class="my-card" shadow="never">
    <div slot="header" class="clearfix">
      <span>可拖拽dialog</span>
    </div>
    <p>引入方式：</p>
    <p>
      <el-tag size="small" type="info">import dragDialog from '@/directive/el-drag-dialog/drag'</el-tag>
    </p>
    <p>
      <el-tag size="small" type="info">directives: { dragDialog }</el-tag>
    </p>
    <p>卸载方式</p>
    <p>删除
      <el-tag size="small" type="info">@/directive/el-drag-dialog</el-tag>
      文件夹
    </p>
    <p>示例</p>
    <p>
      在dialog上添加自定义指令：
      <el-tag size="small" type="info">v-dragDialog</el-tag>
      ，即可对dialog进行拖拽
    </p>
    <el-button type="text" @click="isDialogShow = true">点击打开 Dialog</el-button>
    <el-dialog
      v-dragDialog
      title="提示"
      width="30%"
      :visible.sync="isDialogShow"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="isDialogShow = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <p>示例代码</p>
    <code-mirror :read-only="true" :code-text="showCodeText" />
  </el-card>
</template>

<script>
import CodeMirror from '@/components/commom/code-mirror'
import dragDialog from '@/directive/el-drag-dialog/drag'

export default {
  name: 'Dialog',
  directives: { dragDialog },
  components: {
    CodeMirror
  },
  data () {
    return {
      isDialogShow: false,
      showCodeText:
        '<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>\n' +
        '<el-dialog\n' +
        '      v-dragDialog\n' +
        '      title="提示"\n' +
        '      :visible.sync="isDialogShow"\n' +
        '      width="30%"\n' +
        '      :before-close="handleClose"\n' +
        '    >\n' +
        '      <span>这是一段信息</span>\n' +
        '      <span slot="footer" class="dialog-footer">\n' +
        '        <el-button @click="isDialogShow = false">取 消</el-button>\n' +
        '        <el-button type="primary" @click="isDialogShow = false">确 定</el-button>\n' +
        '      </span>\n' +
        '</el-dialog>\n' +
        '\<script\>\n' +
        'import dragDialog from \'@/directive/el-drag-dialog/drag\'\n' +
        'export default{\n' +
        '  directives: { dragDialog },\n' +
        '  data () {\n' +
        '    return{\n' +
        '      dialogVisible: false\n' +
        '    }\n' +
        '  }\n' +
        '\<\/script\>'
    }
  },
  component: {},
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
