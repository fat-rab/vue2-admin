<template>
  <el-card class="my-card" shadow="never">
    <div slot="header" class="clearfix">
      <span>分割面板</span>
    </div>
    <div>
      <h2>组合分割</h2>
      <p>示例</p>
      <p>引入方式：</p>
      <p><el-tag size="small" type="info">import splitPane from 'vue-splitpane'</el-tag></p>
      <p><el-tag size="small" type="info">components: { splitPane }</el-tag></p>
      <p>卸载方式</p>
      <p>使用
        <el-tag size="small" type="info">npm uninstall vue-splitpane</el-tag>
        卸载依赖包
      </p>
      <h3 style="color: #ed5858">1. 必须将组件嵌套在固定高度的div中</h3>
      <h3 style="color:#ed5858">
        2.
        同一个页面，似乎只能使用一个split-pane标签（组合分割除外），否则纵向分割可能会出现无法改变分区大小的bug，
        所以如果同一个页面需要使用多个split-pane标签，最好使用组合分割的形式
      </h3>
      <p>可以尝试将鼠标悬浮与分界出，点击拖动</p>
      <div style="height: 300px">
        <split-pane
          split="vertical"
          :min-percent="30"
          :default-percent="40"
          :max-percent="60"
          @resize="resize"
        >
          <template slot="paneL">
            <div class="left-container" />
          </template>
          <template slot="paneR">
            <split-pane split="horizontal">
              <template slot="paneL">
                <div class="top-container" />
              </template>
              <template slot="paneR">
                <div class="bottom-container" />
              </template>
            </split-pane>
          </template>
        </split-pane>
      </div>
      <p>示例代码</p>
      <code-mirror :read-only="true" :code-text="showCodeText" />
      <h2>组件传参</h2>
      <main-table
        :table-data="tableData"
        :columns="columns"
        :show-pagination="false"
        :show-search-box="false"
      />
      <h2>组件事件</h2>
      <main-table
        :table-data="tableData1"
        :columns="columns1"
        :show-pagination="false"
        :show-search-box="false"
      />
    </div>
  </el-card>
</template>

<script>
import splitPane from 'vue-splitpane'
import CodeMirror from '@/components/commom/code-mirror'
import MainTable from '@/components/commom/main-table'

export default {
  name: 'SplitpaneDemo',
  components: { splitPane, MainTable, CodeMirror },
  data () {
    return {
      showCodeText:
        '<div style="height: 300px">\n' +
        '  <split-pane split="vertical" :min-percent="30" :default-percent="40" :max-percent="60" @resize="resize">\n' +
        '     <template slot="paneL">\n' +
        '        <div class="left-container" />\n' +
        '          </template>\n' +
        '          <template slot="paneR">\n' +
        '            <split-pane split="horizontal">\n' +
        '              <template slot="paneL">\n' +
        '                <div class="top-container" />\n' +
        '              </template>\n' +
        '              <template slot="paneR">\n' +
        '                <div class="bottom-container" />\n' +
        '              </template>\n' +
        '            </split-pane>\n' +
        '      </template>\n' +
        '  </split-pane>\n' +
        '</div>\n' +
        '\<script\>\n' +
        'export default{\n' +
        '  methods:{\n' +
        '    resize (e) {\n' +
        '      console.log(e, \'resize\')\n' +
        '    }\n' +
        '  }\n' +
        '}\n' +
        '\<\/script\>',
      columns: [
        {
          label: '参数名称',
          prop: 'name',
          fixed: 'left'
        },
        {
          label: '参数类型',
          prop: 'type'
        },
        {
          label: '是否必填',
          prop: 'isRequired'
        },
        {
          label: '参数默认值',
          prop: 'defaultValue'
        },
        {
          label: '说明',
          prop: 'description',
          minWidth: 200
        }
      ],
      tableData: [
        {
          name: 'split',
          type: 'string',
          isRequired: '是',
          defaultValue: '',
          description: 'vertical为横向分割，horizontal为纵向分割'
        },
        {
          name: 'default-percent',
          type: 'number',
          isRequired: '否',
          defaultValue: '50',
          description: '分割面板第一片分区默认占比'
        },
        {
          name: 'min-percent',
          type: 'number',
          isRequired: '否',
          defaultValue: '10',
          description: '分区最小占比'
        },
        {
          name: 'max-percent',
          type: 'number',
          isRequired: '否',
          defaultValue: '90',
          description: '分区最大占比'
        }
      ],
      columns1: [
        {
          label: '事件名称',
          prop: 'name',
          fixed: 'left'
        },
        {
          label: '回调参数',
          prop: 'param'
        },
        {
          label: '说明',
          prop: 'description',
          minWidth: 200
        }
      ],
      tableData1: [
        {
          name: 'resize',
          param: 'value',
          description:
            '改变分割面板分区大小时候会触发, 回调参数：第一片分区的当前占比'
        }
      ]
    }
  },
  methods: {
    resize (e) {
      console.log(e, 'resize')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.left-container {
  background-color: #f38181;
  height: 100%;
}

.right-container {
  background-color: #fce38a;
  height: 100%;
}

.top-container {
  background-color: #fce38a;
  width: 100%;
  height: 100%;
}

.bottom-container {
  width: 100%;
  background-color: #95e1d3;
  height: 100%;
}
</style>
