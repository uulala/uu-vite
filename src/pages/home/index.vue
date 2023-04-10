<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'

let message = ref(function () { })

onMounted(() => {
  message.value = getCurrentInstance()?.appContext.config.globalProperties.$message
})

function log() {
  message.value({ msg: 'nihao', duration: 2000, type: 'success' })
}
</script>

<template>
  <main-layout >
    <div class="read-the-docs">你好啊</div>
    <ss-button
      name="home"
      @click="log"
    ></ss-button>
  </main-layout>
</template>

<style scoped lang="scss">
.read-the-docs {
  color: $color-primary;
}
</style>
