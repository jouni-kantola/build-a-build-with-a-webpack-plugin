// https://github.com/webpack/webpack-sources
const RawSource = require("webpack-sources").RawSource;

class PrependBuildTimePlugin {
  apply(compiler) {

    // begin `emit` of assets
    compiler.plugin("emit", (compilation, callback) => {
      const now = new Date().toLocaleString();
      const assetFiles = Object.keys(compilation.assets);

      assetFiles.forEach(filename => {
        const originalSource = compilation.assets[filename].source();

        // Append build time
        const updatedSource = `/* Build time: ${now} */
  ${originalSource}`;

        // Delete outdated asset
        delete compilation.assets[filename];

        // Update compilation assets with
        compilation.assets[filename] = new RawSource(updatedSource);

        /* Often seen as:
          compilation.assets[asset.filename] = {
            source: () => asset.source,
            size: () => asset.length
          };
        */
      });

      callback();
    });
  }
}

module.exports = PrependBuildTimePlugin;
