const { remote } = require('electron');
const window = remote.getCurrentWindow()

const state = {
    isTop: window.isAlwaysOnTop(),
    secondPageTitle: '',

}

const mutations = {
    SET_TOP () {
        window.setAlwaysOnTop(true)
    },
    SET_NOT_TOP () {
        window.setAlwaysOnTop(false)
    },
    SET_SECOND_PAGE_TITLE (state, payload) {
        state.secondPageTitle = payload
    }
}

const getters = {
    isTop: state => {
        return state.isTop
    },
    secondPageTitle: state => {
        return state.secondPageTitle
    },
}

const actions = {
    setTop ({ commit }) {
        commit(window.isAlwaysOnTop() ? 'SET_NOT_TOP' : 'SET_TOP')
    },
    setSecondPageTitle ({ commit }, payload) {
        commit('SET_SECOND_PAGE_TITLE', payload)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
