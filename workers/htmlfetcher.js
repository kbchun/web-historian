// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var _ = require('underscore');

archive.readListOfUrls(function(listUrls) {
  archive.readArchiveOfUrls(function(archiveUrls) {
    // console.log(_.difference(listUrls, archiveUrls));
    archive.downloadUrls(_.difference(listUrls, archiveUrls));
  });
});