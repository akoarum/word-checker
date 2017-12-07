import * as types from './types';

export default {
  [types.GET_PROJECTS](state, payload) {
    state.projects = payload;
  },
  [types.ADD_PROJECT](state, payload) {
    state.projects = payload;
  },
  [types.REMOVE_PROJECT](state, payload) {
    state.projects = payload;
  },
  [types.GET_SELECTED_PROJECT](state, payload) {
    state.selectedProject = payload;
  },
  [types.UPDATE_SELECTED_PROJECT](state, payload) {
    state.selectedProject = payload;
  },
  [types.ADD_WORD](state, payload) {
    state.projects = payload;
  },
  [types.REMOVE_WORD](state, payload) {
    state.projects = payload;
  },
  [types.GET_SETTING_META](state, payload) {
    state.meta = payload;
  },
  [types.SET_SETTING_META](state, payload) {
    state.meta = payload;
  },
  [types.GET_SETTING_ALT](state, payload) {
    state.alt = payload;
  },
  [types.SET_SETTING_ALT](state, payload) {
    state.alt = payload;
  }
};
