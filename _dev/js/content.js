import $ from 'jquery';

let checker;
const $body = $('body');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
  case 'initialize':
    checker = new WordChecker(request.project, request.words, request.meta, request.alt);
    break;
  case 'onclick':
    if (!checker.checkInit()) {
      return;
    }

    if (!document.getElementById('wordChecker-style')) {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.id = 'wordChecker-style';
      style.href = chrome.extension.getURL('css/content.css');
      (document.head || document.documentElement).appendChild(style);
    }

    break;
  default:
    return;
  }
  sendResponse();
});


/**
 *
 * @namespace WordChecker
 *
 */
class WordChecker {
  /**
   * @name constructor
   * @param {Array} words
   */
  constructor(project, words, meta, alt) {
    this.project = project;
    this.words = words;
    this.meta = meta;
    this.alt = alt;
    this.cullTime = null;
    this.$container = null;
    this.executed = false;
    this._items = [];
  }


  get items() {
    return this._items;
  }
  set items(value) {
    this._items = value;
    this.updateList();
    this.updateTitle();
  }


  /**
   * 検索初期化
   * @return {Boolean}
   */
  checkInit() {
    if (this.$container) {
      this.$container = null;
      this.$title = null;
      this.$list = null;
      $body.find('.wordChecker-container').remove();
    }

    if (!this.words) {
      window.alert('ワードが設定されていません。オプションページで設定を確認してください。');
      return false;
    }

    [this.$container, this.$title, this.$list] = this.setupListContainer();
    this.items = [];

    if (this.executed) {
      this.reset();
    }

    if (this.meta) {
      this.setupHeadDisplay();
    }

    if (this.alt) {
      this.setupAttributeDisplay();
    }

    for (let i = 0, len = this.words.length; i < len; i++) {
      this.checkStart($body.get(0), this.words[i]);
    }
    return true;
  }


  /**
   * 検索スタート
   * @param {Node} node
   * @return {Number}
   */
  checkStart(node, word) {
    let position
    let key = 0, text;

    // 再帰呼び出しが完了したらコンテナをレンダリングする
    clearTimeout(this.cullTime);
    this.cullTime = setTimeout(this.renderContainer.bind(this), 200);

    switch (node.nodeType) {
    case 1:
      if (/(script|style)/i.test(node.tagName)) {
        break;
      }

      if (node.childNodes) {
        // Nodeリストの末端まで再帰呼び出しする
        for (let i = 0; i < node.childNodes.length; ++i) {
          i += this.checkStart(node.childNodes[i], word);
        }
      }

      break;
    case 3:
      position = node.data.toUpperCase().indexOf(word);

      if (position >= 0) {
        position -= node.data.substr(0, position).toUpperCase().length - node.data.substr(0, position).length;
        this.setupMark(node, word, position);
        key = 1;
      } else {
        position = -1;
      }
      break;
    default:
      return key;
    }

    return key;
  }


  /**
   * マーカーを引く
   * @param {Node}     node
   * @param {TextNode} word
   * @param {Number}   position
   */
  setupMark(node, word, position) {
    const marker = document.createElement('mark');
    const middlebit = node.splitText(position);
    const endbit = middlebit.splitText(word.length);
    const clone = middlebit.cloneNode(true);
    marker.className = 'wordChecker-marker';
    marker.setAttribute('id', `wordChecker-${this.items.length}`);
    marker.appendChild(clone);
    middlebit.parentNode.replaceChild(marker, middlebit);
    this.items = this.items.concat([ { node: node, word: word } ]);
  }


  /**
   * head要素の表示
   */
  setupHeadDisplay() {
    let $table = $('<table class="wordChecker-headTable" />');
    let items = '';
    const $head = $('head');
    const $meta = $('meta').filter(function() {
      const el = $(this);
      if (el.attr('name')) {
        return /(description|keywords)/i.test(el.attr('name'));
      }
      if (el.attr('property')) {
        return /description/i.test(el.attr('property'));
      }
      return false;
    });

    $table.append(`<tr><th>title</th><td>${ $('title').text() }</td></tr>`);

    for (let i = 0, len = $meta.length; i < len; i++) {
      items += `
      <tr>
        <th>${ $meta.eq(i).attr('name') || $meta.eq(i).attr('property') }</th>
        <td>${ $meta.eq(i).attr('content') }</td>
      </tr>
      `;
    }
    $table.append(items);

    $body.prepend($table);
  }


  /**
   * 属性値（alt、title）を表示する
   */
  setupAttributeDisplay() {
    let attr = {};
    let itemizeDom, itemizeText;
    const $dom = $body.find('*').filter(function() {
      return $(this).attr('alt') || $(this).attr('title');
    });

    if (!$dom.length) {
      return;
    }

    for (let i = 0, len = $dom.length; i < len; i++) {
      itemizeDom = $('<span class="wordChecker-attr" />');
      itemizeText = '';
      attr = {
        alt: $dom.eq(i).attr('alt'),
        title: $dom.eq(i).attr('title')
      };

      for (let type in attr) {
        if (!attr[type]) {
          continue;
        }
        itemizeText += ` / ${type}: ${attr[type]}`;
      }
      itemizeText = itemizeText.replace(/ \/ (.*?)$/i, '$1');

      itemizeDom.text(itemizeText);
      $dom.eq(i).after(itemizeDom);
    }
  }


  /**
   * マーカーをリセットする
   */
  reset() {
    const $marker = $body.find('.wordChecker-marker');
    const $head = $body.find('.wordChecker-headTable');
    const $attr = $body.find('.wordChecker-attr');
    let text, currentMarker;

    // マーカーがなければ動作しない
    if (!$marker.length) {
      return;
    }

    for (let i = 0, len = $marker.length; i < len; i++) {
      currentMarker = $marker.eq(i);
      text = currentMarker.text();
      currentMarker.after(text);
      currentMarker.remove();
    }

    // head表示の削除
    if ($head.length) {
      $head.remove();
    }

    // 属性表示の削除
    if ($attr.length) {
      $attr.remove();
    }
  }


  /**
   * リストコンテナのセットアップ
   * @return {Array}
   */
  setupListContainer() {
    let dom = '';
    dom = $(`
    <div class="wordChecker-container">
      <div class="wordChecker-title"></div>
      <ul class="wordChecker-list"></ul>
    </div>`);
    return [dom, dom.find('.wordChecker-title'), dom.find('.wordChecker-list')];
  }


  /**
   * リストのアップデート
   */
  updateList() {
    const $item = [];

    if (this.$list.children().length) {
      this.$list.empty();
    }

    for (let i = 0; i < this.items.length; i++) {
      $item.push($(`
        <li class="wordChecker-list__item">
          <a href="#wordChecker-${i}">
            <i class="wordChecker-list__word">${this.items[i].word}</i>
          </a>
        </li>`));
    }
    this.$list.append($item);
    this.$list.children().on('click', this.clickHandler.bind(this));
  }


  /**
   * タイトルのアップデート
   */
  updateTitle() {
    const itemize = {};
    let itemizeText = '';

    for (let i = 0, len = this.items.length; i < len; i++) {
      if (!itemize[this.items[i].word]) {
        itemize[this.items[i].word] = 1;
      } else {
        itemize[this.items[i].word] += 1;
      }
    }

    for (let item in itemize) {
      itemizeText += ` / ${item}: ${itemize[item]}件`;
    }
    itemizeText = itemizeText.replace(/^ \/ (.*?)$/i, '$1');

    this.$title.html(`
      <div class="wordChecker-title__main">
        <h2 class="wordChecker-title__number">検索結果：${ this.items.length }件</h2>
        <span class="wordChecker-title__words">（${ itemizeText }）</span>
      </div>
      <span class="wordChecker-title__project">プロジェクト：${ this.project }</span>
    `);
  }


  /**
   * コンテナのレンダリング
   */
  renderContainer() {
    this.executed = true;
    $body.append(this.$container);
    $body.css('padding-bottom', this.$container.outerHeight());
  }


  /**
   * クリックイベントハンドラ
   * @param {Object} e
   */
  clickHandler(e) {
    const $self = $(e.target);
    const target = $self.attr('href');
    e.preventDefault();
    this.scrollStart(target);
    this.updateMark(target);
  }


  /**
   * スクロール位置の取得
   * @param {jQueryObject}
   * @return {Number}
   */
  getScrollPoint(el) {
    let point = el.offset().top;
    let $currentEl;
    const allEl = $body.find('*');

    for (let i = 0, len = allEl.length; i < len; i++) {
      $currentEl = allEl.eq(i);
      if ($currentEl.css('position') !== 'fixed') {
        continue;
      }
      if ($currentEl.css('top') !== '0px' || $currentEl.css('left') !== '0px') {
        continue;
      }
      point -= $currentEl.outerHeight();
    }
    return point;
  }


  /**
   * スクロールの実行
   * @param {String} target
   */
  scrollStart(target) {
    const scrollPoint = this.getScrollPoint($(target));
    $('html, body').animate({
      scrollTop: scrollPoint
    }, 350);
  }


  /**
   * マーカーのカレント処理
   * @param {String} target
   */
  updateMark(target) {
    const $marker = $body.find('.wordChecker-marker').removeClass('is-current');
    $(target).addClass('is-current');
  }
}
