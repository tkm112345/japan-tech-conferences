# japan-tech-conferences

日本国内のテックカンファレンスの **オープンデータ** リポジトリです。
機械可読な JSON でデータを提供し、誰でも Pull Request / Issue で追加・修正できます。

[confs.tech](https://github.com/tech-conferences/conference-data) の日本版を目指しています。
confs.tech は欧米のカンファレンスが中心で、日本国内のイベントはほとんど収録されていません。
このリポジトリはその空白を、コミュニティで埋めることを目的にしています。

## なぜオープンデータか

- **サイトではなくデータが本体。** 一覧サイト（TECH PLAY / Findy Conference など）は既にありますが、
  再利用可能な機械可読データとして公開されているものは見当たりませんでした。
- **誰でも再利用できる（MIT）。** カレンダー連携、Slack bot、自作サイトなど自由に利用できます。
- **コミュニティで最新に保つ。** 主催者や参加者が PR / Issue で更新できます。

## データ

`conferences/<年>.json` に、その年に開催されるカンファレンスを配列で格納します。

| フィールド | 必須 | 説明 |
| --- | --- | --- |
| `name` | ✓ | カンファレンス名（年を含める）例: `PyCon JP 2026` |
| `url` | ✓ | 公式サイト。**https のみ** |
| `startDate` | ✓ | 開催開始日 `YYYY-MM-DD` |
| `endDate` | ✓ | 開催終了日（単日なら `startDate` と同じ） |
| `city` | | 開催都市（日本語）。未定・オンライン専用は `null` |
| `prefecture` | | 都道府県（日本語）。未定は `null` |
| `country` | ✓ | 現状 `"Japan"` 固定 |
| `format` | ✓ | `onsite` / `online` / `hybrid` |
| `topics` | ✓ | 下記トピック一覧から1つ以上 |
| `cfpUrl` | | 登壇募集(CFP)ページ |
| `cfpEndDate` | | CFP 締切 `YYYY-MM-DD` |
| `twitter` | | `@` を除いたハンドル名 |
| `connpass` | | connpass のイベント/グループ URL |
| `archiveUrl` | | 終了後の発表資料・動画・アーカイブページ |
| `language` | | `ja` / `en`（既定 `ja`） |

過去に開催されたカンファレンス（アーカイブ）も歓迎します。`archiveUrl` に資料・動画ページを入れてください。

### トピック一覧

現在データで使われているトピックは以下です（有効な値の一覧は [`schema.json`](schema.json) が正）。

```
cloud, kubernetes, platform-engineering, sre, devops, security, networking,
observability, infrastructure, ai, backend, python, javascript, dotnet,
testing, agile, design, opensource, general
```

新しいトピックが必要なら、Issue で提案してください（`schema.json` に追加します）。

## 貢献する

**JSON を書かなくても大丈夫です。** 2つの方法があります。

1. **Issue フォーム（かんたん）** — [カンファレンス追加](../../issues/new?template=add-conference.yml)
   に入力するだけ。メンテナがデータ化します。
2. **Pull Request** — `conferences/<年>.json` に直接追記。手順は [CONTRIBUTING.md](CONTRIBUTING.md) を参照。

いずれの場合も **公式サイトで日程を確認した情報のみ**を登録してください（推測日付は入れない）。

**どんなイベントを載せるか**は [SCOPE.md](SCOPE.md) を参照してください（要点: 定例の小規模勉強会は対象外、カンファレンス規模のみ。テーマの狭さは不問）。

## バリデーション

PR は GitHub Actions で自動チェックされます。ローカルでも確認できます。

```bash
npm install
npm run validate
```

`schema.json`（JSON Schema）と `scripts/validate.mjs` が、必須項目・日付の整合性・
トピックの妥当性・重複などを検証します。

## セキュリティ

不特定多数が貢献できる前提で、以下の対策をしています。詳細は [SECURITY.md](SECURITY.md)。

- URL は **https のみ** をスキーマで強制。
- CI は `pull_request`（`pull_request_target` ではない）を使い、フォークからのコードに
  **シークレットや書き込み権限を渡さない**。権限は `contents: read` の最小構成。
- データのみのリポジトリで、実行コードを外部貢献者が持ち込めない構造。

## ライセンス

[MIT](LICENSE)
