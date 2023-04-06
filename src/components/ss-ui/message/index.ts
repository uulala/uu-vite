import { h, render } from 'vue'
import main from './main.vue'
import { withInstallFunction } from '../utlis/index'

function Message(otpions: any) {
    console.log('options:', otpions)
    let instance = h(main, { data: otpions })
    console.log(instance)
    instance.appContext = app._context

    render(instance, document.body)

    return instance
}

export const UuMessage = withInstallFunction(Message, '$message')

export default Message;