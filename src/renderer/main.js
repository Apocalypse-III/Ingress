import Vue from 'vue'
import fs from 'fs'
import os from 'os'
import axios from 'axios'

import App from '@/App'
import router from '@/router'
import store from '@/store'

// 阻止vue启动生产消息
Vue.config.productionTip = false

// element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 创建数据目录
const dir = os.tmpdir() + '\\ingress'
if (! fs.existsSync(dir)) fs.mkdirSync(dir)

const ingress = {}

// lodash
import lodash from 'lodash'
ingress._ = lodash

Vue.prototype.$ingress = ingress

// Request
Vue.http = Vue.prototype.$http = axios

const app = new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
})

// Models
import Models from '@/models'
Vue.use(Models, app)

// Models
import utils from '@/utils'
Vue.use(utils, app)

app.$mount('#app')
