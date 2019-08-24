const {
  override,
  addLessLoader,
    overrideDevServer
} = require("customize-cra");

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