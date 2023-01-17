<template>
  <el-card class="my-card" shadow="never">
    <div slot="header">
      <span>大文件上传</span>
    </div>
    <p>
      基于vue-simple-uploader二次封装的大文件上传组件，如果需要上传一些上百M，甚至几个G的文件，则需要用到此组件。
      封装了部分常用属性和事件，可以根据业务自行改进
    </p>
    <p style="color: blue">
      <a target="_blank" href="https://github.com/simple-uploader/Uploader/blob/develop/README_zh-CN.md">simple-uploader.js文档</a>
    </p>
    <p style="color: blue">
      <a target="_blank" href="https://github.com/simple-uploader/vue-uploader/blob/master/README_zh-CN.md">vue-simple-uploader文档</a>
    </p>
    <p>引入方式</p>
    <p>
      <el-tag size="small" type="info">import uploader from '@/components/commom/uploader'</el-tag>
    </p>
    <p>
      <el-tag size="small" type="info">components: {uploader}</el-tag>
    </p>

    <p>卸载方式</p>
    <p>使用
      <el-tag size="small" type="info">npm uninstall vue-simple-uploader</el-tag>
      卸载依赖包
    </p>
    <p>删除
      <el-tag size="small" type="info">@/components/commom/uploader</el-tag>
      文件夹
    </p>
    <p>
      <el-tag size="small" type="info">main.js</el-tag>
      中删除
      <el-tag size="small" type="info">import uploader from 'vue-simple-uploader'</el-tag>
      ，
      <el-tag size="small" type="info">Vue.use(uploader)</el-tag>
    </p>
    <h3>基础使用</h3>
    <p>示例</p>
    <p>
      通过
      <el-tag size="small" type="info">api</el-tag>
      属性，设置上传地址，默认'xx',可以根据业务自行更改默认值
    </p>
    通过
    <el-tag size="small" type="info">accept</el-tag>
    属性，设置允许上传的文件类型，默认允许全部类型
    <uploader accept="image/*" />
    <p>示例代码</p>
    <code-mirror :read-only="true" :code-text="showCodeText" />
    <h3>拖拽上传</h3>
    <p>示例</p>
    <p>
      通过
      <el-tag size="small" type="info">isDrop</el-tag>
      属性，设置是否可以拖拽上传，默认false
    </p>
    <p>
      通过
      <el-tag size="small" type="info">isCanUploadfolder</el-tag>
      属性，设置是否可以上传文件夹，默认false
    </p>
    <p>
      通过
      <el-tag size="small" type="info">btnStr</el-tag>属性，设置上传按钮的文字
    </p>
    <p>
      通过
      <el-tag size="small" type="info">dropStr</el-tag>属性，设置拖拽提示的文字
    </p>
    <uploader :is-drop="true" :is-can-uploadfolder="true" btn-str="选择文件(夹)" drop-str="拖动需要上传的文件(夹)" />
    <p>示例代码</p>
    <code-mirror ref="codeMirror1" :read-only="true" :code-text="showCodeText1" />
    <h2>组件传参</h2>
    <main-table
      :table-data="tableData1"
      :columns="columns1"
      :show-pagination="false"
      :show-search-box="false"
    />
    <h2>组件事件</h2>
    <main-table
      :table-data="tableData2"
      :columns="columns2"
      :show-pagination="false"
      :show-search-box="false"
    />
    <h2>组件函数</h2>
    <main-table
      :table-data="tableData3"
      :columns="columns3"
      :show-pagination="false"
      :show-search-box="false"
    />
  </el-card>
</template>

<script>
import Uploader from '@/components/commom/uploader'
import CodeMirror from '@/components/commom/code-mirror'
import MainTable from '@/components/commom/main-table'

export default {
  components: {
    Uploader,
    CodeMirror,
    MainTable
  },
  data () {
    return {
      showCodeText: '\<template\>\n' +
        '<uploader accept="image/*" />\n' +
        '</template>\n' +
        '\<script\>\n' +
        'import Uploader from \'@/components/commom/uploader\'\n' +
        'export default {\n' +
        '  components: {\n' +
        '    Uploader,\n' +
        '  },\n' +
        '}' +
        '\<\/script\>',
      showCodeText1: '\<template\>\n' +
        '<uploader :is-drop="true" :is-can-uploadfolder="true" btn-str="选择文件(夹)" drop-str="拖动需要上传的文件(夹)" />\n' +
        '</template>\n' +
        '\<script\>\n' +
        'import Uploader from \'@/components/commom/uploader\'\n' +
        'export default {\n' +
        '  components: {\n' +
        '    Uploader,\n' +
        '  },\n' +
        '}' +
        '\<\/script\>',
      columns1: [
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
      tableData1: [
        {
          name: 'api',
          type: 'string',
          isRequired: '否',
          defaultValue: 'xx',
          description: '上传图片的api'
        },
        {
          name: 'accept',
          type: 'String',
          isRequired: '否',
          defaultValue: '',
          description: '过滤上传文件的类型'
        },
        {
          name: 'uploadMethod',
          type: 'String',
          isRequired: '否',
          defaultValue: 'POST',
          description: '上传文件api的类型'
        },
        {
          name: 'successStatuses',
          type: 'Array',
          isRequired: '否',
          defaultValue: '[200, 201, 202]',
          description: '响应式成功的响应码'
        },
        {
          name: 'permanentErrors',
          type: 'Array',
          isRequired: '否',
          defaultValue: '[404, 415, 500, 501]',
          description: '响应式失败的响应码'
        },
        {
          name: 'btnStr',
          type: 'String',
          isRequired: '否',
          defaultValue: '选择文件',
          description: '上传按钮的文字'
        },
        {
          name: 'dropStr',
          type: 'String',
          isRequired: '否',
          defaultValue: '拖拽需要上传的文件',
          description: '拖拽上传的提示文字'
        },
        {
          name: 'isCanUploadfolder',
          type: 'Boolean',
          isRequired: '否',
          defaultValue: 'false',
          description: '是否可以上传文件夹'
        },
        {
          name: 'isDrop',
          type: 'Boolean',
          isRequired: '否',
          defaultValue: 'false',
          description: '是否可以拖拽上传'
        }
      ],
      columns2: [
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
      tableData2: [
        {
          name: 'fileComplete',
          param: 'rootFile',
          description: '一个根文件（文件夹）上传成功时触发,参数为根文件的信息'
        },
        {
          name: 'complete',
          param: '',
          description: '所有上传的文件上传成功时触发'
        },
        {
          name: 'uploadStart',
          param: '',
          description: '上传开始时触发'
        },
        {
          name: 'removeFile',
          param: 'file',
          description: '移除文件时候触发，参数为移除文件的参数'
        },
        {
          name: 'retryUpload',
          param: 'rootFile, file, chunk',
          description: '重试上传文件的时候触发，参数rootFile为根文件信息，file为当前文件信息，chunk为分片相关信息'
        },
        {
          name: 'uploadError',
          param: 'rootFile, file, message, chunk',
          description: '上传文件失败的时候触发，参数rootFile为根文件信息，file为当前文件信息，message为接口返回的信息（字符串类型）chunk为分片相关信息'
        }
      ],
      columns3: [
        {
          label: '函数名称',
          prop: 'name',
          fixed: 'left'
        },
        {
          label: '参数',
          prop: 'param'
        },
        {
          label: '参数类型',
          prop: 'type'
        },
        {
          label: '说明',
          prop: 'description',
          minWidth: 200
        }
      ],
      tableData3: [
        {
          name: 'startUpload',
          param: '',
          type: '',
          description: '开始/继续上传'
        },
        {
          name: 'pauseUpload',
          param: '',
          type: '',
          description: '暂定上传'
        },
        {
          name: 'resumeUpload',
          param: '',
          type: '',
          description: '继续上传'
        },
        {
          name: 'cancelUpload',
          param: '',
          type: '',
          description: '取消所有文件的上传，并且移除文件'
        },
        {
          name: 'getIsUploading',
          param: '',
          type: '',
          description: '返回一个Boolean,表示是否有文件正在上传'
        },
        {
          name: 'removeUploadFile',
          param: 'file',
          type: 'Object',
          description: '从上传列表中移除指定的Uploader.File实例（如果自定义上传文件的列表，可能需要用到）'
        },
        {
          name: 'getUploadSize',
          param: '',
          type: '',
          description: '获取上传文件的大小'
        },
        {
          name: 'getUploadedSize',
          param: '',
          type: '',
          description: '获取已经上传文件的大小'
        },
        {
          name: 'getRemainTime',
          param: '',
          type: '',
          description: '获取剩余上传的事件'
        }
      ]
    }
  },
  methods: {}
}
</script>

