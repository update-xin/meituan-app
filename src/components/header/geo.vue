<template>
  <div class="m-geo">
    <div class="position">
      <i class="el icon-location" />
      {{ $store.state.position.name }}
      <router-link class="changeCity" :to="{ name: 'changeCity' }"
        >切换城市</router-link
      >
      [
      <a href="#" v-for="item in nearCity" :key="item.name">{{item.name + ' '}}</a>
      ]
    </div>
    <div class="m-user" v-if="!this.$store.state.userName">
      <router-link class="login" :to="{ name: 'login' }">立即登录</router-link>
      <router-link class="register" :to="{ name: 'register' }"
        >注册</router-link
      >
    </div>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      nearCity: [],
      curCity: '',
      saveCity: []
    }
  },
  created () {
    api.getCurPosition().then(res => {
      this.$store.dispatch('setPosition', res.data.data)
      this.curCity = res.data.data.name
      this.saveCity = res.data.data.name
      this.nearCity = res.data.data.nearCity
    })
  },
  watch: {
    '$store.state.position': function () {
      if (this.$store.state.position.name === this.curCity) {
        api.getCurPosition().then(res => {
          this.nearCity = res.data.data.nearCity
        })
      }
      this.nearCity = [{ name: '暂无数据' }]
    }
  }
}
</script>

<style>
</style>
