<template>
  <div class="m-product-select">
      <dl class="tab">
          <dt>
              {{ name }}
              <i class="el-icon-caret-bottom"></i>
          </dt>
          <div>
              <dt class="select-title">{{ name }}</dt>
              <span class="product-item" v-for="item in list" :key="item.id">{{item.name}}</span>
          </div>
      </dl>
  </div>
</template>

<script>
export default {
  props: ['name', 'list']
}
</script>

<style>

</style>
