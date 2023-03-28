<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()
// https://www.wacai.com/
const count = ref(0)
</script>

<template>
  <h1>analysis</h1>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
