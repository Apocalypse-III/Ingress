module.exports = {
    build: {
        env: {
            NODE_ENV: '"production"',
            BASE_API: 'http://127.0.0.1:25565'
        }
    },
    dev: {
        env: {
            NODE_ENV: '"development"',
            BASE_API: 'http://127.0.0.1:25565'
        },
        removeElectronJunk: true,
        chineseLog: false,
        port: 9080
    },
    DllFolder: '',
}
