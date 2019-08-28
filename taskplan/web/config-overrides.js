const {
  override,
  addLessLoader,
    overrideDevServer
} = require("customize-cra");

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);


module.exports = {
  webpack: override(
      addLessLoader({
        javascriptEnabled: true
      }),
       (config) => {
          config["output"]["futureEmitAssets"] = false;
          config["output"]["path"] = resolveApp('build');
          const index = config["plugins"].findIndex(p => p instanceof webpack.HotModuleReplacementPlugin);
          config["plugins"].splice(index, 1);
          return config;
        }
  ),
  devServer: configFunction => (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost);
      config["writeToDisk"] = true;
      config["quiet"] = false;
      return config;
  }
};