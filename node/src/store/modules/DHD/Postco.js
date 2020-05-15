import axios from 'axios'
// import { jwtHeader } from '@/helpers';
import Vue from 'vue'
// import router from '@/router/index.js' //or whatever your router.js path is

const state = {
    templates: [],
    selectedTemplate: {},
    expression: '',
    postcoComponents: [],
    loading: {
        'templates': false,
        'expression' : false,
        'attributeValues': false,
    }
  }

  //// ---- Mutations
  const mutations = {
    setTemplates: (state, payload) => {
      state.templates = payload
      state.loading.templates = false
    },
    setExpression: (state, payload) => {
      state.expression = payload
      state.loading.expression = false
    },
    setSelectedTemplate: (state, payload) => {
      state.selectedTemplate = payload
      state.loading.templates = false
    },
    setValue: (state, payload) => {
      var attribute = payload.attribute
      var value = payload.value
      var objIndex = state.postcoComponents.findIndex((obj => obj.attribute.sctid == attribute.sctid))
      state.postcoComponents[objIndex].value = value
    },
    createAttribute: (state, payload) => {
      state.postcoComponents.push ({attribute: payload.attribute, type: payload.type, value: {}})
    },
  }

  //// ---- Actions
  const actions = {
    // Get results
    getTemplates: (context) => {
      state.loading.templates = true
      axios
      .get(context.rootState.baseUrl+'postco/templates/')
      .then((response) => {
        // alert('Respons getResults: '+response.data)
        context.commit('setTemplates',response.data)
        return true;
      })
    },
    getExpression: (context) => {
      state.loading.expression = true
      const auth = {
        headers: {'X-CSRFToken' : Vue.$cookies.get('csrftoken')},
        withCredentials: true
      }
      var rootConcept = context.state.selectedTemplate.root_concept
      var postcoComponents = context.state.postcoComponents
      axios
      .post(context.rootState.baseUrl+'postco/expression/', 
        {
          rootConcept,
          postcoComponents,
        }
      ,auth)
      .then((response) => {
        context.commit('setExpression', response.data)
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