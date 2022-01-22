"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.addPost = addPost;
exports.allPosts = allPosts;
exports.postById = postById;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _lowdb = _interopRequireDefault(require("lowdb"));

var _FileSync = _interopRequireDefault(require("lowdb/adapters/FileSync"));

var adapter = new _FileSync["default"]('db.json');
var db = (0, _lowdb["default"])(adapter);
var posts = db.get('posts').value();
var authors = db.get('authors').value();

function allPosts(req, res) {
  // console.log(authors.find((a) => a.id == 2));
  res.render('index.ejs', {
    posts: posts,
    authors: authors
  });
}

function addPost(_x, _x2) {
  return _addPost.apply(this, arguments);
}

function _addPost() {
  _addPost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var text, lastPost, nextId;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            text = req.body.text;
            lastPost = posts[posts.length - 1];
            nextId = lastPost.id + 1;
            db.get('posts').push({
              id: nextId,
              authorId: 0,
              text: text
            }).write();
            res.redirect('/posts');

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _addPost.apply(this, arguments);
}

function postById(req, res) {
  var post = posts.find(function (p) {
    return p.id == req.params.id;
  });
  res.send(post);
}