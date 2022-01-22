"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _express = require("express");

var _author = require("./author");

var router = (0, _express.Router)();
router.get('/all', _author.allAuthors);
router.get('/:id', _author.authorById);
router.post('/', _author.addAuthor);
var _default = router;
exports["default"] = _default;