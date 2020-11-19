const state = {
    app: {
        backgroundColor: '#fff',
        borderRadius: '16px'
    },
    tabBar: {
        backgroundColor: '#42b983',
        boxShadow: '#42b983 0 0 16px',
    },
}

const mutations = {
    CHANGE_APP_STYLE (state, payload) {
        state.app[payload.key] = payload.value
    },
}

const getters = {
    appStyle: state => {
        return state.app
    },
    tabBarStyle: state => {
        return state.tabBar
    },
}

const actions = {
    change_app_style ({ commit }, payload) {
        commit('CHANGE_APP_STYLE', payload)
    },
}

export default {
    state,
    mutations,
    getters,
    actions
}
