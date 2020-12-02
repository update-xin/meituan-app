<template>
  <div>
      <span class="name">按省份选择:</span>
      <m-select
        :list="provinceList"
        title="省份"
        :value="province"
        :showWrapperActive="provinceActive"
        className="province"
        @change_active="changeProvinceActive"
        @change="changeProvince"
      />
      <m-select
        :list="cityList"
        title="城市"
        :value="city"
        :showWrapperActive="cityActive"
        className="city"
        @change_active="changeCityActive"
        @change="changeCity"
        :disabled="cityDisabled"
      />

        <span class="sea">直接搜索:</span>
        <el-select
        v-model="searchWord"
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
        :loading="loading"
        >

          <el-option v-for="item in searchList" :key="item" :label="item" :value="item"></el-option>
      </el-select>

  </div>
</template>

<script>
import api from '@/api'
import MSelect from './select'
export default {
  components: {
    MSelect
  },
  created () {
    api.getProvinceList().then(res => {
      this.provinceList = res.data.data.map(item => {
        item.name = item.provinceName
        return item
      })
    })
  },
  data () {
    return {
      provinceList: [],
      province: '省份',
      cityList: [],
      city: '城市',
      cityActive: false,
      provinceActive: false,
      searchList: ['哈尔滨', '佳木斯', '牡丹江', '鹤岗'],
      searchWord: '',
      loading: false,
      cityDisabled: true

    }
  },
  methods: {
    changeProvinceActive (flag) {
      this.provinceActive = flag
      if (flag) {
        this.cityActive = false
      }
    },
    changeCityActive (flag) {
      this.cityActive = flag
      if (flag) {
        this.provinceActive = false
      }
    },
    changeProvince (item) {
      this.province = item.name
      this.cityDisabled = false
      this.cityList = item.cityInfoList
    },
    changeCity (item) {
      this.city = item.name
      this.$store.dispatch('setPosition', item)
      this.$router.push({ name: 'index' })
    },
    remoteMethod (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/changecity/iselect.scss";
</style>
