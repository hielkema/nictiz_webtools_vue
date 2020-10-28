import axios from 'axios'
// import { jwtHeader } from '@/helpers';
// import Vue from 'vue'
// import router from '@/router/index.js' //or whatever your router.js path is

const state = {
    results: {
      'domainAttributes': {},
      'attributeValues': {},
      'lookupFsn' : {
          'fsn': { 'term' : ''}
      },
    },
    loading: {
        'domainAttributes': false,
        'attributeValues': false,
    }
  }

  //// ---- Mutations
  const mutations = {
    setResultsDomainAttributes: (state, payload) => {
      state.results.domainAttributes = payload
      state.loading.domainAttributes = false
    },
    setResultsAttributeValues: (state, payload) => {
      state.results.attributeValues = payload
      state.loading.attributeValues = false
    },
    setResultsLookupFSN: (state, payload) => {
      state.results.lookupFsn = payload
    },
  }

  //// ---- Actions
  const actions = {
    // Get results
    domainAttributes: (context, term) => {
      state.loading.domainAttributes = true
      axios
      .get('https://snowstorm.test-nictiz.nl/mrcm/MAIN%2FSNOMEDCT-NL/domain-attributes?parentIds='+term+'&proximalPrimitiveModeling=false&contentType=NEW_PRECOORDINATED')
      .then((response) => {
        // alert('Respons getResults: '+response.data)
        context.commit('setResultsDomainAttributes',response.data)
        return true;
      })
    },
    attributeValues: (context, payload) => {
      state.loading.domainAttributes = true
      axios
      .get('https://snowstorm.test-nictiz.nl/mrcm/MAIN%2FSNOMEDCT-NL/attribute-values/'+payload.attributeId+'?termPrefix='+payload.termPrefix+'&proximalPrimitiveModeling=false&contentType=NEW_PRECOORDINATED')
      .then((response) => {
        // alert('Respons getResults: '+response.data)
        context.commit('setResultsAttributeValues',response.data)
        return true;
      })
    },
    // Get results
    lookupConcept: (context, term) => {
      axios
      .get('https://snowstorm.test-nictiz.nl/MAIN%2FSNOMEDCT-NL/concepts/'+term)
      .then((response) => {
        // alert('Respons getResults: '+response.data)
        context.commit('setResultsLookupFSN',response.data)
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