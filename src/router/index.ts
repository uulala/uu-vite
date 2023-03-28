import { createRouter, createWebHashHistory } from 'vue-router'

const Home = ()=> import('../pages/home/index.vue') 
const Anylysis = ()=> import('../pages/analysis/index.vue') 

const routes = [
    { path: '/', component: Home },
    { path: '/analysis', component: Anylysis },
]

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

export default router
