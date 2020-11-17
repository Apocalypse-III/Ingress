import Vue from 'vue'
import fs from 'fs'
import os from 'os'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

// 阻止vue启动生产消息
Vue.config.productionTip = false

// element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 创建数据目录
const dir = os.tmpdir() + '\\ingress'
if (! fs.existsSync(dir)) fs.mkdirSync(dir)

Vue.prototype.$ingress = {}

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

app.$mount('#app')
