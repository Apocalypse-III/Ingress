import Vue from 'vue'
import Vuex from 'vuex'
import { createPersistedState, createSharedMutations } from 'vuex-electron'

// 引入模块
import Window from "@/store/modules/Window"
import AppStyle from "@/store/modules/AppStyle"
import Hosts from "@/store/modules/Hosts"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Window,
    AppStyle,
    Hosts,
  },
  plugins: [
    createPersistedState(),
    // createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
