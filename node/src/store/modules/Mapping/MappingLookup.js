import axios from 'axios'
import Vue from 'vue'

const state = {
    loading: false,
    results: [],
  }

  //// ---- Mutations
  const mutations = {
    setResults: (state, payload) => {
      state.results = payload
      state.loading = false
    },
  }

  //// ---- Actions
  const actions = {
    listLookup:(context, payload) => {
        context.loading = true
        const auth = {
        headers: {'X-CSRFToken' : Vue.$cookies.get('csrftoken')},
        withCredentials: true
      }
      axios
      .post(context.rootState.baseUrl+'mapping/api/1.0/list_lookup/', {
        'list' : payload,
      },auth)
      .then((result) => {
        context.commit('setResults', result.data)
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