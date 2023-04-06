import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import MainLayout from './components/layout/MainLayout.vue'
import SsUI from './components/ss-ui/index'
import { SsMessage } from './components/ss-ui/index'


const app = createApp(App)

app.use(router)

app.use(SsUI)

app.config.globalProperties.$message = SsMessage

app.component('main-layout', MainLayout)
app.mount('#app')
