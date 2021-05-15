const { remote } = require('electron');
const window = remote.getCurrentWindow()

const state = {
    isTop: window.isAlwaysOnTop()
}

const mutations = {
    SET_TOP () {
        window.setAlwaysOnTop(true)
    },
    SET_NOT_TOP () {
        window.setAlwaysOnTop(false)
    },
}

const getters = {
    isTop: state => {
        return state.isTop
    },
}

const actions = {
    setTop ({ commit }) {
        commit(window.isAlwaysOnTop() ? 'SET_NOT_TOP' : 'SET_TOP')
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
