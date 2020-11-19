const state = {
    ori_hosts: null,
    has_delete_hosts: null,
}

const mutations = {
    SAVE_HOSTS (state, payload) {
        state.ori_hosts = payload
        state.has_delete_hosts = payload
    },
    DELETE_HOSTS (state, payload) {
        state.has_delete_hosts = payload
    },
}

const getters = {
    has_delete_hosts: state => {
        return state.has_delete_hosts
    }
}

const actions = {
    saveOriginalHosts ({ commit }, payload) {
        commit('SAVE_HOSTS', payload)
    },
    hasDeleteHosts ({ commit }, payload) {
        commit('DELETE_HOSTS', payload)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
