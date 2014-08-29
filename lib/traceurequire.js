require('traceur').require.makeDefault(function (filename) {
  return filename.indexOf('traceurepl') > -1 || filename.indexOf('node_modules') === -1;
},  {
  experimental: true,
  sourceMaps: true
});
