<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()
// https://www.wacai.com/
const count = ref(0)
</script>

<template>
  <main-layout>contact</main-layout>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
