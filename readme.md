#WordBash Kyoto Vol.1

## For Contributors


masterブランチを監視して、travisで自動的にgh-pagesブランチにビルドしたものをプッシュします。

確認は、[http://wordbash.github.io/kyoto-vol1/](http://wordbash.github.io/kyoto-vol1/) でどうぞ。

### ビルド方法

nodeJSが必要です。

```
$ git clone git@github.com:WordBash/kyoto-vol1.git
$ cd kyoto-vol1
$ npm install -g gulp
$ npm install
$ gulp build
```

ビルドされるものはコミットしないので、頑張ってビルドしてください。

### gulp

#### gulp で行っていること

* SCSS -> CSS (gulp-sass)
* JSのコンパイル (browserify)
* nodeJSのWEBサーバーで開発環境構築 (BrowserSync)
* リリース用ファイルの作成

#### WEBサーバーの立ち上げ。ファイルの監視・自動ビルド。
```
$ gulp
```

Open [http://localhost:3000](http://localhost:3000) !

#### ビルドのみ実行

```
$ gulp build
```

#### リリースファイルの作成

```
$ gulp release
```
or

```
$ num run release
```

--

### Issue Branch について

機能追加、バグフィックスするときは、issueを切って、issues/‪#‎{issues番号} というブランチを切ってプルリクエストを投げてください。

