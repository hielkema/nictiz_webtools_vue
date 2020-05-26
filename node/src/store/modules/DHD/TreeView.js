import axios from 'axios'
// import { jwtHeader } from '@/helpers';
// import Vue from 'vue'
// import router from '@/router/index.js' //or whatever your router.js path is

const state = {
    treeData: {},
    loading: {
        'tree': false,
    }
  }

  //// ---- Mutations
  const mutations = {
    setTreeData: (state, payload) => {
      state.treeData = payload
      state.loading.tree = false
    },
  }

  //// ---- Actions
  const actions = {
    // Get results
    getTreeData: (context, concept) => {
      state.loading.templates = true
      axios
      .get(context.rootState.baseUrl+'termspace/snomed_json_tree/'+concept+'/')
      .then((response) => {
        // alert('Respons getResults: '+response.data)
        context.commit('setTreeData',response.data)
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