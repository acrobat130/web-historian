var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};
var archivedSitesArray = []
fs.readdir(archive.paths.archivedSites, function(error, files){
  // console.log("files---------------------", files);
  files.forEach(function(file){
    console.log(file)
    archivedSitesArray.push(file)
  })
});



exports.serveAssets = function(res, asset, callback) { // asset === website
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};
  
exports.sendResponse = function(req, res, statusCode){
  statusCode = statusCode || 200;
    // console.log('req.url.substr(1) --------------->', archivedSitesArray.indexOf(req.url.substr(1)))
    // console.log('archivedSitesArray -------->', archivedSitesArray)
  if (req.url === '/') {
    // console.log('archive.paths.css-------------------', archive.paths.css)
    fs.readFile(archive.paths.html, function(error, html) {
      if (error) {
        throw error;
      }
      res.writeHead(statusCode, exports.headers);
      // console.log("res----------------", res);
      res.end(html);
    })
  }

  else if (req.url.indexOf('.css') !== -1) {
      console.log('inside-----------xxxxxxxxx')

    fs.readFile(archive.paths.css, function(error, css) {
      if (error) {
        throw error;
      }  
      exports.headers['Content-Type'] = "text/css";
      res.writeHead(statusCode, exports.headers);
      res.end(css); 
      exports.headers['Content-Type'] = "text/html";
    })
  } 
   else if (archive.paths.archivedSites + req.url) {
    // console.log('inside-------------------------------- ')
    var site = archive.paths.archivedSites + req.url;
    // exports.headers['Content-Type'] = "text/plain";
    fs.readFile(site, function(error, html) {
      if (error) {
        throw error;
      }
      res.writeHead(statusCode, exports.headers);
      res.end(html);
    })   
  }

  // else {
  //   statusCode = 404;
  //   res.writeHead(statusCode, exports.headers);
  //     // console.log("res----------------", res);
  //   res.end();
  // }



}
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

// As you progress, keep thinking about what helper functions you can put here!
