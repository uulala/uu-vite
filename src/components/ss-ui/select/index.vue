<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
interface Props {
    modelValue: string,
    dicData: Array<number> | null,
    placeholder: string
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    dicData: [],
    placeholder: '请选择'
})

// const props = withDefaults(defineProps({

// }), {
//     modelValue: '',
//     dicData: []
// })

const emits = defineEmits(['update:modelValue'])

const show = ref(false),
    realDic = ref([])

watch(() => props.dicData, (n, o) => {
    const temp = []
    n.map(item => {
        if (!item.label) {
            temp.push({
                label: item,
                value: item
            })
        } else {
            temp.push(item)
        }
    })
    realDic.value = temp
}, {
    immediate: true
})

const selectedLabel = computed(() => {
    console.log('realDic', realDic)
    const one = realDic.value.find(item => item.value === props.modelValue)

    return one?.label
})



function handleSelect(item) {
    emits('update:modelValue', item.value)
    show.value = false
}

</script>

<template>
    <div class="ss-select">
        <div
            :class="`input ${selectedLabel ? '' : 'placeholder'}`"
            @click="show = true"
        >{{ selectedLabel || placeholder }}</div>
        <div
            class="select-wrapper"
            v-if="show"
        >
            <div
                :class="`select-item ${modelValue === item.value}`"
                v-for="item in realDic"
                :key="`${item.value}`"
                @click="() => handleSelect(item)"
            >{{ item.label }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.ss-select {
    display: inline-block;
    min-width: 200px;
    margin-right: 10px;
    position: relative;
}

.select-wrapper {
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
    /* box-sizing: border-box; */
    margin: 5px 0;
    height: 350px;
    overflow-y: auto;
    padding-left: 10px;
    box-shadow: 0 1px 3px 0 #d4d9e1;
    position: absolute;
    z-index: 1000;
    width: 200px;
    box-sizing: border-box;
}

.select-item {
    display: flex;
    // flex-direction: column;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 5px 10px;

    &:hover {
        background: #f5f7fa;
    }

    .left>div {
        line-height: normal;

        &:last-child {
            color: #999;
        }
    }

    .right {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: transparent;
    }

    .active {
        background: #409EFF;
    }
}

.empty-item {
    color: #999;
    justify-content: center;
    padding: 150px 0;
}

::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-clip: padding-box;
}

::-webkit-scrollbar {
    width: 7px;
    height: 7px;
    background-color: transparent;
}

::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(144, 146, 152, 0.3);
}

::-webkit-scrollbar-track-piece {
    background-color: transparent;
}

.input {
    height: 38px;
    border: 1px solid #eee;
    line-height: 38px;
    text-align: center;
    border-radius: 5px;

    &.placeholder {
        color: #999;
    }
}
</style>
  