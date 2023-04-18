<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'

let message = ref(function () { })

onMounted(() => {
  message.value = getCurrentInstance()?.appContext.config.globalProperties.$message
})

const router = useRouter()
const route = useRoute()

function pushWithQuery() {
  router.push({
    path: '/analysis',
    query: {
      ...route.query,
    },
  })
}

</script>

<template>
  <main-layout>
    <ss-button @click="pushWithQuery">去分析</ss-button>
  </main-layout>
</template>

<style scoped lang="scss"></style>
