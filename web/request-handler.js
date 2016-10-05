var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // redirect to home page
  if (req.url.match(/^\/$|\/index\.html/)) {
    fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', function(err, data) {
      res.end(data);
    });

  // import css file
  } else if (req.url === '/styles.css') {
    fs.readFile(archive.paths.siteAssets + '/styles.css', 'utf8', function(err, data) {
      res.end(data);
    }); 

  // check if url starts with www. and ends with .com
  } else if (req.url.match(/^\/www\..*\.com$/)) {
    var slicedURL = req.url.slice(1);
    // check if url is in list
    archive.isUrlInList(slicedURL, function(listed) {
      // if url is in list
      if (listed) {
        // check if url is in archive
        archive.isUrlArchived(slicedURL, function(archived) {
          //if url is in archive
          if (archived) {
            // serve webpage to client
            console.log(archive.paths.archivedSites + req.url);
            fs.readFile(archive.paths.archivedSites + req.url, 'utf8', function(err, data) {
              res.end(data);
            }); 

          //if url is not in archive
          } else {
            // let client know page is loading
            fs.readFile(archive.paths.siteAssets + '/loading.html', 'utf8', function(err, data) {
              res.end(data);
            });
          }
        });

      // if url is not in list (post request)
      } else {
        // add url to list
        archive.addUrlToList(slicedURL, function() {
          console.log(slicedURL + ' added to list');
        });

        // let client know page is loading
        fs.readFile(archive.paths.siteAssets + '/loading.html', 'utf8', function(err, data) {
          res.end(data);
        });

      }
    });
  }




  // if (req.url === '/www.google.com') {
  //   fs.readFile(archive.paths.archivedSites + req.url, 'utf8', function(err, data) {
  //     res.end(data);
  //   }); 
  // }
  //archive.downloadUrls(['www.google.com', 'www.amazon.com']);
  // else if (!req.url.match(/ /)) {
};
