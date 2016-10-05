var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.url.match(/^\/$|\/index.html/)) {
    fs.readFile(archive.paths.siteAssets + '/index.html', function(err, data) {
      res.end(data);
    });    
  } else if (req.url === '/styles.css') {
    fs.readFile(archive.paths.siteAssets + '/styles.css', function(err, data) {
      res.end(data);
    }); 
  }
};
