import axios from 'axios'
import Vue from 'vue'

const state = {
    tasks: [],
    newTasks: [],
    loading: false,
  }

  //// ---- Mutations
  const mutations = {
    setTasks: (state, payload) => {
      state.tasks = payload
    },
    setNewTasks: (state, payload) => {
      state.newTasks = payload.result
    },
    resetTasks: (state) => {
      state.tasks = []
    },
  }

  //// ---- Actions
  const actions = {
    getTasks: (context, projectid) => {
      // context.state.RcRules = {}
      context.state.loading = true
      axios
      .get(context.rootState.baseUrl+'mapping/api/1.0/tasks_manager/'+projectid+'/')
      .then((response) => {
          console.log(response.data)
          context.commit('setTasks',response.data)
          context.state.loading = false
          return true;
      })
    },
    changeTasks: (context, payload) => {
      const auth = {
        headers: {'X-CSRFToken' : Vue.$cookies.get('csrftoken')},
        withCredentials: true
      }
      axios
      .post(context.rootState.baseUrl+'mapping/api/1.0/change_tasks/', 
        payload
      ,auth)
      .then(() => {
        context.dispatch('getTasks', payload.projectid)
      })
    },
    createTasks: (context, payload) => {
      const auth = {
        headers: {'X-CSRFToken' : Vue.$cookies.get('csrftoken')},
        withCredentials: true
      }
      axios
      .post(context.rootState.baseUrl+'mapping/api/1.0/create_tasks/', 
        payload
      ,auth)
      .then((response) => {
        context.commit('setNewTasks', response.data)
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