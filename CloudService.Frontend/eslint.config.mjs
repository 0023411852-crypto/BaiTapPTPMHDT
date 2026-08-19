const eslintConfig = [
  {
    ignores: ["node_modules/**", ".next/**", "out/**"],
  },
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];

export default eslintConfig;
