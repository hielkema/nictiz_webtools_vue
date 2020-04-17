import axios from 'axios'
// import Vue from 'vue'

const state = {
    loading: false,
    projects: [],
    statuses: [],
    users: [],
    selectedProject: false,
  }

  //// ---- Mutations
  const mutations = {
    setProjects: (state, payload) => {
      state.projects = payload
    },
    setProjectDetails: (state, payload) => {
      state.selectedProject = payload
      state.rootState.MappingTasks.selectedTask = {}
    },
    setProjectStatuses: (state, payload) => {
      state.statuses = payload
    },
    setProjectUsers: (state, payload) => {
      state.users = payload
    },
  }

  //// ---- Actions
  const actions = {
    getProjects: (context) => {
      // context.state.RcRules = {}
      context.state.loading = true
      axios
      .get(context.rootState.baseUrl+'mapping/api/1.0/projects/')
      .then((response) => {
          console.log(response.data)
          context.commit('setProjects',response.data)
          context.state.loading = false
          return true;
      })
    },    
    getProjectDetails: (context, projectid) => {
      // context.state.RcRules = {}
      context.state.loading = true
      axios
      .get(context.rootState.baseUrl+'mapping/api/1.0/projects/'+projectid+'/')
      .then((response) => {
          console.log(response.data)
          context.commit('setProjectDetails',response.data)
          context.state.loading = false
          this.$toast.info('Info toast')
          return true;
      })
    },
    getProjectStatuses: (context, projectid) => {
      // context.state.RcRules = {}
      context.state.loading = true
      axios
      .get(context.rootState.baseUrl+'mapping/api/1.0/statuses/'+projectid+'/')
      .then((response) => {
          console.log(response.data)
          context.commit('setProjectStatuses',response.data)
          context.state.loading = false
          return true;
      })
    },
    getProjectUsers: (context, projectid) => {
      // context.state.RcRules = {}
      context.state.loading = true
      axios
      .get(context.rootState.baseUrl+'mapping/api/1.0/users/'+projectid+'/')
      .then((response) => {
          console.log(response.data)
          context.commit('setProjectUsers',response.data)
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