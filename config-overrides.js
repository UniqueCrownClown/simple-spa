const { getLoader } = require("react-app-rewired");
const { loaders } = require('react-scripts-ts-antd');
module.exports = function override(config, env) {
// console.log(loaders);
  return config;
};

// 怎么关闭eslint loader