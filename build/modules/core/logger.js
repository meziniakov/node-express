"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = logger;

var _morgan = _interopRequireDefault(require("morgan"));

function logger(app) {
  app.use((0, _morgan["default"])('dev'));
}