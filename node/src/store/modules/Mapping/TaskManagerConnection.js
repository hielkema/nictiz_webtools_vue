import axios from 'axios'
import Vue from 'vue'

const state = {
    tasks: [],
    loading: false,
  }

  //// ---- Mutations
  const mutations = {
    setTasks: (state, payload) => {
      state.tasks = payload
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
  }

export default {
    namespaced: true,
    state,
    // getters,
    actions,
    mutations
}