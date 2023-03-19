module.exports = {
  stories: [
    "../packages/**/*.stories.mdx",
    "../packages/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    { name: "@storybook/addon-styling", options: { postCss: true } },
  ],
  framework: "@storybook/react",
  core: { builder: "webpack5" },
};
