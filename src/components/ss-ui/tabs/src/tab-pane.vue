<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
    name: String,
    label: String,
})
const emits = defineEmits(['click'])

</script>

<template>
    <div class="ss-tabs-pane">
        <slot></slot>
    </div>
</template>

<style scoped>
.ss-button {
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid #999;
    display: inline-block;
    user-select: none;
}
</style>
