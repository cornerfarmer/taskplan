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
const appEntry = process.env.REACT_APP_ENTRY;

module.exports = {
  webpack: override(
      addLessLoader({
        javascriptEnabled: true
      }),
       (config) => {
          config["output"]["futureEmitAssets"] = false;
          if (process.env.REACT_APP_ENTRY === "main") {
              config["entry"][1] =  resolveApp('src/index.js');
              config["output"]["path"] = resolveApp('build/main');
              config["output"]["filename"] = config["output"]["filename"].replace("static/", "static_main/");
              config["output"]["chunkFilename"] = config["output"]["chunkFilename"].replace("static/", "static_main/");
              config.module.rules[2].oneOf[0].options.name = config.module.rules[2].oneOf[0].options.name.replace("static/", "static_main/");
              config.module.rules[2].oneOf[9].options.name = config.module.rules[2].oneOf[9].options.name.replace("static/", "static_main/");
          }
          else {
              config["entry"][1] =  resolveApp('src/table/index.js');
              config["output"]["path"] = resolveApp('build/table');
              config["output"]["filename"] = config["output"]["filename"].replace("static/", "static_table/");
              config["output"]["chunkFilename"] = config["output"]["chunkFilename"].replace("static/", "static_table/");
              config.module.rules[2].oneOf[0].options.name = config.module.rules[2].oneOf[0].options.name.replace("static/", "static_table/");
              config.module.rules[2].oneOf[9].options.name = config.module.rules[2].oneOf[9].options.name.replace("static/", "static_table/");
          }
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