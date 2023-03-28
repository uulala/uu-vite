<script setup lang="ts">
</script>

<template>
  <div class="navigate-box">
    <router-link
      to="/"
      class="box-item"
    >Go to Home</router-link>
    <router-link
      to="/analysis"
      class="box-item"
    >Go to analysis</router-link>
  </div>
  <div class="content-box">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.navigate-box {
  width: 100%;
  height: 10vh;
}

.content-box {
  height: 90vh;
}
</style>
