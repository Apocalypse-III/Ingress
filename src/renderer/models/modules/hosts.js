import { hosts } from '@/db'

/**
* hosts 表结构
* @property string name
* @property string group
* @property string content
* */

const create = insert => {
    return new Promise((resolve, reject) => {
        if (! insert.name) reject('Params Error')

        if (! insert.group) insert.group = 'Default'
        if (! insert.content) insert.content = ''
        if (! insert.status) insert.status = false

        hosts.insert(insert, (err, insertRes) => {
            if (err) return reject(err)
            resolve(insertRes);
        })
    })
}

const findOne = id => {
    return new Promise((resolve, reject) => {
        if (! id) reject('Params Error')
        hosts.findOne({_id: id}, (err, res) => {
            if (err) return reject(err)
            resolve(res);
        })
    })
}

const getAll = _ => {
    return new Promise((resolve, reject) => {
        hosts.find({}, (err, res) => {
            if (err) return reject(err)
            resolve(res);
        })
    })
}

const remove = id => {
    return new Promise((resolve, reject) => {
        if (! id) reject('Params Error')

        hosts.remove({_id: id}, {}, (err, res) => {
            if (err) return reject(err)
            resolve(res);
        })
    })
}

const update = update => {
    return new Promise((resolve, reject) => {
        if (! update._id) reject('Params Error')

        hosts.update(
            {_id: update._id},
            {$set: update},
            {},
            (err, res) => {
            if (err) return reject(err)
            resolve(res);
        })
    })
}

const trueToFalse = _ => {
    return new Promise((resolve, reject) => {
        hosts.update(
            {status: true},
            {$set: {status: false}},
            {},
            (err, res) => {
            if (err) return reject(err)
            resolve(res);
        })
    })
}

const removeAll = () => {
    return new Promise((resolve, reject) => {
        hosts.remove({}, {}, (err, res) => {
            if (err) return reject(err)
            resolve(res);
        })
    })
}

export default {
    create,
    findOne,
    getAll,
    remove,
    update,
    trueToFalse,
    removeAll,
}
