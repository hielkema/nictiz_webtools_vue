import axios from 'axios'
// import Vue from 'vue'

const state = {
    loading: false,
    audits: [],
    auditsPerProject: [],
  }

  //// ---- Mutations
  const mutations = {
    setAudits: (state, payload) => {
      state.audits = payload
    },
    setAuditsProject: (state, payload) => {
      state.auditsPerProject = payload
    },
    resetAuditHitsByProject: (state) => {
      state.auditsPerProject = []
    },
  }

  //// ---- Actions
  const actions = {
    getAudits: (context, taskid) => {
      // context.state.RcRules = {}
      context.state.loading = true
      context.audits = []
      axios
      .get(context.rootState.baseUrl+'mapping/api/1.0/audits/'+taskid+'/')
      .then((response) => {
          console.log(response.data)
          context.commit('setAudits',response.data)
          context.state.loading = false
          return true;
      })
    },
    getAuditsByProject: (context, project) => {
      // context.state.RcRules = {}
      context.state.loading = true
      context.audits = []
      axios
      .get(context.rootState.baseUrl+'mapping/api/1.0/audits_per_project/'+project+'/')
      .then((response) => {
          console.log(response.data)
          context.commit('setAuditsProject',response.data)
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