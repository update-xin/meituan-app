<template>
  <div class="choose-wrap" :class="[disabled?'disabled':'']" @click="showWrapper" v-document-click="documentClick">
      <div class="choose ">
          <span>{{ value }}</span>
          <i class="el-icon-caret-bottom"></i>
          <div class="mt-content" :class="{'active':showWrapperActive}">
              <p>{{ title }}</p>
              <div class="wrapper" :class="className">
                  <div class="col" v-for="listData in renderList" :key="listData.name">
                      <span class="mt-item"  v-for="item in listData" :key="item.name" :class="{ 'active': item.name === value}" @click="changeValue(item)">{{item.name}}</span>
                  </div>
              </div>

          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: [
    'list',
    'title',
    'value',
    'showWrapperActive',
    'disabled',
    'className'
  ],
  computed: {
    renderList () {
      const col = Math.ceil(this.list.length / 12)
      const resultList = []
      for (let i = 0; i < col; i++) {
        const data = this.list.slice(i * 12, i * 12 + 12)
        resultList.push(data)
      }
      return resultList
    }
  },
  methods: {
    showWrapper (e) {
      e.stopPropagation()
      if (e.target.tagName === 'DIV' && !this.disabled) {
        this.$emit('change_active', true)
      }
    },
    documentClick () {
      this.$emit('change_active', false)
    },
    changeValue (item) {
      this.$emit('change_active', false)
      this.$emit('change', item)
    }
  }
}
</script>

<style lang="scss">
    @import "@/assets/css/changecity/select.scss";
</style>
