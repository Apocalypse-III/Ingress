import { remote } from "electron"
import Datastore from 'nedb'
import path from 'path'

const dir = remote.app.getPath('documents') + '/ingress/data'

function makeDb(dbName) {
    return new Datastore({
        autoload: true,
        filename: path.join(dir, `${dbName}.db`)
    })
}

const settings = makeDb('settings')
const hosts = makeDb('hosts')

export {
    settings,
    hosts,
}
