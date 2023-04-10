<script setup lang="ts">
import { ref, onMounted } from 'vue'

let visible = ref(false), bottom = ref(0)
const props = defineProps({
    msg: String,
    duration: Number,
    type: String
})

const emits = defineEmits(['destroy'])

onMounted(() => {
    startTimer()
    // nextZIndex()
    visible.value = true
})

function startTimer() {
    let timer = setTimeout(() => {
        clearTimeout(timer)
        close()
    }, props.duration);
}

function close() {
    visible.value = false
}

defineExpose({
    visible,
    bottom,
    close,
})

</script>

<template>
    <transition
        @before-leave="onClose"
        @after-leave="$emit('destroy')"
    >
        <div
            :class="`--success-color ss-message message-${type}`"
            v-show="visible"
        >{{ msg }}</div>
    </transition>
</template>

<style scoped lang="scss">
.ss-message {
    position: absolute;
    z-index: 10000;
    top:15px;
    left: 50%;
    padding: 5px 8px;
    border: 1px solid #eee;
    border-radius: 5px;
    background-color: white;
}

.message-primary {
    color: $color-primary;
    border-color: $color-primary;
}

.message-success {
    color: $color-success;
    border-color: $color-success;
}

.message-error {
    color: $color-error;
    border-color: $color-error;
}
</style>
