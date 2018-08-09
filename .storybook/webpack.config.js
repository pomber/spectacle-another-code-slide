const path = require("path");

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  storybookBaseConfig.module.rules.push({
    test: /\.css$/,
    loaders: ["css-loader"],
    include: path.resolve(__dirname, "../")
  });

  storybookBaseConfig.module.rules.forEach(rule =>
    Object.assign(rule, {
      exclude: rule.exclude
        ? [...rule.exclude, path.resolve(__dirname, "snippets")]
        : [path.resolve(__dirname, "snippets")]
    })
  );

  // console.log(storybookBaseConfig.module.rules);

  // Return the altered config
  return storybookBaseConfig;
};
