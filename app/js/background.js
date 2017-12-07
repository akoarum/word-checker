/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*******************************!*\
  !*** ./_dev/js/background.js ***!
  \*******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n *\n * @namespace Background\n *\n */\nvar Background = function () {\n  function Background() {\n    _classCallCheck(this, Background);\n\n    chrome.browserAction.onClicked.addListener(this.clickHandler.bind(this));\n    chrome.tabs.onUpdated.addListener(this.initialize.bind(this));\n  }\n\n  /**\n   * 初期実行メソッド\n   */\n\n\n  _createClass(Background, [{\n    key: 'initialize',\n    value: function initialize() {\n      var _this = this;\n\n      this.getData(function (data) {\n        _this.words = data.projects.filter(function (project) {\n          return project.name === data.selectedProject;\n        })[0].words;\n        _this.selectedProject = data.selectedProject;\n      });\n      this.getMeta(function (data) {\n        _this.meta = data.settingMeta;\n      });\n      this.getAlt(function (data) {\n        _this.alt = data.settingAlt;\n      });\n\n      chrome.tabs.getSelected(function (tab) {\n        chrome.tabs.sendMessage(tab.id, {\n          type: 'initialize',\n          project: _this.selectedProject,\n          words: _this.words,\n          meta: _this.meta,\n          alt: _this.alt\n        }, function () {});\n      });\n    }\n\n    /**\n     * 検索ワードデータの取得\n     */\n\n  }, {\n    key: 'getData',\n    value: function getData(resolve) {\n      chrome.storage.sync.get(['projects', 'selectedProject'], resolve);\n    }\n\n    /**\n     * メタ・タイトルの取得\n     */\n\n  }, {\n    key: 'getMeta',\n    value: function getMeta(resolve) {\n      chrome.storage.sync.get(['settingMeta'], resolve);\n    }\n\n    /**\n     * alt、title属性の取得\n     */\n\n  }, {\n    key: 'getAlt',\n    value: function getAlt(resolve) {\n      chrome.storage.sync.get(['settingAlt'], resolve);\n    }\n\n    /**\n     * クリックイベント\n     */\n\n  }, {\n    key: 'clickHandler',\n    value: function clickHandler(tab) {\n      chrome.tabs.sendMessage(tab.id, { type: 'onclick' }, function () {});\n    }\n  }]);\n\n  return Background;\n}();\n\nnew Background();\n\n// Extensionインストール時にオプションページを開く\nchrome.runtime.onInstalled.addListener(function (details) {\n  if (details.reason !== 'install') {\n    return;\n  }\n  if (chrome.runtime.openOptionsPage) {\n    chrome.runtime.openOptionsPage();\n  } else {\n    window.open(chrome.runtime.getURL('options.html'));\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9fZGV2L2pzL2JhY2tncm91bmQuanM/OWQ4YSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbmFtZXNwYWNlIEJhY2tncm91bmRcbiAqXG4gKi9cbmNsYXNzIEJhY2tncm91bmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5vbkNsaWNrZWQuYWRkTGlzdGVuZXIodGhpcy5jbGlja0hhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKHRoaXMuaW5pdGlhbGl6ZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDliJ3mnJ/lrp/ooYzjg6Hjgr3jg4Pjg4lcbiAgICovXG4gIGluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5nZXREYXRhKChkYXRhKSA9PiB7XG4gICAgICB0aGlzLndvcmRzID0gZGF0YS5wcm9qZWN0cy5maWx0ZXIoKHByb2plY3QpID0+IHtcbiAgICAgICAgcmV0dXJuIHByb2plY3QubmFtZSA9PT0gZGF0YS5zZWxlY3RlZFByb2plY3Q7XG4gICAgICB9KVswXS53b3JkcztcbiAgICAgIHRoaXMuc2VsZWN0ZWRQcm9qZWN0ID0gZGF0YS5zZWxlY3RlZFByb2plY3Q7XG4gICAgfSk7XG4gICAgdGhpcy5nZXRNZXRhKChkYXRhKSA9PiB7XG4gICAgICB0aGlzLm1ldGEgPSBkYXRhLnNldHRpbmdNZXRhO1xuICAgIH0pO1xuICAgIHRoaXMuZ2V0QWx0KChkYXRhKSA9PiB7XG4gICAgICB0aGlzLmFsdCA9IGRhdGEuc2V0dGluZ0FsdDtcbiAgICB9KTtcblxuICAgIGNocm9tZS50YWJzLmdldFNlbGVjdGVkKCh0YWIpID0+IHtcbiAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYi5pZCwge1xuICAgICAgICB0eXBlOiAnaW5pdGlhbGl6ZScsXG4gICAgICAgIHByb2plY3Q6IHRoaXMuc2VsZWN0ZWRQcm9qZWN0LFxuICAgICAgICB3b3JkczogdGhpcy53b3JkcyxcbiAgICAgICAgbWV0YTogdGhpcy5tZXRhLFxuICAgICAgICBhbHQ6IHRoaXMuYWx0XG4gICAgICB9LCAoKSA9PiB7fSk7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiDmpJzntKLjg6/jg7zjg4njg4fjg7zjgr/jga7lj5blvpdcbiAgICovXG4gIGdldERhdGEocmVzb2x2ZSkge1xuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFsgJ3Byb2plY3RzJywgJ3NlbGVjdGVkUHJvamVjdCcgXSwgcmVzb2x2ZSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiDjg6Hjgr/jg7vjgr/jgqTjg4jjg6vjga7lj5blvpdcbiAgICovXG4gIGdldE1ldGEocmVzb2x2ZSkge1xuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFsgJ3NldHRpbmdNZXRhJyBdLCByZXNvbHZlKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIGFsdOOAgXRpdGxl5bGe5oCn44Gu5Y+W5b6XXG4gICAqL1xuICBnZXRBbHQocmVzb2x2ZSkge1xuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFsgJ3NldHRpbmdBbHQnIF0sIHJlc29sdmUpO1xuICB9XG5cblxuICAvKipcbiAgICog44Kv44Oq44OD44Kv44Kk44OZ44Oz44OIXG4gICAqL1xuICBjbGlja0hhbmRsZXIodGFiKSB7XG4gICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFiLmlkLCB7IHR5cGU6ICdvbmNsaWNrJyB9LCAoKSA9PiB7fSk7XG4gIH1cbn1cblxuXG5uZXcgQmFja2dyb3VuZCgpO1xuXG5cbi8vIEV4dGVuc2lvbuOCpOODs+OCueODiOODvOODq+aZguOBq+OCquODl+OCt+ODp+ODs+ODmuODvOOCuOOCkumWi+OBj1xuY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoKGRldGFpbHMpID0+IHtcbiAgaWYgKGRldGFpbHMucmVhc29uICE9PSAnaW5zdGFsbCcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNocm9tZS5ydW50aW1lLm9wZW5PcHRpb25zUGFnZSkge1xuICAgIGNocm9tZS5ydW50aW1lLm9wZW5PcHRpb25zUGFnZSgpO1xuICB9IGVsc2Uge1xuICAgIHdpbmRvdy5vcGVuKGNocm9tZS5ydW50aW1lLmdldFVSTCgnb3B0aW9ucy5odG1sJykpO1xuICB9XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBfZGV2L2pzL2JhY2tncm91bmQuanMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7QUFLQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBR0E7QUFDQTtBQUNBOzs7Ozs7QUFJQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n");

/***/ })
/******/ ]);