# スマホカルタ的なもの

スマートフォンでアクセスして遊ぶゲームです。

## 遊び方

- このクライアントアプリと [サーバー](https://github.com/yncat/karuta-server) をどこかにデプロイして、みんなのスマホをクライアント側に繋ぎます。

- 誰か一人が「リモコンとして使用」をタップして、自分のスマホを出題用に設定します。

- 他の人は、「カードとして使用」をタップして、机の上にスマホを並べます。

- リモコンを持っている人が、サウンドリストから好きなお題を選んで、「鳴らす」ボタンを押します。

- 他のスマホから、一気にいろんな音が鳴ります。

- 参加者は、お題と一致する音が鳴っているスマホを、できるだけ早く取り上げます。

- 取れた人にはポイントが入るとか、なんかいいことがあるとか、そんな感じで楽しんでください。

## 制限および既知の問題

- 「カードとして使用」を押してない人がいると、そのスマホからは音が鳴りませんが、サウンドは割り振られてしまうので、ゲームがおかしくなることがあります。そのうち直したい。

- 加速度センサーとかを使えば、取ったタイミングが分かりそうだけど、まだやってません。

## ローカルでのテスト方法

- npm install

- npm run build

- npm start

サーバー側のセットアップについては、そっちのリポジトリを見てください。
