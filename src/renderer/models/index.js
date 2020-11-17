const files = require.context('./modules', false, /\.js$/)

const modules = {}

files.keys().forEach(key => {
    modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

const install = (Vue, vm) => {
    vm.$ingress.db = modules;
}

export default {
    install
}
