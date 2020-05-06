import axios from 'axios'
// import { jwtHeader } from '@/helpers';
// import Vue from 'vue'
// import router from '@/router/index.js' //or whatever your router.js path is

const state = {
    results: {
      'rootConcept': {
          'value' : 'init'
      },
      'domainAttributes': [],
      'selectedDomain' : null,
      'attributeValues': [],
      'lookupConcept' : {
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
    setConceptLookup: (state, payload) => {
      state.results.lookupConcept = payload
    },
    setDomain: (state, payload) => {
      state.results.selectedDomain = payload
      state.results.attributeValues = []
    },
  }

  //// ---- Actions
  const actions = {
    // Get results
    getDomainAttributes: (context, term) => {
      state.loading.domainAttributes = true
      axios
      .get('https://snowstorm.test-nictiz.nl/mrcm/MAIN%2FSNOMEDCT-NL/domain-attributes?parentIds='+term+'&proximalPrimitiveModeling=false&contentType=NEW_PRECOORDINATED')
      .then((response) => {
        // alert('Respons getResults: '+response.data)
        context.commit('setResultsDomainAttributes',response.data)
        return true;
      })
    },
    getAttributeValues: (context, payload) => {
      state.loading.attributeValues = true
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
        context.commit('setConceptLookup',response.data)
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