<script setup lang="tsx">
import { ref, reactive, useSlots, useAttrs, onMounted, watch } from 'vue'

const slots = useSlots()
const attrs = useAttrs()
const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue', 'change'])
const tempPanels = slots.default()

const tempTitle = tempPanels.map((item, index) => {
    const { props = {} } = item
    const { label, name } = props
    return { label, name: name || index }
})

let panels = reactive({ data: tempPanels }),
    titles = reactive({ data: tempTitle }),
    activeTitle = ref(props.modelValue || tempTitle[0].name)

console.log('slots:', slots.default(), props.modelValue)

watch(() => props.value, (n, o) => {
    console.log(893, n)
    activeTitle.value = n
})



function handleChangeTab(item) {
    activeTitle.value = item.name
    emits('update:modelValue', item.name)
}

</script>

<template>
    <div class="ss-tabs-header">
        {{ value }}
        <div
            v-for="item in titles.data"
            :key="item.name"
            :class="`tab-title ${activeTitle === item.name ? 'active' : ''}`"
            @click="() => handleChangeTab(item)"
        >{{ item.label }}</div>
    </div>
    <div class="ss-tabs-content">
        
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.ss-tabs-header {
    display: flex;
    border-bottom: 1px solid #eee;
}

.tab-title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    cursor: pointer;
}

.active {
    color: $color-primary;
}
</style>
