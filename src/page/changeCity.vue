<template>
  <div>
      <div class="page-changeCity">
          <el-row>
              <m-province />
          </el-row>
          <el-row>
              <m-hot title="热门城市:" :list="hotList" />
          </el-row>
          <el-row>
              <m-hot title="最近访问:" :list="rencentList" />
          </el-row>
          <el-row>
              <m-category />
          </el-row>
      </div>
  </div>
</template>

<script>
import api from '@/api'
import MProvince from '@/components/changeCity/province'
import MHot from '@/components/changeCity/hot.vue'
import MCategory from '@/components/changeCity/category'
export default {
  components: {
    MProvince,
    MHot,
    MCategory
  },
  data () {
    return {
      hotList: [],
      rencentList: []
    }
  },
  created () {
    api.getHotCity().then(res => {
      console.log(res.data.data)
      this.hotList = res.data.data
    })
    api.getRecentCity().then(res => {
      this.rencentList = res.data.data
    })
  }
}
</script>

<style>

</style>
