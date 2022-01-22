"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.addAuthor = addAuthor;
exports.allAuthors = allAuthors;
exports.authorById = authorById;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _lowdb = _interopRequireDefault(require("lowdb"));

var _FileSync = _interopRequireDefault(require("lowdb/adapters/FileSync"));

var adapter = new _FileSync["default"]('db.json');
var db = (0, _lowdb["default"])(adapter);
var authors = db.get('authors').value();

function allAuthors(req, res) {
  res.send(authors);
}

function addAuthor(_x, _x2) {
  return _addAuthor.apply(this, arguments);
}

function _addAuthor() {
  _addAuthor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var name, lastAuthor, nextId;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = req.body.name;
            lastAuthor = authors[authors.length - 1];
            nextId = lastAuthor.id + 1;
            db.get('authors').push({
              id: nextId,
              name: name
            }).write();
            res.redirect('/authors');

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _addAuthor.apply(this, arguments);
}

function authorById(req, res) {
  var author = authors.find(function (a) {
    return a.id == req.params.id;
  });
  res.send(author.name);
}