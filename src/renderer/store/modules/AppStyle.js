const state = {
    app: {
        backgroundColor: '#fff',
        borderRadius: '16px'
    },
    tabBar: {
        backgroundColor: '#42b983',
        boxShadow: '#42b983 0 0 12px',
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
    changeAppStyle ({ commit }, payload) {
        commit('CHANGE_APP_STYLE', payload)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
