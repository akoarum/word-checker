# Word Checker
ページ内のコンテンツから、複数のワードを一括で検索できるChrome Extensionです。
表記統一など、複数のNGワードが使われていないか検索することを想定して作成しています。
ページ内のテキストだけでなく、title要素、meta要素のdescription、keywords（descriptionはOG系のmeta要素にも反応します）、img要素のalt属性やtitle属性も検索できます。

## 使い方

### 初回設定
+ `chrome:://extensions` の「パッケージ化されていない拡張機能を読み込む」から `app/` を選択し、「選択」ボタンをクリックします。
+ オプションページが立ち上がるため、プロジェクト名を入力して「追加する」ボタンをクリックします。
+ 検索ワードを入力し、「追加する」ボタンをクリックします。
+ 検索時にmetaやtitle要素を対象にしたい場合は共通設定の「meta要素、title要素を対象に含める」を「はい」にします。
+ 検索時にaltやtitle属性を対象にしたい場合は共通設定の「alt属性、title属性も対象に含める」を「はい」にします。
+ オプションページを閉じて、ワードチェックをしたいページを開いて、ツールバーに表示されているWordCheckerのアイコンをクリックします。
+ おめでとうございます！画面に検索結果が表示されました！

#### 検索結果画面について
- 該当の箇所に黄色いマーカーが引かれます。
- 画面下に件数と一覧が表示されます。一覧は、クリックするとそれぞれの該当箇所にスクロールし、該当箇所のマーカーがオレンジに変わります。
- meta要素、title要素を含めている場合は、body開始タグ直後にmetaやtitleのテキストが表示されます。
- alt属性、title属性を含めている場合は、該当の要素の直後にaltやtitleのテキストが表示されます。
- 通常の画面に戻したい場合はブラウザをリロードしてください。

### プロジェクトを切り替えたい場合
プロジェクトを切り替える場合は、オプションページのプロジェクトのセレクトボックスから選択し直してください。選択した時点で設定が保存されます。
すでに開いているタブに適用させたい場合は、タブをリロードしてください。

### プロジェクトを削除したい場合
+ オプションページよりプロジェクトを選択後、「プロジェクトを削除する」ボタンをクリックしてください。
+ 確認のポップアップが出るので、はいを選択してください。

### プロジェクトを追加したい場合
オプションページのプロジェクトのセレクトボックスから「新しく追加」を選択して追加してください。
