# 貢献ガイド

ありがとうございます！ 日本のテックカンファレンス情報を一緒に育てましょう。

## いちばん簡単な方法：Issue フォーム

JSON がわからなくても大丈夫です。
[カンファレンス追加フォーム](../../issues/new?template=add-conference.yml) に入力するだけで、
メンテナがデータに反映します。

## Pull Request で直接追加する

1. このリポジトリを Fork する。
2. `conferences/<開催年>.json` を開く（無ければ新規作成し、中身は `[]` から始める）。
3. 配列に1件追加する。最小例：

   ```json
   {
     "name": "PyCon JP 2026",
     "url": "https://2026.pycon.jp/",
     "startDate": "2026-08-21",
     "endDate": "2026-08-23",
     "city": "広島市",
     "prefecture": "広島県",
     "country": "Japan",
     "format": "onsite",
     "topics": ["python"],
     "connpass": "https://pyconjp.connpass.com/event/391006/"
   }
   ```

4. ローカルで検証（任意だが推奨）：

   ```bash
   npm install
   npm run validate
   ```

5. PR を作成する。CI が自動でバリデーションします。

## ルール

- **対象は「カンファレンス」規模のイベントのみ。** 定例の小規模勉強会・もくもく会は対象外です。詳細は [SCOPE.md](SCOPE.md)。
- **公式サイトで確認した日程のみ。** 推測や「例年この時期」での登録はしないでください。
- `url` は **https** で始まること。
- `name` には **年を含める**（例: `RubyKaigi 2026`）。
- 日付は `YYYY-MM-DD`。単日開催は `startDate` と `endDate` を同じにする。
- `topics` は README のトピック一覧にある値のみ。足りなければ Issue で提案を。
- 1ファイル内で `name` + `startDate` が重複しないこと。

## データの直し方（誤り・中止・延期）

該当エントリを編集または削除する PR を送ってください。出典（公式アナウンス）を PR 本文に添えてもらえると助かります。
