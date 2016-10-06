var path = require('path');
var _ = require('underscore');
var http = require('http');
var https = require('https');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var request = require('request');
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

exports.readListOfUrls = function() {
  return fs.readFileAsync(exports.paths.list, 'utf8')
    .then(function(data) {
      return data.trim().split('\n');
    });
};

exports.isUrlInList = function(url) {
  return exports.readListOfUrls()
    .then(function(urls) {
      return urls.indexOf(url) !== -1;
    });
};

exports.addUrlToList = function(url) {
  return fs.appendFileAsync(exports.paths.list, url + '\n', 'utf8');
};

exports.readArchiveOfUrls = function() {
  return fs.readdirAsync(exports.paths.archivedSites)
    .then(function(files) { 
      return files;
    });
};

exports.isUrlArchived = function(url) {
  return exports.readArchiveOfUrls()
    .then(function(urls) {
      return urls.indexOf(url) !== -1;
    });
};

exports.downloadUrls = function(urls) {
  urls.forEach(function(url) {
    var file = fs.createWriteStream(exports.paths.archivedSites + '/' + url);
    request('http://' + url).pipe(file);
    // , function(err, res, body) {
    //   body.pipe(file);
    // });
  });
};
