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
