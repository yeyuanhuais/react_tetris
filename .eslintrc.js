exports = {
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react/recommended", "prettier", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react", "@typescript-eslint", "react-hooks", "prettier"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    // 检查依赖项的声明
    "react-hooks/exhaustive-deps": "error",
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    parser: "@typescript-eslint/parser",
  },
};
