var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

// asset refers to specific file path, called in request-handler.js
exports.serveAssets = function(res, asset, callback) {
  var encoding = {encoding: 'utf8'};
  // check in public
  fs.readFile(archive.paths.siteAssets + asset, encoding, function(error, file){
    // if not in public
    if (error) {
      // check in archive
      fs.readFile(archive.paths.archivedSites + asset, encoding, function(error, file) {
        if (error) {
          // if not in archive
          exports.sendResponse(res, "not found", 404);
        } else {
          // is in archive
          exports.sendResponse(res, file);
        }
      })
    } else {
      // is in archive
      exports.sendResponse(res, file);
    }
  })
};


  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

// As you progress, keep thinking about what helper functions you can put here!

exports.sendResponse = function(res, obj, status) {
  status = status || 200;
  res.writeHead(status, headers);
  res.end(obj);
}

// for POST
exports.collectData = function(req, callback) {
  var data = '';
  req.on('data', function(chunk){
    data += chunk;
  });
  req.on('end', function(){
    callback(data);
  })
}








