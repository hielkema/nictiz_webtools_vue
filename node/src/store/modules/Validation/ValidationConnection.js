import axios from 'axios'
import Vue from 'vue'

const state = {
    loading: false,
    taskStatistics: {
      'total' : {
        'count' : 0,
      },
      'open' : { 
        'count' : 0,
      }
    },
    currentTask : {},
    users: {},
    userStats: {},
  }

  //// ---- Mutations
  const mutations = {
    setTaskStatistics: (state, payload) => {
      state.taskStatistics = payload
    },
    setCurrentTask: (state, payload) => {
      state.currentTask = payload
    },
    setUsers: (state, payload) => {
      state.users = payload
    },
    setUserStats: (state, payload) => {
      state.userStats = payload
    },
  }

  //// ---- Actions
  const actions = {
    getTaskStatistics: (context) => {
      // context.state.RcRules = {}
      context.state.loading = true
      axios
      .get(context.rootState.baseUrl+'validation/task_count/')
      .then((response) => {
          context.state.loading = false
          context.commit('setTaskStatistics',response.data)
          return true;
      })
    },
    getTask: (context) => {
      // context.state.RcRules = {}
      context.state.loading = true
      axios
      .get(context.rootState.baseUrl+'validation/next_task/')
      .then((response) => {
          context.state.loading = false
          context.commit('setCurrentTask',response.data)
          return true;
      })
    },
    sendForm:(context, payload) => {
      context.loading = true
      const auth = {
        headers: {'X-CSRFToken' : Vue.$cookies.get('csrftoken')},
        withCredentials: true
      }
      axios
      .post(context.rootState.baseUrl+'validation/send_form/', {
        payload,
      },auth)
      .then(() => {
        // Get next task
        context.dispatch('getTask')
        context.dispatch('getTaskStatistics')
        return true
        }
      )
    },
    getUsers: (context) => {
      // context.state.RcRules = {}
      context.state.loading = true
      axios
      .get(context.rootState.baseUrl+'validation/all_users/')
      .then((response) => {
          context.state.loading = false
          context.commit('setUsers',response.data)
          return true;
      })
    },
    getUserStats: (context) => {
      // context.state.RcRules = {}
      context.state.loading = true
      axios
      .get(context.rootState.baseUrl+'validation/user_stats/')
      .then((response) => {
          context.state.loading = false
          context.commit('setUserStats',response.data)
          return true;
      })
    },
    createTasks:(context, payload) => {
      context.loading = true
      const auth = {
        headers: {'X-CSRFToken' : Vue.$cookies.get('csrftoken')},
        withCredentials: true
      }
      axios
      .post(context.rootState.baseUrl+'validation/create_tasks/', {
        payload,
      },auth)
      .then(() => {
        context.dispatch('getUserStats')
        return true
        }
      )
    },
  }

export default {
    namespaced: true,
    state,
    // getters,
    actions,
    mutations
}