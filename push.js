const minify = require('@node-minify/core');
const cleanCSS = require('@node-minify/clean-css');
const uglifyJS = require('@node-minify/uglify-js');

minify({
  compressor: cleanCSS,
  input: 'style.css',
  output: 'style.min.css',
});

minify({
  compressor: uglifyJS,
  input: 'script.js',
  output: 'script.min.js',
})