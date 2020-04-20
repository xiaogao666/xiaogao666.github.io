<template>
  <div class="login-container">
    <div class="login-head"><img src="./logo_index.png" alt=""></div>
    <el-form class="login-form" ref="form" :model="user">
  <el-form-item>
    <el-input
    v-model="user.mobile"
    placeholder="请输入手机号"
    ></el-input>
  </el-form-item>
  <el-form-item>
    <el-input
    v-model="user.code"
    placeholder="请输入验证码"
    ></el-input>
  </el-form-item>
  <el-form-item>
    <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
  </el-form-item>
  <el-form-item>
    <el-button class="login-btn" type="primary" @click="onLogin()" :loading="loginLoading">登录</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      checked: false,
      loginLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
      // 获取表单数据
      const user = this.user
      // 验证表单信息
      this.loginLoading = true
      // 提交表单数据
      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        data: user
      }).then(res => {
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        this.loginLoading = false
      }).catch(() => {
        this.loginLoading = false
        this.$message.error('登陆失败，用户名或密码错误')
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("./login_bg.jpg") no-repeat;
  background-size: cover;
  .login-head {
    width: 300px;
    height: 57px;
    padding: 10px 50px 0 ;
    text-align: center;
    // background: url("./logo_index.png") no-repeat;
    background-color: #fff;
    img {
      width: 200px;
    }
  }
  .login-form {
    background-color: #fff;
    padding: 10px 50px;
    min-width: 300px;
    .login-btn {
      width: 100%;
    }
  }
}
</style>
