<template>
  <uploader
    ref="uploader"
    :options="options"
    class="uploader-example"
    @file-complete="fileComplete"
    @complete="complete"
    @uploadStart="uploadStart"
    @file-removed="removeFile"
    @file-retry="retryUpload"
    @file-error="uploadError"
  >
    <!--    不支持 HTML5 File API 的时候会显示-->
    <uploader-unsupport />
    <uploader-drop v-if="isDrop">
      <p>{{ dropStr }}或者</p>
      <uploader-btn :directory="isCanUploadfolder" :attrs="attrs">{{ btnStr }}</uploader-btn>
    </uploader-drop>
    <uploader-btn v-else :directory="isCanUploadfolder" :attrs="attrs">{{ btnStr }}</uploader-btn>
    <uploader-list />
  </uploader>
</template>

<script>
export default {
  props: {
    // refName: {
    //   type: String,
    //   default: 'uploader'
    // },
    api: {
      type: String,
      default: 'xxx'
    },
    uploadMethod: {
      type: String,
      default: 'POST'
    },
    accept: {
      type: String,
      default: ''
    },
    successStatuses: {
      type: Array,
      default: () => {
        return [200, 201, 202]
      }
    },
    permanentErrors: {
      type: Array,
      default: () => {
        return [404, 415, 500, 501]
      }
    },
    btnStr: {
      type: String,
      default: '选择文件'
    },
    dropStr: {
      type: String,
      default: '拖拽需要上传的文件'
    },
    isCanUploadfolder: {
      type: Boolean,
      default: false
    },
    isDrop: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      uploader: null,
      options: {
        target: this.api, // 上传地址
        chunkSize: 1 * 1024 * 1024,
        testChunks: true,
        uploadMethod: this.uploadMethod,
        successStatuses: this.successStatuses,
        permanentErrors: this.permanentErrors
      },
      attrs: {
        accept: this.accept
      }
    }
  },
  mounted () {
    // 获取uploader实例，可以用来调用实例的一些方法
    this.$nextTick(() => {
      this.uploader = this.$refs.uploader.uploader
      // console.log(this.uploader.upload, 'uploader')
    })
  },
  methods: {
    // @file-success="uploadSuccess"
    // 每一个文件上传成功之后都会触发（如果上传文件夹，文件夹中的每个文件上传成功也会触发）
    // 使用fileComplete即可，此事件暂时不需要使用
    // uploadSuccess (rootFile, file, message, chunk) {
    //   console.log(rootFile, file, message, chunk, 'uploadSuccess')
    // },
    // 全部文件上传完成
    complete () {
      // console.log('complete')
      this.$emit('complete')
    },
    // 一个根文件（文件夹）成功上传完成。
    fileComplete (rootFile) {
      // console.log(rootFile, 'fileComplete')
      this.$emit('fileComplete', rootFile)
    },
    // 移除文件成功
    removeFile (file) {
      // console.log(file, 'remove')
      this.$emit('uploadStart', file)
    },
    uploadStart () {
      // console.log('uploadStart')
      this.$emit('uploadStart')
    },
    retryUpload (rootFile, file, chunk) {
      // console.log(rootFile, file, chunk, 'retryUpload')
      this.$emit('retryUpload', rootFile, file, chunk)
    },
    uploadError (rootFile, file, message, chunk) {
      this.$emit('rootFile', rootFile, file, message, chunk)
      // console.log(rootFile, file, message, chunk, 'uploadError')
    },
    startUpload () {
      this.uploader.upload()
    },
    pauseUpload () {
      this.uploader.pause()
    },
    resumeUpload () {
      this.uploader.resume()
    },
    cancelUpload () {
      this.uploader.cancel()
    },
    getIsUploading () {
      return this.uploader.isUploading()
    },
    removeUploadFile (file) {
      return this.uploader.removeFile(file)
    },
    getUploadSize () {
      return this.uploader.getSize()
    },
    getUploadedSize () {
      return this.uploader.sizeUploaded()
    },
    getRemainTime () {
      return this.uploader.timeRemaining()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.uploader-example {
  width: 100%;
  margin: 8px 0px;
  padding: 12px;
  font-size: 12px;
  border: 1px solid $borderColor;
}

.uploader-example .uploader-btn {
  //padding: 8px 12px
}

.uploader-example .uploader-list {
  max-height: 440px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
