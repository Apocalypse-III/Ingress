const state = {
    app: {
        backgroundColor: '#fff',
    },
    tabBar: {
        backgroundColor: 'rgba(255, 255, 255, .84)',
        boxShadow: '#42b983 0 0 8px',
    },
}

const mutations = {
    CHANGE_ALL_STYLE (state, payload) {
        state[payload.space][payload.key] = payload.value
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
    changeAllStyle ({ commit }, payload) {
        commit('CHANGE_ALL_STYLE', payload)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
