<template>
   <div class="m-menu">
       <dl class="nav" @mouseleave="menuLeave">
           <dt>全部分类</dt>
           <dd
            v-for="(item,index) in menuList"
            :key="item + '_' + index"
            @mouseenter="menuEnter(item)"
           >
                <i :class="item.type"></i>
                {{ item.name }}
                <i class="nav-right-arrow"></i>
           </dd>
       </dl>
       <div class="detail" v-if="curDetail" @mouseenter="detailEnter" @mouseleave="detailLeave">
           <template v-for="(item,index) in curDetail.items">
               <h4 :key="item + '.' + index">{{ item.title }}</h4>
               <span v-for="(v,i) in item.items" :key="v + '-' + i">{{ v }}</span>
           </template>
       </div>
   </div>

</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      curDetail: null,
      menuList: []
    }
  },
  created () {
    api.getMenuList().then(res => {
      this.menuList = res.data.data
    })
  },
  methods: {
    menuEnter (item) {
      this.curDetail = item
    },
    menuLeave () {
      this.timer = setTimeout(() => {
        this.curDetail = null
      }, 200)
    },
    detailEnter () {
      clearTimeout(this.timer)
    },
    detailLeave () {
      this.curDetail = null
    }

  }
}
</script>

<style>

</style>
