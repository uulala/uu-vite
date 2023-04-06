function withInstallFunction(fn, name) {
    fn.install = app => {
        fn._context = app._context
        app.config.app.config.globalProperties[name] = fn
    }
}

export {
    withInstallFunction
}