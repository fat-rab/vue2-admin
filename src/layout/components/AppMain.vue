<template>
  <section class="app-main">
    <div class="main-box">
      <el-scrollbar class="scrollbar-wrapper">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cachedViews">
            <router-view :key="key" />
          </keep-alive>
        </transition>
      </el-scrollbar>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews () {
      return this.$store.state.tagsView.cachedViews
    },
    key () {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.app-main {
  height: calc(100vh - #{$headerHeight});
  width: 100%;
  position: relative;
  top: calc(#{$headerHeight});
  overflow: hidden;
  padding: 10px;
  background-color: $bgColor;

  .main-box {
    height: 100%;
    background: #ffffff;
    overflow: hidden;
  }

  .scrollbar-wrapper {
    height: 100%;

    ::v-deep .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
}

.hasTagsView {
  .app-main {
    height: calc(100vh - #{$headerHeight} - #{$navbarHeight});
    top: calc(#{$headerHeight} + #{$navbarHeight});

    .scrollbar-wrapper {
      height: 100%;
    }
  }
}
</style>

