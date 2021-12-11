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
    this.arr = [];
    this.last = null;
    this.cursor = 1;
    this.isNext = true;
    this.listeners = {};
    this.llen = 0;
    this.exists = {};
  }

  (0, _createClass3.default)(page, [{
    key: "del",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(id) {
        var _node2, _node3;

        var ind, data, res;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ind = (0, _ramda.findIndex)(function (v) {
                  return v._key.split(":")[1] === id;
                })(this.arr);
                data = { deleted: true };

                if (!(this.type === "u" || (0, _ramda.isNil)(this.arr[ind]))) {
                  _context.next = 6;
                  break;
                }

                _context.t0 = null;
                _context.next = 16;
                break;

              case 6:
                if (!(this.type === "g")) {
                  _context.next = 12;
                  break;
                }

                _context.next = 9;
                return (_node2 = this.node).gput.apply(_node2, [data].concat((0, _toConsumableArray3.default)(this.keys), [this.arr[ind]._key, this.opt]));

              case 9:
                _context.t1 = _context.sent;
                _context.next = 15;
                break;

              case 12:
                _context.next = 14;
                return (_node3 = this.node).put.apply(_node3, [data].concat((0, _toConsumableArray3.default)(this.keys), [this.arr[ind]._key, this.opt]));

              case 14:
                _context.t1 = _context.sent;

              case 15:
                _context.t0 = _context.t1;

              case 16:
                res = _context.t0;

                if (!(0, _ramda.isNil)(res)) {
                  delete this.items[this.arr[ind]._key];
                  this.arr = (0, _ramda.remove)(ind, 1)(this.arr);
                }
                return _context.abrupt("return", res);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function del(_x) {
        return _ref.apply(this, arguments);
      }

      return del;
    }()
  }, {
    key: "put",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(id, data) {
        var _node4, _node5;

        var date;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                date = this.opt.desc ? "" + (253370732400000 - Date.now()) : Date.now();

                if (!(this.type === "u")) {
                  _context2.next = 5;
                  break;
                }

                _context2.t0 = null;
                _context2.next = 15;
                break;

              case 5:
                if (!(this.type === "g")) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 8;
                return (_node4 = this.node).gput.apply(_node4, [data].concat((0, _toConsumableArray3.default)(this.keys), [date + ":" + id + (this.opt.hash ? "#" : ""), this.opt]));

              case 8:
                _context2.t1 = _context2.sent;
                _context2.next = 14;
                break;

              case 11:
                _context2.next = 13;
                return (_node5 = this.node).put.apply(_node5, [data].concat((0, _toConsumableArray3.default)(this.keys), [date + ":" + id + (this.opt.hash ? "#" : ""), this.opt]));

              case 13:
                _context2.t1 = _context2.sent;

              case 14:
                _context2.t0 = _context2.t1;

              case 15:
                return _context2.abrupt("return", _context2.t0);

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function put(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return put;
    }()
  }, {
    key: "on",
    value: function on(cb) {
      this.listeners[this.llen] = cb;
      return this.llen++;
    }
  }, {
    key: "off",
    value: function off(id) {
      delete this.listeners[id];
    }
  }, {
    key: "init",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var _this = this;

        var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
        var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", new _promise2.default(function () {
                  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ret) {
                    var returned;
                    return _regenerator2.default.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            returned = false;
                            _context3.next = 3;
                            return _this.checkNew(function (data) {
                              if (!returned && _this.arr.length >= limit) {
                                if (!returned) {
                                  returned = true;
                                  ret(true);
                                }
                              }
                            });

                          case 3:
                            setTimeout(function () {
                              if (!returned) {
                                returned = true;
                                ret(true);
                              }
                            }, to);

                          case 4:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3, _this);
                  }));

                  return function (_x6) {
                    return _ref4.apply(this, arguments);
                  };
                }()));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function init() {
        return _ref3.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "checkNew",
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(cb) {
        var _this2 = this;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.fetch("0", function (data, key) {
                  for (var k in _this2.listeners) {
                    if ((0, _ramda.isNil)(_this2.exists[key])) {
                      _this2.listeners[k](data);
                    }
                  }
                  _this2.exists[key] = true;
                  cb(data, key);
                }, true);

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function checkNew(_x7) {
        return _ref5.apply(this, arguments);
      }

      return checkNew;
    }()
  }, {
    key: "parse",
    value: function parse(data, cb) {
      var broadcast = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      try {
        var key = data._key;
        if (!(0, _ramda.isNil)(data) && data.deleted !== true) {
          this.items[key] = data;
          this.arr = (0, _ramda.compose)((0, _ramda.sortBy)((0, _ramda.prop)("_key")), _ramda.values, (0, _ramda.mapObjIndexed)(function (v, key) {
            return (0, _ramda.assoc)("_key", key)(v);
          }))(this.items);
          this.last = (0, _ramda.last)(this.arr)._key;
        }
        if ((0, _ramda.is)(Function)(cb)) cb(data, key);
        if (!broadcast) this.exists[key] = true;
      } catch (e) {
        console.log(e);
      }
    }
  }, {
    key: "fetch",
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "0";

        var _node6,
            _this3 = this,
            _node7,
            _node8;

        var cb = arguments[1];
        var broadcast = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var d, cond;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                d = Date.now();
                cond = { ".": { ">": "" + start }, "%": 1000000 };

                if (!(this.type === "g")) {
                  _context6.next = 7;
                  break;
                }

                _context6.next = 5;
                return (_node6 = this.node).gmap.apply(_node6, (0, _toConsumableArray3.default)(this.keys).concat([cond, this.opt, function (data) {
                  _this3.parse(data, cb, broadcast);
                }]));

              case 5:
                _context6.next = 14;
                break;

              case 7:
                if (!(this.type === "")) {
                  _context6.next = 12;
                  break;
                }

                _context6.next = 10;
                return (_node7 = this.node).map.apply(_node7, (0, _toConsumableArray3.default)(this.keys).concat([cond, this.opt, function (data) {
                  _this3.parse(data, cb, broadcast);
                }]));

              case 10:
                _context6.next = 14;
                break;

              case 12:
                _context6.next = 14;
                return (_node8 = this.node).umap.apply(_node8, [this.type].concat((0, _toConsumableArray3.default)(this.keys), [cond, this.opt, function (data) {
                  return _this3.parse(data, cb, broadcast);
                }]));

              case 14:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function fetch() {
        return _ref6.apply(this, arguments);
      }

      return fetch;
    }()
  }, {
    key: "next",
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
        var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
        var start = arguments[1];
        var arr;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                start = (0, _ramda.defaultTo)(this.cursor)(start);
                arr = (0, _ramda.slice)(start - 1, start - 1 + limit)(this.arr);

                this.cursor += arr.length;
                this.fetch(this.last || "0");
                this.isNext = !(0, _ramda.isNil)(this.arr[this.cursor - 1]);
                return _context7.abrupt("return", arr);

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function next() {
        return _ref7.apply(this, arguments);
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
    var namespace = arguments[1];
    (0, _classCallCheck3.default)(this, db);

    this.namespace = namespace;
    this.me = null;
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
    key: "sget",
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(pub) {
        for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          args[_key5 - 1] = arguments[_key5];
        }

        var pair, key_data, dec, rawKey, key, data, iv, mess, tx;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.auth_user.pair();

              case 2:
                pair = _context8.sent;

                if (!(0, _ramda.isNil)(this.users[pub])) {
                  _context8.next = 6;
                  break;
                }

                _context8.next = 6;
                return this._user(pub);

              case 6:
                _context8.next = 8;
                return this.uget.apply(this, [pub, "_share", pair.pub].concat((0, _toConsumableArray3.default)(args)));

              case 8:
                key_data = _context8.sent;
                _context8.t0 = SEA;
                _context8.t1 = key_data;
                _context8.next = 13;
                return SEA.secret(this.pairs[pub], pair);

              case 13:
                _context8.t2 = _context8.sent;
                _context8.next = 16;
                return _context8.t0.decrypt.call(_context8.t0, _context8.t1, _context8.t2);

              case 16:
                dec = _context8.sent;
                rawKey = Buffer.from(dec, "hex").buffer;
                _context8.next = 20;
                return window.crypto.subtle.importKey("raw", rawKey, "AES-GCM", true, ["encrypt", "decrypt"]);

              case 20:
                key = _context8.sent;
                _context8.next = 23;
                return this.uget.apply(this, [pub].concat((0, _toConsumableArray3.default)(args)));

              case 23:
                data = _context8.sent;
                iv = Buffer.from(data.iv, "hex").buffer;
                _context8.t3 = Buffer;
                _context8.next = 28;
                return SEA.verify(data.data, pub);

              case 28:
                _context8.t4 = _context8.sent;
                mess = _context8.t3.from.call(_context8.t3, _context8.t4, "hex").buffer;
                tx = new TextDecoder();
                _context8.t5 = JSON;
                _context8.t6 = tx;
                _context8.next = 35;
                return this.decryptMessage(key, iv, mess);

              case 35:
                _context8.t7 = _context8.sent;
                _context8.t8 = _context8.t6.decode.call(_context8.t6, _context8.t7);
                return _context8.abrupt("return", _context8.t5.parse.call(_context8.t5, _context8.t8));

              case 38:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function sget(_x13) {
        return _ref8.apply(this, arguments);
      }

      return sget;
    }()
  }, {
    key: "share",
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(pub) {
        for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          args[_key6 - 1] = arguments[_key6];
        }

        var item, key, id, pair, msg, hex, enc;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.get.apply(this, (0, _toConsumableArray3.default)(args));

              case 2:
                item = _context9.sent;
                key = item.key;
                id = item.id;
                _context9.next = 7;
                return this.auth_user.pair();

              case 7:
                pair = _context9.sent;
                _context9.next = 10;
                return SEA.verify(key, pair.pub);

              case 10:
                msg = _context9.sent;
                _context9.next = 13;
                return SEA.decrypt(msg, pair);

              case 13:
                hex = _context9.sent;

                if (!(0, _ramda.isNil)(this.users[pub])) {
                  _context9.next = 17;
                  break;
                }

                _context9.next = 17;
                return this._user(pub);

              case 17:
                _context9.t0 = SEA;
                _context9.t1 = hex;
                _context9.next = 21;
                return SEA.secret(this.pairs[pub].epub, pair);

              case 21:
                _context9.t2 = _context9.sent;
                _context9.next = 24;
                return _context9.t0.encrypt.call(_context9.t0, _context9.t1, _context9.t2);

              case 24:
                enc = _context9.sent;
                _context9.next = 27;
                return this.put.apply(this, [enc, "_share", pub].concat((0, _toConsumableArray3.default)(args)));

              case 27:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function share(_x14) {
        return _ref9.apply(this, arguments);
      }

      return share;
    }()
  }, {
    key: "getKey",
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
        var key, rawKey;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this.get("_key", { enc: true, sign: true });

              case 2:
                key = _context10.sent;

                if (!(0, _ramda.isNil)(key)) {
                  _context10.next = 9;
                  break;
                }

                _context10.next = 6;
                return this.createKey();

              case 6:
                return _context10.abrupt("return", _context10.sent);

              case 9:
                rawKey = Buffer.from(key, "hex").buffer;
                _context10.next = 12;
                return window.crypto.subtle.importKey("raw", rawKey, "AES-GCM", true, ["encrypt", "decrypt"]);

              case 12:
                return _context10.abrupt("return", _context10.sent);

              case 13:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function getKey() {
        return _ref10.apply(this, arguments);
      }

      return getKey;
    }()
  }, {
    key: "_buf2hex",
    value: function _buf2hex(buffer) {
      return [].concat((0, _toConsumableArray3.default)(new Uint8Array(buffer))).map(function (x) {
        return x.toString(16).padStart(2, "0");
      }).join("");
    }
  }, {
    key: "createKey",
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
        var key, result, hex;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return window.crypto.subtle.generateKey({
                  name: "AES-GCM",
                  length: 256
                }, true, ["encrypt", "decrypt"]);

              case 2:
                key = _context11.sent;
                _context11.next = 5;
                return window.crypto.subtle.exportKey("raw", key);

              case 5:
                result = _context11.sent;
                hex = this._buf2hex(result);
                _context11.next = 9;
                return this.put(hex, "_key", { enc: true, sign: true });

              case 9:
                return _context11.abrupt("return", key);

              case 10:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function createKey() {
        return _ref11.apply(this, arguments);
      }

      return createKey;
    }()
  }, {
    key: "_user",
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(pub) {
        var _this4 = this;

        var user;
        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                user = this.gun.user(pub);
                _context13.next = 3;
                return new _promise2.default(function (ret) {
                  user.once(function () {
                    var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(_user) {
                      return _regenerator2.default.wrap(function _callee12$(_context12) {
                        while (1) {
                          switch (_context12.prev = _context12.next) {
                            case 0:
                              _this4.pairs[pub] = _user;
                              ret(_user);

                            case 2:
                            case "end":
                              return _context12.stop();
                          }
                        }
                      }, _callee12, _this4);
                    }));

                    return function (_x16) {
                      return _ref13.apply(this, arguments);
                    };
                  }());
                });

              case 3:
                this.users[pub] = user;
                return _context13.abrupt("return", pub);

              case 5:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function _user(_x15) {
        return _ref12.apply(this, arguments);
      }

      return _user;
    }()
  }, {
    key: "_getUser",
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(opt) {
        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                if (!((0, _ramda.both)((0, _ramda.has)("enc"), (0, _ramda.complement)(_ramda.propEq)("enc", true))(opt) && (0, _ramda.isNil)(this.users[opt.enc.pub]))) {
                  _context14.next = 3;
                  break;
                }

                _context14.next = 3;
                return this._user(opt.enc);

              case 3:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function _getUser(_x17) {
        return _ref14.apply(this, arguments);
      }

      return _getUser;
    }()
  }, {
    key: "node",
    value: function node(_node9) {
      for (var _len7 = arguments.length, keys = Array(_len7 > 2 ? _len7 - 2 : 0), _key7 = 2; _key7 < _len7; _key7++) {
        keys[_key7 - 2] = arguments[_key7];
      }

      var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!(0, _ramda.isNil)(this.namespace)) {
        if (opt.hash) {
          keys[0] += "-" + this.namespace;
        } else {
          keys = (0, _ramda.prepend)(this.namespace, keys);
        }
      }
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(keys), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var v = _step.value;
          _node9 = _node9.get(v);
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

      return _node9;
    }
  }, {
    key: "_enc",
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(val, epub, pair) {
        var _pair;

        return _regenerator2.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.t0 = _ramda.defaultTo;
                _context15.next = 3;
                return this.auth_user.pair();

              case 3:
                _context15.t1 = _context15.sent;
                _context15.t2 = (0, _context15.t0)(_context15.t1);
                _context15.t3 = pair;
                _pair = (0, _context15.t2)(_context15.t3);
                _context15.t4 = _pair.epub;
                _context15.t5 = SEA;
                _context15.t6 = val;
                _context15.next = 12;
                return SEA.secret(epub, _pair);

              case 12:
                _context15.t7 = _context15.sent;
                _context15.next = 15;
                return _context15.t5.encrypt.call(_context15.t5, _context15.t6, _context15.t7);

              case 15:
                _context15.t8 = _context15.sent;
                return _context15.abrupt("return", {
                  epub: _context15.t4,
                  data: _context15.t8
                });

              case 17:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function _enc(_x19, _x20, _x21) {
        return _ref15.apply(this, arguments);
      }

      return _enc;
    }()
  }, {
    key: "_dec",
    value: function () {
      var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(val, epub, pair) {
        return _regenerator2.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                if (!(0, _ramda.isNil)(val)) {
                  _context16.next = 4;
                  break;
                }

                _context16.t0 = val;
                _context16.next = 21;
                break;

              case 4:
                _context16.t1 = SEA;
                _context16.t2 = val.data;
                _context16.t3 = SEA;
                _context16.t4 = epub;
                _context16.t5 = _ramda.defaultTo;
                _context16.next = 11;
                return this.auth_user.pair();

              case 11:
                _context16.t6 = _context16.sent;
                _context16.t7 = (0, _context16.t5)(_context16.t6);
                _context16.t8 = pair;
                _context16.t9 = (0, _context16.t7)(_context16.t8);
                _context16.next = 17;
                return _context16.t3.secret.call(_context16.t3, _context16.t4, _context16.t9);

              case 17:
                _context16.t10 = _context16.sent;
                _context16.next = 20;
                return _context16.t1.decrypt.call(_context16.t1, _context16.t2, _context16.t10);

              case 20:
                _context16.t0 = _context16.sent;

              case 21:
                return _context16.abrupt("return", _context16.t0);

              case 22:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function _dec(_x22, _x23, _x24) {
        return _ref16.apply(this, arguments);
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

      var _args18 = this._args(_args),
          _args19 = (0, _slicedToArray3.default)(_args18, 2),
          opt = _args19[0],
          keys = _args19[1];

      return [opt, cb, keys];
    }
  }, {
    key: "gon",
    value: function () {
      var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17() {
        for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
          args[_key8] = arguments[_key8];
        }

        return _regenerator2.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return this._on.apply(this, [{}, this.gun].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context17.abrupt("return", _context17.sent);

              case 3:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function gon() {
        return _ref17.apply(this, arguments);
      }

      return gon;
    }()
  }, {
    key: "gmap",
    value: function () {
      var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18() {
        for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
          args[_key9] = arguments[_key9];
        }

        return _regenerator2.default.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return this._on.apply(this, [{ map: true }, this.gun].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context18.abrupt("return", _context18.sent);

              case 3:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function gmap() {
        return _ref18.apply(this, arguments);
      }

      return gmap;
    }()
  }, {
    key: "gmapon",
    value: function () {
      var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19() {
        for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
          args[_key10] = arguments[_key10];
        }

        return _regenerator2.default.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return this._on.apply(this, [{ map: true, on: true }, this.gun].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context19.abrupt("return", _context19.sent);

              case 3:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function gmapon() {
        return _ref19.apply(this, arguments);
      }

      return gmapon;
    }()
  }, {
    key: "uon",
    value: function () {
      var _ref20 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20(pub) {
        for (var _len11 = arguments.length, args = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
          args[_key11 - 1] = arguments[_key11];
        }

        return _regenerator2.default.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                if (!(0, _ramda.isNil)(this.users[pub])) {
                  _context20.next = 3;
                  break;
                }

                _context20.next = 3;
                return this._user(pub);

              case 3:
                _context20.next = 5;
                return this._on.apply(this, [{}, this.users[pub]].concat((0, _toConsumableArray3.default)(args)));

              case 5:
                return _context20.abrupt("return", _context20.sent);

              case 6:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      function uon(_x25) {
        return _ref20.apply(this, arguments);
      }

      return uon;
    }()
  }, {
    key: "umap",
    value: function () {
      var _ref21 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee21(pub) {
        for (var _len12 = arguments.length, args = Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
          args[_key12 - 1] = arguments[_key12];
        }

        return _regenerator2.default.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                if (!(0, _ramda.isNil)(this.users[pub])) {
                  _context21.next = 3;
                  break;
                }

                _context21.next = 3;
                return this._user(pub);

              case 3:
                _context21.next = 5;
                return this._on.apply(this, [{ map: true }, this.users[pub]].concat((0, _toConsumableArray3.default)(args)));

              case 5:
                return _context21.abrupt("return", _context21.sent);

              case 6:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));

      function umap(_x26) {
        return _ref21.apply(this, arguments);
      }

      return umap;
    }()
  }, {
    key: "umapon",
    value: function () {
      var _ref22 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee22(pub) {
        for (var _len13 = arguments.length, args = Array(_len13 > 1 ? _len13 - 1 : 0), _key13 = 1; _key13 < _len13; _key13++) {
          args[_key13 - 1] = arguments[_key13];
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
                return this._on.apply(this, [{ map: true, on: true }, this.users[pub]].concat((0, _toConsumableArray3.default)(args)));

              case 5:
                return _context22.abrupt("return", _context22.sent);

              case 6:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));

      function umapon(_x27) {
        return _ref22.apply(this, arguments);
      }

      return umapon;
    }()
  }, {
    key: "on",
    value: function () {
      var _ref23 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee23() {
        for (var _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
          args[_key14] = arguments[_key14];
        }

        return _regenerator2.default.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.next = 2;
                return this._on.apply(this, [{ on: true }, this.auth_user].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context23.abrupt("return", _context23.sent);

              case 3:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));

      function on() {
        return _ref23.apply(this, arguments);
      }

      return on;
    }()
  }, {
    key: "map",
    value: function () {
      var _ref24 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee24() {
        for (var _len15 = arguments.length, args = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
          args[_key15] = arguments[_key15];
        }

        return _regenerator2.default.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.next = 2;
                return this._on.apply(this, [{ map: true }, this.auth_user].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context24.abrupt("return", _context24.sent);

              case 3:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }));

      function map() {
        return _ref24.apply(this, arguments);
      }

      return map;
    }()
  }, {
    key: "mapon",
    value: function () {
      var _ref25 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee25() {
        for (var _len16 = arguments.length, args = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
          args[_key16] = arguments[_key16];
        }

        return _regenerator2.default.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.next = 2;
                return this._on.apply(this, [{ map: true, on: true }, this.auth_user].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context25.abrupt("return", _context25.sent);

              case 3:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));

      function mapon() {
        return _ref25.apply(this, arguments);
      }

      return mapon;
    }()
  }, {
    key: "_get",
    value: function () {
      var _ref26 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee28(node) {
        var _this5 = this;

        for (var _len17 = arguments.length, args = Array(_len17 > 1 ? _len17 - 1 : 0), _key17 = 1; _key17 < _len17; _key17++) {
          args[_key17 - 1] = arguments[_key17];
        }

        var _args29, _args30, opt, keys;

        return _regenerator2.default.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                _args29 = this._args(args), _args30 = (0, _slicedToArray3.default)(_args29, 2), opt = _args30[0], keys = _args30[1];
                _context28.next = 3;
                return this._getUser(opt);

              case 3:
                return _context28.abrupt("return", new _promise2.default(function () {
                  var _ref27 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee27(ret) {
                    return _regenerator2.default.wrap(function _callee27$(_context27) {
                      while (1) {
                        switch (_context27.prev = _context27.next) {
                          case 0:
                            _this5.node.apply(_this5, [node, opt].concat((0, _toConsumableArray3.default)(keys))).once(function () {
                              var _ref28 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee26(data) {
                                return _regenerator2.default.wrap(function _callee26$(_context26) {
                                  while (1) {
                                    switch (_context26.prev = _context26.next) {
                                      case 0:
                                        _context26.t0 = ret;
                                        _context26.next = 3;
                                        return _this5._decrypt(data, opt);

                                      case 3:
                                        _context26.t1 = _context26.sent;
                                        (0, _context26.t0)(_context26.t1);

                                      case 5:
                                      case "end":
                                        return _context26.stop();
                                    }
                                  }
                                }, _callee26, _this5);
                              }));

                              return function (_x30) {
                                return _ref28.apply(this, arguments);
                              };
                            }());

                          case 1:
                          case "end":
                            return _context27.stop();
                        }
                      }
                    }, _callee27, _this5);
                  }));

                  return function (_x29) {
                    return _ref27.apply(this, arguments);
                  };
                }()));

              case 4:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this);
      }));

      function _get(_x28) {
        return _ref26.apply(this, arguments);
      }

      return _get;
    }()
  }, {
    key: "decryptMessage",
    value: function () {
      var _ref29 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee29(key, iv, ciphertext) {
        return _regenerator2.default.wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                _context29.next = 2;
                return window.crypto.subtle.decrypt({
                  name: "AES-GCM",
                  iv: iv
                }, key, ciphertext);

              case 2:
                return _context29.abrupt("return", _context29.sent);

              case 3:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, this);
      }));

      function decryptMessage(_x31, _x32, _x33) {
        return _ref29.apply(this, arguments);
      }

      return decryptMessage;
    }()
  }, {
    key: "_decrypt",
    value: function () {
      var _ref30 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee30(data, opt) {
        var tx, pair, msg, key, iv, mess, buf, dec;
        return _regenerator2.default.wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                data = opt.hash ? JSON.parse(data) : data;

                if (!(0, _ramda.isNil)(data)) {
                  _context30.next = 3;
                  break;
                }

                return _context30.abrupt("return", data);

              case 3:
                if (!opt.aes) {
                  _context30.next = 37;
                  break;
                }

                tx = new TextDecoder();
                _context30.next = 7;
                return this.auth_user.pair();

              case 7:
                pair = _context30.sent;
                _context30.next = 10;
                return SEA.verify(data.key, pair.pub);

              case 10:
                msg = _context30.sent;
                _context30.t0 = window.crypto.subtle;
                _context30.t1 = Buffer;
                _context30.next = 15;
                return SEA.decrypt(msg, pair);

              case 15:
                _context30.t2 = _context30.sent;
                _context30.t3 = _context30.t1.from.call(_context30.t1, _context30.t2, "hex").buffer;
                _context30.t4 = ["encrypt", "decrypt"];
                _context30.next = 20;
                return _context30.t0.importKey.call(_context30.t0, "raw", _context30.t3, "AES-GCM", true, _context30.t4);

              case 20:
                key = _context30.sent;
                iv = Buffer.from(data.iv, "hex").buffer;
                _context30.t5 = Buffer;
                _context30.next = 25;
                return SEA.verify(data.data, pair.pub);

              case 25:
                _context30.t6 = _context30.sent;
                mess = _context30.t5.from.call(_context30.t5, _context30.t6, "hex").buffer;
                _context30.next = 29;
                return this.decryptMessage(key, iv, mess);

              case 29:
                buf = _context30.sent;
                _context30.t7 = JSON;
                _context30.t8 = tx;
                _context30.next = 34;
                return this.decryptMessage(key, iv, mess);

              case 34:
                _context30.t9 = _context30.sent;
                _context30.t10 = _context30.t8.decode.call(_context30.t8, _context30.t9);
                data = _context30.t7.parse.call(_context30.t7, _context30.t10);

              case 37:
                if (!opt.sign) {
                  _context30.next = 46;
                  break;
                }

                _context30.t11 = SEA;
                _context30.t12 = data;
                _context30.next = 42;
                return this.auth_user.pair();

              case 42:
                _context30.t13 = _context30.sent;
                _context30.next = 45;
                return _context30.t11.verify.call(_context30.t11, _context30.t12, _context30.t13);

              case 45:
                data = _context30.sent;

              case 46:
                if (!(0, _ramda.propEq)("enc", true)(opt)) {
                  _context30.next = 60;
                  break;
                }

                _context30.t15 = this;
                _context30.t16 = data;
                _context30.t17 = data.epub;

                if (_context30.t17) {
                  _context30.next = 54;
                  break;
                }

                _context30.next = 53;
                return this.auth_user.pair().epub;

              case 53:
                _context30.t17 = _context30.sent;

              case 54:
                _context30.t18 = _context30.t17;
                _context30.next = 57;
                return _context30.t15._dec.call(_context30.t15, _context30.t16, _context30.t18);

              case 57:
                _context30.t14 = _context30.sent;
                _context30.next = 68;
                break;

              case 60:
                if (!(0, _ramda.has)("enc")(opt)) {
                  _context30.next = 66;
                  break;
                }

                _context30.next = 63;
                return this._dec(data, data.epub || this.pairs[opt.enc].epub);

              case 63:
                _context30.t19 = _context30.sent;
                _context30.next = 67;
                break;

              case 66:
                _context30.t19 = data;

              case 67:
                _context30.t14 = _context30.t19;

              case 68:
                dec = _context30.t14;
                return _context30.abrupt("return", dec);

              case 70:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, this);
      }));

      function _decrypt(_x34, _x35) {
        return _ref30.apply(this, arguments);
      }

      return _decrypt;
    }()
  }, {
    key: "_on",
    value: function () {
      var _ref31 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee32(conf, node) {
        var _this6 = this;

        for (var _len18 = arguments.length, args = Array(_len18 > 2 ? _len18 - 2 : 0), _key18 = 2; _key18 < _len18; _key18++) {
          args[_key18 - 2] = arguments[_key18];
        }

        var _onargs2, _onargs3, opt, cb, keys, _node;

        return _regenerator2.default.wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                _onargs2 = this._onargs(args), _onargs3 = (0, _slicedToArray3.default)(_onargs2, 3), opt = _onargs3[0], cb = _onargs3[1], keys = _onargs3[2];

                opt = (0, _ramda.mergeLeft)(conf)(opt);
                _context32.next = 4;
                return this._getUser(opt);

              case 4:
                _node = this.node.apply(this, [node, opt].concat((0, _toConsumableArray3.default)(keys)));

                if (opt.map) _node = _node.map();
                _node[opt.on ? "on" : "once"](function () {
                  var _ref32 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee31(data, key, msg, ev) {
                    return _regenerator2.default.wrap(function _callee31$(_context31) {
                      while (1) {
                        switch (_context31.prev = _context31.next) {
                          case 0:
                            _context31.t0 = cb;
                            _context31.t1 = _ramda.mergeLeft;
                            _context31.t2 = { _key: key };
                            _context31.next = 5;
                            return _this6._decrypt(data, opt);

                          case 5:
                            _context31.t3 = _context31.sent;
                            _context31.t4 = (0, _context31.t1)(_context31.t2, _context31.t3);
                            _context31.t5 = opt.on ? ev.off : null;
                            (0, _context31.t0)(_context31.t4, _context31.t5);

                          case 9:
                          case "end":
                            return _context31.stop();
                        }
                      }
                    }, _callee31, _this6);
                  }));

                  return function (_x38, _x39, _x40, _x41) {
                    return _ref32.apply(this, arguments);
                  };
                }());

              case 7:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32, this);
      }));

      function _on(_x36, _x37) {
        return _ref31.apply(this, arguments);
      }

      return _on;
    }()
  }, {
    key: "gget",
    value: function () {
      var _ref33 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee33() {
        for (var _len19 = arguments.length, args = Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
          args[_key19] = arguments[_key19];
        }

        return _regenerator2.default.wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                _context33.next = 2;
                return this._get.apply(this, [this.gun].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context33.abrupt("return", _context33.sent);

              case 3:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33, this);
      }));

      function gget() {
        return _ref33.apply(this, arguments);
      }

      return gget;
    }()
  }, {
    key: "uget",
    value: function () {
      var _ref34 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee34(pub) {
        for (var _len20 = arguments.length, args = Array(_len20 > 1 ? _len20 - 1 : 0), _key20 = 1; _key20 < _len20; _key20++) {
          args[_key20 - 1] = arguments[_key20];
        }

        return _regenerator2.default.wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                if (!(0, _ramda.isNil)(this.users[pub])) {
                  _context34.next = 3;
                  break;
                }

                _context34.next = 3;
                return this._user(pub);

              case 3:
                _context34.next = 5;
                return this._get.apply(this, [this.users[pub]].concat((0, _toConsumableArray3.default)(args)));

              case 5:
                return _context34.abrupt("return", _context34.sent);

              case 6:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34, this);
      }));

      function uget(_x42) {
        return _ref34.apply(this, arguments);
      }

      return uget;
    }()
  }, {
    key: "get",
    value: function () {
      var _ref35 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee35() {
        for (var _len21 = arguments.length, args = Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
          args[_key21] = arguments[_key21];
        }

        return _regenerator2.default.wrap(function _callee35$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                _context35.next = 2;
                return this._get.apply(this, [this.auth_user].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context35.abrupt("return", _context35.sent);

              case 3:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee35, this);
      }));

      function get() {
        return _ref35.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "genKey",
    value: function () {
      var _ref36 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee36() {
        var iv, key;
        return _regenerator2.default.wrap(function _callee36$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                iv = window.crypto.getRandomValues(new Uint8Array(12));
                _context36.next = 3;
                return window.crypto.subtle.generateKey({
                  name: "AES-GCM",
                  length: 256
                }, true, ["encrypt", "decrypt"]);

              case 3:
                key = _context36.sent;
                return _context36.abrupt("return", { iv: iv, key: key });

              case 5:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee36, this);
      }));

      function genKey() {
        return _ref36.apply(this, arguments);
      }

      return genKey;
    }()
  }, {
    key: "getMessageEncoding",
    value: function getMessageEncoding(mess) {
      var enc = new TextEncoder();
      return enc.encode(mess);
    }
  }, {
    key: "encryptMessage",
    value: function () {
      var _ref37 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee37(key, iv, mess) {
        return _regenerator2.default.wrap(function _callee37$(_context37) {
          while (1) {
            switch (_context37.prev = _context37.next) {
              case 0:
                _context37.next = 2;
                return window.crypto.subtle.encrypt({
                  name: "AES-GCM",
                  iv: iv
                }, key, this.getMessageEncoding(mess));

              case 2:
                return _context37.abrupt("return", _context37.sent);

              case 3:
              case "end":
                return _context37.stop();
            }
          }
        }, _callee37, this);
      }));

      function encryptMessage(_x43, _x44, _x45) {
        return _ref37.apply(this, arguments);
      }

      return encryptMessage;
    }()
  }, {
    key: "_put",
    value: function () {
      var _ref38 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee39(node, val) {
        var _this7 = this;

        for (var _len22 = arguments.length, args = Array(_len22 > 2 ? _len22 - 2 : 0), _key22 = 2; _key22 < _len22; _key22++) {
          args[_key22 - 2] = arguments[_key22];
        }

        var _args43, _args44, opt, keys, enc, _ref39, iv, key, enc2, pair, _data, key_data, hash;

        return _regenerator2.default.wrap(function _callee39$(_context39) {
          while (1) {
            switch (_context39.prev = _context39.next) {
              case 0:
                _args43 = this._args(args), _args44 = (0, _slicedToArray3.default)(_args43, 2), opt = _args44[0], keys = _args44[1];
                _context39.next = 3;
                return this._getUser(opt);

              case 3:
                enc = null;

                if (!(0, _ramda.propEq)("enc", true)(opt)) {
                  _context39.next = 15;
                  break;
                }

                _context39.t1 = this;
                _context39.t2 = val;
                _context39.next = 9;
                return this.auth_user.pair().epub;

              case 9:
                _context39.t3 = _context39.sent;
                _context39.next = 12;
                return _context39.t1._enc.call(_context39.t1, _context39.t2, _context39.t3);

              case 12:
                _context39.t0 = _context39.sent;
                _context39.next = 23;
                break;

              case 15:
                if (!(0, _ramda.has)("enc")(opt)) {
                  _context39.next = 21;
                  break;
                }

                _context39.next = 18;
                return this._enc(val, this.pairs[opt.enc].epub);

              case 18:
                _context39.t4 = _context39.sent;
                _context39.next = 22;
                break;

              case 21:
                _context39.t4 = val;

              case 22:
                _context39.t0 = _context39.t4;

              case 23:
                enc = _context39.t0;

                if (!opt.sign) {
                  _context39.next = 33;
                  break;
                }

                _context39.t5 = SEA;
                _context39.t6 = enc;
                _context39.next = 29;
                return this.auth_user.pair();

              case 29:
                _context39.t7 = _context39.sent;
                _context39.next = 32;
                return _context39.t5.sign.call(_context39.t5, _context39.t6, _context39.t7);

              case 32:
                enc = _context39.sent;

              case 33:
                if (!opt.aes) {
                  _context39.next = 64;
                  break;
                }

                _context39.next = 36;
                return this.genKey();

              case 36:
                _ref39 = _context39.sent;
                iv = _ref39.iv;
                key = _ref39.key;
                _context39.next = 41;
                return this.encryptMessage(key, iv, (0, _stringify2.default)(enc));

              case 41:
                enc2 = _context39.sent;
                _context39.next = 44;
                return this.auth_user.pair();

              case 44:
                pair = _context39.sent;
                _context39.next = 47;
                return SEA.sign(this._buf2hex(enc2), pair);

              case 47:
                _data = _context39.sent;
                _context39.t8 = SEA;
                _context39.t9 = SEA;
                _context39.t10 = this;
                _context39.next = 53;
                return window.crypto.subtle.exportKey("raw", key);

              case 53:
                _context39.t11 = _context39.sent;
                _context39.t12 = _context39.t10._buf2hex.call(_context39.t10, _context39.t11);
                _context39.t13 = pair;
                _context39.next = 58;
                return _context39.t9.encrypt.call(_context39.t9, _context39.t12, _context39.t13);

              case 58:
                _context39.t14 = _context39.sent;
                _context39.t15 = pair;
                _context39.next = 62;
                return _context39.t8.sign.call(_context39.t8, _context39.t14, _context39.t15);

              case 62:
                key_data = _context39.sent;

                enc = {
                  data: _data,
                  id: (0, _ramda.last)(keys),
                  iv: this._buf2hex(iv),
                  key: key_data
                };

              case 64:
                if (!opt.hash) {
                  _context39.next = 70;
                  break;
                }

                _context39.next = 67;
                return SEA.work((0, _stringify2.default)(enc), null, null, { name: "SHA-256" });

              case 67:
                _context39.t16 = _context39.sent;
                _context39.next = 71;
                break;

              case 70:
                _context39.t16 = enc;

              case 71:
                hash = _context39.t16;

                if (opt.hash) {
                  keys[keys.length - 1] += hash;
                  enc = (0, _stringify2.default)(enc);
                }
                return _context39.abrupt("return", new _promise2.default(function () {
                  var _ref40 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee38(ret) {
                    return _regenerator2.default.wrap(function _callee38$(_context38) {
                      while (1) {
                        switch (_context38.prev = _context38.next) {
                          case 0:
                            _this7.node.apply(_this7, [node, opt].concat((0, _toConsumableArray3.default)(keys))).put(enc, function (data) {
                              return ret(data);
                            });

                          case 1:
                          case "end":
                            return _context38.stop();
                        }
                      }
                    }, _callee38, _this7);
                  }));

                  return function (_x48) {
                    return _ref40.apply(this, arguments);
                  };
                }()));

              case 74:
              case "end":
                return _context39.stop();
            }
          }
        }, _callee39, this);
      }));

      function _put(_x46, _x47) {
        return _ref38.apply(this, arguments);
      }

      return _put;
    }()
  }, {
    key: "put",
    value: function () {
      var _ref41 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee40(val) {
        for (var _len23 = arguments.length, args = Array(_len23 > 1 ? _len23 - 1 : 0), _key23 = 1; _key23 < _len23; _key23++) {
          args[_key23 - 1] = arguments[_key23];
        }

        return _regenerator2.default.wrap(function _callee40$(_context40) {
          while (1) {
            switch (_context40.prev = _context40.next) {
              case 0:
                _context40.next = 2;
                return this._put.apply(this, [this.auth_user, val].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context40.abrupt("return", _context40.sent);

              case 3:
              case "end":
                return _context40.stop();
            }
          }
        }, _callee40, this);
      }));

      function put(_x49) {
        return _ref41.apply(this, arguments);
      }

      return put;
    }()
  }, {
    key: "gput",
    value: function () {
      var _ref42 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee41(val) {
        for (var _len24 = arguments.length, args = Array(_len24 > 1 ? _len24 - 1 : 0), _key24 = 1; _key24 < _len24; _key24++) {
          args[_key24 - 1] = arguments[_key24];
        }

        return _regenerator2.default.wrap(function _callee41$(_context41) {
          while (1) {
            switch (_context41.prev = _context41.next) {
              case 0:
                _context41.next = 2;
                return this._put.apply(this, [this.gun, val].concat((0, _toConsumableArray3.default)(args)));

              case 2:
                return _context41.abrupt("return", _context41.sent);

              case 3:
              case "end":
                return _context41.stop();
            }
          }
        }, _callee41, this);
      }));

      function gput(_x50) {
        return _ref42.apply(this, arguments);
      }

      return gput;
    }()
  }, {
    key: "auth",
    value: function () {
      var _ref43 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee44(alias, pass) {
        var _this8 = this;

        var user;
        return _regenerator2.default.wrap(function _callee44$(_context44) {
          while (1) {
            switch (_context44.prev = _context44.next) {
              case 0:
                user = this.gun.user();
                _context44.next = 3;
                return new _promise2.default(function (ret, rej) {
                  user.create(alias, pass, function () {
                    var _ref44 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee43(ack) {
                      return _regenerator2.default.wrap(function _callee43$(_context43) {
                        while (1) {
                          switch (_context43.prev = _context43.next) {
                            case 0:
                              if (!(0, _ramda.isNil)(ack.err)) {
                                user.auth(alias, pass, function () {
                                  var _ref45 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee42(ack) {
                                    return _regenerator2.default.wrap(function _callee42$(_context42) {
                                      while (1) {
                                        switch (_context42.prev = _context42.next) {
                                          case 0:
                                            if (!(0, _ramda.isNil)(ack.err)) {
                                              rej(null);
                                            } else {
                                              ret(true);
                                            }

                                          case 1:
                                          case "end":
                                            return _context42.stop();
                                        }
                                      }
                                    }, _callee42, _this8);
                                  }));

                                  return function (_x54) {
                                    return _ref45.apply(this, arguments);
                                  };
                                }());
                              } else {
                                ret(true);
                              }

                            case 1:
                            case "end":
                              return _context43.stop();
                          }
                        }
                      }, _callee43, _this8);
                    }));

                    return function (_x53) {
                      return _ref44.apply(this, arguments);
                    };
                  }());
                });

              case 3:
                this.me = user.is;
                this.pairs[user.is.pub] = user.is;
                this.users[user.is.pub] = user;
                this.auth_user = user;
                return _context44.abrupt("return", user.is.pub);

              case 8:
              case "end":
                return _context44.stop();
            }
          }
        }, _callee44, this);
      }));

      function auth(_x51, _x52) {
        return _ref43.apply(this, arguments);
      }

      return auth;
    }()
  }, {
    key: "authPair",
    value: function () {
      var _ref46 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee46(pair, alias) {
        var _this9 = this;

        var user;
        return _regenerator2.default.wrap(function _callee46$(_context46) {
          while (1) {
            switch (_context46.prev = _context46.next) {
              case 0:
                user = this.gun.user();
                _context46.next = 3;
                return new _promise2.default(function (ret, rej) {
                  user.auth(pair, function () {
                    var _ref47 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee45(ack) {
                      return _regenerator2.default.wrap(function _callee45$(_context45) {
                        while (1) {
                          switch (_context45.prev = _context45.next) {
                            case 0:
                              if (!(0, _ramda.isNil)(ack.err)) {
                                rej(null);
                              } else {
                                ret(true);
                              }

                            case 1:
                            case "end":
                              return _context45.stop();
                          }
                        }
                      }, _callee45, _this9);
                    }));

                    return function (_x57) {
                      return _ref47.apply(this, arguments);
                    };
                  }());
                });

              case 3:
                if (!(0, _ramda.isNil)(alias)) user.is.alias = alias;
                if (!(0, _ramda.isNil)(pair.alias)) user.is.alias = pair.alias;
                this.me = user.is;
                this.pairs[user.is.pub] = user.is;
                this.users[user.is.pub] = user;
                this.auth_user = user;
                return _context46.abrupt("return", user.is.pub);

              case 10:
              case "end":
                return _context46.stop();
            }
          }
        }, _callee46, this);
      }));

      function authPair(_x55, _x56) {
        return _ref46.apply(this, arguments);
      }

      return authPair;
    }()
  }]);
  return db;
}();

exports.default = db;