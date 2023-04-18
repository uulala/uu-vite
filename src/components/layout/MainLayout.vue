<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'

let showHeader = ref(true), oldScrollTop = ref(0), activeNav = ref('/')

const route = useRoute()
activeNav.value = route.path

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

    let scrollStep = scrollTop - oldScrollTop.value
    oldScrollTop.value = scrollTop
    showHeader.value = scrollStep < 0
}
</script>

<template>
    <div class="main-layout">
        <Transition>
            <div
                class="main-header box-between"
                v-if="showHeader"
            >
                <div class="header-left box-start">
                    <router-link
                        to="/"
                        :class="`box-item nav-item ${activeNav === '/' ? 'active' : ''}`"
                    >Home</router-link>
                    <router-link
                        to="/analysis"
                        :class="`box-item nav-item ${activeNav === '/analysis' ? 'active' : ''}`"
                    >Analysis</router-link>
                </div>
                <router-link
                    to="/contact"
                    :class="`box-item nav-item ${activeNav === '/contact' ? 'active' : ''}`"
                >contact</router-link>
            </div>
        </Transition>

        <div class="main-content">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.main-layout {
    position: relative;
    width: 100vw;
    margin-top: 50px;
}

.main-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    padding: 10px 50px;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    height: 50px;

    .header-left {
        width: 80vw;
    }
}

.nav-item {
    color: #333;

    &.active {
        color: $color-primary;
    }
}

.main-content {
    height: 110vh;
    padding: 15px;
}
</style>