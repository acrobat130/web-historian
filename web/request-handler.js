var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers')
var urlParser = require ('url');
// require more modules/folders here!

// actions object
var actions = {
  'GET': function(req, res){
    var parts = urlParser.parse(req.url);
    var urlPath = parts.pathname === '/' ? '/index.html' : parts.pathname;
    httpHelpers.serveAssets(res, urlPath)
    // res.end(archive.paths.list);
  },
  'POST': function(req,res){
    var parts = urlParser.parse(req.url);
    var urlPath = parts.pathname === '/' ? '/index.html' : parts.pathname;
    var loadingUrl = archive.paths.siteAssets + '/loading.html';
    
    httpHelpers.collectData(req, function(data){
      // is request in sites.txt?
      if (archive.isUrlInList(parts.pathname, function(inList){
        return inList;
        })) {
          // if yes, check if it's archived
          if (archive.isUrlArchived()) {
            // if yes, display page
            httpHelpers.serveAssets(res, urlPath)
          } else {
            // if not, display loading page
            httpHelpers.serveAssets(res, loadingUrl);
          }
        }
      } else {
      // if not in sites.txt, append to sites.txt  
        archive.addUrlToList(urlPath, function(){
        // display loading page
          httpHelpers.serveAssets(res, loadingUrl)
        // downloadUrl/archive

        })
        
      }
        
        // exports.addUrlToList(req.url)
    })

  }
};


exports.handleRequest = function (req, res) {
  // action now refers to a function
  var action = actions[req.method];
  if (action){
    // console.log("parsedURL---------------------------", urlParser.parse(req.url));
    // console.log("req.url-------------", req.url)
    // console.log("pathname----------" ,urlParser.parse(req.url).pathname)
    action(req, res);
  } else {
    httpHelpers.sendResponse(res, "not found", 404);
  }
};
