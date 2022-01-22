"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = errorHandler;

function errorHandler(app) {
  app.use(apiNotFound);

  function apiNotFound(req, res) {
    res.status(404).send('API not found');
  }
}