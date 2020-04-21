import axios from 'axios'
// import { jwtHeader } from '@/helpers';
// import Vue from 'vue'
// import router from '@/router/index.js' //or whatever your router.js path is

const state = {
    results: {
      'domainAttributes': {},
    },
    loading: {
        'domainAttributes': false
    }
  }

  //// ---- Mutations
  const mutations = {
    setResultsDomainAttributes: (state, payload) => {
      state.results.domainAttributes = payload
      state.loading.domainAttributes = false
    },
  }

  //// ---- Actions
  const actions = {
    // Get results
    domainAttributes: (context, term) => {
      state.loading.domainAttributes = true
      axios
      .get('https://snowstorm.test-nictiz.nl/mrcm/MAIN%2FSNOMEDCT-NL/domain-attributes?parentIds='+term+'&proximalPrimitiveModeling=true&contentType=NEW_PRECOORDINATED')
      .then((response) => {
        // alert('Respons getResults: '+response.data)
        context.commit('setResultsDomainAttributes',response.data)
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