var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var slicedURL = req.url.slice(1);

  if (req.method === 'GET') {
    // redirect to home page
    if (req.url.match(/^\/$|\/index\.html/)) {
      fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', function(err, data) {
        res.writeHead(200, httpHelpers.headers);
        res.end(data);
      });

    // import css file
    } else if (req.url === '/styles.css') {
      fs.readFile(archive.paths.siteAssets + '/styles.css', 'utf8', function(err, data) {
        res.end(data);
      }); 

    // check if url starts with www. and ends with .com
    } else if (req.url.match(/^\/www\..*\.com$/)) {
      // check if url is in archive
      archive.isUrlArchived(slicedURL, function(archived) {
        // if url is in archive
        if (archived) {
          // serve webpage to client
          res.writeHead(200, httpHelpers.headers);
          fs.readFile(archive.paths.archivedSites + req.url, 'utf8', function(err, data) {
            res.end(data);
          });

        // if url is not in archive (post request)
        } else {
          // check if url is in list
          archive.isUrlInList(slicedURL, function(listed) {
            //if url is in list
            if (listed) {
              res.writeHead(202, httpHelpers.headers);
              fs.readFile(archive.paths.siteAssets + '/loading.html', 'utf8', function(err, data) {
                res.end(data);
              });
            //if url is not in list
            } else {
              // let client know page is loading
              // make special interface to tell user to use our textbox
              res.writeHead(404, httpHelpers.headers);
              res.end();
            }
          });
        }
      });
    } else {
      res.writeHead(404, httpHelpers.headers);
      res.end();
    }

  } else if (req.method === 'POST') {
    //if url is not in list
    // add url to list
    // POST request
    res.writeHead(302, httpHelpers.headers);
    req.on('data', function(url) {
      archive.addUrlToList(url.toString().slice(4), function() {
        console.log(url.toString().slice(4) + ' added to list');
        res.end();
      });
    });
  }

  console.log('serving request type ', req.method, ' at localhost');
};
