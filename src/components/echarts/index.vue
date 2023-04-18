<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts';

let id = ref(`id${Math.random()}`), width = ref(800), height = ref(500)
let props = defineProps({
    option: Object
})

let myChart: any = null

watch(() => props.option, (newVal, oldVal) => {
    console.log('newVal:', newVal)
    myChart.setOption(newVal)

}, {
    deep: true
})

onMounted(() => {
    // const { clientWidth, clientHeight } = document.body
    // width.value = clientWidth
    // height.value = clientHeight

    // 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(document.getElementById(id.value));
    // 绘制图表
    myChart.setOption(props.option);

})


</script>

<template>
    <div
        :id="id"
        :style="{
            width: `${width}px`, height: `${height}px`
        }"
    >
    </div>
</template>

<style scoped lang="scss"></style>