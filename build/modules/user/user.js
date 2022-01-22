"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.userGetAll = userGetAll;
exports.userRegister = userRegister;

var _Model = _interopRequireDefault(require("./Model"));

function userRegister(req, res) {
  var newUser = new _Model["default"]({
    email: req.body.email,
    password: req.body.password
  });
  newUser.save().then(function () {
    res.status(200).json('User register');
  })["catch"](function (err) {
    console.log(err);
    res.status(400).json('User not register');
  });
}

function userGetAll(req, res) {
  _Model["default"].find().exec().then(function (users) {
    res.status(200).json(users);
  })["catch"](function (err) {
    console.log(err);
    res.status(400).json('Error responce all users');
  });
}