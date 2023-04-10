import SsMessage from './message/index'
import Ssbutton from './button/index.vue'
import { Tabs as SsTabs, tabPane as SsTabPane } from './tabs/index'

function install(app) {
    app.component('ss-message', SsMessage)
    app.component('ss-button', Ssbutton)
    app.component('ss-tabs', SsTabs)
    app.component('ss-tab-pane', SsTabPane)
}

export {
    SsMessage,
    Ssbutton,
    SsTabs,
    SsTabPane,
    install
}

export default install