/**
 *
 * @namespace Background
 *
 */
class Background {
  constructor() {
    chrome.browserAction.onClicked.addListener(this.clickHandler.bind(this));
    chrome.tabs.onUpdated.addListener(this.initialize.bind(this));
  }

  /**
   * 初期実行メソッド
   */
  initialize() {
    this.getData((data) => {
      this.words = data.projects.filter((project) => {
        return project.name === data.selectedProject;
      })[0].words;
      this.selectedProject = data.selectedProject;
    });
    this.getMeta((data) => {
      this.meta = data.settingMeta;
    });
    this.getAlt((data) => {
      this.alt = data.settingAlt;
    });

    chrome.tabs.getSelected((tab) => {
      chrome.tabs.sendMessage(tab.id, {
        type: 'initialize',
        project: this.selectedProject,
        words: this.words,
        meta: this.meta,
        alt: this.alt
      }, () => {});
    });
  }


  /**
   * 検索ワードデータの取得
   */
  getData(resolve) {
    chrome.storage.sync.get([ 'projects', 'selectedProject' ], resolve);
  }


  /**
   * メタ・タイトルの取得
   */
  getMeta(resolve) {
    chrome.storage.sync.get([ 'settingMeta' ], resolve);
  }


  /**
   * alt、title属性の取得
   */
  getAlt(resolve) {
    chrome.storage.sync.get([ 'settingAlt' ], resolve);
  }


  /**
   * クリックイベント
   */
  clickHandler(tab) {
    chrome.tabs.sendMessage(tab.id, { type: 'onclick' }, () => {});
  }
}


new Background();


// Extensionインストール時にオプションページを開く
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason !== 'install') {
    return;
  }
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});
