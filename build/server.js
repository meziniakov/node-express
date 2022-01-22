"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _path = _interopRequireDefault(require("path"));

var _keys = _interopRequireDefault(require("./modules/core/keys"));

var _logger = _interopRequireDefault(require("./modules/core/logger"));

var _parseResponce = _interopRequireDefault(require("./modules/core/parseResponce"));

var _cors = _interopRequireDefault(require("./modules/core/cors"));

var _errorHandler = _interopRequireDefault(require("./modules/core/errorHandler"));

var _routes = _interopRequireDefault(require("./modules/core/routes"));

var _serveFavicon = _interopRequireDefault(require("serve-favicon"));

_mongoose["default"].connect(_keys["default"].mongoURI).then(function () {
  return console.log('MongoDB connected');
})["catch"](function (err) {
  return console.error(err);
});

var app = (0, _express["default"])();
exports.app = app;
app.set('port', process.env.PORT || 5000);
app.use(_express["default"].json());
app.use((0, _serveFavicon["default"])(_path["default"].join(__dirname, '../static/images/favicon.ico')));
app.use('/static', _express["default"]["static"]((__dirname, 'static')));
app.set('view engine', 'ejs');

var clientPath = _path["default"].join(__dirname, '/client');

app.use(_express["default"]["static"](clientPath));
(0, _logger["default"])(app);
(0, _parseResponce["default"])(app);
(0, _cors["default"])(app);
(0, _routes["default"])(app);
(0, _errorHandler["default"])(app);
app.listen('port', function () {
  console.log('Сервер запущен на порту: ' + app.get('port'));
});