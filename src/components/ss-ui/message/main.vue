<script setup lang="ts">
import { ref, onMounted } from 'vue'

// const msg = ref('')
// const props = defineProps({
//     msg: String
// })
// onMounted(() => {
//     console.log(props,props.msg)
// })

let msg = ref('')


</script>

<template>
    <div class="uu-message">{{ msg }}xxx</div>
</template>

<style scoped>
.uu-message {
    position: absolute;
    z-index: 10000;
    top: 20%;
    left: 50%;
    width: 100px;
    height: 30px;
}
</style>
