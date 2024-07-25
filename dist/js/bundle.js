"use strict";

var _form = _interopRequireDefault(require("./modules/form.js"));
var _menu = _interopRequireDefault(require("./modules/menu.js"));
var _popup = _interopRequireDefault(require("./modules/popup.js"));
var _scrollToAnchor = _interopRequireDefault(require("./modules/scrollToAnchor.js"));
var _slider = _interopRequireDefault(require("./modules/slider.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
window.addEventListener("DOMContentLoaded", function () {
  (0, _slider["default"])(".reviews-swiper");
  (0, _slider["default"])(".articles-swiper");
  (0, _menu["default"])();
  (0, _scrollToAnchor["default"])();
  (0, _popup["default"])(".overlay-popup", "button[data-popup]");
  (0, _popup["default"])(".overlay-popup-review", "button[data-popup-review]");
  (0, _form["default"])(".form__send");
  (0, _form["default"])(".form__review");
  var screenWidth = window.innerWidth;
  gsap.registerPlugin(ScrollTrigger);
  var tl = gsap.timeline({
    paused: "true"
  });
  if (screenWidth > 768) {
    luxy.init();
  }
});
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 * Written by Mineo Okuda on 01/03/18.
 *
 * Mineo Okuda - development + design
 * https://willstyle.co.jp
 * https://github.com/min30327
 *
 * MIT license.
 */

(function (root, factory) {
  "use strict";

  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
    // COMMONJS
    module.exports = factory();
  } else {
    // BROWSER
    root.luxy = factory();
  }
})(void 0, function () {
  "use strict";

  var defaults = {
    wrapper: "#luxy",
    targets: ".luxy-el",
    wrapperSpeed: 0.08,
    targetSpeed: 0.02,
    targetPercentage: 0.1
  };
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
  var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

  /**
   * Merge two or more objects. Returns a new object.
   * @param {Object}   objects  The objects to merge together
   * @returns {Object}          Merged values of defaults and options
   */
  var extend = function extend() {
    // Variables
    var extended = {};
    var deep = false;
    var i = 0;
    var length = arguments.length;

    // Merge the object into the extended object
    var merge = function merge(obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          extended[prop] = obj[prop];
        }
      }
    };

    // Loop through each object and conduct a merge
    for (; i < length; i++) {
      var obj = arguments[i];
      merge(obj);
    }
    return extended;
  };
  var Luxy = function Luxy() {
    this.Targets = [];
    this.TargetsLength = 0;
    this.wrapper = "";
    this.windowHeight = 0;
    this.wapperOffset = 0;
  };
  Luxy.prototype = {
    isAnimate: false,
    isResize: false,
    scrollId: "",
    resizeId: "",
    init: function init(options) {
      this.settings = extend(defaults, options || {});
      this.wrapper = document.querySelector(this.settings.wrapper);
      if (this.wrapper === "undefined") {
        return false;
      }
      this.targets = document.querySelectorAll(this.settings.targets);
      document.body.style.height = this.wrapper.clientHeight + "px";
      this.windowHeight = window.clientHeight;
      this.attachEvent();
      this.apply(this.targets, this.wrapper);
      this.animate();
      this.resize();
    },
    apply: function apply(targets, wrapper) {
      this.wrapperInit();
      this.targetsLength = targets.length;
      for (var i = 0; i < this.targetsLength; i++) {
        var attr = {
          offset: targets[i].getAttribute("data-offset"),
          speedX: targets[i].getAttribute("data-speed-x"),
          speedY: targets[i].getAttribute("data-speed-Y"),
          percentage: targets[i].getAttribute("data-percentage"),
          horizontal: targets[i].getAttribute("data-horizontal")
        };
        this.targetsInit(targets[i], attr);
      }
    },
    wrapperInit: function wrapperInit() {
      this.wrapper.style.width = "100%";
      this.wrapper.style.position = "fixed";
    },
    targetsInit: function targetsInit(elm, attr) {
      this.Targets.push({
        elm: elm,
        offset: attr.offset ? attr.offset : 0,
        horizontal: attr.horizontal ? attr.horizontal : 0,
        top: 0,
        left: 0,
        speedX: attr.speedX ? attr.speedX : 1,
        speedY: attr.speedY ? attr.speedY : 1,
        percentage: attr.percentage ? attr.percentage : 0
      });
    },
    scroll: function scroll() {
      var scrollTopTmp = document.documentElement.scrollTop || document.body.scrollTop;
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      var offsetBottom = this.scrollTop + this.windowHeight;
      this.wrapperUpdate(this.scrollTop);
      for (var i = 0; i < this.Targets.length; i++) {
        this.targetsUpdate(this.Targets[i]);
      }
    },
    animate: function animate() {
      this.scroll();
      this.scrollId = requestAnimationFrame(this.animate.bind(this));
    },
    wrapperUpdate: function wrapperUpdate() {
      this.wapperOffset += (this.scrollTop - this.wapperOffset) * this.settings.wrapperSpeed;
      this.wrapper.style.transform = "translate3d(" + 0 + "," + Math.round(-this.wapperOffset * 100) / 100 + "px ," + 0 + ")";
    },
    targetsUpdate: function targetsUpdate(target) {
      target.top += (this.scrollTop * Number(this.settings.targetSpeed) * Number(target.speedY) - target.top) * this.settings.targetPercentage;
      target.left += (this.scrollTop * Number(this.settings.targetSpeed) * Number(target.speedX) - target.left) * this.settings.targetPercentage;
      var targetOffsetTop = parseInt(target.percentage) - target.top - parseInt(target.offset);
      var offsetY = Math.round(targetOffsetTop * -100) / 100;
      var offsetX = 0;
      if (target.horizontal) {
        var targetOffsetLeft = parseInt(target.percentage) - target.left - parseInt(target.offset);
        offsetX = Math.round(targetOffsetLeft * -100) / 100;
      }
      target.elm.style.transform = "translate3d(" + offsetX + "px ," + offsetY + "px ," + 0 + ")";
    },
    resize: function resize() {
      var self = this;
      self.windowHeight = window.innerHeight || document.documentElement.clientHeight || 0;
      if (parseInt(self.wrapper.clientHeight) != parseInt(document.body.style.height)) {
        document.body.style.height = self.wrapper.clientHeight + "px";
      }
      self.resizeId = requestAnimationFrame(self.resize.bind(self));
    },
    attachEvent: function attachEvent() {
      var self = this;
      window.addEventListener("resize", function () {
        if (!self.isResize) {
          cancelAnimationFrame(self.resizeId);
          cancelAnimationFrame(self.scrollId);
          self.isResize = true;
          setTimeout(function () {
            self.isResize = false;
            self.resizeId = requestAnimationFrame(self.resize.bind(self));
            self.scrollId = requestAnimationFrame(self.animate.bind(self));
          }, 200);
        }
      });
    },
    cancel: function cancel() {
      cancelAnimationFrame(this.resizeId);
      cancelAnimationFrame(this.scrollId);
      this.wrapper.removeAttribute("style");
      for (var i = 0; i < this.Targets.length; i++) {
        this.Targets[i].elm.removeAttribute("style");
      }
      this.wrapper = "";
      this.Targets = [];
      this.windowHeight = 0;
      this.wapperOffset = 0;
      this.isResize = false;
      this.scrollId = "";
      this.resizeId = "";
    }
  };
  var luxy = new Luxy();
  return luxy;
});
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function form(selector) {
  var forms = document.querySelectorAll(selector),
    inputs = document.querySelectorAll("input");
  var message = {
    loading: "Загрузка...",
    success: "Скоро мы с вами свяжемся!",
    failure: "Что-то пошло не так...",
    emptyField: "Пожалуйста, заполните все поля"
  };
  var postData = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url, data) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            document.querySelector(".status").textContent = message.loading;
            return _context.abrupt("return", new Promise(function (resolve) {
              setTimeout(function () {
                resolve(data);
              }, 2000);
            }));
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function postData(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
  var clearInputs = function clearInputs() {
    inputs.forEach(function (input) {
      input.value = "";
    });
  };
  var checkEmptyFields = function checkEmptyFields(formData) {
    var _iterator = _createForOfIteratorHelper(formData.entries()),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
          name = _step$value[0],
          value = _step$value[1];
        if (!value.trim()) {
          return true;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return false;
  };
  forms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      form.querySelector(".form__wrapper").appendChild(statusMessage);
      var formData = new FormData(form);
      if (checkEmptyFields(formData)) {
        statusMessage.textContent = message.emptyField;
        form.querySelectorAll("input, textarea, select").forEach(function (input) {
          input.addEventListener("input", function () {
            if (statusMessage) {
              statusMessage.remove();
            }
          });
        });
        return;
      }
      postData("url/", formData).then(function (res) {
        console.log("Форма отправлена:", res);
        statusMessage.textContent = message.success;
      })["catch"](function (err) {
        console.error("Ошибка:", err);
        statusMessage.textContent = message.failure;
      })["finally"](function () {
        clearInputs();
        setTimeout(function () {
          statusMessage.remove();
        }, 5000);
      });
    });
  });
}
var _default = exports["default"] = form;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _helpers = require("../utils/helpers.js  ");
function menu() {
  var menuBtn = document.querySelector(".btn-burger"),
    overlay = document.querySelector(".overlay"),
    menu = document.querySelector(".header__navigation"),
    menuLink = document.querySelectorAll(".header__menu-link");
  menuBtn.addEventListener("click", function () {
    overlay.classList.toggle("overlay_active");
    menu.classList.toggle("header__navigation_active");
    menuBtn.classList.toggle("btn-burger_open");
    if (menu.classList.contains("header__navigation_active")) {
      (0, _helpers.disableScroll)();
    } else {
      (0, _helpers.enableScroll)();
    }
  });
  var closeMenu = function closeMenu() {
    overlay.classList.remove("overlay_active");
    menu.classList.remove("header__navigation_active");
    menuBtn.classList.remove("btn-burger_open");
    (0, _helpers.enableScroll)();
  };
  overlay.addEventListener("click", closeMenu);
  menuLink.forEach(function (item) {
    item.addEventListener("click", closeMenu);
  });
}
var _default = exports["default"] = menu;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _helpers = require("../utils/helpers.js  ");
function popup(popupSelector, btnsSelector) {
  var popup = document.querySelector(popupSelector),
    buttons = document.querySelectorAll(btnsSelector),
    buttonsClose = popup.querySelectorAll(".btn__close"),
    form = popup.querySelector(".form");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      popup.classList.add("overlay_active");
      (0, _helpers.disableScroll)();
    });
  });
  buttonsClose.forEach(function (btn) {
    btn.addEventListener("click", function () {
      closePopup();
    });
  });
  popup.addEventListener("click", function (e) {
    if (!form.contains(e.target)) {
      closePopup();
    }
  });
  function closePopup() {
    popup.classList.remove("overlay_active");
    (0, _helpers.enableScroll)();
  }
}
var _default = exports["default"] = popup;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function scrollToAnchor() {
  var links = document.querySelectorAll('[href^="#"]'),
    speed = 0.3;
  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var widthTop = document.documentElement.scrollTop,
        hash = this.hash,
        toBlock = document.querySelector(hash).getBoundingClientRect().top,
        start = null;
      requestAnimationFrame(step);
      function step(time) {
        if (start === null) {
          start = time;
        }
        var progress = time - start,
          r = toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock);
        document.documentElement.scrollTo(0, r);
        if (r != widthTop + toBlock) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      }
    });
  });
}
var _default = exports["default"] = scrollToAnchor;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function slider(selector) {
  var swiper = new Swiper(selector, {
    slidesPerView: "auto",
    spaceBetween: 25,
    mousewheel: true,
    keyboard: true,
    pagination: {
      el: ".swiper-pagination"
    }
  });
}
var _default = exports["default"] = slider;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disableScroll = disableScroll;
exports.enableScroll = enableScroll;
function disableScroll() {
  var scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = scrollBarWidth + "px";
  document.body.style.overflow = "hidden";
}
function enableScroll() {
  document.body.style.paddingRight = "";
  document.body.style.overflow = "auto";
}