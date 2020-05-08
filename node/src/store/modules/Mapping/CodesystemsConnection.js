import axios from 'axios'
// import Vue from 'vue'

const state = {
    loading: false,
    codesystems: [],
  }

  //// ---- Mutations
  const mutations = {
    setCodesystem: (state, payload) => {
      state.codesystems = payload
    },
  }

  //// ---- Actions
  const actions = {
    getCodesystems: (context) => {
      // context.state.RcRules = {}
      context.state.loading = true
      axios
      .get(context.rootState.baseUrl+'mapping/api/1.0/codesystems/')
      .then((response) => {
          console.log(response.data)
          context.commit('setCodesystem',response.data)
          context.state.loading = false
          return true;
      })
    },
  }

export default {
    namespaced: true,
    state,
    // getters,
    actions,
    mutations
}