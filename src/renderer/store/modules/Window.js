const state = {
    isMaximized: false,
    isFullScreen: false,
}

const mutations = {
    SET_MAXIMIZED (state, payload) {
        state.isMaximized = payload
    },
    SET_FULLSCREEN (state, payload) {
        state.isFullScreen = payload
    },
}

const getters = {
    isMaximized: state => {
        return state.isMaximized
    },
    isFullScreen: state => {
        return state.isFullScreen
    }
}

const actions = {
    setMaximized ({ commit }, payload) {
        commit('SET_MAXIMIZED', payload)
    },
    setFullScreen ({ commit }, payload) {
        commit('SET_FULLSCREEN', payload)
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}
