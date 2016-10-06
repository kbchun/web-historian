var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var https = require('https');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (err) { throw err; }
    cb(data.trim().split('\n'));
  });
};

exports.isUrlInList = function(url, cb) {
  exports.readListOfUrls(function(urls) {
    cb(urls.indexOf(url) !== -1);
  });
};

exports.addUrlToList = function(url, cb) {
  fs.appendFile(exports.paths.list, url + '\n', 'utf8', function(err) {
    if (err) { throw err; }
    cb();
  });
};

exports.readArchiveOfUrls = function(cb) {
  fs.readdir(exports.paths.archivedSites, function(err, files) { 
    if (err) { throw err; }
    cb(files);
  });
};

exports.isUrlArchived = function(url, cb) {
  exports.readArchiveOfUrls(function(urls) {
    cb(urls.indexOf(url) !== -1);
  });
};

exports.downloadUrls = function(urls) {
  // urls.forEach(function(url) {
  //   http.get({host: url}, function(response) {
  //     // console.log(response);
  //     response.on('data', function(chunk) {
  //       console.log(chunk.toString());
  //       fs.writeFile(exports.paths.archivedSites + '/' + url, chunk.toString());
  //     });
  //   });
  // });

  urls.forEach(function(url) {
    var file = fs.createWriteStream(exports.paths.archivedSites + '/' + url);
    var request = https.get({host: url}, function(response) {
      response.pipe(file);
    });
  });
};
