# スマホカルタ的なもの

スマートフォンでアクセスして遊ぶゲームです。

## 遊び方

- このクライアントアプリと [サーバー](https://github.com/yncat/karuta-server) をどこかにデプロイして、みんなのスマホをクライアント側に繋ぎます。

- 誰か一人が「リモコンとして使用」をタップして、自分のスマホを出題用に設定します。リモコンはPCでやってもかまいません。

- 他の人は、「カードとして使用」をタップして、机の上にスマホを並べます。

- リモコンを持っている人が、サウンドリストから好きなお題を選んで、「鳴らす」ボタンを押します。

- 他のスマホから、一気にいろんな音が鳴ります。

- 参加者は、お題と一致する音が鳴っているスマホを、できるだけ早く取り上げます。

- スマホを持ち上げると、自動的に認識します。

- 正解の音が鳴っているスマホを取った場合、ピンポンという音が鳴ります。正解を取った瞬間に、他の全てのスマホからは音が消え、正解のスマホだけがしばらく鳴り続けます。

- 正解でない音が鳴っているスマホを取った場合、ブブーという音が鳴ります。他のスマホの音が停まることはなく、ゲームは続行されます。

- 取れた人にはポイントが入るとか、なんかいいことがあるとか、そんな感じで楽しんでください。

## 制限および既知の問題

- 「カードとして使用」を押してない人がいると、そのスマホからは音が鳴りませんが、サウンドは割り振られてしまうので、ゲームがおかしくなることがあります。そのうち直したい。

## 動作確認環境

PC: Windows / MacOSX (カードを取ったことを認識する機能は無効になります)

スマートフォン: iOS13.x、Android 10.x (それぞれ iPhone8 および Pixel 3A で動作確認)

OSバージョンが古くない限り、だいたい動くと思います。iOS 9.X では動作しませんでした。

## ローカルでのテスト方法

いまのところ、手抜きなので、接続先サーバ名がハードコーディングされています。src/js/game.js に書いてあるので、 localhostにしたり、適当にしてください。

接続先サーバを設定したら、

- npm install

- npm run build

- npm start

サーバー側のセットアップについては、そっちのリポジトリを見てください。

## Webにあげる

npm run build でできた game_compiled.js と、htmlやcss、音などをウェブサーバに置いてください。

キャッシュを残さないようにコントロールする場合は、 .htaccess も一緒に設置してください。
