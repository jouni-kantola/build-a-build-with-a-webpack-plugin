const path = require("path");

const Tapable = function tapable() {
  this.plugins = [];
};

Tapable.prototype.apply = function apply(plugin) {
  // install a plugin
  this.plugins.push(plugin);
};

Tapable.prototype.applyPlugins = function applyPlugins(lifecycleHook) {
  // call every installed plugin
  this.plugins.forEach(plugin => {
    // execute plugin
    plugin.apply(this);
  });
};

Tapable.prototype.mixin = function mixin(tapableInstance) {
  const source = this;
  for (var prop in source) {
    tapableInstance[prop] = source[prop];
  }

  return tapableInstance;
};

Tapable.prototype.plugin = function plugin(lifecycleHook, callback) {
  // register listener to lifecycle hook event
  // now just call directly
  callback();
};

// compiler
const TapableInstance = function tapableInstance() {
  // mix-in/extended Tapable
  const instance = new Tapable().mixin(this);
  return instance;
};

// run compilation
TapableInstance.prototype.run = function run(callback) {
  this.applyPlugins();

  callback();
};

// const webpack = require("webpack"); // webpack api
const webpack = function webpack(configuration) {
  const tapableInstance = new TapableInstance();
  return tapableInstance; // compiler
};

function MyPlugin() {}

MyPlugin.prototype.apply = function(tapableInstance) {
  // compiler.plugin("emit", function(compilation, callback)
  tapableInstance.plugin("lifecycle-hook", function(
    // compilation
    anotherTapableInstance,
    callback
  ) {
    console.log("Executing MyPlugin!");

    // here you'd get access to compilation data
    //compilation.chunks.forEach

    // attach to other tapable instances
    //anotherTapableInstance.plugin("another-lifecyclehook", function(args)) { }
  });
};

// webpack configuration
const configuration = require("./webpack.config.js");
// compiler
const tapableInstance = webpack(configuration);
tapableInstance.apply(new MyPlugin());

const compilationDone = function compilationDone(/* stats */) {
  console.log("Do-It-Yourself compilation done!");
};
tapableInstance.run(compilationDone);
