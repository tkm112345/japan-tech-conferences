import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const schema = JSON.parse(readFileSync(join(root, "schema.json"), "utf8"));

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

let ok = true;
const fail = (file, msg) => {
  ok = false;
  console.error(`✗ ${file}: ${msg}`);
};

const dir = join(root, "conferences");
for (const file of readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
  let data;
  try {
    data = JSON.parse(readFileSync(join(dir, file), "utf8"));
  } catch (e) {
    fail(file, `JSON パースエラー: ${e.message}`);
    continue;
  }

  if (!validate(data)) {
    for (const err of validate.errors) fail(file, `${err.instancePath || "/"} ${err.message}`);
    continue;
  }

  // スキーマでは表せない業務ルール
  const yearOfFile = file.replace(".json", "");
  const seen = new Set();
  for (const ev of data) {
    if (ev.endDate < ev.startDate) fail(file, `${ev.name}: endDate が startDate より前です`);
    if (!ev.startDate.startsWith(yearOfFile))
      fail(file, `${ev.name}: startDate(${ev.startDate}) がファイル名の年(${yearOfFile})と一致しません`);
    const key = `${ev.name}@${ev.startDate}`;
    if (seen.has(key)) fail(file, `重複エントリ: ${key}`);
    seen.add(key);
  }

  if (ok) console.log(`✓ ${file} (${data.length} 件)`);
}

if (!ok) {
  console.error("\nバリデーション失敗。上記を修正してください。");
  process.exit(1);
}
console.log("\nすべてのデータが有効です。");
