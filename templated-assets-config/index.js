const path = require("path");
const viewsPath = path.join(__dirname, "../server/views/generated/");

module.exports = {
  rules: [
    {
      name: "runtime",
      output: {
        inline: true,
        path: viewsPath,
        emitAsset: false,
        extension: "ejs"
      },
      template: path.join(__dirname, "tmpl/runtime.ejs.tmpl"),
      replace: "##RUNTIME##"
    },
    {
      test: /manifest.json$/,
      template: path.join(__dirname, "tmpl/chunk-manifest.ejs.tmpl"),
      replace: "##CHUNK-MANIFEST##",
      output: {
        inline: true,
        path: viewsPath,
        prefix: "__",
        extension: "ejs"
      }
    },
    {
      name: ["vendor"],
      output: {
        defer: true,
        extension: "ejs",
        path: viewsPath
      }
    },
    {
      test: /styles.css$/,
      template: path.join(__dirname, "tmpl/styles.ejs.tmpl"),
      output: {
        inline: true,
        extension: "ejs",
        path: viewsPath
      }
    },
    {
      name: "app",
      template: (asset, callback, ...args) => {
        const updatedSource = `<!--
        // built with webpack and ${args.join("-")}
        // source from ${asset.filename} to ${asset.url}
        // default templating would have resulted in ${asset.content}
        -->
        <script src=${asset.url} async></script>`;
        callback(updatedSource);
      },
      args: ["templated", "assets", "webpack", "plugin"],
      output: {
        extension: "ejs",
        path: viewsPath
      }
    }
  ]
};
