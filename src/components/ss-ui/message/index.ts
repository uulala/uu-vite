import { h, render } from 'vue'
import main from './main.vue'
import { withInstallFunction } from '../utlis/index'
let id = 1, instances = []

function createInstance(options: any) {
    const container = document.createElement('div')
    const appendTo = document.body
    const userOnClose = options.onClose

    const props = {
        ...options,
        id: `message_${id++}`,
        onClose: () => {
            userOnClose?.()
            closeMessage(instance)
        },
        onDestroy: () => {
            render(null, container)
        },
    }

    let vnode = h(main, props)
    vnode.appContext = app._context

    render(vnode, container)

    appendTo.appendChild(container.firstElementChild!)

    const vm = vnode.component!

    const instance = {
        id,
        vnode,
        handler: {
            close: () => {
                vm.exposed!.visible.value = false
            },
        },
        props: (vnode.component as any).props,
    }

    return instance
}

const closeMessage = (instance: MessageContext) => {
    const idx = instances.indexOf(instance)
    if (idx === -1) return

    instances.splice(idx, 1)
    const { handler } = instance
    handler.close()
}

function Message(options: any) {
    const instance = createInstance(options)

    instances.push(instance)

    return instance.handler
}

export const UuMessage = withInstallFunction(Message, '$message')

export default Message;