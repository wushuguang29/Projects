(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"xy_xm","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!*****************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/utils/navTo.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.param = param;exports.togo = void 0;var togo = function togo(url, data) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);

  uni.navigateTo({
    url: url });

};exports.togo = togo;

function param(data) {
  var url = '';
  for (var k in data) {
    var value = data[k] !== undefined ? data[k] : '';
    url += '&' + k + '=' + encodeURIComponent(value);
  }
  return url ? url.substring(1) : '';
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 12:
/*!*******************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/utils/request.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _config = _interopRequireDefault(__webpack_require__(/*! ../api/config.js */ 13));
var _navTo = _interopRequireDefault(__webpack_require__(/*! @/utils/navTo */ 11));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

//  公共的方法

var baseUrl = _config.default.host; // 请求地址
var $ajax = {

  get: function get(_ref)



  {var url = _ref.url,param = _ref.param,header = _ref.header;
    return new Promise(function (resolve, reject) {var _uni$request;
      console.log("ssss");
      var myData = uni.getStorageSync('userToken');
      myData = JSON.stringify(myData);
      uni.request((_uni$request = {
        url: baseUrl + url,
        data: param,
        method: "GET",
        dataType: 'json',
        header: {
          'Authorization': uni.getStorageSync('userToken') } }, _defineProperty(_uni$request, "header",

      {
        'Authorization': myData }), _defineProperty(_uni$request, "success",

      function success(res) {
        if (res.statusCode !== 200) {
          reject(res);
        } else {
          if (res.data.code == 40003 || res.data.code == 40002) {
            uni.redirectTo({
              url: '/pages/index/login?storeUrl=' + param.storeUrl });

            uni.showToast({
              title: '请先登录',
              duration: 2000,
              icon: "none" });

          } else if (res.data.code == 49001) {
            uni.redirectTo({
              url: '/pages/index/updatePhone?storeUrl=' + param.storeUrl });

            uni.showToast({
              title: '请先绑定手机号',
              duration: 2000,
              icon: "none" });

          }
          resolve(res);
        }
      }), _defineProperty(_uni$request, "fail",
      function fail(err) {
        reject(err);
      }), _uni$request));

    });
  },
  post: function post(_ref2)



  {var url = _ref2.url,data = _ref2.data,header = _ref2.header;
    return new Promise(function (resolve, reject) {
      uni.request({
        url: baseUrl + url,
        data: data,
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': uni.getStorageSync('userToken') },

        success: function success(res) {

          if (res.statusCode !== 200) {
            reject(res);
          } else {
            if (res.data.code == 40003) {
              uni.navigateTo({
                url: '/pages/index/login' });

              uni.showToast({
                title: '请先登录',
                duration: 2000,
                icon: "none" });

            } else if (res.data.code == 49001) {
              uni.navigateTo({
                url: '/pages/index/updatePhone' });

              uni.showToast({
                title: '请先绑定手机号',
                duration: 2000,
                icon: "none" });

            }
            resolve(res);
          }
        },
        fail: function fail(err) {
          reject(err);
        } });

    });
  },
  postJSON: function postJSON(_ref3)



  {var url = _ref3.url,data = _ref3.data,header = _ref3.header;
    return new Promise(function (resolve, reject) {
      uni.request({
        url: baseUrl + url,
        data: data,
        method: "POST",
        header: {
          'Content-Type': 'application/json;charset=UTF-8' },

        success: function success(res) {
          if (res.statusCode !== 200) {
            reject(res);
          } else {
            resolve(res);
          }
        },
        fail: function fail(err) {
          reject(err);
        } });

    });
  },
  upImg: function upImg(_ref4)


  {var url = _ref4.url,imgUrl = _ref4.imgUrl;
    return new Promise(function (resolve, reject) {
      uni.uploadFile({
        url: "baseUrl" + url,
        filePath: imgUrl,
        name: 'file',
        success: function success(uploadFileRes) {
          resolve(uploadFileRes);
        },

        fail: function fail(err) {
          reject(err);
        } });

    });
  } };var _default =


$ajax;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 13:
/*!****************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/api/config.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {
var host = "http://192.168.0.18/xykfpd_back/public";
var app = {
  apiUrl: host, //请求的地址
  baseRequest: function baseRequest(obj) {
    try {
      var userToken = uni.getStorageSync('userToken');
      if (userToken) {
        if (obj.header) {
          obj.header["Authorization"] = userToken;
        } else {
          obj.header = {
            "Authorization": userToken };

        }
        console.log("1111111");
        obj.url = this.apiUrl + obj.url;
        uni.request(obj);
      } else {
        console.log("获取不到userToken");

      }
    } catch (e) {
      console.log(e);
      console.log("获取不到userToken");
    }
  } };


module.exports = {
  host: host, app: app };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!*********************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 15));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 16));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 20));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 21));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 25));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 26));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 27));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 28));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 29));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 30));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 31));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 18));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 17));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 32));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 19));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 33));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 34));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 35));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 36));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 37));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 38);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 39));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 40));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 41));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 42));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, colorToRgba: _colorGradient.default.colorToRgba, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get,
  post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


// $u挂载到uni对象上
uni.$u = $u;

var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 15:
/*!********************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/mixin/mixin.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    },
    getParentData: function getParentData() {var _this2 = this;var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = false;
      // 这里的本质原理是，通过获取父组件实例(也即u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this2.parentData[key] = _this2.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation();
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {var _this3 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this3) {
          childrenList.splice(index, 1);
        }
      });
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 16:
/*!**********************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/request/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 17));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(function () {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.config.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              // if(response.errMsg) {
              // 	uni.showModal({
              // 		title: response.errMsg
              // 	});
              // }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
      // 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
      // 	return new Promise(()=>{});
      // })
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 17:
/*!***************************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/function/deepMerge.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),

/***/ 18:
/*!***************************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/function/deepClone.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),

/***/ 19:
/*!**********************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/function/test.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),

/***/ 196:
/*!************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/static/bottom_us1.png ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNDREE2MDcyNDhDQjExRUJBQUU1ODQ0NDBFMkJFQzY3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNDREE2MDczNDhDQjExRUJBQUU1ODQ0NDBFMkJFQzY3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0NEQTYwNzA0OENCMTFFQkFBRTU4NDQ0MEUyQkVDNjciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0NEQTYwNzE0OENCMTFFQkFBRTU4NDQ0MEUyQkVDNjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4I4VIiAAACsklEQVR42tSYT0gUURzH36yrYKSmlh0CrUDLDmF0kIhEROqgFUQFFUge1NIuURBLhGAdAj2phRuVQlhQFxGCgg518iR1EioIki5hWoYZCDJ9f/ENtmXdfTPz3jr7g89l5/357Mx7v3m/ceLxuAoY1eA0aAS1YAtYAV/Ia/AUfAwySTRA3z3gNmgFTtK1ArCbNIOb4Dm4Bmb8TBbxKXkFvANHU0imCod/SPpczYaoTHgPDIB8H/NJn36O4dgUvQU6VPDo4FhWRI+AmDIXMY5pVFQ23aDXx6WxjAZ1N7Su6ElQo8xHDcc2Jtqm7EWbKdF8JnNb0aiTQSKaj6fQomihzrLSEa1Q9qPChGheFkSjJkQXsiA6b0L0A1i1KLnKOQKLLoFpi6LTnMNIHn1sUfSJyYQ/Cr5bkPzBsY2J/gQ3LIjKmIumT093wTODkjLWHRvHPBecB1MGJKc4lmvr4LwMDoOJAJITHGPZds0kqeQEOAs+eegnbc+x75LXSf0Wdy7TipTH7eAF+JWinfz2km1qmeZcPxPqnK7LQTfYxdp8BHzlNanfx4icCapAKa9JOvu8xlttK+jiqek9N+p8ENFDvHPbEn67zMJMduzvpFdhpqUgR7oecB1sSvhdpE+l26jpHr2swVdJkhIlLHnlK8gQ2J9hnAjbDLFPf5Kk4hxvwBmvd1RSx8MMxVwZuETkMb8Fs+Abr28GlWBfwnLIVEk8AhvAAx3RFnDfY8UpIk0G8qusc/kYNgcm0z16+eA1nqXDcjpZubM71xL916BErX8UM5XlpRLtBPUqPFHPDPGfaBHoU+GLXrAxUfQCd2nYoow59q+ocFGFNyT9OSJ5EOwIseh2cEBEj6nwx3ERbcgB0QYR3ZsDonURvq7CHnMiOpwDosNRHrtcpoHKkAnO8kYO/BFgAHvzddg1b0HMAAAAAElFTkSuQmCC"

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"xy_xm","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"xy_xm","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"xy_xm","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"xy_xm","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!*****************************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/function/queryParams.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 21:
/*!***********************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/function/route.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 22));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 并且带有路由拦截功能
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */var

Router = /*#__PURE__*/function () {
  function Router() {_classCallCheck(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1, // navigateBack页面后退时,回退的层数
      params: {}, // 传递的参数
      animationType: 'pop-in', // 窗口动画,只在APP有效
      animationDuration: 300, // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  _createClass(Router, [{ key: "addRootPath", value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, { key: "mixinParam", value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&" + query;
      } else {
        // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
        query = uni.$u.queryParams(params);
        return url += query;
      }
    }

    // 对外的方法名称
  }, { key: "route", value: function () {var _route = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var options,params,mergeConfig,isNext,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};

                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepClone(options, this.config);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {_context.next = 14;break;}_context.next = 10;return (

                  new Promise(function (resolve, reject) {
                    uni.$u.routeIntercept(mergeConfig, resolve);
                  }));case 10:isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);_context.next = 15;break;case 14:

                this.openPage(mergeConfig);case 15:case "end":return _context.stop();}}}, _callee, this);}));function route() {return _route.apply(this, arguments);}return route;}()



    // 执行路由跳转
  }, { key: "openPage", value: function openPage(config) {
      // 解构参数
      var
      url =




      config.url,type = config.type,delta = config.delta,animationType = config.animationType,animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration });

      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url });

      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url });

      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url });

      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta });

      }
    } }]);return Router;}();var _default =


new Router().route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 211:
/*!*********************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/util/emitter.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 递归使用 call 方式this指向
                                                                                                      * @param componentName // 需要找的组件的名称
                                                                                                      * @param eventName // 事件名称
                                                                                                      * @param params // 需要传递的参数
                                                                                                      */
function _broadcast(componentName, eventName, params) {
  // 循环子节点找到名称一样的子节点 否则 递归 当前子节点
  this.$children.map(function (child) {
    if (componentName === child.$options.name) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}var _default =
{
  methods: {
    /**
              * 派发 (向上查找) (一个)
              * @param componentName // 需要找的组件的名称
              * @param eventName // 事件名称
              * @param params // 需要传递的参数
              */
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root; //$parent 找到最近的父节点 $root 根节点
      var name = parent.$options.name; // 获取当前组件实例的name
      // 如果当前有节点 && 当前没名称 且 当前名称等于需要传进来的名称的时候就去查找当前的节点
      // 循环出当前名称的一样的组件实例
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      // 有节点表示当前找到了name一样的实例
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    /**
        * 广播 (向下查找) (广播多个)
        * @param componentName // 需要找的组件的名称
        * @param eventName // 事件名称
        * @param params // 需要传递的参数
        */
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    } } };exports.default = _default;

/***/ }),

/***/ 212:
/*!*****************************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/util/async-validator.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/* eslint no-console:0 */
var formatRegExp = /%[sdj%]/g;
var warning = function warning() {}; // don't print warning message when in production env or node runtime

if (typeof process !== 'undefined' && Object({"NODE_ENV":"development","VUE_APP_NAME":"xy_xm","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}) && "development" !== 'production' && typeof window !==
'undefined' && typeof document !== 'undefined') {
  warning = function warning(type, errors) {
    if (typeof console !== 'undefined' && console.warn) {
      if (errors.every(function (e) {
        return typeof e === 'string';
      })) {
        console.warn(type, errors);
      }
    }
  };
}

function convertFieldsError(errors) {
  if (!errors || !errors.length) return null;
  var fields = {};
  errors.forEach(function (error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}

function format() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var i = 1;
  var f = args[0];
  var len = args.length;

  if (typeof f === 'function') {
    return f.apply(null, args.slice(1));
  }

  if (typeof f === 'string') {
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%';
      }

      if (i >= len) {
        return x;
      }

      switch (x) {
        case '%s':
          return String(args[i++]);

        case '%d':
          return Number(args[i++]);

        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }

          break;

        default:
          return x;}

    });

    for (var arg = args[i]; i < len; arg = args[++i]) {
      str += " " + arg;
    }

    return str;
  }

  return f;
}

function isNativeStringType(type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'pattern';
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }

  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }

  return false;
}

function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;

  function count(errors) {
    results.push.apply(results, errors);
    total++;

    if (total === arrLength) {
      callback(results);
    }
  }

  arr.forEach(function (a) {
    func(a, count);
  });
}

function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;

  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }

    var original = index;
    index = index + 1;

    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }

  next([]);
}

function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k]);
  });
  return ret;
}

function asyncMap(objArr, option, func, callback) {
  if (option.first) {
    var _pending = new Promise(function (resolve, reject) {
      var next = function next(errors) {
        callback(errors);
        return errors.length ? reject({
          errors: errors,
          fields: convertFieldsError(errors) }) :
        resolve();
      };

      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });

    _pending["catch"](function (e) {
      return e;
    });

    return _pending;
  }

  var firstFields = option.firstFields || [];

  if (firstFields === true) {
    firstFields = Object.keys(objArr);
  }

  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function (resolve, reject) {
    var next = function next(errors) {
      results.push.apply(results, errors);
      total++;

      if (total === objArrLength) {
        callback(results);
        return results.length ? reject({
          errors: results,
          fields: convertFieldsError(results) }) :
        resolve();
      }
    };

    if (!objArrKeys.length) {
      callback(results);
      resolve();
    }

    objArrKeys.forEach(function (key) {
      var arr = objArr[key];

      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function (e) {
    return e;
  });
  return pending;
}

function complementError(rule) {
  return function (oe) {
    if (oe && oe.message) {
      oe.field = oe.field || rule.fullField;
      return oe;
    }

    return {
      message: typeof oe === 'function' ? oe() : oe,
      field: oe.field || rule.fullField };

  };
}

function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];

        if (typeof value === 'object' && typeof target[s] === 'object') {
          target[s] = _extends({}, target[s], {}, value);
        } else {
          target[s] = value;
        }
      }
    }
  }

  return target;
}

/**
   *  Rule for validating required fields.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function required(rule, value, source, errors, options, type) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
}

/**
   *  Rule for validating whitespace.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
}

/* eslint max-len:0 */

var pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  url: new RegExp(
  "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
  'i'),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i };

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function _float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }

    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear ===
    'function';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }

    // 修改源码，将字符串数值先转为数值
    return typeof +value === 'number';
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern.hex);
  } };

/**
        *  Rule for validating the type of a value.
        *
        *  @param rule The validation rule.
        *  @param value The value of the field on the source object.
        *  @param source The source object being validated.
        *  @param errors An array of errors that this rule may add
        *  validation errors to.
        *  @param options The validation options.
        *  @param options.messages The validation messages.
        */

function type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    required(rule, value, source, errors, options);
    return;
  }

  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
  var ruleType = rule.type;

  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    } // straight typeof check

  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
}

/**
   *  Rule for validating minimum and maximum allowed values.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number';
  var min = typeof rule.min === 'number';
  var max = typeof rule.max === 'number'; // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）

  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === 'number';
  var str = typeof value === 'string';
  var arr = Array.isArray(value);

  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  } // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type


  if (!key) {
    return false;
  }

  if (arr) {
    val = value.length;
  }

  if (str) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".lenght !== 3
    val = value.replace(spRegexp, '_').length;
  }

  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
}

var ENUM = 'enum';
/**
                    *  Rule for validating a value exists in an enumerable list.
                    *
                    *  @param rule The validation rule.
                    *  @param value The value of the field on the source object.
                    *  @param source The source object being validated.
                    *  @param errors An array of errors that this rule may add
                    *  validation errors to.
                    *  @param options The validation options.
                    *  @param options.messages The validation messages.
                    */

function enumerable(rule, value, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];

  if (rule[ENUM].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
  }
}

/**
   *  Rule for validating a regular expression pattern.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$1(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;

      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern);

      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
}

var rules = {
  required: required,
  whitespace: whitespace,
  type: type,
  range: range,
  "enum": enumerable,
  pattern: pattern$1 };


/**
                         *  Performs validation for string types.
                         *
                         *  @param rule The validation rule.
                         *  @param value The value of the field on the source object.
                         *  @param callback The callback function.
                         *  @param source The source object being validated.
                         *  @param options The validation options.
                         *  @param options.messages The validation messages.
                         */

function string(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'string');

    if (!isEmptyValue(value, 'string')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);

      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }

  callback(errors);
}

/**
   *  Validates a function.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function method(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function number(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (value === '') {
      value = undefined;
    }

    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a boolean.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function _boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates the regular expression type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function regexp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is an integer.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function integer(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is a floating point number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function floatFn(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an array.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function array(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'array') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'array');

    if (!isEmptyValue(value, 'array')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an object.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

var ENUM$1 = 'enum';
/**
                      *  Validates an enumerable list.
                      *
                      *  @param rule The validation rule.
                      *  @param value The value of the field on the source object.
                      *  @param callback The callback function.
                      *  @param source The source object being validated.
                      *  @param options The validation options.
                      *  @param options.messages The validation messages.
                      */

function enumerable$1(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules[ENUM$1](rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a regular expression pattern.
   *
   *  Performs validation when a rule only contains
   *  a pattern property but is not declared as a string type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value, 'string')) {
      rules.pattern(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

function date(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      var dateObject;

      if (typeof value === 'number') {
        dateObject = new Date(value);
      } else {
        dateObject = value;
      }

      rules.type(rule, dateObject, source, errors, options);

      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }

  callback(errors);
}

function required$1(rule, value, callback, source, options) {
  var errors = [];
  var type = Array.isArray(value) ? 'array' : typeof value;
  rules.required(rule, value, source, errors, options, type);
  callback(errors);
}

function type$1(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, ruleType);

    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Performs validation for any type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function any(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);
  }

  callback(errors);
}

var validators = {
  string: string,
  method: method,
  number: number,
  "boolean": _boolean,
  regexp: regexp,
  integer: integer,
  "float": floatFn,
  array: array,
  object: object,
  "enum": enumerable$1,
  pattern: pattern$2,
  date: date,
  url: type$1,
  hex: type$1,
  email: type$1,
  required: required$1,
  any: any };


function newMessages() {
  return {
    "default": 'Validation error on field %s',
    required: '%s is required',
    "enum": '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid' },

    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      "boolean": '%s is not a %s',
      integer: '%s is not an %s',
      "float": '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s' },

    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters' },

    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s' },

    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length' },

    pattern: {
      mismatch: '%s value %s does not match pattern %s' },

    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    } };

}
var messages = newMessages();

/**
                               *  Encapsulates a validation schema.
                               *
                               *  @param descriptor An object declaring validation rules
                               *  for this schema.
                               */

function Schema(descriptor) {
  this.rules = null;
  this._messages = messages;
  this.define(descriptor);
}

Schema.prototype = {
  messages: function messages(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }

    return this._messages;
  },
  define: function define(rules) {
    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }

    if (typeof rules !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }

    this.rules = {};
    var z;
    var item;

    for (z in rules) {
      if (rules.hasOwnProperty(z)) {
        item = rules[z];
        this.rules[z] = Array.isArray(item) ? item : [item];
      }
    }
  },
  validate: function validate(source_, o, oc) {
    var _this = this;

    if (o === void 0) {
      o = {};
    }

    if (oc === void 0) {
      oc = function oc() {};
    }

    var source = source_;
    var options = o;
    var callback = oc;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback();
      }

      return Promise.resolve();
    }

    function complete(results) {
      var i;
      var errors = [];
      var fields = {};

      function add(e) {
        if (Array.isArray(e)) {
          var _errors;

          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }

      for (i = 0; i < results.length; i++) {
        add(results[i]);
      }

      if (!errors.length) {
        errors = null;
        fields = null;
      } else {
        fields = convertFieldsError(errors);
      }

      callback(errors, fields);
    }

    if (options.messages) {
      var messages$1 = this.messages();

      if (messages$1 === messages) {
        messages$1 = newMessages();
      }

      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }

    var arr;
    var value;
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function (z) {
      arr = _this.rules[z];
      value = source[z];
      arr.forEach(function (r) {
        var rule = r;

        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = _extends({}, source);
          }

          value = source[z] = rule.transform(value);
        }

        if (typeof rule === 'function') {
          rule = {
            validator: rule };

        } else {
          rule = _extends({}, rule);
        }

        rule.validator = _this.getValidationMethod(rule);
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this.getType(rule);

        if (!rule.validator) {
          return;
        }

        series[z] = series[z] || [];
        series[z].push({
          rule: rule,
          value: value,
          source: source,
          field: z });

      });
    });
    var errorFields = {};
    return asyncMap(series, options, function (data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === 'object' || rule.type === 'array') && (typeof rule.fields === 'object' || typeof rule.defaultField ===
      'object');
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;

      function addFullfield(key, schema) {
        return _extends({}, schema, {
          fullField: rule.fullField + "." + key });

      }

      function cb(e) {
        if (e === void 0) {
          e = [];
        }

        var errors = e;

        if (!Array.isArray(errors)) {
          errors = [errors];
        }

        if (!options.suppressWarning && errors.length) {
          Schema.warning('async-validator:', errors);
        }

        if (errors.length && rule.message) {
          errors = [].concat(rule.message);
        }

        errors = errors.map(complementError(rule));

        if (options.first && errors.length) {
          errorFields[rule.field] = 1;
          return doIt(errors);
        }

        if (!deep) {
          doIt(errors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message) {
              errors = [].concat(rule.message).map(complementError(rule));
            } else if (options.error) {
              errors = [options.error(rule, format(options.messages.required, rule.field))];
            } else {
              errors = [];
            }

            return doIt(errors);
          }

          var fieldsSchema = {};

          if (rule.defaultField) {
            for (var k in data.value) {
              if (data.value.hasOwnProperty(k)) {
                fieldsSchema[k] = rule.defaultField;
              }
            }
          }

          fieldsSchema = _extends({}, fieldsSchema, {}, data.rule.fields);

          for (var f in fieldsSchema) {
            if (fieldsSchema.hasOwnProperty(f)) {
              var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
              fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
            }
          }

          var schema = new Schema(fieldsSchema);
          schema.messages(options.messages);

          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }

          schema.validate(data.value, data.rule.options || options, function (errs) {
            var finalErrors = [];

            if (errors && errors.length) {
              finalErrors.push.apply(finalErrors, errors);
            }

            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }

            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }

      var res;

      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        res = rule.validator(rule, data.value, cb, data.source, options);

        if (res === true) {
          cb();
        } else if (res === false) {
          cb(rule.message || rule.field + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }

      if (res && res.then) {
        res.then(function () {
          return cb();
        }, function (e) {
          return cb(e);
        });
      }
    }, function (results) {
      complete(results);
    });
  },
  getType: function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }

    if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format('Unknown rule type %s', rule.type));
    }

    return rule.type || 'string';
  },
  getValidationMethod: function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }

    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf('message');

    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }

    if (keys.length === 1 && keys[0] === 'required') {
      return validators.required;
    }

    return validators[this.getType(rule)] || false;
  } };


Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }

  validators[type] = validator;
};

Schema.warning = warning;
Schema.messages = messages;var _default =

Schema;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/node-libs-browser/mock/process.js */ 213)))

/***/ }),

/***/ 213:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 214);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 214:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 213)))

/***/ }),

/***/ 22:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 23);

/***/ }),

/***/ 23:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 24);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 24:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 25:
/*!****************************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/function/timeFormat.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(dateTime);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 26:
/*!**************************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/function/timeFrom.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 25));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var timestamp = +new Date(Number(dateTime));

  var timer = (Number(new Date()) - timestamp) / 1000;
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),

/***/ 27:
/*!*******************************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/function/colorGradient.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}


/**
  * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
  * sHex为传入的十六进制的色值
  * alpha为rgba的透明度
  */
function colorToRgba(color) {var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i3, _i3 + 2)));
    }
    // return sColorChange.join(',')
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
  } else
  {
    return sColor;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba };exports.default = _default;

/***/ }),

/***/ 28:
/*!**********************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/function/guid.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 29:
/*!***********************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/function/color.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!***************************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/function/type2icon.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 31:
/*!*****************************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/function/randomArray.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 32:
/*!*************************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/function/addUnit.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),

/***/ 33:
/*!************************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/function/random.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 34:
/*!**********************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/function/trim.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 35:
/*!***********************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/function/toast.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 36:
/*!***************************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/function/getParent.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),

/***/ 37:
/*!*************************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/function/$parent.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),

/***/ 38:
/*!*********************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/function/sys.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 39:
/*!**************************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/function/debounce.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         * 
                                                                                                                         * @param {Function} func 要执行的回调函数 
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),

/***/ 4:
/*!*************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/pages.json ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!**************************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/function/throttle.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * 节流原理：在一定时间内，只能触发一次
                                                                                                                      * 
                                                                                                                      * @param {Function} func 要执行的回调函数 
                                                                                                                      * @param {Number} wait 延时的时间
                                                                                                                      * @param {Boolean} immediate 是否立即执行
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),

/***/ 41:
/*!**********************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/config/config.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-12-17
var version = '1.8.3';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),

/***/ 42:
/*!**********************************************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/node_modules/uview-ui/libs/config/zIndex.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),

/***/ 43:
/*!*********************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/src/store/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 44));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
_vue.default.use(_vuex.default);
var store = new _vuex.default.Store({
  state: {
    myDataGlobal: {} },

  mutations: {
    //向myDataGlobal中填新值
    addData: function addData(state, dataGlo) {
      console.log("ssdd", state, dataGlo);
      state.myDataGlobal = dataGlo;
    } },

  actions: {} });var _default =



store;exports.default = _default;

/***/ }),

/***/ 44:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 51:
/*!*********************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/static/home_bg.png ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAzwAAAFDCAIAAABwf5yEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI4MUNBMzhDNDhDQjExRUJCNDYyRTE5OTAyRDQ1NkE0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI4MUNBMzhENDhDQjExRUJCNDYyRTE5OTAyRDQ1NkE0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjgxQ0EzOEE0OENCMTFFQkI0NjJFMTk5MDJENDU2QTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjgxQ0EzOEI0OENCMTFFQkI0NjJFMTk5MDJENDU2QTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz41cPJYAABpYUlEQVR42uy9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"

/***/ }),

/***/ 60:
/*!*******************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/static/my_bg.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/my_bg.png";

/***/ }),

/***/ 85:
/*!********************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/static/logokf.png ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/logokf.png";

/***/ }),

/***/ 86:
/*!*****************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/static/vxt.jpg ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAHYAfQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooxRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUgpaACiikoAWiijFABRRRQAUUYooAKKKKACiikoAWigUUAFFFFACUtFFABRRRQAUUZooAKKKKACikpaACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKM0AFFJmjcBQAtJVW41G1tlJkmQY9656/8faNZEr56uw7A5NS5xW7M51YR3Z1lJmvMrn4pKzFbOzkk9OKy5vHPiK6J8m08oH+8awliqcd2czx1Jbanr5cDqRTfPjXrIo/GvFpNa8UXH3rpI/oartJr0vL6sw+mayePpozeP7RZ7ebqD/nqv50n2yD/AJ6p+deHfZtVb72sTfgP/r0n2XU/+gxP+v8AjU/2hAPr0v5D3QXMJ6SL+dOEqHo4P414WI9ZT7usSfiKlS78RwnKakG9jTWPgCxz6xZ7iGB706vFovE3im27pKB71fg+I2r22PtWnuR3KnP9K0jjKT6lrH0+qaPWaWvPbP4o6fIQtxG8R75HSulsfFek34Hk3UZz23Ct41YS2ZvHE05bM3aKhiuIpQCkit9DUuRWhsncWijNFAwooooASloooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBKWiigBKKWigAooooAKKSloAKKKKACikpaACiikoAWikzUM9zFbxl5XCgetAm7K7JiahmuobdC0siqB6muH174jWlmzW9kDPP0AXnmuKu7zXNdYveXJt4D/yzU81y1cXCBx1MZGOkNWehax8QdL07ckcglkH8Kc1x174317VWIs7cQRn+N+KzrfTLW25WPc/dn5NXK82pjpy0iccqtWp8TsZslle3x3ahfyyZ6qp4qSHSrOH7sIJ9W5q8OaXFckqk5bsz9mt2MCKowqgD0ApcU7FAFQaJDcUtOxRigLDfwop2KMUBYbRS4oxQAmKQinYpKBWIZLeGUYkiRvqKpyaNasd0ZeJvVGrSoqlKS2ZLimUre417TGBtL4zKP4JK6DT/iVd2rCPVLVl/wBoDIrLprorjDqGHoRXRTxdSHUcXODvCR6XpXi3S9UUeTcJu9Ca3VkVwCpBHtXg8mkRb/Mtna3lHIKHjNaOn+K9c0Fgtxm6tx/EvXFd9LHxlpI6YY2UXaovme00orldC8b6brCBRKEl7q3BrqEdXXcpyDXfGSkro74VIVFeLHUUlLVFhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRSUUALRRRQAUUUUAFFFFABRRQaACkJABJNRzTJAheRgqjua848UePXaZrDSP3kx4LDtWdSpGCuzGtXhSV5HS+IfGFhokJDSK83ZAea801DWNY8SyEyO1taHoo6sKgg05nmNzfSGe4POWOQtaGK8evjHPSJ5lSpOtvoita2EFmv7tBu7sepq1S4o/CuJu+4opLYMUUoFOApFDcUuKdigCgLDcUYp+KMUANwKMCnYFGBQMbijFOxRigBmKMU7FJQKw3FJT8UlADSKSnEUYoFYbSU7FJTCwlJinUlAjPudKilfzYiYZhyHTjmtXR/GeqaDIsOoqZrfOPMFRU10V1KuoZT1BranXlTehCTi7wdj1XSNesdXt1kt5kbPYGtUV4NHDd6RcfatKlZSOWizwa9B8LeOoNUAtrv91crgEN3NevQxUamnU76OMUnyVNGdzRTUdWXKnI9adXYdwUUUCgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKSgBar3d5FZwNLMwVVGSSaLq6jtYGlkcKq9ya8g8S+JLnxLftZWblLRDh5B3rGtWVJXZzYjEKku7JfEni271+6ex01mS3Bw8oNZ9nYxWkeEGWP3nPUmn21tHawiOJcAd+5qwK8KtWlUldnm2cnzT1YmKUUYp2KwLEApwFKBRigAANLg0UtAwooFKKBhRilpaAG4oxTqKB2G4pMU+igLDMGinYpCKBWG4pDTqSgQ3FIRTjTTQISkxS0UCG4NFLSGmAlFLSUCExVK804XDCaJvKuF5V19fer1BpptaomUUzY8J+OJbeddN1YlZOiyE8NXpkUyzRh0YFSOMV4je2Ud5FtbhxyrDqDWz4Q8XT6ZdLpeqMdvAjkPevXwuL5vdkdFDEOm+Se3c9aoqOGZJow6NlT3qSvRPUCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAEpaKKACiiigAooooAKKKKAA1HJIsaM7HCgZNPzXBePvE5sbb7Batm5m+UAdRUTmoRuzKtVVKPMzB8Z+Jp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hhHpTDAD2q7gUhWgCgbcHqM/Wq0uk2kpy9rC5PqgNa+ykKUAYLeHNLb72nWx/wC2Qpo8NaSDkaba/wDfoV0Gz2o8ugDHi0ayh5js4E+kYFW1tgAAFwKu7Pal2UAVBAPSpBCPSrGylxQBB5QFIYgasUYoApSQD0rlta8F2GpSG5h3Wd6DkTw8HPuO9doVz2qNosjpQB5mdT17w03l6zbm8sgcC7gGWA/2hXRafqllqsAms7hJU7gdR7EV0MtsHUhlBB4IIrkdU8CwvOb3R5202965j4Rj7gUAU/CDf2b4n1nR24Qv9phH+yev8xXoUXTmvIhcazpHjTTLrWLYJg/Z3uIx8kqnv6V67GMUATilpBRQAtFFFABRSUtABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUlFACmkpTQKAEopaSgAooooAWiijrQAZopKKACiiigApaKKAEoopaACiiigAooooAKKKKACiiigAooooAKTFLRQAUUUUAFFFFABRRRQAUUUUAFJilooAjZc0wx5qekxQBWlto54zHNGsiHqrDINSqoHFPxSgUAApaMUUAFJilooAKKKKACiiigAooooAKKKKACiiigBKWiigBKKKKAClpKWgApKWigBKKBS0AFJRRQAUUUtABSUUtACUtJRQAUUUUAFLSUtACUUUtACUUtFACUtFFABRRRQAUlFFAC0lLRQAUUUUAFFFFABRRRQAlLRRQAUlLRQAUUUUAJRS0UAJS0UUAJRRRQAtFFJQAtJRS0AFFFFACZpc0UUAFGaKKADNGaKKACiiigAzRmiigAzRmiigBKKKKAClzRRQAlFFFABRRRQAUooooASiiigApRRRQAlFFFACiiiigBKWiigAooooAKKKKACiiigAooooASiiigBaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Z"

/***/ }),

/***/ 87:
/*!*****************************************************!*\
  !*** D:/phpstudy_pro/WWW/xykfpd_app/static/zfb.jpg ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map