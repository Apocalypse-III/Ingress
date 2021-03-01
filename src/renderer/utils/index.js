import initAppStyle from './function/AppStyle'
import { deepClone } from './function/deepClone'
import { encrypt, decrypt } from './function/encrypt'
import queryParams from './function/queryParams'
import * as test from './function/test'

const utils = {
    initAppStyle,
    deepClone,
    encrypt,
    decrypt,
    queryParams,
    test,
}

const install = (Vue, vm) => {
    vm.$ingress.utils = utils;
}

export default {
    install
}
