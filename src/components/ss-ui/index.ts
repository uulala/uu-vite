import SsMessage from './message/index'
import Ssbutton from './button/index.vue'
import { Tabs as SsTabs, tabPane as SsTabPane } from './tabs/index'
import SsSelect from './select/index.vue'

function install(app) {
    app.component('ss-message', SsMessage)
    app.component('ss-button', Ssbutton)
    app.component('ss-tabs', SsTabs)
    app.component('ss-tab-pane', SsTabPane)
    app.component('ss-select', SsSelect)
}

export {
    SsMessage,
    Ssbutton,
    SsTabs,
    SsTabPane,
    SsSelect,
    install
}

export default install