// 初始化应用样式
export function initAppStyle(vm) {
    return new Promise(async (resolve, reject) => {
        let style = []

        await vm.$ingress.db.settings.createOrFind({
            key: 'style.app.backgroundColor',
            name: '背景颜色',
            value: '#fff',
            type: 'color'
        }).catch(err => reject(err))
        await vm.$ingress.db.settings.createOrFind({
            key: 'style.app.borderRadius',
            name: '边框圆角',
            value: '16px',
            type: 'pixel'
        }).catch(err => reject(err))
        await vm.$ingress.db.settings.createOrFind({
            key: 'style.tabBar.backgroundColor',
            name: '边栏颜色',
            value: '#42b983',
            type: 'color'
        }).catch(err => reject(err))
        await vm.$ingress.db.settings.createOrFind({
            key: 'style.tabBar.boxShadow',
            name: '边栏阴影',
            value: '#42b983 0 0 12px',
            type: 'string'
        }).catch(err => reject(err))

        await vm.$ingress.db.settings.get(/^style\./).then(res => {
            res.forEach(item => {
                let key = item.key.split('.')
                key.shift()
                style.push({space: key[0], key: key[1], value: item.value})
            })
        }).catch(err => reject(err))

        resolve(style)
    })
}
