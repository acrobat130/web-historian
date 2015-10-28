var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  
  if (req.method === "GET") {
    httpHelpers.sendResponse(req, res);
  } 
  if (req.method === "POST") {
    // do something
    res.end(archive.paths.list);
  }
};

// if req.method === "GET"
  // callback function that points to http-helpers.js
// else if req.method === "POST"
  // callback function that points to http-helpers.js