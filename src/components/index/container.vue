<template>
    <div class="m-istyle">
        <dl @mouseover="over" :class="nav.class">
            <dt>{{ nav.title }}</dt>
            <dd
             v-for="(item,index) in nav.list"
             :key="item + '_' + index"
             :class="{ active:kind == item.tab }"
             :data-type="item.tab"
            >
                {{ item.text }}
            </dd>
        </dl>
        <ul class="ibody">
            <li v-for="(item,index) in resultsData[kind]" :key="item + '_' + index">
                <el-card :body-style="{ padding: '0px' }" shadow="never">
                    <img :src="item.image" alt="">
                    <div class="cbody">
                        <div class="title" :title="item.title">{{ item.title }}</div>
                        <div class="sub-title" :title="item.sub_title">{{ item.sub_title }}</div>
                        <div class="price-info">
                            <span class="current-price-wrapper">
                                <span class="price-symbol numfont">￥</span>
                                <span class="current-price numfont">{{ item.price }}</span>
                            </span>
                            <span class="sold bottom-right-info">{{ item.address }}</span>
                        </div>
                    </div>
                </el-card>
            </li>
        </ul>
    </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      kind: 'all',
      resultsData: {}
    }
  },
  props: ['nav'],
  created () {
    api.resultsByKeywords().then(res => {
      this.resultsData = res.data.data
    })
  },
  methods: {
    over (e) {
      const dom = e.target
      const tagName = dom.tagName.toLowerCase()
      if (tagName !== 'dd') {
        return
      }
      this.kind = dom.getAttribute('data-type')
    }
  }
}
</script>

<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>
