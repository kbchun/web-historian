var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var slicedURL = req.url.slice(1);

  // if (req.method === 'GET') {
  //   // redirect to home page
  //   if (req.url.match(/^\/$|\/index\.html/)) {
  //     fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', function(err, data) {
  //       res.writeHead(200, httpHelpers.headers);
  //       res.end(data);
  //     });

  //   // import css file
  //   } else if (req.url === '/styles.css') {
  //     fs.readFile(archive.paths.siteAssets + '/styles.css', 'utf8', function(err, data) {
  //       res.end(data);
  //     }); 

  //   // check if url starts with www. and ends with .com
  //   } else if (req.url.match(/^\/www\..*\.com$/)) {
  //     // check if url is in archive
  //     archive.isUrlArchived(slicedURL, function(archived) {
  //       // if url is in archive
  //       if (archived) {
  //         // serve webpage to client
  //         res.writeHead(200, httpHelpers.headers);
  //         fs.readFile(archive.paths.archivedSites + req.url, 'utf8', function(err, data) {
  //           res.end(data);
  //         });

  //       // if url is not in archive (post request)
  //       } else {
  //         // check if url is in list
  //         archive.isUrlInList(slicedURL, function(listed) {
  //           //if url is in list
  //           if (listed) {
  //             res.writeHead(202, httpHelpers.headers);
  //             fs.readFile(archive.paths.siteAssets + '/loading.html', 'utf8', function(err, data) {
  //               res.end(data);
  //             });
  //           //if url is not in list
  //           } else {
  //             // let client know page is loading
  //             // make special interface to tell user to use our textbox
  //             res.writeHead(404, httpHelpers.headers);
  //             res.end('please request through our textbox');
  //           }
  //         });
  //       }
  //     });
  //   } else {
  //     res.writeHead(404, httpHelpers.headers);
  //     res.end('invalid request');
  //   }

  // } else if (req.method === 'POST') {
  //   //if url is not in list
  //   // add url to list
  //   // POST request
  //   req.on('data', function(url) {
  //     slicedURL = url.toString().slice(4);
  //     console.log(slicedURL);
  //     if (slicedURL.match(/^www\..*\.com$/)) {
  //       res.statusCode = 302;
  //       res.setHeader('Location', 'http://127.0.0.1:8080/' + slicedURL);
  //       archive.isUrlInList(slicedURL, function(listed) {
  //         if (!listed) {
  //           archive.addUrlToList(slicedURL, function() {
  //             console.log(slicedURL + ' added to list');
  //             res.end();
  //           });
  //         } else {
  //           res.end();
  //         }
  //       });
  //     } else {
  //       res.writeHead(404, httpHelpers.headers);
  //       res.end('invalid request');
  //     }
  //   });
  // }
  archive.isUrlInList('www.google.com')
    .then(function(listed) {
      console.log(listed);
    });
  // archive.addUrlToList('www.amazon.com')
  //   .then(function(listed) {
  //     console.log(listed);
  //   });
  archive.readListOfUrls()
    .then(function(urls) {
      console.log(urls);
    });
  archive.readArchiveOfUrls()
    .then(function(urls) {
      console.log(urls);
    });
  archive.isUrlArchived('www.google.com')
    .then(function(listed) {
      console.log(listed);
    });
  archive.downloadUrls(['www.amazon.com']);

  console.log('serving request type ', req.method, ' at localhost');
};
