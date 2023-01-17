<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
    <div :key="key" style="margin-top:30px;">
      <div>
        <span v-permission="['admin']" class="permission-alert">
          只有
          <el-tag class="permission-tag" size="small">admin</el-tag> 能看到这个
        </span>
        <el-tag v-permission="['admin']" class="permission-sourceCode" type="info">
          v-permission="['admin']"
        </el-tag>
      </div>

      <div>
        <span v-permission="['editor']" class="permission-alert">
          只有
          <el-tag class="permission-tag" size="small">editor</el-tag> 能看到这个
        </span>
        <el-tag v-permission="['editor']" class="permission-sourceCode" type="info">
          v-permission="['editor']"
        </el-tag>
      </div>

      <div>
        <span v-permission="['admin','editor']" class="permission-alert">
          <el-tag class="permission-tag" size="small">admin</el-tag> 和
          <el-tag class="permission-tag" size="small">editor</el-tag> 都可以看到这个
        </span>
        <el-tag v-permission="['admin','editor']" class="permission-sourceCode" type="info">
          v-permission="['admin','editor']"
        </el-tag>
      </div>
    </div>

    <div :key="'checkPermission'+key" style="margin-top:60px;">
      <aside>
        某些情况下，自定义指令可能无法使用，比如element-ui的tab某一项或者table的某一列需要根据权限隐藏，这个时候可以使用checkPermission配合v-if等等使用
        <br> e.g.
      </aside>

      <el-tabs type="border-card" style="width:550px;">
        <el-tab-pane v-if="checkPermission(['admin'])" label="Admin">
          Admin 可以看到
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['admin'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkPermission(['editor'])" label="Editor">
          Editor 可以看到
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['editor'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkPermission(['admin','editor'])" label="Admin-OR-Editor">
          admin or editor 都可以看到
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['admin','editor'])"
          </el-tag>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import SwitchRoles from './components/SwitchRoles'

export default {
  name: 'DirectivePermission',
  components: { SwitchRoles },
  directives: { permission },
  data () {
    return {
      key: 1 // 为了能每次切换权限的时候重新初始化指令
    }
  },
  methods: {
    checkPermission,
    handleRolesChange () {
      this.key++
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  ::v-deep .permission-alert {
    width: 320px;
    margin-top: 15px;
    background-color: #f0f9eb;
    color: #67c23a;
    padding: 8px 16px;
    border-radius: 4px;
    display: inline-block;
  }
  ::v-deep .permission-sourceCode {
    margin-left: 15px;
  }
  ::v-deep .permission-tag {
    background-color: #ecf5ff;
  }
}
</style>

