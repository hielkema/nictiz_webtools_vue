import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// Termspace tools
import Epd from './modules/Epd'
import TermspaceComments from './modules/Terminologie/TermspaceComments'
import TermspaceProgress from './modules/Terminologie/TermspaceProgress'

// Mapping tools
import MappingComments from './modules/Terminologie/MappingComments'
import MappingProjects from './modules/Mapping/ProjectsConnection'
import MappingTasks from './modules/Mapping/TasksConnection'
import RcAuditConnection from './modules/Mapping/RcAuditConnection'
import TaskManager from './modules/Mapping/TaskManagerConnection'
import MappingAudits from './modules/Mapping/AuditsConnection'

// DHD - SNOMED integration modules
import IntegratedCodePicker from './modules/DHD/IntegratedCodePicker'

// Snowstorm integration
import Snowstorm from './modules/DHD/Snowstorm'

// Framework modules
import { authentication } from './authentication.module';
import { alert } from './alert.module';
// import { userService } from '@/services';
// import router from '@/router/index.js';

Vue.use(Vuex)
Vue.use(axios)


export default new Vuex.Store({
  state: {
    // baseUrl: 'https://termservice.test-nictiz.nl/',
    baseUrl: 'http://localhost:8000/',
    userData: {
      'id': null,
      'groups' : [],
      'permissions' : []
    },
  },
  modules: {
      Epd,
      TermspaceComments,
      Snowstorm,
      MappingTasks,
      MappingComments,
      MappingProjects,
      authentication,
      MappingAudits,
      TermspaceProgress,
      RcAuditConnection,
      IntegratedCodePicker,
      TaskManager,
      alert,
  },
  actions: {
    getPermissions: (context) => {
      axios
      .get(context.state.baseUrl+'jwtauth/permissions/')
      .then(response => {
        context.commit('setPermissions', response);
      })
    }
  },
  mutations: {
    setPermissions(state, response) {
      state.userData = response.data
    }
  }
})
