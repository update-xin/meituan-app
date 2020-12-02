<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img
          src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png"
          alt="美团"
          @click="toHome"
        />
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input
            v-model="searchWord"
            placeholder="搜索商家或地点"
            @focus="focusInput"
            @blur="blurInput"
            @input="input"
          ></el-input>
          <el-button type="primary" icon="el-icon-search"></el-button>
          <dl class="hotPlace" v-if="isHotPlace">
              <dt>热门搜索</dt>
              <dd v-for="(item,index) in hotPlaceList" :key="item + '_' + index">
                  <router-link :to="{name:'goods',params:{name:item}}">{{ item }}</router-link>
              </dd>
          </dl>
          <dl class="searchList" v-if="isSearchList">
              <dd v-for="(item,index) in searchList" :key="item + '_' + index">
                  <router-link :to="{name:'goods',params:{name:item}}">{{ item }}</router-link>
              </dd>
          </dl>

        </div>
        <p class="suggest">
              <router-link v-for="(item,index) in suggestList" :key="item + '_' + index" :to="{name:'goods',params:{name:item}}">{{ item }}</router-link>
          </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      searchWord: '',
      isFocus: false,
      hotPlaceList: [],
      searchList: [],
      suggestList: []
    }
  },
  watch: {
    '$route.params.name': function () {
      this.searchWord = this.$route.params.name
    }
  },
  created () {
    api.searchHotWords().then(res => {
      this.hotPlaceList = res.data.data
      this.suggestList = res.data.data
    })
  },
  computed: {
    isSearchList () {
      return this.isFocus && this.searchWord
    },
    isHotPlace () {
      return this.isFocus && !this.searchWord
    }
  },
  methods: {
    input () {
      api.getSearchList().then(res => {
        this.searchList = res.data.data.list
      })
    },
    focusInput () {
      this.isFocus = true
    },
    blurInput () {
      setTimeout(() => {
        this.isFocus = false
      }, 300)
    },
    toHome () {
      if (this.$router.currentRoute.fullPath === '/index') {
        return
      }
      this.$router.push('/index')
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/public/header/search.scss";
</style>
