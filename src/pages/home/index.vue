<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'

let message = ref(function () { })

onMounted(() => {
  message.value = getCurrentInstance()?.appContext.config.globalProperties.$message
})

function log() {
  console.log(233)
  message.value({ msg: 'nihao' })
}
</script>

<template>
  <main-layout>
    <ss-button
      name="home"
      @click="log"
    ></ss-button>
  </main-layout>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
