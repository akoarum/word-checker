/**
 * プロジェクトの取得
 * @param {Function} resolve
 */
export const getProjects = (resolve) => {
  chrome.storage.sync.get(['projects'], resolve);
};


/**
 * プロジェクトの追加
 * @param {Array}    datas   - 既存プロジェクト＋追加プロジェクト全てが入った配列
 * @param {Function} resolve
 */
export const addProject = (datas, resolve) => {
  chrome.storage.sync.set({ projects: datas }, resolve(datas));
};


/**
 * プロジェクトの削除
 * @param {Array}    datas   - 既存プロジェクト＋追加プロジェクト全てが入った配列
 * @param {Function} resolve
 */
export const removeProject = (datas, resolve) => {
  chrome.storage.sync.set({ projects: datas }, resolve(datas));
};


/**
 * 選択中のプロジェクトの取得
 * @param {Function} resolve
 */
export const getSelectedProject = (resolve) => {
  chrome.storage.sync.get(['selectedProject'], resolve);
};


/**
 * 選択中のプロジェクトの更新
 * @param {String}   name    - 選択プロジェクトの名前
 * @param {Function} resolve
 */
export const updateSelectedProject = (name, resolve) => {
  chrome.storage.sync.set({ selectedProject: name }, resolve(name));
};


/**
 * ワードの追加
 * @param {String}   name    - 追加対象のプロジェクトの名前
 * @param {String}   word    - 追加するワード
 * @param {Function} resolve
 */
export const addWord = (name, word, resolve) => {
  getProjects((res) => {
    const datas = res.projects;

    for (let i = 0, len = datas.length; i < len; i++) {
      if (datas[i].name === name) {
        datas[i].words.push(word);
      }
    }

    chrome.storage.sync.set({ projects: datas }, resolve(datas));
  });
};


/**
 * ワードの削除
 */
export const removeWord = (name, word, resolve) => {
  getProjects((res) => {
    const datas = res.projects;

    for (let i = 0, dLen = datas.length; i < dLen; i++) {
      if (datas[i].name === name) {
        for (let j = 0, wLen = datas[i].words.length; j < wLen; j++) {
          if (datas[i].words[j] === word) {
            datas[i].words.splice(j, 1);
          }
        }
      }
    }

    chrome.storage.sync.set({ projects: datas }, resolve(datas));
  });
};


/**
 * 設定（メタ）の取得
 */
export const getSettingMeta = (resolve) => {
  chrome.storage.sync.get(['settingMeta'], resolve);
};


/**
 * 設定（メタ）のセット
 */
export const setSettingMeta = (value, resolve) => {
  chrome.storage.sync.set({ settingMeta: value }, resolve(value));
};


/**
 * 設定（alt）の取得
 */
export const getSettingAlt = (resolve) => {
  chrome.storage.sync.get(['settingAlt'], resolve);
};


/**
 * 設定（alt）のセット
 */
export const setSettingAlt = (value, resolve) => {
  chrome.storage.sync.set({ settingAlt: value }, resolve(value));
};
