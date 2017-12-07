import * as request from '../request';
import * as types from './types';

export default {

  /**
   * プロジェクトの取得
   * @param {Object}   context
   * @return {Promise}
   */
  [types.GET_PROJECTS](context) {
    return request.getProjects((value) => {
      this.commit(types.GET_PROJECTS, (!value.projects) ? [] : value.projects);
    });
  },


  /**
   * プロジェクトの追加
   * @param {Object}   context
   * @param {String}   name
   * @return {Promise}
   */
  [types.ADD_PROJECT](context, name) {
    const newProject = {
      name: name,
      words: []
    };
    const datas = context.state.projects.concat([ newProject ]);
    return request.addProject(datas, (value) => {
      this.commit(types.ADD_PROJECT, value);
    });
  },


  /**
   * プロジェクトの削除
   * @param {Object}   context
   * @param {String}   name
   * @return {Promise}
   */
  [types.REMOVE_PROJECT](context, name) {
    const datas = context.state.projects.filter((project) => {
      return project.name !== name;
    });
    return request.removeProject(datas, (value) => {
      this.commit(types.REMOVE_PROJECT, value);
    });
  },


  /**
   * カレントプロジェクトの取得
   * @param {Object}   context
   * @return {Promise}
   */
  [types.GET_SELECTED_PROJECT](context) {
    return request.getSelectedProject((value) => {
      this.commit(types.GET_SELECTED_PROJECT, (!value.selectedProject) ? '' : value.selectedProject);
    });
  },


  /**
   * カレントプロジェクトの更新
   * @param {Object}   context
   * @param {String}   name
   * @return {Promise}
   */
  [types.UPDATE_SELECTED_PROJECT](context, name) {
    return request.updateSelectedProject(name, (value) => {
      this.commit(types.UPDATE_SELECTED_PROJECT, value);
    });
  },


  /**
   * ワードの追加
   * @param {Object}   context
   * @param {Object}   material - name（対象のプロジェクトの名前）、word（追加するワード）を持ったオブジェクト
   * @return {Promise}
   */
  [types.ADD_WORD](context, material) {
    return request.addWord(material.name, material.word, (datas) => {
      this.commit(types.ADD_WORD, datas);
    });
  },


  /**
   * ワードの削除
   * @param {Object}   context
   * @param {Object}   material - name（対象のプロジェクトの名前）、word（追加するワード）を持ったオブジェクト
   * @return {Promise}
   */
  [types.REMOVE_WORD](context, material) {
    request.removeWord(material.name, material.word, (datas) => {
      this.commit(types.REMOVE_WORD, datas);
    });
  },


  /**
   * 共通設定「メタ」の取得
   * @param {Object} context
   */
  [types.GET_SETTING_META](context) {
    request.getSettingMeta((data) => {
      this.commit(types.GET_SETTING_META, (data.settingMeta) ? data.settingMeta : false);
    });
  },


  /**
   * 共通設定「メタ」のセット
   * @param {Object}  context
   * @param {Boolean} value
   */
  [types.SET_SETTING_META](context, value) {
    request.setSettingMeta(value, (data) => {
      this.commit(types.SET_SETTING_META, data);
    });
  },

  [types.GET_SETTING_ALT](context) {
    request.getSettingAlt((data) => {
      console.log(data);
      this.commit(types.GET_SETTING_ALT, (data.settingAlt) ? data.settingAlt : false);
    });
  },

  [types.SET_SETTING_ALT](context, value) {
    request.setSettingAlt(value, (data) => {
      this.commit(types.SET_SETTING_ALT, data);
    });
  }
};
