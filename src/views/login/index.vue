<template>
  <div class="login-container">
    <div class="form-container">
      <div class="title-container">
        欢迎登陆
      </div>

      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >

        <el-form-item prop="username">
          <el-input
            ref="username"
            v-model="loginForm.username"
            name="username"
            tabindex="1"
            placeholder="请输入账号"
            class="input-with-select"
            autocomplete="on"
          >
            <el-button slot="prepend" size="small">
              <svg-icon icon-class="user" />
            </el-button>
          </el-input>
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="大写开启" placement="right" manual>
          <el-form-item prop="password">

            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
              tabindex="2"
              show-password
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            >
              <el-button slot="prepend" size="small">
                <svg-icon icon-class="password" />
              </el-button>
            </el-input>
          </el-form-item>
        </el-tooltip>

        <el-button
          :loading="loading"
          type="primary"
          size="small"
          style="width:100%"
          @click.native.prevent="handleLogin"
        >
          登陆
        </el-button>
      </el-form>
    </div>

  </div>
</template>

<script>
import { EncryptedPassword } from '@/utils/encryption'
import { getEncryptionKey } from '@/api/encryption'

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
      publicKey: ''
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          // 如果是从其他页面因为token过期等原因跳转到登陆页面，会保存原本路由相关信息，登陆之后直接跳转
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created () {
    if (window.config.encryptionType === 1) {
      this.publicKey = window.config.publicKey
    } else {
      this.getEncryptionKeyFn()
    }
  },
  mounted () {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    // 获取加密公钥
    getEncryptionKeyFn () {
      getEncryptionKey().then(({ data }) => {
        this.publicKey = data
      })
    },
    // 加密密码
    encryptedPasswordByUtil (password) {
      return EncryptedPassword(this.publicKey, password)
    },
    // 检查公钥是否存在
    judgeIsHasPublicKey () {
      let hasPublicKey = true
      if (!this.publicKey) {
        hasPublicKey = false
        if (window.config.encryptionType === 1) {
          this.$message.warning('请检查是否配置公钥')
        } else {
          this.$message.warning('未获取到公钥，请稍后重试')
        }
      }
      return hasPublicKey
    },
    checkCapslock (e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (!this.judgeIsHasPublicKey()) return
          this.loading = true
          const { username, password } = this.loginForm
          this.$store.dispatch('user/login', { username, password: this.encryptedPasswordByUtil(password) })
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery }).catch(err => err)
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('登陆失败')
          return false
        }
      })
    },
    getOtherQuery (query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: url('../../assets/login-bg.jpg');
  background-size: cover;
  background-position: center;

  .form-container {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
    background-color: #ffffff;
    border-radius: 4px;

    .title-container {
      color: $mainFontColor;
      font-size: 14px;
      height: 51px;
      line-height: 51px;
      font-weight: 700;
      text-indent: 20px;
      border-bottom: 1px solid $borderColor;
    }
  }

  .login-form {
    padding: 16px;
  }
}
</style>
