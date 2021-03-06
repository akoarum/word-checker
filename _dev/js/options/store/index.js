import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  projects: [],
  selectedProject: '',
  meta: false,
  alt: false
};

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state,
  strict: true
});
