import { remote } from "electron"
import Datastore from 'nedb'
import path from 'path'

// const dir = remote.app.getPath('documents') + '/ingress/data'
const dir = process.env.NODE_ENV === 'development'
    ? path.join(__dirname, "../../../Resources/data")
    : path.join(process.cwd(), "./resources/data")

function makeDb(dbName) {
    return new Datastore({
        autoload: true,
        filename: path.join(dir, `${dbName}.db`)
    })
}

const settings = makeDb('settings')
const hosts = makeDb('hosts')
const channels = makeDb('channels')
const collection = makeDb('collection')

export {
    settings,
    hosts,
    channels,
    collection,
}
