"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _express = require("express");

var _post = require("./post");

var router = (0, _express.Router)();
router.get('/posts', _post.allPosts);
router.get('/:id', _post.postById);
router.post('/', _post.addPost);
var _default = router;
exports["default"] = _default;