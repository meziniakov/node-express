"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _now = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/date/now"));

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  postText: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    "default": _now["default"]
  }
});
module.exports = mongoose.model('posts', postSchema);