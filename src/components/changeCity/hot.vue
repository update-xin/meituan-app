<template>
  <div>
      <div class="m-hcity">
          <dl>
              <dt>{{ title }}</dt>
              <dd v-for="item in list" :key="item.name" @click="changeCity(item)">{{item.name}}</dd>
          </dl>
      </div>
  </div>
</template>

<script>
export default {
  props: ['list', 'title'],
  methods: {
    changeCity (item) {
      console.log(this.list)
      this.$store.dispatch('setPosition', item)
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style lang="scss">
    @import "@/assets/css/changecity/hot.scss";
</style>
