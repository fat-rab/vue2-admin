<template>
  <div>
    <svg-icon style="color: #ffffff" :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click" />
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'ScreenFull',
  data () {
    return {
      isFullscreen: false
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.destroy()
  },
  methods: {
    click () {
      if (!screenfull.enabled) {
        this.$message({
          message: '您的浏览器不支持全屏操作',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    change () {
      this.isFullscreen = screenfull.isFullscreen
    },
    init () {
      if (screenfull.enabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy () {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>

