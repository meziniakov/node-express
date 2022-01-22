"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var express = require('express');

var router = express.Router();

var Post = require('../../models/Post');

router.get('/', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var posts;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Post.find({});

          case 2:
            posts = _context.sent;
            // res.sendFile(__dirname+'/index.html');
            // res.render('index.ejs', {posts:posts})
            res.status(200).json(posts);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/', function (req, res) {
  // console.log(req.body.postText)
  // res.send(req.body.postText)
  var postData = {
    title: req.body.title,
    postText: req.body.postText
  };
  var post = new Post(postData);
  post.save();
  res.redirect('/');
});
router["delete"]('/:id', function (req, res) {
  Post.deleteOne({
    _id: req.params.id
  });
  res.status(200).json({
    message: 'Deleted'
  });
});
module.exports = router;