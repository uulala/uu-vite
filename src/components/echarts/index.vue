<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts';

let id = ref(`id${Math.random()}`)
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
    // 基于准备好的dom，初始化echarts实例
    console.log(document.getElementById(id.value))
    myChart = echarts.init(document.getElementById(id.value));
    // 绘制图表
    myChart.setOption(props.option);
})


</script>

<template>
    <div
        :id="id"
        style="width: 600px;height:400px;"
    >
    </div>
</template>

<style scoped lang="scss"></style>