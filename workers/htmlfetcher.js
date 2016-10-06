// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var _ = require('underscore');
var Promise = require('bluebird');

// archive.downloadUrls(['www.google.com']);

Promise.join(archive.readListOfUrls(), archive.readArchiveOfUrls(), 
  function(listUrls, archiveUrls) {
    archive.downloadUrls(_.difference(listUrls, archiveUrls));
  });