<template>
  <div class="page-login">
        <div class="login-header cf">
          <a class="logo" href="#" @click="toHome">美团网</a>
        </div>
        <div class="login-panel">
          <div class="banner">
            <img src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" width="480" height="370" alt="美团网">
          </div>
          <div class="form">
            <h4 v-if="error" class="tips">
             <i class="tip-status tip-status--opinfo"></i>
              {{error}}
              </h4>
            <p>
              <span>
                账号登录
              </span>
            </p>
            <el-input :class="{error:error && !userName}" v-model="userName" placeholder="手机号/用户名/邮箱" prefix-icon="profile"></el-input>
            <el-input :class="{error:error && !password}" type="password" v-model="password" placeholder="密码" prefix-icon="password"></el-input>
            <div class="foot">
              <a href="#">忘记密码？</a>
            </div>
            <el-button class="btn-login" @click="submit">登录</el-button>
            <p class="reg">
              <span>还没有账号？</span>
                <router-link class="register" :to="{name:'register'}">免费注册</router-link>
            </p>
            <div class="oauth-wrapper">
              <h3 class="title-wrapper"><span class="title">用合作网站账号登录</span></h3>
              <div class="oauth cf">
                <a class="oauth__link oauth__link--qq" href="#" data-mtevent="{&quot;la&quot;:&quot;oauth/qq&quot;}" target="_blank"></a>
                <a class="oauth__link oauth__link--weibo" href="#" data-mtevent="{&quot;la&quot;:&quot;oauth/sina&quot;}" target="_blank"></a>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <ul>
            <li><a href="#">关于美团</a></li>
            <li><a href="#">加入我们</a></li>
            <li><a href="#">商家入驻</a></li>
            <li><a href="#">帮助中心</a></li>
            <li><a href="#">美团手机版</a></li>
          </ul>
          <p>©2018 美团网团购 meituan.com 京ICP证070791号 京公网安备11010502025545号</p>
        </footer>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      userName: '',
      password: '',
      error: ''
    }
  },
  methods: {
    submit () {
      if (!this.userName) {
        this.error = '请输入账号'
        return false
      }
      if (!this.password) {
        this.error = '请输入密码'
        return false
      }
      api.login({
        params: {
          userName: this.userName,
          password: this.password
        }
      }).then(res => {
        if (res.data.status === 'success') {
          this.$router.push({ name: 'index' })
          console.log(this.userName)
          this.$store.commit('setUserName', this.userName)
          console.log(this.$store.userName)
        } else {
          this.error = res.data.msg
        }
      })
    },
    toHome () {
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style lang="scss">
   @import "@/assets/css/login/index.scss";
</style>
