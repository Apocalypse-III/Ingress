import Vue from 'vue'
import Vuex from 'vuex'
import { createPersistedState, createSharedMutations } from 'vuex-electron'

// 引入模块
import Window from "@/store/modules/Window"
import AppStyle from "@/store/modules/AppStyle"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Window,
    AppStyle,
  },
  plugins: [
    createPersistedState(),
    // createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
