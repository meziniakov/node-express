"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var card = function card(post) {
  return "\n\t\t\t\t<div class=\"card z-depth-4\">\n\t        <div class=\"card-content\">\n\t          <span class=\"card-title\">".concat(post.title, "</span>\n\t          <p>").concat(post.postText, "</p>\n\t          <small>").concat(post.date, "</small>\n\t        </div>\n\t        <div class=\"card-action\">\n\t\t\t\t\t\t<button id=\"deletePost\" data-id=").concat(post._id, " class=\"js-remove btn btn-small red\">\n\t\t\t\t\t\t\t<i class=\"material-icons\">delete</i>\n\t\t\t\t\t\t</button>\t\n\t        </div>\n\t      </div>\n\t");
};

var BASE_URL = '/api/post';
var posts = [];
var modal;

var PostApi = /*#__PURE__*/function () {
  function PostApi() {
    (0, _classCallCheck2["default"])(this, PostApi);
  }

  (0, _createClass2["default"])(PostApi, null, [{
    key: "_fetch",
    value: function _fetch() {
      return fetch(BASE_URL, {
        method: 'get'
      }).then(function (res) {
        return res.json();
      });
    }
  }, {
    key: "create",
    value: function create(post) {
      return fetch(BASE_URL, {
        method: 'post',
        body: (0, _stringify["default"])(post),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        return res.json();
      });
    }
  }, {
    key: "remove",
    value: function remove(id) {
      return fetch("".concat(BASE_URL, "/").concat(id), {
        method: 'delete'
      }).then(function (res) {
        return res.json();
      });
    }
  }]);
  return PostApi;
}();

document.addEventListener('DOMContentLoaded', function () {
  PostApi.fetch().then(function (backendPosts) {
    posts = backendPosts.concat();
    renderPosts(posts);
  });
  modal = M.Modal.init(document.querySelector('.modal'));
  document.querySelector('#createPost').addEventListener('click', onCreatePost);
  document.querySelector('#posts').addEventListener('click', onDeletePost);
});

function renderPosts() {
  var _posts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var $posts = document.querySelector('#posts');

  if (_posts.length > 0) {
    $posts.innerHTML = _posts.map(function (post) {
      return card(post);
    }).join();
  } else {
    $posts.innerHTML = '<div class="center">Постов пока нет.</div>';
  }
}

function onCreatePost() {
  var $title = document.querySelector('#title');
  var $postText = document.querySelector('#postText');

  if ($title.value && $postText.value) {
    var newPost = {
      title: $title.value,
      postText: $postText.value
    };
    PostApi.create(newPost).then(function (post) {
      posts.push(post);
      renderPosts(posts);
    });
    modal.close();
    $title.value = '';
    $postText.value = '';
    M.updateTextFields();
  }
}

function onDeletePost() {
  if (event.target.classList.contains('js-remove')) {
    var decision = confirm('Вы уверены, что хотите удалить пост?');

    if (decision) {
      var id = event.target.getAttribute('data-id');
      PostApi.remove(id).then(function () {
        var postIndex = posts.findIndex(function (post) {
          return post._id === id;
        });
        posts.splice(postIndex, 1);
        renderPosts(posts);
      });
    }
  }
}