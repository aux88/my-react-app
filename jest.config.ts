export default {
  preset: "ts-jest",
  testEnvironment: "jsdom", // ブラウザをエミュレートするjsdomを使用
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // テスト前に実行するセットアップファイル
  testMatch: ["**/?(*.)+(test).[tj]s?(x)"],
};