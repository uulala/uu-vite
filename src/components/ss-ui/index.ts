import SsMessage from './message/index'
import Ssbutton from './button/index.vue'

function install(app){
    app.component('ss-message', SsMessage)
    app.component('ss-button', Ssbutton)
}

export {
    SsMessage,
    Ssbutton,
    install
}

export default install