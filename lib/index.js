"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _gun = require("gun");

var _gun2 = _interopRequireDefault(_gun);

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("gun/sea");

var db = function () {
  function db() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, db);

    this.gun = (0, _gun2.default)(opt);
    this.users = {};
    this.pairs = {};
    this.auth_user = null;
  }

  (0, _createClass3.default)(db, [{
    key: "_user",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(pub) {
        var _this = this;

        var user;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                user = this.gun.user(pub);
                _context2.next = 3;
                return new _promise2.default(function (ret) {
                  user.once(function () {
                    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_user) {
                      return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _this.pairs[pub] = _user;
                              ret(_user);

                            case 2:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee, _this);
                    }));

                    return function (_x3) {
                      return _ref2.apply(this, arguments);
                    };
                  }());
                });

              case 3:
                this.users[pub] = user;
                return _context2.abrupt("return", pub);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _user(_x2) {
        return _ref.apply(this, arguments);
      }

      return _user;
    }()
  }, {
    key: "_getUser",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(opt) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!((0, _ramda.both)((0, _ramda.has)("enc"), (0, _ramda.complement)(_ramda.propEq)("enc", true))(opt) && (0, _ramda.isNil)(this.users[opt.enc.pub]))) {
                  _context3.next = 3;
                  break;
                }

                _context3.next = 3;
                return this._user(opt.enc);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _getUser(_x4) {
        return _ref3.apply(this, arguments);
      }

      return _getUser;
    }()
  }, {
    key: "node",
    value: function node(_node2) {
      for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        keys[_key - 1] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(keys), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var v = _step.value;
          _node2 = _node2.get(v);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return _node2;
    }
  }, {
    key: "_enc",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(val, epub, pair) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.t0 = SEA;
                _context4.t1 = val;
                _context4.t2 = SEA;
                _context4.t3 = epub;
                _context4.t4 = _ramda.defaultTo;
                _context4.next = 7;
                return this.auth_user.pair();

              case 7:
                _context4.t5 = _context4.sent;
                _context4.t6 = (0, _context4.t4)(_context4.t5);
                _context4.t7 = pair;
                _context4.t8 = (0, _context4.t6)(_context4.t7);
                _context4.next = 13;
                return _context4.t2.secret.call(_context4.t2, _context4.t3, _context4.t8);

              case 13:
                _context4.t9 = _context4.sent;
                _context4.next = 16;
                return _context4.t0.encrypt.call(_context4.t0, _context4.t1, _context4.t9);

              case 16:
                _context4.t10 = _context4.sent;
                return _context4.abrupt("return", {
                  data: _context4.t10
                });

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _enc(_x5, _x6, _x7) {
        return _ref4.apply(this, arguments);
      }

      return _enc;
    }()
  }, {
    key: "_dec",
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(val, epub, pair) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.t0 = SEA;
                _context5.t1 = val.data;
                _context5.t2 = SEA;
                _context5.t3 = epub;
                _context5.t4 = _ramda.defaultTo;
                _context5.next = 7;
                return this.auth_user.pair();

              case 7:
                _context5.t5 = _context5.sent;
                _context5.t6 = (0, _context5.t4)(_context5.t5);
                _context5.t7 = pair;
                _context5.t8 = (0, _context5.t6)(_context5.t7);
                _context5.next = 13;
                return _context5.t2.secret.call(_context5.t2, _context5.t3, _context5.t8);

              case 13:
                _context5.t9 = _context5.sent;
                _context5.next = 16;
                return _context5.t0.decrypt.call(_context5.t0, _context5.t1, _context5.t9);

              case 16:
                return _context5.abrupt("return", _context5.sent);

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _dec(_x8, _x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return _dec;
    }()
  }, {
    key: "_args",
    value: function _args(args) {
      var isOpt = (0, _ramda.allPass)([(0, _ramda.propSatisfies)(_ramda.isNil, "#"), (0, _ramda.propSatisfies)(_ramda.isNil, "."), (0, _ramda.o)((0, _ramda.is)(Object), _ramda.last)]);
      var opt = (0, _ramda.ifElse)(isOpt, _ramda.last, (0, _ramda.always)({}))(args);
      var keys = (0, _ramda.when)(isOpt, _ramda.init)(args);
      return [opt, keys];
    }
  }, {
    key: "_onargs",
    value: function _onargs(args) {
      var cb = (0, _ramda.ifElse)((0, _ramda.o)((0, _ramda.is)(Function), _ramda.last), _ramda.last, (0, _ramda.always)(function () {}))(args);
      var _args = (0, _ramda.when)((0, _ramda.o)((0, _ramda.is)(Function), _ramda.last), _ramda.init)(args);

      var _args7 = this._args(_args),
          _args8 = (0, _slicedToArray3.default)(_args7, 2),
          opt = _args8[0],
          keys = _args8[1];

      return [opt, cb, keys];
    }
  }, {
    key: "gon",
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._on.apply(this, [{}, this.gun].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context6.abrupt("return", _context6.sent);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function gon() {
        return _ref6.apply(this, arguments);
      }

      return gon;
    }()
  }, {
    key: "gmap",
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this._on.apply(this, [{ map: true }, this.gun].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context7.abrupt("return", _context7.sent);

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function gmap() {
        return _ref7.apply(this, arguments);
      }

      return gmap;
    }()
  }, {
    key: "gmapon",
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this._on.apply(this, [{ map: true, on: true }, this.gun].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context8.abrupt("return", _context8.sent);

              case 3:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function gmapon() {
        return _ref8.apply(this, arguments);
      }

      return gmapon;
    }()
  }, {
    key: "uon",
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(pub) {
        for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          args[_key5 - 1] = arguments[_key5];
        }

        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!(0, _ramda.isNil)(this.users[pub])) {
                  _context9.next = 3;
                  break;
                }

                _context9.next = 3;
                return this._user(pub);

              case 3:
                _context9.next = 5;
                return this._on.apply(this, [{}, this.users[pub]].concat((0, _toConsumableArray3.default)(args)));

              case 5:
                return _context9.abrupt("return", _context9.sent);

              case 6:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function uon(_x11) {
        return _ref9.apply(this, arguments);
      }

      return uon;
    }()
  }, {
    key: "umap",
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(pub) {
        for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          args[_key6 - 1] = arguments[_key6];
        }

        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(0, _ramda.isNil)(this.users[pub])) {
                  _context10.next = 3;
                  break;
                }

                _context10.next = 3;
                return this._user(pub);

              case 3:
                _context10.next = 5;
                return this._on.apply(this, [{ map: true }, this.users[pub]].concat((0, _toConsumableArray3.default)(args)));

              case 5:
                return _context10.abrupt("return", _context10.sent);

              case 6:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function umap(_x12) {
        return _ref10.apply(this, arguments);
      }

      return umap;
    }()
  }, {
    key: "umapon",
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(pub) {
        for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
          args[_key7 - 1] = arguments[_key7];
        }

        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!(0, _ramda.isNil)(this.users[pub])) {
                  _context11.next = 3;
                  break;
                }

                _context11.next = 3;
                return this._user(pub);

              case 3:
                _context11.next = 5;
                return this._on.apply(this, [{ map: true, on: true }, this.users[pub]].concat((0, _toConsumableArray3.default)(args)));

              case 5:
                return _context11.abrupt("return", _context11.sent);

              case 6:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function umapon(_x13) {
        return _ref11.apply(this, arguments);
      }

      return umapon;
    }()
  }, {
    key: "on",
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
        for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
          args[_key8] = arguments[_key8];
        }

        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this._on.apply(this, [{ on: true }, this.auth_user].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context12.abrupt("return", _context12.sent);

              case 3:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function on() {
        return _ref12.apply(this, arguments);
      }

      return on;
    }()
  }, {
    key: "map",
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
        for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
          args[_key9] = arguments[_key9];
        }

        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this._on.apply(this, [{ map: true }, this.auth_user].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context13.abrupt("return", _context13.sent);

              case 3:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function map() {
        return _ref13.apply(this, arguments);
      }

      return map;
    }()
  }, {
    key: "mapon",
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14() {
        for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
          args[_key10] = arguments[_key10];
        }

        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return this._on.apply(this, [{ map: true, on: true }, this.auth_user].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context14.abrupt("return", _context14.sent);

              case 3:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function mapon() {
        return _ref14.apply(this, arguments);
      }

      return mapon;
    }()
  }, {
    key: "_get",
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17(node) {
        var _this2 = this;

        for (var _len11 = arguments.length, args = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
          args[_key11 - 1] = arguments[_key11];
        }

        var _args18, _args19, opt, keys;

        return _regenerator2.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _args18 = this._args(args), _args19 = (0, _slicedToArray3.default)(_args18, 2), opt = _args19[0], keys = _args19[1];
                _context17.next = 3;
                return this._getUser(opt);

              case 3:
                return _context17.abrupt("return", new _promise2.default(function () {
                  var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(ret) {
                    return _regenerator2.default.wrap(function _callee16$(_context16) {
                      while (1) {
                        switch (_context16.prev = _context16.next) {
                          case 0:
                            _this2.node.apply(_this2, [node].concat((0, _toConsumableArray3.default)(keys))).once(function () {
                              var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(data) {
                                return _regenerator2.default.wrap(function _callee15$(_context15) {
                                  while (1) {
                                    switch (_context15.prev = _context15.next) {
                                      case 0:
                                        _context15.t0 = ret;
                                        _context15.next = 3;
                                        return _this2._decrypt(data, opt);

                                      case 3:
                                        _context15.t1 = _context15.sent;
                                        (0, _context15.t0)(_context15.t1);

                                      case 5:
                                      case "end":
                                        return _context15.stop();
                                    }
                                  }
                                }, _callee15, _this2);
                              }));

                              return function (_x16) {
                                return _ref17.apply(this, arguments);
                              };
                            }());

                          case 1:
                          case "end":
                            return _context16.stop();
                        }
                      }
                    }, _callee16, _this2);
                  }));

                  return function (_x15) {
                    return _ref16.apply(this, arguments);
                  };
                }()));

              case 4:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function _get(_x14) {
        return _ref15.apply(this, arguments);
      }

      return _get;
    }()
  }, {
    key: "_decrypt",
    value: function () {
      var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18(data, opt) {
        return _regenerator2.default.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                data = opt.hash ? JSON.parse(data) : data;

                if (!(0, _ramda.propEq)("enc", true)(opt)) {
                  _context18.next = 12;
                  break;
                }

                _context18.t1 = this;
                _context18.t2 = data;
                _context18.next = 6;
                return this.auth_user.pair().epub;

              case 6:
                _context18.t3 = _context18.sent;
                _context18.next = 9;
                return _context18.t1._dec.call(_context18.t1, _context18.t2, _context18.t3);

              case 9:
                _context18.t0 = _context18.sent;
                _context18.next = 20;
                break;

              case 12:
                if (!(0, _ramda.has)("enc")(opt)) {
                  _context18.next = 18;
                  break;
                }

                _context18.next = 15;
                return this._dec(data, this.pairs[opt.enc].epub);

              case 15:
                _context18.t4 = _context18.sent;
                _context18.next = 19;
                break;

              case 18:
                _context18.t4 = data;

              case 19:
                _context18.t0 = _context18.t4;

              case 20:
                return _context18.abrupt("return", _context18.t0);

              case 21:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function _decrypt(_x17, _x18) {
        return _ref18.apply(this, arguments);
      }

      return _decrypt;
    }()
  }, {
    key: "_on",
    value: function () {
      var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20(conf, node) {
        var _this3 = this;

        for (var _len12 = arguments.length, args = Array(_len12 > 2 ? _len12 - 2 : 0), _key12 = 2; _key12 < _len12; _key12++) {
          args[_key12 - 2] = arguments[_key12];
        }

        var _onargs2, _onargs3, opt, cb, keys, _node;

        return _regenerator2.default.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _onargs2 = this._onargs(args), _onargs3 = (0, _slicedToArray3.default)(_onargs2, 3), opt = _onargs3[0], cb = _onargs3[1], keys = _onargs3[2];

                opt = (0, _ramda.mergeLeft)(conf)(opt);
                _context20.next = 4;
                return this._getUser(opt);

              case 4:
                _node = this.node.apply(this, [node].concat((0, _toConsumableArray3.default)(keys)));

                if (opt.map) _node = _node.map();
                _node[opt.on ? "on" : "once"](function () {
                  var _ref20 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19(data, key, msg, ev) {
                    return _regenerator2.default.wrap(function _callee19$(_context19) {
                      while (1) {
                        switch (_context19.prev = _context19.next) {
                          case 0:
                            _context19.t0 = cb;
                            _context19.next = 3;
                            return _this3._decrypt(data, opt);

                          case 3:
                            _context19.t1 = _context19.sent;
                            _context19.t2 = opt.on ? ev.off : null;
                            (0, _context19.t0)(_context19.t1, _context19.t2);

                          case 6:
                          case "end":
                            return _context19.stop();
                        }
                      }
                    }, _callee19, _this3);
                  }));

                  return function (_x21, _x22, _x23, _x24) {
                    return _ref20.apply(this, arguments);
                  };
                }());

              case 7:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      function _on(_x19, _x20) {
        return _ref19.apply(this, arguments);
      }

      return _on;
    }()
  }, {
    key: "gget",
    value: function () {
      var _ref21 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee21() {
        for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
          args[_key13] = arguments[_key13];
        }

        return _regenerator2.default.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return this._get.apply(this, [this.gun].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context21.abrupt("return", _context21.sent);

              case 3:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));

      function gget() {
        return _ref21.apply(this, arguments);
      }

      return gget;
    }()
  }, {
    key: "uget",
    value: function () {
      var _ref22 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee22(pub) {
        for (var _len14 = arguments.length, args = Array(_len14 > 1 ? _len14 - 1 : 0), _key14 = 1; _key14 < _len14; _key14++) {
          args[_key14 - 1] = arguments[_key14];
        }

        return _regenerator2.default.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                if (!(0, _ramda.isNil)(this.users[pub])) {
                  _context22.next = 3;
                  break;
                }

                _context22.next = 3;
                return this._user(pub);

              case 3:
                _context22.next = 5;
                return this._get.apply(this, [this.users[pub]].concat((0, _toConsumableArray3.default)(args)));

              case 5:
                return _context22.abrupt("return", _context22.sent);

              case 6:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));

      function uget(_x25) {
        return _ref22.apply(this, arguments);
      }

      return uget;
    }()
  }, {
    key: "get",
    value: function () {
      var _ref23 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee23() {
        for (var _len15 = arguments.length, args = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
          args[_key15] = arguments[_key15];
        }

        var _args28, _args29, opt, keys;

        return _regenerator2.default.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _args28 = this._args(args), _args29 = (0, _slicedToArray3.default)(_args28, 2), opt = _args29[0], keys = _args29[1];
                _context23.next = 3;
                return this._get.apply(this, [this.auth_user, opt].concat((0, _toConsumableArray3.default)(keys)));

              case 3:
                return _context23.abrupt("return", _context23.sent);

              case 4:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));

      function get() {
        return _ref23.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "_put",
    value: function () {
      var _ref24 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee25(node, val) {
        var _this4 = this;

        for (var _len16 = arguments.length, args = Array(_len16 > 2 ? _len16 - 2 : 0), _key16 = 2; _key16 < _len16; _key16++) {
          args[_key16 - 2] = arguments[_key16];
        }

        var _args31, _args32, opt, keys, enc, hash;

        return _regenerator2.default.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _args31 = this._args(args), _args32 = (0, _slicedToArray3.default)(_args31, 2), opt = _args32[0], keys = _args32[1];
                _context25.next = 3;
                return this._getUser(opt);

              case 3:
                if (!(0, _ramda.propEq)("enc", true)(opt)) {
                  _context25.next = 14;
                  break;
                }

                _context25.t1 = this;
                _context25.t2 = val;
                _context25.next = 8;
                return this.auth_user.pair().epub;

              case 8:
                _context25.t3 = _context25.sent;
                _context25.next = 11;
                return _context25.t1._enc.call(_context25.t1, _context25.t2, _context25.t3);

              case 11:
                _context25.t0 = _context25.sent;
                _context25.next = 22;
                break;

              case 14:
                if (!(0, _ramda.has)("enc")(opt)) {
                  _context25.next = 20;
                  break;
                }

                _context25.next = 17;
                return this._enc(val, this.pairs[opt.enc].epub);

              case 17:
                _context25.t4 = _context25.sent;
                _context25.next = 21;
                break;

              case 20:
                _context25.t4 = val;

              case 21:
                _context25.t0 = _context25.t4;

              case 22:
                enc = _context25.t0;

                if (!opt.hash) {
                  _context25.next = 29;
                  break;
                }

                _context25.next = 26;
                return SEA.work((0, _stringify2.default)(enc), null, null, { name: "SHA-256" });

              case 26:
                _context25.t5 = _context25.sent;
                _context25.next = 30;
                break;

              case 29:
                _context25.t5 = enc;

              case 30:
                hash = _context25.t5;

                console.log(hash);
                if (opt.hash) {
                  keys[keys.length - 1] += hash;
                  enc = (0, _stringify2.default)(enc);
                }
                return _context25.abrupt("return", new _promise2.default(function () {
                  var _ref25 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee24(ret) {
                    return _regenerator2.default.wrap(function _callee24$(_context24) {
                      while (1) {
                        switch (_context24.prev = _context24.next) {
                          case 0:
                            _this4.node.apply(_this4, [node].concat((0, _toConsumableArray3.default)(keys))).put(enc, function (data) {
                              return ret(data);
                            });

                          case 1:
                          case "end":
                            return _context24.stop();
                        }
                      }
                    }, _callee24, _this4);
                  }));

                  return function (_x28) {
                    return _ref25.apply(this, arguments);
                  };
                }()));

              case 34:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));

      function _put(_x26, _x27) {
        return _ref24.apply(this, arguments);
      }

      return _put;
    }()
  }, {
    key: "put",
    value: function () {
      var _ref26 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee26(val) {
        for (var _len17 = arguments.length, args = Array(_len17 > 1 ? _len17 - 1 : 0), _key17 = 1; _key17 < _len17; _key17++) {
          args[_key17 - 1] = arguments[_key17];
        }

        return _regenerator2.default.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                _context26.next = 2;
                return this._put.apply(this, [this.auth_user, val].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context26.abrupt("return", _context26.sent);

              case 3:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));

      function put(_x29) {
        return _ref26.apply(this, arguments);
      }

      return put;
    }()
  }, {
    key: "gput",
    value: function () {
      var _ref27 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee27(val) {
        for (var _len18 = arguments.length, args = Array(_len18 > 1 ? _len18 - 1 : 0), _key18 = 1; _key18 < _len18; _key18++) {
          args[_key18 - 1] = arguments[_key18];
        }

        var _args36, _args37, opt, keys;

        return _regenerator2.default.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                _args36 = this._args(args), _args37 = (0, _slicedToArray3.default)(_args36, 2), opt = _args37[0], keys = _args37[1];
                _context27.next = 3;
                return this._put.apply(this, [this.gun, val, opt].concat((0, _toConsumableArray3.default)(keys)));

              case 3:
                return _context27.abrupt("return", _context27.sent);

              case 4:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));

      function gput(_x30) {
        return _ref27.apply(this, arguments);
      }

      return gput;
    }()
  }, {
    key: "auth",
    value: function () {
      var _ref28 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee30(alias, pass) {
        var _this5 = this;

        var user;
        return _regenerator2.default.wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                user = this.gun.user();
                _context30.next = 3;
                return new _promise2.default(function (ret, rej) {
                  user.create(alias, pass, function () {
                    var _ref29 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee29(ack) {
                      return _regenerator2.default.wrap(function _callee29$(_context29) {
                        while (1) {
                          switch (_context29.prev = _context29.next) {
                            case 0:
                              if (!(0, _ramda.isNil)(ack.err)) {
                                user.auth(alias, pass, function () {
                                  var _ref30 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee28(ack) {
                                    return _regenerator2.default.wrap(function _callee28$(_context28) {
                                      while (1) {
                                        switch (_context28.prev = _context28.next) {
                                          case 0:
                                            if (!(0, _ramda.isNil)(ack.err)) {
                                              rej(null);
                                            } else {
                                              ret(true);
                                            }

                                          case 1:
                                          case "end":
                                            return _context28.stop();
                                        }
                                      }
                                    }, _callee28, _this5);
                                  }));

                                  return function (_x34) {
                                    return _ref30.apply(this, arguments);
                                  };
                                }());
                              } else {
                                ret(true);
                              }

                            case 1:
                            case "end":
                              return _context29.stop();
                          }
                        }
                      }, _callee29, _this5);
                    }));

                    return function (_x33) {
                      return _ref29.apply(this, arguments);
                    };
                  }());
                });

              case 3:
                this.pairs[user.is.pub] = user.is;
                this.users[user.is.pub] = user;
                this.auth_user = user;
                return _context30.abrupt("return", user.is.pub);

              case 7:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, this);
      }));

      function auth(_x31, _x32) {
        return _ref28.apply(this, arguments);
      }

      return auth;
    }()
  }]);
  return db;
}();

exports.default = db;
module.exports = exports.default;