"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.page = undefined;

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _gun = require("gun");

var _gun2 = _interopRequireDefault(_gun);

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("gun/sea");

var _page = function () {
  function page(d, type) {
    (0, _classCallCheck3.default)(this, page);

    this.type = type;
    this.node = d;
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var _d$_args = d._args(args);

    var _d$_args2 = (0, _slicedToArray3.default)(_d$_args, 2);

    this.opt = _d$_args2[0];
    this.keys = _d$_args2[1];

    this.items = {};
    this.arr = {};
    this.last = null;
    this.cursor = 1;
    this.isNext = true;
  }

  (0, _createClass3.default)(page, [{
    key: "put",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(id, data) {
        var _node2, _node3;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.type === "u")) {
                  _context.next = 4;
                  break;
                }

                _context.t0 = null;
                _context.next = 14;
                break;

              case 4:
                if (!(this.type === "g")) {
                  _context.next = 10;
                  break;
                }

                _context.next = 7;
                return (_node2 = this.node).gput.apply(_node2, [data].concat((0, _toConsumableArray3.default)(this.keys), [Date.now() + ":" + id + (this.opt.hash ? "#" : ""), this.opt]));

              case 7:
                _context.t1 = _context.sent;
                _context.next = 13;
                break;

              case 10:
                _context.next = 12;
                return (_node3 = this.node).put.apply(_node3, [data].concat((0, _toConsumableArray3.default)(this.keys), [Date.now() + ":" + id + (this.opt.hash ? "#" : ""), this.opt]));

              case 12:
                _context.t1 = _context.sent;

              case 13:
                _context.t0 = _context.t1;

              case 14:
                return _context.abrupt("return", _context.t0);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function put(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return put;
    }()
  }, {
    key: "init",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var _this = this;

        var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
        var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", new _promise2.default(function () {
                  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ret) {
                    var returned;
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            returned = false;
                            _context2.next = 3;
                            return _this.fetch("0", function (data) {
                              if (!returned && _this.items.length >= limit) {
                                returned = true;
                                ret(true);
                              }
                            });

                          case 3:
                            setTimeout(function () {
                              returned = true;
                              ret(true);
                            }, to);

                          case 4:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this);
                  }));

                  return function (_x5) {
                    return _ref3.apply(this, arguments);
                  };
                }()));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function init() {
        return _ref2.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "parse",
    value: function parse(data, cb) {
      try {
        var key = data._key;
        this.items[key] = data;
        this.arr = (0, _ramda.compose)((0, _ramda.sortBy)((0, _ramda.prop)("_key")), _ramda.values, (0, _ramda.mapObjIndexed)(function (v, key) {
          return (0, _ramda.assoc)("_key", key)(v);
        }))(this.items);
        this.last = (0, _ramda.last)(this.arr)._key;
        if ((0, _ramda.is)(Function)(cb)) cb(data);
      } catch (e) {
        console.log(e);
      }
    }
  }, {
    key: "fetch",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var _node4,
            _this2 = this,
            _node5,
            _node6;

        var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "0";
        var cb = arguments[1];
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.type === "g")) {
                  _context4.next = 5;
                  break;
                }

                _context4.next = 3;
                return (_node4 = this.node).gmap.apply(_node4, (0, _toConsumableArray3.default)(this.keys).concat([{ ".": { ">": start || "0" }, "%": 50000 }, this.opt, function (data) {
                  return _this2.parse(data, cb);
                }]));

              case 3:
                _context4.next = 12;
                break;

              case 5:
                if (!(this.type === "")) {
                  _context4.next = 10;
                  break;
                }

                _context4.next = 8;
                return (_node5 = this.node).map.apply(_node5, (0, _toConsumableArray3.default)(this.keys).concat([{ ".": { ">": start || "0" }, "%": 50000 }, this.opt, function (data) {
                  return _this2.parse(data, cb);
                }]));

              case 8:
                _context4.next = 12;
                break;

              case 10:
                _context4.next = 12;
                return (_node6 = this.node).umap.apply(_node6, [this.type].concat((0, _toConsumableArray3.default)(this.keys), [{ ".": { ">": start || "0" }, "%": 50000 }, this.opt, function (data) {
                  return _this2.parse(data, cb);
                }]));

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function fetch() {
        return _ref4.apply(this, arguments);
      }

      return fetch;
    }()
  }, {
    key: "next",
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
        var start = arguments[1];
        var arr;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                start = (0, _ramda.defaultTo)(this.cursor)(start);
                arr = (0, _ramda.slice)(start - 1, start - 1 + limit)(this.arr);

                this.cursor += arr.length;
                this.fetch(this.last);
                this.isNext = !(0, _ramda.isNil)(this.arr[this.cursor - 1]);
                return _context5.abrupt("return", arr);

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function next() {
        return _ref5.apply(this, arguments);
      }

      return next;
    }()
  }]);
  return page;
}();

exports.page = _page;

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
    key: "upage",
    value: function upage(pub) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return new (Function.prototype.bind.apply(_page, [null].concat([this, pub], args)))();
    }
  }, {
    key: "gpage",
    value: function gpage() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return new (Function.prototype.bind.apply(_page, [null].concat([this, "g"], args)))();
    }
  }, {
    key: "page",
    value: function page() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return new (Function.prototype.bind.apply(_page, [null].concat([this, ""], args)))();
    }
  }, {
    key: "_user",
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(pub) {
        var _this3 = this;

        var user;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                user = this.gun.user(pub);
                _context7.next = 3;
                return new _promise2.default(function (ret) {
                  user.once(function () {
                    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(_user) {
                      return _regenerator2.default.wrap(function _callee6$(_context6) {
                        while (1) {
                          switch (_context6.prev = _context6.next) {
                            case 0:
                              _this3.pairs[pub] = _user;
                              ret(_user);

                            case 2:
                            case "end":
                              return _context6.stop();
                          }
                        }
                      }, _callee6, _this3);
                    }));

                    return function (_x10) {
                      return _ref7.apply(this, arguments);
                    };
                  }());
                });

              case 3:
                this.users[pub] = user;
                return _context7.abrupt("return", pub);

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _user(_x9) {
        return _ref6.apply(this, arguments);
      }

      return _user;
    }()
  }, {
    key: "_getUser",
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(opt) {
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!((0, _ramda.both)((0, _ramda.has)("enc"), (0, _ramda.complement)(_ramda.propEq)("enc", true))(opt) && (0, _ramda.isNil)(this.users[opt.enc.pub]))) {
                  _context8.next = 3;
                  break;
                }

                _context8.next = 3;
                return this._user(opt.enc);

              case 3:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function _getUser(_x11) {
        return _ref8.apply(this, arguments);
      }

      return _getUser;
    }()
  }, {
    key: "node",
    value: function node(_node7) {
      for (var _len5 = arguments.length, keys = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        keys[_key5 - 1] = arguments[_key5];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(keys), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var v = _step.value;
          _node7 = _node7.get(v);
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

      return _node7;
    }
  }, {
    key: "_enc",
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(val, epub, pair) {
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.t0 = SEA;
                _context9.t1 = val;
                _context9.t2 = SEA;
                _context9.t3 = epub;
                _context9.t4 = _ramda.defaultTo;
                _context9.next = 7;
                return this.auth_user.pair();

              case 7:
                _context9.t5 = _context9.sent;
                _context9.t6 = (0, _context9.t4)(_context9.t5);
                _context9.t7 = pair;
                _context9.t8 = (0, _context9.t6)(_context9.t7);
                _context9.next = 13;
                return _context9.t2.secret.call(_context9.t2, _context9.t3, _context9.t8);

              case 13:
                _context9.t9 = _context9.sent;
                _context9.next = 16;
                return _context9.t0.encrypt.call(_context9.t0, _context9.t1, _context9.t9);

              case 16:
                _context9.t10 = _context9.sent;
                return _context9.abrupt("return", {
                  data: _context9.t10
                });

              case 18:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function _enc(_x12, _x13, _x14) {
        return _ref9.apply(this, arguments);
      }

      return _enc;
    }()
  }, {
    key: "_dec",
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(val, epub, pair) {
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.t0 = SEA;
                _context10.t1 = val.data;
                _context10.t2 = SEA;
                _context10.t3 = epub;
                _context10.t4 = _ramda.defaultTo;
                _context10.next = 7;
                return this.auth_user.pair();

              case 7:
                _context10.t5 = _context10.sent;
                _context10.t6 = (0, _context10.t4)(_context10.t5);
                _context10.t7 = pair;
                _context10.t8 = (0, _context10.t6)(_context10.t7);
                _context10.next = 13;
                return _context10.t2.secret.call(_context10.t2, _context10.t3, _context10.t8);

              case 13:
                _context10.t9 = _context10.sent;
                _context10.next = 16;
                return _context10.t0.decrypt.call(_context10.t0, _context10.t1, _context10.t9);

              case 16:
                return _context10.abrupt("return", _context10.sent);

              case 17:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function _dec(_x15, _x16, _x17) {
        return _ref10.apply(this, arguments);
      }

      return _dec;
    }()
  }, {
    key: "_args",
    value: function _args(args) {
      var isOpt = (0, _ramda.o)((0, _ramda.allPass)([(0, _ramda.propSatisfies)(_ramda.isNil, "#"), (0, _ramda.propSatisfies)(_ramda.isNil, "."), (0, _ramda.is)(Object)]), _ramda.last);
      var opt = (0, _ramda.ifElse)(isOpt, _ramda.last, (0, _ramda.always)({}))(args);
      var keys = (0, _ramda.when)(isOpt, _ramda.init)(args);
      return [opt, keys];
    }
  }, {
    key: "_onargs",
    value: function _onargs(args) {
      var cb = (0, _ramda.ifElse)((0, _ramda.o)((0, _ramda.is)(Function), _ramda.last), _ramda.last, (0, _ramda.always)(function () {}))(args);
      var _args = (0, _ramda.when)((0, _ramda.o)((0, _ramda.is)(Function), _ramda.last), _ramda.init)(args);

      var _args12 = this._args(_args),
          _args13 = (0, _slicedToArray3.default)(_args12, 2),
          opt = _args13[0],
          keys = _args13[1];

      return [opt, cb, keys];
    }
  }, {
    key: "gon",
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
        for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          args[_key6] = arguments[_key6];
        }

        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return this._on.apply(this, [{}, this.gun].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context11.abrupt("return", _context11.sent);

              case 3:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function gon() {
        return _ref11.apply(this, arguments);
      }

      return gon;
    }()
  }, {
    key: "gmap",
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
        for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
          args[_key7] = arguments[_key7];
        }

        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this._on.apply(this, [{ map: true }, this.gun].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context12.abrupt("return", _context12.sent);

              case 3:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function gmap() {
        return _ref12.apply(this, arguments);
      }

      return gmap;
    }()
  }, {
    key: "gmapon",
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
        for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
          args[_key8] = arguments[_key8];
        }

        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this._on.apply(this, [{ map: true, on: true }, this.gun].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context13.abrupt("return", _context13.sent);

              case 3:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function gmapon() {
        return _ref13.apply(this, arguments);
      }

      return gmapon;
    }()
  }, {
    key: "uon",
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(pub) {
        for (var _len9 = arguments.length, args = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
          args[_key9 - 1] = arguments[_key9];
        }

        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                if (!(0, _ramda.isNil)(this.users[pub])) {
                  _context14.next = 3;
                  break;
                }

                _context14.next = 3;
                return this._user(pub);

              case 3:
                _context14.next = 5;
                return this._on.apply(this, [{}, this.users[pub]].concat((0, _toConsumableArray3.default)(args)));

              case 5:
                return _context14.abrupt("return", _context14.sent);

              case 6:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function uon(_x18) {
        return _ref14.apply(this, arguments);
      }

      return uon;
    }()
  }, {
    key: "umap",
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(pub) {
        for (var _len10 = arguments.length, args = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
          args[_key10 - 1] = arguments[_key10];
        }

        return _regenerator2.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                console.log(pub);

                if (!(0, _ramda.isNil)(this.users[pub])) {
                  _context15.next = 4;
                  break;
                }

                _context15.next = 4;
                return this._user(pub);

              case 4:
                _context15.next = 6;
                return this._on.apply(this, [{ map: true }, this.users[pub]].concat((0, _toConsumableArray3.default)(args)));

              case 6:
                return _context15.abrupt("return", _context15.sent);

              case 7:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function umap(_x19) {
        return _ref15.apply(this, arguments);
      }

      return umap;
    }()
  }, {
    key: "umapon",
    value: function () {
      var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(pub) {
        for (var _len11 = arguments.length, args = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
          args[_key11 - 1] = arguments[_key11];
        }

        return _regenerator2.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                if (!(0, _ramda.isNil)(this.users[pub])) {
                  _context16.next = 3;
                  break;
                }

                _context16.next = 3;
                return this._user(pub);

              case 3:
                _context16.next = 5;
                return this._on.apply(this, [{ map: true, on: true }, this.users[pub]].concat((0, _toConsumableArray3.default)(args)));

              case 5:
                return _context16.abrupt("return", _context16.sent);

              case 6:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function umapon(_x20) {
        return _ref16.apply(this, arguments);
      }

      return umapon;
    }()
  }, {
    key: "on",
    value: function () {
      var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17() {
        for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
          args[_key12] = arguments[_key12];
        }

        return _regenerator2.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return this._on.apply(this, [{ on: true }, this.auth_user].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context17.abrupt("return", _context17.sent);

              case 3:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function on() {
        return _ref17.apply(this, arguments);
      }

      return on;
    }()
  }, {
    key: "map",
    value: function () {
      var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18() {
        for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
          args[_key13] = arguments[_key13];
        }

        return _regenerator2.default.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return this._on.apply(this, [{ map: true }, this.auth_user].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context18.abrupt("return", _context18.sent);

              case 3:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function map() {
        return _ref18.apply(this, arguments);
      }

      return map;
    }()
  }, {
    key: "mapon",
    value: function () {
      var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19() {
        for (var _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
          args[_key14] = arguments[_key14];
        }

        return _regenerator2.default.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return this._on.apply(this, [{ map: true, on: true }, this.auth_user].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context19.abrupt("return", _context19.sent);

              case 3:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function mapon() {
        return _ref19.apply(this, arguments);
      }

      return mapon;
    }()
  }, {
    key: "_get",
    value: function () {
      var _ref20 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee22(node) {
        var _this4 = this;

        for (var _len15 = arguments.length, args = Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _key15 < _len15; _key15++) {
          args[_key15 - 1] = arguments[_key15];
        }

        var _args23, _args24, opt, keys;

        return _regenerator2.default.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _args23 = this._args(args), _args24 = (0, _slicedToArray3.default)(_args23, 2), opt = _args24[0], keys = _args24[1];
                _context22.next = 3;
                return this._getUser(opt);

              case 3:
                return _context22.abrupt("return", new _promise2.default(function () {
                  var _ref21 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee21(ret) {
                    return _regenerator2.default.wrap(function _callee21$(_context21) {
                      while (1) {
                        switch (_context21.prev = _context21.next) {
                          case 0:
                            _this4.node.apply(_this4, [node].concat((0, _toConsumableArray3.default)(keys))).once(function () {
                              var _ref22 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20(data) {
                                return _regenerator2.default.wrap(function _callee20$(_context20) {
                                  while (1) {
                                    switch (_context20.prev = _context20.next) {
                                      case 0:
                                        _context20.t0 = ret;
                                        _context20.next = 3;
                                        return _this4._decrypt(data, opt);

                                      case 3:
                                        _context20.t1 = _context20.sent;
                                        (0, _context20.t0)(_context20.t1);

                                      case 5:
                                      case "end":
                                        return _context20.stop();
                                    }
                                  }
                                }, _callee20, _this4);
                              }));

                              return function (_x23) {
                                return _ref22.apply(this, arguments);
                              };
                            }());

                          case 1:
                          case "end":
                            return _context21.stop();
                        }
                      }
                    }, _callee21, _this4);
                  }));

                  return function (_x22) {
                    return _ref21.apply(this, arguments);
                  };
                }()));

              case 4:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));

      function _get(_x21) {
        return _ref20.apply(this, arguments);
      }

      return _get;
    }()
  }, {
    key: "_decrypt",
    value: function () {
      var _ref23 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee23(data, opt) {
        return _regenerator2.default.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                data = opt.hash ? JSON.parse(data) : data;

                if (!(0, _ramda.propEq)("enc", true)(opt)) {
                  _context23.next = 12;
                  break;
                }

                _context23.t1 = this;
                _context23.t2 = data;
                _context23.next = 6;
                return this.auth_user.pair().epub;

              case 6:
                _context23.t3 = _context23.sent;
                _context23.next = 9;
                return _context23.t1._dec.call(_context23.t1, _context23.t2, _context23.t3);

              case 9:
                _context23.t0 = _context23.sent;
                _context23.next = 20;
                break;

              case 12:
                if (!(0, _ramda.has)("enc")(opt)) {
                  _context23.next = 18;
                  break;
                }

                _context23.next = 15;
                return this._dec(data, this.pairs[opt.enc].epub);

              case 15:
                _context23.t4 = _context23.sent;
                _context23.next = 19;
                break;

              case 18:
                _context23.t4 = data;

              case 19:
                _context23.t0 = _context23.t4;

              case 20:
                return _context23.abrupt("return", _context23.t0);

              case 21:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));

      function _decrypt(_x24, _x25) {
        return _ref23.apply(this, arguments);
      }

      return _decrypt;
    }()
  }, {
    key: "_on",
    value: function () {
      var _ref24 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee25(conf, node) {
        var _this5 = this;

        for (var _len16 = arguments.length, args = Array(_len16 > 2 ? _len16 - 2 : 0), _key16 = 2; _key16 < _len16; _key16++) {
          args[_key16 - 2] = arguments[_key16];
        }

        var _onargs2, _onargs3, opt, cb, keys, _node;

        return _regenerator2.default.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _onargs2 = this._onargs(args), _onargs3 = (0, _slicedToArray3.default)(_onargs2, 3), opt = _onargs3[0], cb = _onargs3[1], keys = _onargs3[2];

                opt = (0, _ramda.mergeLeft)(conf)(opt);
                _context25.next = 4;
                return this._getUser(opt);

              case 4:
                _node = this.node.apply(this, [node].concat((0, _toConsumableArray3.default)(keys)));

                if (opt.map) _node = _node.map();
                _node[opt.on ? "on" : "once"](function () {
                  var _ref25 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee24(data, key, msg, ev) {
                    return _regenerator2.default.wrap(function _callee24$(_context24) {
                      while (1) {
                        switch (_context24.prev = _context24.next) {
                          case 0:
                            _context24.t0 = cb;
                            _context24.t1 = _ramda.mergeLeft;
                            _context24.t2 = { _key: key };
                            _context24.next = 5;
                            return _this5._decrypt(data, opt);

                          case 5:
                            _context24.t3 = _context24.sent;
                            _context24.t4 = (0, _context24.t1)(_context24.t2, _context24.t3);
                            _context24.t5 = opt.on ? ev.off : null;
                            (0, _context24.t0)(_context24.t4, _context24.t5);

                          case 9:
                          case "end":
                            return _context24.stop();
                        }
                      }
                    }, _callee24, _this5);
                  }));

                  return function (_x28, _x29, _x30, _x31) {
                    return _ref25.apply(this, arguments);
                  };
                }());

              case 7:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));

      function _on(_x26, _x27) {
        return _ref24.apply(this, arguments);
      }

      return _on;
    }()
  }, {
    key: "gget",
    value: function () {
      var _ref26 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee26() {
        for (var _len17 = arguments.length, args = Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
          args[_key17] = arguments[_key17];
        }

        return _regenerator2.default.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                _context26.next = 2;
                return this._get.apply(this, [this.gun].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context26.abrupt("return", _context26.sent);

              case 3:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));

      function gget() {
        return _ref26.apply(this, arguments);
      }

      return gget;
    }()
  }, {
    key: "uget",
    value: function () {
      var _ref27 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee27(pub) {
        for (var _len18 = arguments.length, args = Array(_len18 > 1 ? _len18 - 1 : 0), _key18 = 1; _key18 < _len18; _key18++) {
          args[_key18 - 1] = arguments[_key18];
        }

        return _regenerator2.default.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                if (!(0, _ramda.isNil)(this.users[pub])) {
                  _context27.next = 3;
                  break;
                }

                _context27.next = 3;
                return this._user(pub);

              case 3:
                _context27.next = 5;
                return this._get.apply(this, [this.users[pub]].concat((0, _toConsumableArray3.default)(args)));

              case 5:
                return _context27.abrupt("return", _context27.sent);

              case 6:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));

      function uget(_x32) {
        return _ref27.apply(this, arguments);
      }

      return uget;
    }()
  }, {
    key: "get",
    value: function () {
      var _ref28 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee28() {
        for (var _len19 = arguments.length, args = Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
          args[_key19] = arguments[_key19];
        }

        return _regenerator2.default.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                _context28.next = 2;
                return this._get.apply(this, [this.auth_user].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context28.abrupt("return", _context28.sent);

              case 3:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this);
      }));

      function get() {
        return _ref28.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "_put",
    value: function () {
      var _ref29 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee30(node, val) {
        var _this6 = this;

        for (var _len20 = arguments.length, args = Array(_len20 > 2 ? _len20 - 2 : 0), _key20 = 2; _key20 < _len20; _key20++) {
          args[_key20 - 2] = arguments[_key20];
        }

        var _args34, _args35, opt, keys, enc, hash;

        return _regenerator2.default.wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                _args34 = this._args(args), _args35 = (0, _slicedToArray3.default)(_args34, 2), opt = _args35[0], keys = _args35[1];
                _context30.next = 3;
                return this._getUser(opt);

              case 3:
                if (!(0, _ramda.propEq)("enc", true)(opt)) {
                  _context30.next = 14;
                  break;
                }

                _context30.t1 = this;
                _context30.t2 = val;
                _context30.next = 8;
                return this.auth_user.pair().epub;

              case 8:
                _context30.t3 = _context30.sent;
                _context30.next = 11;
                return _context30.t1._enc.call(_context30.t1, _context30.t2, _context30.t3);

              case 11:
                _context30.t0 = _context30.sent;
                _context30.next = 22;
                break;

              case 14:
                if (!(0, _ramda.has)("enc")(opt)) {
                  _context30.next = 20;
                  break;
                }

                _context30.next = 17;
                return this._enc(val, this.pairs[opt.enc].epub);

              case 17:
                _context30.t4 = _context30.sent;
                _context30.next = 21;
                break;

              case 20:
                _context30.t4 = val;

              case 21:
                _context30.t0 = _context30.t4;

              case 22:
                enc = _context30.t0;

                if (!opt.hash) {
                  _context30.next = 29;
                  break;
                }

                _context30.next = 26;
                return SEA.work((0, _stringify2.default)(enc), null, null, { name: "SHA-256" });

              case 26:
                _context30.t5 = _context30.sent;
                _context30.next = 30;
                break;

              case 29:
                _context30.t5 = enc;

              case 30:
                hash = _context30.t5;

                if (opt.hash) {
                  keys[keys.length - 1] += hash;
                  enc = (0, _stringify2.default)(enc);
                }
                return _context30.abrupt("return", new _promise2.default(function () {
                  var _ref30 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee29(ret) {
                    return _regenerator2.default.wrap(function _callee29$(_context29) {
                      while (1) {
                        switch (_context29.prev = _context29.next) {
                          case 0:
                            _this6.node.apply(_this6, [node].concat((0, _toConsumableArray3.default)(keys))).put(enc, function (data) {
                              return ret(data);
                            });

                          case 1:
                          case "end":
                            return _context29.stop();
                        }
                      }
                    }, _callee29, _this6);
                  }));

                  return function (_x35) {
                    return _ref30.apply(this, arguments);
                  };
                }()));

              case 33:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, this);
      }));

      function _put(_x33, _x34) {
        return _ref29.apply(this, arguments);
      }

      return _put;
    }()
  }, {
    key: "put",
    value: function () {
      var _ref31 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee31(val) {
        for (var _len21 = arguments.length, args = Array(_len21 > 1 ? _len21 - 1 : 0), _key21 = 1; _key21 < _len21; _key21++) {
          args[_key21 - 1] = arguments[_key21];
        }

        return _regenerator2.default.wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                _context31.next = 2;
                return this._put.apply(this, [this.auth_user, val].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context31.abrupt("return", _context31.sent);

              case 3:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31, this);
      }));

      function put(_x36) {
        return _ref31.apply(this, arguments);
      }

      return put;
    }()
  }, {
    key: "gput",
    value: function () {
      var _ref32 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee32(val) {
        for (var _len22 = arguments.length, args = Array(_len22 > 1 ? _len22 - 1 : 0), _key22 = 1; _key22 < _len22; _key22++) {
          args[_key22 - 1] = arguments[_key22];
        }

        return _regenerator2.default.wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                _context32.next = 2;
                return this._put.apply(this, [this.gun, val].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context32.abrupt("return", _context32.sent);

              case 3:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32, this);
      }));

      function gput(_x37) {
        return _ref32.apply(this, arguments);
      }

      return gput;
    }()
  }, {
    key: "auth",
    value: function () {
      var _ref33 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee35(alias, pass) {
        var _this7 = this;

        var user;
        return _regenerator2.default.wrap(function _callee35$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                user = this.gun.user();
                _context35.next = 3;
                return new _promise2.default(function (ret, rej) {
                  user.create(alias, pass, function () {
                    var _ref34 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee34(ack) {
                      return _regenerator2.default.wrap(function _callee34$(_context34) {
                        while (1) {
                          switch (_context34.prev = _context34.next) {
                            case 0:
                              if (!(0, _ramda.isNil)(ack.err)) {
                                user.auth(alias, pass, function () {
                                  var _ref35 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee33(ack) {
                                    return _regenerator2.default.wrap(function _callee33$(_context33) {
                                      while (1) {
                                        switch (_context33.prev = _context33.next) {
                                          case 0:
                                            if (!(0, _ramda.isNil)(ack.err)) {
                                              rej(null);
                                            } else {
                                              ret(true);
                                            }

                                          case 1:
                                          case "end":
                                            return _context33.stop();
                                        }
                                      }
                                    }, _callee33, _this7);
                                  }));

                                  return function (_x41) {
                                    return _ref35.apply(this, arguments);
                                  };
                                }());
                              } else {
                                ret(true);
                              }

                            case 1:
                            case "end":
                              return _context34.stop();
                          }
                        }
                      }, _callee34, _this7);
                    }));

                    return function (_x40) {
                      return _ref34.apply(this, arguments);
                    };
                  }());
                });

              case 3:
                this.pairs[user.is.pub] = user.is;
                this.users[user.is.pub] = user;
                this.auth_user = user;
                return _context35.abrupt("return", user.is.pub);

              case 7:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee35, this);
      }));

      function auth(_x38, _x39) {
        return _ref33.apply(this, arguments);
      }

      return auth;
    }()
  }]);
  return db;
}();

exports.default = db;