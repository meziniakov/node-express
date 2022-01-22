"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _express = require("express");

var _user = require("./user");

var router = (0, _express.Router)();
router.post('/', _user.userRegister);
router.get('/', _user.userGetAll);
var _default = router;
exports["default"] = _default;