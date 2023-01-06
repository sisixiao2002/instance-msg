(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.createPlugin = createPlugin;
exports.createSubpackageApp = createSubpackageApp;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 4));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ 14));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 17));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 21);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 24));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var realAtob;
var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;
    var result = '';
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    var _getCurrentUserInfo = getCurrentUserInfo(),
      role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    var _getCurrentUserInfo2 = getCurrentUserInfo(),
      permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {
    var _getCurrentUserInfo3 = getCurrentUserInfo(),
      tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isObject(obj) {
  return obj !== null && (0, _typeof2.default)(obj) === 'object';
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
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
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
  return !!obj && ((0, _typeof2.default)(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
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
          then: function then() {}
        };
      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}
function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(interceptor.returnValue));
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
function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }
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
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  }
};
var SYNC_API_RE = /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting/;
var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];
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
  }).catch(function (err) {
    return [err];
  });
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;
function checkDeviceWidth() {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
    platform = _wx$getSystemInfoSync.platform,
    pixelRatio = _wx$getSystemInfoSync.pixelRatio,
    windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

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
var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';
var messages = {};
var locale;
{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}
initI18nMessages();
var i18n = (0, _uniI18n.initVueI18n)(locale, {});
var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {
    var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    }
  }
};
var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;
function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {
        return watch(v);
      });
    }
  });
}
function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true
  });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function setLocale$1(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {
      return fn({
        locale: locale
      });
    });
    return true;
  }
  return false;
}
var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}
if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}
var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
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
  }
};
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
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
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
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(result) {
  var _result$brand = result.brand,
    brand = _result$brand === void 0 ? '' : _result$brand,
    _result$model = result.model,
    model = _result$model === void 0 ? '' : _result$model,
    _result$system = result.system,
    system = _result$system === void 0 ? '' : _result$system,
    _result$language = result.language,
    language = _result$language === void 0 ? '' : _result$language,
    theme = result.theme,
    version = result.version,
    platform = result.platform,
    fontSizeSetting = result.fontSizeSetting,
    SDKVersion = result.SDKVersion,
    pixelRatio = result.pixelRatio,
    deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "",
    appName: "Instant-messaging",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.6.14",
    uniRuntimeVersion: "3.6.14",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined
  };
  Object.assign(result, parameters);
}
function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }
  return _hostName;
}
var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};
var showActionSheet = {
  args: function args(fromArgs) {
    if ((0, _typeof2.default)(fromArgs) === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  }
};
var getAppBaseInfo = {
  returnValue: function returnValue(result) {
    var _result = result,
      version = _result.version,
      language = _result.language,
      SDKVersion = _result.SDKVersion,
      theme = _result.theme;
    var _hostName = getHostName(result);
    var hostLanguage = language.replace('_', '-');
    result = sortObject(Object.assign(result, {
      appId: "",
      appName: "Instant-messaging",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme
    }));
  }
};
var getDeviceInfo = {
  returnValue: function returnValue(result) {
    var _result2 = result,
      brand = _result2.brand,
      model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);
    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model
    }));
  }
};
var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);
    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {
    var locationReducedAccuracy = result.locationReducedAccuracy;
    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  }
};

// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting
};
var todos = ['vibrate', 'preloadPage', 'unPreloadPage', 'loadSubPackage'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}
function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
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
        if (!keyOption) {
          // 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
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
function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}
function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {
      // 目前 api 最多两个参数
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
      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}
var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];
function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
      complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported")
    };
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
  push: ['weixin']
};
function getProvider(_ref2) {
  var service = _ref2.service,
    success = _ref2.success,
    fail = _ref2.fail,
    complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}
var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});
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
  $emit: $emit
});

/**
 * 框架内 try-catch
 */
/**
 * 开发者 try-catch
 */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}
function invokePushCallback(args) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  var _getApiCallbacks = getApiCallbacks(args),
    success = _getApiCallbacks.success,
    fail = _getApiCallbacks.fail,
    complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}
var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};
var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback
});
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
  var components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}
function syncRefs(refs, newRefs) {
  var oldKeys = (0, _construct2.default)(Set, (0, _toConsumableArray2.default)(Object.keys(refs)));
  var newKeys = Object.keys(newRefs);
  newKeys.forEach(function (key) {
    var oldValue = refs[key];
    var newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(function (value) {
      return oldValue.includes(value);
    })) {
      return;
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(function (key) {
    delete refs[key];
  });
  return refs;
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  var refs = {};
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs);
    }
  });
}
function handleLink(event) {
  var _ref3 = event.detail || event.value,
    vuePid = _ref3.vuePid,
    vueOptions = _ref3.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vueOptions.parent = parentVm;
}
function markMPComponent(component) {
  // 在 Vue 中标记为小程序组件
  var IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component;
}
function toSkip(obj) {
  var OB = '__ob__';
  var SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: (0, _defineProperty2.default)({}, SKIP, true)
    });
  }
  return obj;
}
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});
function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initHook(name, options, isComponent) {
  var oldHook = options[name];
  options[name] = function () {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return oldHook.apply(this, args);
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;
  Component = function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}
var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
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
    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }
  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
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
function initUnknownHooks(mpOptions, vueOptions) {
  var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {
    return initHook$1(mpOptions, hook, excludes);
  });
}
function findHooks(vueOptions) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
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
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"Instant-messaging","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
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
function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: ''
        };
        properties.virtualHostClass = {
          type: null,
          value: ''
        };
      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }
  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }
        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
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
    event.detail = (0, _typeof2.default)(event.detail) === 'object' ? event.detail : {};
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
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
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
function processEventExtra(vm, extra, event, __args__) {
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
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
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
function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ? event.detail.__args__ || [event.detail] : [event.detail];
  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }
  var extraObj = processEventExtra(vm, extra, event, __args__);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
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
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}
function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}
function handleEvent(event) {
  var _this2 = this;
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
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
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
  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
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
var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];
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
function initScopedSlotsParams() {
  var center = {};
  var parents = {};
  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };
  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };
  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };
  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}
function parseBaseApp(vm, _ref4) {
  var mocks = _ref4.mocks,
    initRefs = _ref4.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);
  _vue.default.prototype.mpHost = "mp-weixin";
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = (0, _defineProperty2.default)({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {
        // hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });
  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);
      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }
  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);
  return appOptions;
}
function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}
function createApp(vm) {
  App(parseApp(vm));
  return vm;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};
function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
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
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    isPage = _ref5.isPage,
    initRelation = _ref5.initRelation;
  var needVueOptions = arguments.length > 2 ? arguments[2] : undefined;
  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
    _initVueComponent2 = (0, _slicedToArray2.default)(_initVueComponent, 2),
    VueComponent = _initVueComponent2[0],
    vueOptions = _initVueComponent2[1];
  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true
  }, vueOptions.options || {});
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
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

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
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
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
  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent];
  }
  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}
function parseComponent(vueComponentOptions, needVueOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  }, needVueOptions);
}
var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);
function parseBasePage(vuePageOptions) {
  var _parseComponent = parseComponent(vuePageOptions, true),
    _parseComponent2 = (0, _slicedToArray2.default)(_parseComponent, 2),
    pageOptions = _parseComponent2[0],
    vueOptions = _parseComponent2[1];
  initHooks(pageOptions.methods, hooks$1, vueOptions);
  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }
  return pageOptions;
}
function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions);
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
    allowDefault: true
  });
  vm.$scope = app;
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
    wx.onAppShow(function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
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
      if (typeof wx[name] !== 'function' && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
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
wx.createPlugin = createPlugin;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 2 */
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
/* 3 */
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 4 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 5);
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 6);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 7);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 9);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 5 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 6 */
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 7 */
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 8);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 8 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 9 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 10 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 11);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 11 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 12)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 13);
function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 12 */
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 13 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 12)["default"];
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 14 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 15);
var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 16);
function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
  return _construct.apply(null, arguments);
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 15 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 16 */
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 17 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ 18);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 19);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 7);
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ 20);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 18 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 8);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 19 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 20 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 21 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;
exports.compileI18nJsonStr = compileI18nJsonStr;
exports.hasI18nJson = hasI18nJson;
exports.initVueI18n = initVueI18n;
exports.isI18nStr = isI18nStr;
exports.isString = void 0;
exports.normalizeLocale = normalizeLocale;
exports.parseI18nJson = parseI18nJson;
exports.resolveLocale = resolveLocale;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 4));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 22));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 23));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
var isArray = Array.isArray;
var isObject = function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
};
var defaultDelimiters = ['{', '}'];
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {
    (0, _classCallCheck2.default)(this, BaseFormatter);
    this._caches = Object.create(null);
  }
  (0, _createClass2.default)(BaseFormatter, [{
    key: "interpolate",
    value: function interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }]);
  return BaseFormatter;
}();
exports.Formatter = BaseFormatter;
var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
    startDelimiter = _ref2[0],
    endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char;
    }
  }
  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;
    }
    index++;
  }
  return compiled;
}
var LOCALE_ZH_HANS = 'zh-Hans';
exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';
exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';
exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';
exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';
exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
var I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {
    var locale = _ref3.locale,
      fallbackLocale = _ref3.fallbackLocale,
      messages = _ref3.messages,
      watcher = _ref3.watcher,
      formater = _ref3.formater;
    (0, _classCallCheck2.default)(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  (0, _createClass2.default)(I18n, [{
    key: "setLocale",
    value: function setLocale(locale) {
      var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }
  }, {
    key: "watchLocale",
    value: function watchLocale(fn) {
      var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    }
  }, {
    key: "add",
    value: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
  }, {
    key: "f",
    value: function f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    }
  }, {
    key: "t",
    value: function t(key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    }
  }]);
  return I18n;
}();
exports.I18n = I18n;
function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(function () {
      return appVm.$locale;
    }, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {
  var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;
  var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    var _ref4 = [messages, locale];
    locale = _ref4[0];
    messages = _ref4[1];
  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale = typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher
  });
  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
var isString = function isString(val) {
  return typeof val === 'string';
};
exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {
  var locale = _ref5.locale,
    locales = _ref5.locales,
    delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name]
      });
    }
  });
  localeValues.unshift({
    locale: locale,
    values: locales[locale]
  });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  } catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {
      return locales.indexOf(locale) > -1;
    });
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 22 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 23 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 11);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 24 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
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
    !value._isVue &&
    !value.__v_isMPComponent
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
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
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
var NULLTYPE = '[object Null]';
var UNDEFINEDTYPE = '[object Undefined]';
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

function nullOrUndefined(currentType, preType) {
    if(
        (currentType === NULLTYPE || currentType === UNDEFINEDTYPE) && 
        (preType === NULLTYPE || preType === UNDEFINEDTYPE)
    ) {
        return false
    }
    return true
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
                    if (currentValue !== pre[key] && nullOrUndefined(currentType, preType)) {
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
        if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"Instant-messaging","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"Instant-messaging","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"Instant-messaging","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
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

function clearInstance(key, value) {
  // 简易去除 Vue 和小程序组件实例
  if (value) {
    if (value._isVue || value.__v_isMPComponent) {
      return {}
    }
  }
  return value
}

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

  return JSON.parse(JSON.stringify(ret, clearInstance))
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
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"Instant-messaging","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        try {
          triggerEvent.call(this.$scope, event, {
            __args__: toArray(arguments, 1)
          });
        } catch (error) {

        }
      }
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
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
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
    'onPageResize',
    'onUploadDouyinVideo'
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 25 */
/*!*****************************************************************!*\
  !*** D:/CoCo's home/the-last/code/Instant-messaging/pages.json ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
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
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/*!********************************************************************************************!*\
  !*** D:/CoCo's home/the-last/code/Instant-messaging/static/images/index/head-portrait.png ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 37 */
/*!*********************************************************************************!*\
  !*** D:/CoCo's home/the-last/code/Instant-messaging/static/images/index/搜索.png ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 38 */
/*!**********************************************************************************!*\
  !*** D:/CoCo's home/the-last/code/Instant-messaging/static/images/index/add.png ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 39 */
/*!***********************************************************************************!*\
  !*** D:/CoCo's home/the-last/code/Instant-messaging/static/images/index/好友认证.png ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 40 */,
/* 41 */,
/* 42 */
/*!**************************************************************************!*\
  !*** D:/CoCo's home/the-last/code/Instant-messaging/commons/js/datas.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  friends: function friends() {
    var friendarr = [{
      id: 1,
      imgurl: 'k.png',
      tip: 2,
      name: '阿力',
      email: 'ali@163.com',
      time: new Date(),
      message: '2022 年卡塔尔世界杯小组赛英格兰 6:2 大胜伊朗'
    }, {
      id: 2,
      imgurl: 'l.png',
      tip: 35,
      name: '王老五',
      email: 'wanglaowu@163.com',
      time: new Date(),
      message: '为什么生蚝能生吃，而其他的贝类吃完会有寄生虫或导致死亡'
    }, {
      id: 3,
      imgurl: 'm.png',
      tip: 9,
      name: '杨老二',
      email: 'yanglaoer@163.com',
      time: new Date(),
      message: '文件上传漏洞是指由于程序员在对用户文件上传部分的控制不足或者处理缺陷，而导致的用户可以越过其本身权限向服务器上上传可执行的动态脚本文件。'
    }, {
      id: 4,
      imgurl: 'n.png',
      tip: 124,
      name: '鱼家林',
      email: 'yujialin@163.com',
      time: new Date(),
      message: '状态中的数据某一些组件使用，放在共同的父组件中（状态提升）'
    }, {
      id: 5,
      imgurl: 'o.png',
      tip: 5,
      name: '路漫漫',
      email: 'lumanman@163.com',
      time: new Date(),
      message: '如何让你遇见我，在我最美的时刻'
    }, {
      id: 6,
      imgurl: 'k.png',
      tip: 2,
      name: '马小跳',
      email: 'maxiaotiao@163.com',
      time: new Date(),
      message: '2022 年卡塔尔世界杯小组赛英格兰 6:2 大胜伊朗'
    }, {
      id: 7,
      imgurl: 'l.png',
      tip: 35,
      name: '夏林果',
      email: 'xialinguo@163.com',
      time: new Date(),
      message: '为什么生蚝能生吃，而其他的贝类吃完会有寄生虫或导致死亡'
    }, {
      id: 8,
      imgurl: 'm.png',
      tip: 9,
      name: '安琪儿',
      email: 'anqier@163.com',
      time: new Date(),
      message: '文件上传漏洞是指由于程序员在对用户文件上传部分的控制不足或者处理缺陷，而导致的用户可以越过其本身权限向服务器上上传可执行的动态脚本文件。'
    }, {
      id: 9,
      imgurl: 'n.png',
      tip: 0,
      name: '唐飞',
      email: 'tangfei@163.com',
      time: new Date(),
      message: '状态中的数据某一些组件使用，放在共同的父组件中（状态提升）'
    }, {
      id: 10,
      imgurl: 'o.png',
      tip: 5,
      name: '杨玉环',
      email: 'yangyuhuan@163.com',
      time: new Date(),
      message: '如何让你遇见我，在我最美的时刻'
    }];
    return friendarr;
  },
  //好友关系
  isFriend: function isFriend() {
    var isfriend = [{
      userid: 1,
      friend: 2
    }, {
      userid: 1,
      friend: 5
    }, {
      userid: 1,
      friend: 6
    }, {
      userid: 1,
      friend: 8
    }];
    return isfriend;
  }
};
exports.default = _default;

/***/ }),
/* 43 */
/*!*******************************************************************************!*\
  !*** D:/CoCo's home/the-last/code/Instant-messaging/commons/js/myFunction.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  //首页时间转换
  dateTime: function dateTime(date) {
    //将过去时间与现在时间进行比较
    var old = new Date(date);
    var now = new Date();
    //获取old具体时间
    var d = old.getTime();
    var h = old.getHours();
    var m = old.getMinutes();
    var Y = old.getFullYear();
    var M = old.getMonth() + 1;
    var D = old.getDate();
    //获取now具体时间
    var nd = now.getTime();
    var nh = now.getHours();
    var nm = now.getMinutes();
    var nY = now.getFullYear();
    var nM = now.getMonth() + 1;
    var nD = now.getDate();
    //如果消息是当天的只显示hh:mm
    if (D === nD && M === nM && Y === nY) {
      if (h < 10) {
        h = '0' + h;
      }
      if (m < 10) {
        m = '0' + m;
      }
      return h + ':' + m;
    }
    //如果消息是昨天的显示：昨天hh:mm
    if (D + 1 === nD && M === nM && Y === nY) {
      if (h < 10) {
        h = '0' + h;
      }
      if (m < 10) {
        m = '0' + m;
      }
      return '昨天' + h + ':' + m;
    }
    //如果消息是前天的只显示：前天hh:mm
    if (D + 2 === nD && M === nM && Y === nY) {
      if (h < 10) {
        h = '0' + h;
      }
      if (m < 10) {
        m = '0' + m;
      }
      return '前天' + h + ':' + m;
    } else {
      //大于两天显示：年月日
      return Y + '/' + M + '/' + D;
    }
  }
};
exports.default = _default;

/***/ }),
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */
/*!********************************************************************************!*\
  !*** D:/CoCo's home/the-last/code/Instant-messaging/static/images/login/火.png ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */
/*!**********************************************************************************!*\
  !*** D:/CoCo's home/the-last/code/Instant-messaging/static/images/common/返回.png ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 60 */
/*!***************************************************************************************!*\
  !*** D:/CoCo's home/the-last/code/Instant-messaging/static/images/register/Group.png ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAiCAYAAAAkjjtxAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAALKADAAQAAAABAAAAIgAAAABDXlnCAAACJUlEQVRYCe3YPS8EQRgH8P84QbxFofMFRKFRiUZU5M577gqh1voIPoNOoROROyJeLujoVDSioZNoSCSSa3D7eJ4w53Zv181ednYVN8XNPrOz9/wyN7s7c0CzNEfANQLKFSUYEJGa2ceCQxgC4bqYU0U/zr8AZ/PUXQIOGTihkUphu5hVKzrWdeLgH+wZg8Y0StcpYPw4py51LHVLdRD38V9YsTjg6eEpiYHrYcXZksKNx5vMCJtgea5uHS+qq8TBRliF3U5g1YuVONabzhhLWC7kVDlRcBTY2EY4Kmws4CixvuC5A+orlzHQ4eCe59G73zwybYsaK3ldz+FMgdY/PvBSdnBbUnhM5yltivP2s4GVHJWnRGaPph0HR67ECp/cYYnf6QVXe53AFlbSVkaYHEzVOAitBOykC5StORfQYBMrKStgPn72NYRA28a6wKl2bPLP/9ooOg6sC3w0q54YLDfZW1h0XFhxVW46jczkaZSXdbI+7dVtrtpzI8aJFUcNWBpN0Z2EU94p+C6+5Xuk8M5hl/sFrg2+e5l/+oLlchM0d3vg/ddgULqosZInECwn66KlU0CxgZVUf4KlQyNoW1gjcFi0TawxWKNJ4ZwIPRL7FdtYyVl3SlTDfqbHBbe1VbfLMWMP+GmQDdopePs3GocCS5LJPM3z/wV7vMb4fa0r3HURhm1jJX9osFzEy84Rnh4b/EjrZ/XpSU6tSXuzNEcggRH4AnLpG3K/A6r7AAAAAElFTkSuQmCC"

/***/ }),
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */
/*!**************************************************************************************!*\
  !*** D:/CoCo's home/the-last/code/Instant-messaging/static/images/search/search.png ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKKADAAQAAAABAAAAKAAAAAB65masAAAE0klEQVRYCe1Y6U9bRxB/u88Hh5pAEcFASpOA6hA7ll0TEHJa8SGtSvo5/w9/TiWE+qFSaNVKRWoLTVRDay6lUdQIc9jgAk1KbPyO7Yz9xnHdfYcxalOJlfDsNTO/ndmdmYeiXLQLC1xYwNECzHHVZnFycrL98FAb4lwZYkx0mabSoSgiAOMi9F+pKs8zxrZGR6/tzs7OGjZiPE03BTAW+7hT0w6SQrCbIN2VlzFehH3L0ej1zbMCdVVCx4xG3x81DJYSQqg010AFjG3k8Req6v9qfX3psIHHdWinrMY4MzPDDw5epgxDuQOTnBbAhdug9JdgUP8xGOSPM5n0T3Nzn62VSuZzWHsFVu4Etwer+5GK8MDA1eN8fueYZHihNid+zRqJJO8ahojQDCjP+/3BxUxmcZ/mZBQPNjf3xXuapkwAuDZrjwgE/A8zmUfbMh7ZnCNAdKuuKx8SIzyCjUhkeLGZ+5RKpd46Oip9YpribUvOaWcn+zydTv9Bcp2orYvxQeh68T4wV9yK4DY2lr+DH7xrnls2my2PjcWfHR8Xb1gu94FVuwuFvV+9CKndqcbN1ddafRDoVrRc4x6v4/n5+VO/v+1LkEMhZzAWm7jqhV8KEOOcFUoqMvDONeNWmeLV1e+PhDDXaa1c1uLUd6JSgCcn2hAwVe4nnHrb7UE4Kahf6+5u+xnGpjXXPz09bb3y+l1/70sBwh1BgJXGue836rdKl5aWMHDnLDk8m913dbMUIGNmN4Hx+093qX9OtCZP10WXm0wpQNNk7cSoquoJ9c+DBgL8T5IDeRyCuXOTAoRwELDYBMQrzVlEc6vw+GryOGc+N24pQKxKLEY2NTVFWcBNlqd1SJk17xiGWnJjkgLEkokYC4XiZeqfB4Xrc4nkcC7IEDT1DyoFiPUc7YTYVXvRNNcKZUyvyYMQtucmSwoQGLeIEQqFEUz8NG6FJhKJXiGUyssF62kPHnzqWHCgLqlirIStYhO2mJewKmkFGPGWSnyc+pAHnsLBzddjeU8K0Epry8SCJRNWJTQ+C719O3kTil0KzKZhtGNWcW1SgMiFZToY+EVVgmjDkslLapJpDIcTA5omPqA1xpTVJ09+eEljJ2pbbmFZ1df3LkR9EYY/DnenHUum/v4bO/v7W67hgZSi5SAq3INxxRhwv/PR6PC3Xss2x4IVlcRi49fLZf0j6FLxYGBVEgpdXllYWLAFig8C71ydW1Gc4vOxb9bW0s8qAw8/rgBRRjR65x3TNO6BJSjD4DRe8BxYZMfvZyeYITAIY5zDUEKvFTfWN3h8Onjk4eZm2jXEIJ8ngLgxHo93gUXuQncQx020ykFg/wDxNAPS9g6SMKK5XK6EZXpvb6jAmAp1nMCMYHtAsGAZ9j3t6Wn7emXl8eqVKwM+mAtV5QkOIId7e/tzILNWPJCuemqroH6TrJ9MJjvKZR4Ct/eAaztU1YSHJHSoUOAbOPB7ODy011iF37qVnICPpzjJ82LJMwMkJc3SSGRs3DDMBPG5gfTsYhLYKj042N3p6xtUwdr9VVnO7v7XASIoBCm7kxBjnzfGWNtM0qql3Pg3NtKPoGCtpTuIrT7DKF1r5PvPACIQBAmfFJWcj9WNafKtRoBvxBj/izEy4v4J+kaA/d+B+AupCORpPKnkHAAAAABJRU5ErkJggg=="

/***/ }),
/* 70 */
/*!********************************************************************************!*\
  !*** D:/CoCo's home/the-last/code/Instant-messaging/static/images/index/m.png ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/images/index/m.png";

/***/ }),
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */
/*!**************************************************************************************!*\
  !*** D:/CoCo's home/the-last/code/Instant-messaging/static/images/userhome/more.png ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAMCAYAAAAtUZ4rAAAA10lEQVRIS92WMQrCQBBF/5igNnoB+7iQQkmj3sEb2FvpabSy9wbeQW1CLBbW9F5AG5XEkYDpNG4RGNhtFpbPY/7MMLOEzwnDsJnnrfkLmBEQFs8M6Aaw9bzHRmv9LLU2txSPiuCCYNAj8ncgHn4NlilhzqZperrYmJHkUZHJLGsff5opHTAlvn8f/auUNI+UihYMrGwyT8DSmHhdpZXmUaCiPQFjG0MMHFITT6q00jzqq+gKoGNjCMDtbOJulVaa554h6Rapu4XdGwrSY7buNeDeYnXt6/MGRAwaes51hd8AAAAASUVORK5CYII="

/***/ }),
/* 80 */
/*!***************************************************************************************!*\
  !*** D:/CoCo's home/the-last/code/Instant-messaging/static/images/userhome/three.png ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 81 */
/*!****************************************************************************************!*\
  !*** D:/CoCo's home/the-last/code/Instant-messaging/static/images/userhome/female.png ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADVElEQVRYR8WWSchPURiHn58pIvM8lqwMhSQLIbIiIRYyFBmSIUWxILIQpYRCZB42RGyUIQqlzIUoKSILU0Jmr96vc7+O6/6/e++fcnbn3vOe9znvLP7z0t/qN7MGwACgK9AaeAU8A25L+pF3f9UAZtYXWA6MAVplKHoNnAI2SHpYCaQ0gJk1ATYDs4D6eS8EvgPbgWWSvqbPlwIws07hVYNSF7mpnwNvgDZAF6Be6swVYLwkd1HtKgwQXn4ZGBjJPwXWAcclvUy+m1lHYDKwAugcnXeIkbElygDsAWZGlx0G5kj6VMkNZtYM2A9MjM5slbQ42RcCMDOP8uuRWQ9KmlHA/5iZ6zgWQXhM9E0CsyjAUWBSUPgY6C3pSxEAPxMs4ZmQuGOvJA9icgHMrHHI7aZB4UxJ+4oqj+JiEbAl7D1FO3idKAIwArgQBD2N2kt6VwWAB6ZnSpIdgyTdKAIwDTgYFN6X1Kes8sgKnjXdwt5T8mQRgCXApiB0SdKwvwC4BfQP8rMl7S4C4MGyOwjdk+QluKplZk+A7kF4oqQTRQBGAeeCkEd+W0kfyhKYWTvgRVS+B0u69huA56wkiy83M4/+t0DD8H2qpCNVAMwDdgQ5v8+D+XsNgJl5/T4P9AQWSjqQgjjhdTx883zuJ+lbUYhQxh9E5j8kaXptHTCzONJ/AnM9QKLoHQ5cjBTukDS/BMAhYGo4742rv6S7MYAHxu2or2dBuNmnxBDA4rosEYrYTqDmtWHtkjQ32dTGgJl5iz2TBREu8uFidOrV7o613qLjwDSzFsAEYFVwayLm/WRY3MDSQZgF4SXU/Z9WHrN4djyK5oFeQKMU7E1grCTPhNr1RxpmWCLt6rOhN8TuqCsc3J3ekhdkte7MOlAHhCsfJ+mzmXlgepX0mTBJ0RjkI3DaBxZJXgEzVyUA74CubGhKyl+xLZWiXieGAD2A5tFUfNVB8zIlywWuPCvg/K4/siNPQd7/LIA1wOpI0OdA74DJ6P1PIbIANgJLA0CNz32EqpSieS/M+58F0BJYCXjDWZ/4sUKd8Onot7KdpzD9P7cbpgIuXSfeAy3SDawMRCkAvzhliTuSkgGjjN7KhajILWbmvcMno9OSfMCsepW2QNWaKgj+Ai5cPTBOgWdJAAAAAElFTkSuQmCC"

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map