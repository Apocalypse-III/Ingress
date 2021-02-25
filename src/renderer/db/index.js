import Datastore from 'nedb'
import path from 'path'
import os from "os";

const dir = os.tmpdir() + '\\ingress'

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
