import { settings } from '@/db'

/**
* Settings 表结构
* @property string key
* @property string name
* @property string value
* @property string type ['string', 'int', 'boolean', 'color', 'slider', 'image', 'display']
* */

const create = insert => {
    return new Promise((resolve, reject) => {
        if (! insert.key || ! insert.name || ! insert.value) reject('Params Error')
        settings.insert(insert, (err, insertRes) => {
            if (err) return reject(err)
            resolve(insertRes);
        })
    })
}

const createOrFind = insert => {
    return new Promise((resolve, reject) => {
        if (! insert.key || ! insert.name || ! insert.value) reject('Params Error')
        // 查找是否已存在
        findOne(insert.key).then(res => {
            if (res) resolve(res)
            else {
                settings.insert(insert, (err, insertRes) => {
                    if (err) return reject(err)
                    resolve(insertRes);
                })
            }
        }).catch(err => reject(err))
    })
}

const findOne = key => {
    return new Promise((resolve, reject) => {
        if (! key) reject('Params Error')
        settings.findOne({key: key}, (err, res) => {
            if (err) return reject(err)
            resolve(res);
        })
    })
}

const get = key => {
    return new Promise((resolve, reject) => {
        let query = {}
        if (key) query = {key: key}
        settings.find(query, (err, res) => {
            if (err) return reject(err)
            resolve(res);
        })
    })
}

const remove = (key, more = true) => {
    let multi = {}
    if (more) multi = {multi: true}
    return new Promise((resolve, reject) => {
        if (! key) reject('Params Error')
        settings.remove({key: key}, multi, (err, res) => {
            if (err) return reject(err)
            resolve(res);
        })
    })
}

const update = update => {
    return new Promise((resolve, reject) => {
        if (! update.key) reject('Params Error')
        settings.update(
            {key: update.key},
            {$set: update},
            {},
            (err, res) => {
            if (err) return reject(err)
            resolve(res);
        })
    })
}

const removeAll = () => {
    return new Promise((resolve, reject) => {
        settings.remove({}, {}, (err, res) => {
            if (err) return reject(err)
            resolve(res);
        })
    })
}

export default {
    create,
    createOrFind,
    findOne,
    get,
    remove,
    update,
    removeAll,
}
