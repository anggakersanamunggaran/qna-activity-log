(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("qna-activity-log", [], factory);
	else if(typeof exports === 'object')
		exports["qna-activity-log"] = factory();
	else
		root["qna-activity-log"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: initialize, recordEvent, sendSavedEvents, clearCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialize", function() { return initialize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recordEvent", function() { return recordEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendSavedEvents", function() { return sendSavedEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearCache", function() { return clearCache; });
/* harmony import */ var utils_astrnt_http_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/astrnt-http-handler */ "./src/utils/astrnt-http-handler.js");
/* harmony import */ var utils_navigation_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/navigation-helper */ "./src/utils/navigation-helper.js");
/* harmony import */ var utils_date_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils/date-utils */ "./src/utils/date-utils.js");



var logEnv = 'ASTRNT_ACTIVITY_LOG_ENV';
var logBaseInfo = 'ASTRNT_BASE_ACTIVITY_LOG_INFO';
var logInfos = 'ASTRNT_LOG_ACTIVITY_INFOS';
var storageKeys = [logEnv, logBaseInfo, logInfos];

var getEnv = function getEnv() {
  var env = localStorage.getItem(logEnv);
  return env;
};

var getBaseInfo = function getBaseInfo() {
  var info = localStorage.getItem(logBaseInfo);
  return JSON.parse(info);
};

var constructURL = function constructURL() {
  var env = getEnv();
  var domainPrefix = '';

  switch (env) {
    case 'beta':
    case 'dev':
      domainPrefix = 'log-beta';
      break;

    case 'production':
    case 'live':
      domainPrefix = 'app';
      break;
  }

  var baseURL = "https://".concat(domainPrefix, ".astrnt.co");
  return "".concat(baseURL, "/api/v2/logs/activity");
};

var constructInterviewInfo = function constructInterviewInfo(params) {
  var device = Object(utils_navigation_helper__WEBPACK_IMPORTED_MODULE_1__["deviceInfo"])();
  var timeZone = utils_date_utils__WEBPACK_IMPORTED_MODULE_2__["getTimezone"]();
  var logTime = utils_date_utils__WEBPACK_IMPORTED_MODULE_2__["getCurrentDateTime"]();
  var ua = navigator.userAgent;
  var os = "".concat(device.os, " (").concat(device.osVersion, ")");
  var version = "".concat(device.browser, ", Version ").concat(device.browserVersion, " (").concat(device.browserMajorVersion, ")");
  var recordedParam = getBaseInfo();
  recordedParam.event = params.event || '';
  recordedParam.activity = params.activity || '';
  recordedParam.message = params.message || '';
  recordedParam.os = os;
  recordedParam.version = version;
  recordedParam.imei = ua;
  recordedParam.log_time = logTime;
  recordedParam.time_zone = timeZone;
  return recordedParam;
};

var sendEvent = function sendEvent(params) {
  var recordedParams = getBaseInfo();

  if (!recordedParams.isProctoring) {
    return new Promise(function (resolve, reject) {
      resolve('no action');
    });
  }

  var URL = constructURL();
  var logInfo = constructInterviewInfo(params);
  var requestParams = {
    activity: logInfo.activity,
    interview_code: logInfo.interviewCode
  }; // console.log(logInfo)
  // console.log(requestParams)

  return Object(utils_astrnt_http_handler__WEBPACK_IMPORTED_MODULE_0__["default"])('POST', URL, requestParams);
};

var storeEvent = function storeEvent(params) {
  var logItems = localStorage.getItem(logInfos);
  var storedLogs;

  if (!logItems) {
    storedLogs = [];
  } else {
    storedLogs = JSON.parse(logItems);
    localStorage.removeItem(logInfos);
  }

  var interviewInfo = constructInterviewInfo(params);
  storedLogs.push(interviewInfo);
  localStorage.setItem(logInfos, JSON.stringify(storedLogs));
  return Promise.resolve(interviewInfo);
};

function initialize(env, params) {
  var onError = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  var onUnhandledRejection = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
  var baseParam = {
    'interviewCode': params.interview_code || '',
    'candidate_id': params.candidate_id || 0,
    'job_id': params.job_id || 0,
    'company_id': params.company_id || 0,
    'isProctoring': params.isProctoring || 0
  };
  localStorage.setItem(logEnv, env);
  localStorage.setItem(logBaseInfo, JSON.stringify(baseParam));
  window.addEventListener('error', function (errEvt) {
    onError(errEvt.error);
    return false;
  });
  window.addEventListener('unhandledrejection', function (errEvt) {
    onUnhandledRejection(errEvt.reason);
  });
}
function recordEvent(params) {
  switch (params.status) {
    case 'online':
      return sendEvent(params);

    case 'offline':
      return storeEvent(params);
  }

  return Promise.resolve('No event to send');
}
function sendSavedEvents() {
  var logItems = localStorage.getItem(logInfos);

  if (!logItems) {
    return Promise.resolve();
  }

  var URL = constructURL();
  var requestParams = {
    logs: JSON.parse(logItems)
  };
  return new Promise(function (resolve, reject) {
    Object(utils_astrnt_http_handler__WEBPACK_IMPORTED_MODULE_0__["default"])('POST', URL, requestParams).then(function (result) {
      localStorage.removeItem(logInfos);
      resolve(result);
    }).catch(function (error) {
      return reject(error);
    });
  });
}
function clearCache() {
  storageKeys.forEach(function (key) {
    localStorage.removeItem(key);
  });
}

/***/ }),

/***/ "./src/utils/astrnt-http-handler.js":
/*!******************************************!*\
  !*** ./src/utils/astrnt-http-handler.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (method, url, params) {
  var mimeType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'application/json';
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open(method, url, true);
    request.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

    if (mimeType && request.overrideMimeType) {
      request.overrideMimeType(mimeType);
    }

    request.addEventListener('load', function (evt) {
      var target = evt.target;
      var response = JSON.parse(target.responseText);
      var responseCode = response.status || request.status;

      if (responseCode >= 200 && responseCode < 300) {
        resolve(response || response);
      } else {
        reject(response.message || response);
      }
    });
    var requestParams = JSON.stringify(params);
    request.send(requestParams);
  });
});

/***/ }),

/***/ "./src/utils/date-utils.js":
/*!*********************************!*\
  !*** ./src/utils/date-utils.js ***!
  \*********************************/
/*! exports provided: getTimezone, getCurrentDateTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTimezone", function() { return getTimezone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentDateTime", function() { return getCurrentDateTime; });
var getTimezone = function getTimezone() {
  var currentTime = new Date();
  var currentTimezone = currentTime.getTimezoneOffset();
  return currentTimezone / 60 * -1;
};
var getCurrentDateTime = function getCurrentDateTime() {
  var date = new Date();
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hour = d.getHours(),
      minute = d.getMinutes(),
      second = d.getSeconds();

  if (month.length < 2) {
    month = '0' + month;
  }

  if (day.length < 2) {
    day = '0' + day;
  }

  hour = hour % 12;
  hour = hour ? hour : 12;
  minute = minute < 10 ? '0' + minute : minute;
  var result = "".concat([year, month, day].join('-'), " ").concat(hour, ":").concat(minute, ":").concat(second);
  return result;
};

/***/ }),

/***/ "./src/utils/navigation-helper.js":
/*!****************************************!*\
  !*** ./src/utils/navigation-helper.js ***!
  \****************************************/
/*! exports provided: deviceInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deviceInfo", function() { return deviceInfo; });
/**
 * source: https://stackoverflow.com/a/18706818/9938539
*/
var ua = navigator.userAgent;
var nVer = navigator.appVersion;
var cookieEnabled = navigator.cookieEnabled;

var getOSInfo = function getOSInfo() {
  var os = '-';
  var osVersion = '-';
  var clientStrings = [{
    s: 'Windows 10',
    r: /(Windows 10.0|Windows NT 10.0)/
  }, {
    s: 'Windows 8.1',
    r: /(Windows 8.1|Windows NT 6.3)/
  }, {
    s: 'Windows 8',
    r: /(Windows 8|Windows NT 6.2)/
  }, {
    s: 'Windows 7',
    r: /(Windows 7|Windows NT 6.1)/
  }, {
    s: 'Windows Vista',
    r: /Windows NT 6.0/
  }, {
    s: 'Windows Server 2003',
    r: /Windows NT 5.2/
  }, {
    s: 'Windows XP',
    r: /(Windows NT 5.1|Windows XP)/
  }, {
    s: 'Windows 2000',
    r: /(Windows NT 5.0|Windows 2000)/
  }, {
    s: 'Windows ME',
    r: /(Win 9x 4.90|Windows ME)/
  }, {
    s: 'Windows 98',
    r: /(Windows 98|Win98)/
  }, {
    s: 'Windows 95',
    r: /(Windows 95|Win95|Windows_95)/
  }, {
    s: 'Windows NT 4.0',
    r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
  }, {
    s: 'Windows CE',
    r: /Windows CE/
  }, {
    s: 'Windows 3.11',
    r: /Win16/
  }, {
    s: 'Android',
    r: /Android/
  }, {
    s: 'Open BSD',
    r: /OpenBSD/
  }, {
    s: 'Sun OS',
    r: /SunOS/
  }, {
    s: 'Linux',
    r: /(Linux|X11)/
  }, {
    s: 'iOS',
    r: /(iPhone|iPad|iPod)/
  }, {
    s: 'Mac OS X',
    r: /Mac OS X/
  }, {
    s: 'Mac OS',
    r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
  }, {
    s: 'QNX',
    r: /QNX/
  }, {
    s: 'UNIX',
    r: /UNIX/
  }, {
    s: 'BeOS',
    r: /BeOS/
  }, {
    s: 'OS/2',
    r: /OS\/2/
  }, {
    s: 'Search Bot',
    r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
  }];

  for (var id in clientStrings) {
    var cs = clientStrings[id];

    if (cs.r.test(ua)) {
      os = cs.s;
      break;
    }
  }

  if (/Windows/.test(os)) {
    osVersion = /Windows (.*)/.exec(os)[1];
    os = 'Windows';
  }

  switch (os) {
    case 'Mac OS X':
      osVersion = /Mac OS X (10[\.\_\d]+)/.exec(ua)[1];
      break;

    case 'Android':
      osVersion = /Android ([\.\_\d]+)/.exec(ua)[1];
      break;

    case 'iOS':
      osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
      osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
      break;
  }

  return {
    name: os,
    version: osVersion
  };
};

var getBrowserInfo = function getBrowserInfo() {
  var majorVersion = parseInt(nVer, 10);
  var browser = navigator.appName;
  var version = '' + parseFloat(navigator.appVersion);
  var nameOffset, verOffset, ix;

  if ((verOffset = ua.indexOf('Opera')) !== -1) {
    browser = 'Opera';
    version = ua.substring(verOffset + 6);

    if ((verOffset = ua.indexOf('Version')) !== -1) {
      version = ua.substring(verOffset + 8);
    }
  } else if ((verOffset = ua.indexOf('OPR')) !== -1) {
    browser = 'Opera';
    version = ua.substring(verOffset + 4);
  } else if ((verOffset = ua.indexOf('Edge')) !== -1) {
    browser = 'Microsoft Edge';
    version = ua.substring(verOffset + 5);
  } else if ((verOffset = ua.indexOf('MSIE')) !== -1) {
    browser = 'Microsoft Internet Explorer';
    version = ua.substring(verOffset + 5);
  } else if ((verOffset = ua.indexOf('Chrome')) !== -1) {
    browser = 'Chrome';
    version = ua.substring(verOffset + 7);
  } else if ((verOffset = ua.indexOf('Safari')) !== -1) {
    browser = 'Safari';
    version = ua.substring(verOffset + 7);

    if ((verOffset = ua.indexOf('Version')) !== -1) {
      version = ua.substring(verOffset + 8);
    }
  } else if ((verOffset = ua.indexOf('Firefox')) !== -1) {
    browser = 'Firefox';
    version = ua.substring(verOffset + 8);
  } else if (ua.indexOf('Trident/') !== -1) {
    browser = 'Microsoft Internet Explorer';
    version = ua.substring(ua.indexOf('rv:') + 3);
  } else if ((nameOffset = ua.lastIndexOf(' ') + 1) < (verOffset = ua.lastIndexOf('/'))) {
    browser = ua.substring(nameOffset, verOffset);
    version = ua.substring(verOffset + 1);

    if (browser.toLowerCase() === browser.toUpperCase()) {
      browser = navigator.appName;
    }
  }

  if ((ix = version.indexOf('')) !== -1) {
    version = version.substring(0, ix);
  }

  if ((ix = version.indexOf(' ')) !== -1) {
    version = version.substring(0, ix);
  }

  if ((ix = version.indexOf(')')) !== -1) {
    version = version.substring(0, ix);
  }

  majorVersion = parseInt('' + version, 10);

  if (isNaN(majorVersion)) {
    version = '' + parseFloat(nVer);
    majorVersion = parseInt(nVer, 10);
  }

  return {
    name: browser || '',
    version: version || '',
    majorVersion: majorVersion || ''
  };
};

var getScreenSize = function getScreenSize() {
  if (!screen.width) {
    return undefined;
  }

  var width = screen.width ? screen.width : '';
  var height = screen.height ? screen.height : '';
  return '' + width + ' x ' + height;
};

var isCookieEnabled = function isCookieEnabled() {
  if (typeof navigator.cookieEnabled === 'undefined' && !cookieEnabled) {
    document.cookie = 'testcookie';
    return document.cookie.indexOf('testcookie') !== -1;
  }

  return false;
};

function deviceInfo() {
  var os = getOSInfo();
  var browser = getBrowserInfo();
  var screenSize = getScreenSize();
  var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);
  return {
    screen: screenSize,
    browser: browser.name,
    browserVersion: browser.version,
    browserMajorVersion: browser.majorVersion,
    mobile: mobile,
    os: os.name,
    osVersion: os.version,
    cookies: isCookieEnabled
  };
}

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xbmEtYWN0aXZpdHktbG9nL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9xbmEtYWN0aXZpdHktbG9nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3FuYS1hY3Rpdml0eS1sb2cvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcW5hLWFjdGl2aXR5LWxvZy8uL3NyYy91dGlscy9hc3RybnQtaHR0cC1oYW5kbGVyLmpzIiwid2VicGFjazovL3FuYS1hY3Rpdml0eS1sb2cvLi9zcmMvdXRpbHMvZGF0ZS11dGlscy5qcyIsIndlYnBhY2s6Ly9xbmEtYWN0aXZpdHktbG9nLy4vc3JjL3V0aWxzL25hdmlnYXRpb24taGVscGVyLmpzIl0sIm5hbWVzIjpbImxvZ0VudiIsImxvZ0Jhc2VJbmZvIiwibG9nSW5mb3MiLCJzdG9yYWdlS2V5cyIsImdldEVudiIsImVudiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJnZXRCYXNlSW5mbyIsImluZm8iLCJKU09OIiwicGFyc2UiLCJjb25zdHJ1Y3RVUkwiLCJkb21haW5QcmVmaXgiLCJiYXNlVVJMIiwiY29uc3RydWN0SW50ZXJ2aWV3SW5mbyIsInBhcmFtcyIsImRldmljZSIsImRldmljZUluZm8iLCJ0aW1lWm9uZSIsIkRhdGVVdGlscyIsImxvZ1RpbWUiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm9zIiwib3NWZXJzaW9uIiwidmVyc2lvbiIsImJyb3dzZXIiLCJicm93c2VyVmVyc2lvbiIsImJyb3dzZXJNYWpvclZlcnNpb24iLCJyZWNvcmRlZFBhcmFtIiwiZXZlbnQiLCJhY3Rpdml0eSIsIm1lc3NhZ2UiLCJpbWVpIiwibG9nX3RpbWUiLCJ0aW1lX3pvbmUiLCJzZW5kRXZlbnQiLCJyZWNvcmRlZFBhcmFtcyIsImlzUHJvY3RvcmluZyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiVVJMIiwibG9nSW5mbyIsInJlcXVlc3RQYXJhbXMiLCJpbnRlcnZpZXdfY29kZSIsImludGVydmlld0NvZGUiLCJodHRwSGFuZGxlciIsInN0b3JlRXZlbnQiLCJsb2dJdGVtcyIsInN0b3JlZExvZ3MiLCJyZW1vdmVJdGVtIiwiaW50ZXJ2aWV3SW5mbyIsInB1c2giLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiaW5pdGlhbGl6ZSIsIm9uRXJyb3IiLCJvblVuaGFuZGxlZFJlamVjdGlvbiIsImJhc2VQYXJhbSIsImNhbmRpZGF0ZV9pZCIsImpvYl9pZCIsImNvbXBhbnlfaWQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXJyRXZ0IiwiZXJyb3IiLCJyZWFzb24iLCJyZWNvcmRFdmVudCIsInN0YXR1cyIsInNlbmRTYXZlZEV2ZW50cyIsImxvZ3MiLCJ0aGVuIiwicmVzdWx0IiwiY2F0Y2giLCJjbGVhckNhY2hlIiwiZm9yRWFjaCIsImtleSIsIm1ldGhvZCIsInVybCIsIm1pbWVUeXBlIiwicmVxdWVzdCIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJvdmVycmlkZU1pbWVUeXBlIiwiZXZ0IiwidGFyZ2V0IiwicmVzcG9uc2UiLCJyZXNwb25zZVRleHQiLCJyZXNwb25zZUNvZGUiLCJzZW5kIiwiZ2V0VGltZXpvbmUiLCJjdXJyZW50VGltZSIsIkRhdGUiLCJjdXJyZW50VGltZXpvbmUiLCJnZXRUaW1lem9uZU9mZnNldCIsImdldEN1cnJlbnREYXRlVGltZSIsImRhdGUiLCJkIiwibW9udGgiLCJnZXRNb250aCIsImRheSIsImdldERhdGUiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJob3VyIiwiZ2V0SG91cnMiLCJtaW51dGUiLCJnZXRNaW51dGVzIiwic2Vjb25kIiwiZ2V0U2Vjb25kcyIsImxlbmd0aCIsImpvaW4iLCJuVmVyIiwiYXBwVmVyc2lvbiIsImNvb2tpZUVuYWJsZWQiLCJnZXRPU0luZm8iLCJjbGllbnRTdHJpbmdzIiwicyIsInIiLCJpZCIsImNzIiwidGVzdCIsImV4ZWMiLCJuYW1lIiwiZ2V0QnJvd3NlckluZm8iLCJtYWpvclZlcnNpb24iLCJwYXJzZUludCIsImFwcE5hbWUiLCJwYXJzZUZsb2F0IiwibmFtZU9mZnNldCIsInZlck9mZnNldCIsIml4IiwiaW5kZXhPZiIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwidG9Mb3dlckNhc2UiLCJ0b1VwcGVyQ2FzZSIsImlzTmFOIiwiZ2V0U2NyZWVuU2l6ZSIsInNjcmVlbiIsIndpZHRoIiwidW5kZWZpbmVkIiwiaGVpZ2h0IiwiaXNDb29raWVFbmFibGVkIiwiZG9jdW1lbnQiLCJjb29raWUiLCJzY3JlZW5TaXplIiwibW9iaWxlIiwiY29va2llcyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtB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LEVBQUVBLE9BQU8sQ0FBQ21HLElBRlo7QUFHTGxHLGtCQUFjLEVBQUVELE9BQU8sQ0FBQ0QsT0FIbkI7QUFJTEcsdUJBQW1CLEVBQUVGLE9BQU8sQ0FBQ3FHLFlBSnhCO0FBS0xzQixVQUFNLEVBQUVBLE1BTEg7QUFNTDlILE1BQUUsRUFBRUEsRUFBRSxDQUFDc0csSUFORjtBQU9MckcsYUFBUyxFQUFFRCxFQUFFLENBQUNFLE9BUFQ7QUFRTDZILFdBQU8sRUFBRUw7QUFSSixHQUFQO0FBVUQsQyIsImZpbGUiOiJxbmEtYWN0aXZpdHktbG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJxbmEtYWN0aXZpdHktbG9nXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInFuYS1hY3Rpdml0eS1sb2dcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wicW5hLWFjdGl2aXR5LWxvZ1wiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBodHRwSGFuZGxlciBmcm9tICd1dGlscy9hc3RybnQtaHR0cC1oYW5kbGVyJ1xuaW1wb3J0IHsgZGV2aWNlSW5mbyB9IGZyb20gJ3V0aWxzL25hdmlnYXRpb24taGVscGVyJ1xuaW1wb3J0ICogYXMgRGF0ZVV0aWxzIGZyb20gJ3V0aWxzL2RhdGUtdXRpbHMnXG5cbmNvbnN0IGxvZ0VudiA9ICdBU1RSTlRfQUNUSVZJVFlfTE9HX0VOVidcbmNvbnN0IGxvZ0Jhc2VJbmZvID0gJ0FTVFJOVF9CQVNFX0FDVElWSVRZX0xPR19JTkZPJ1xuY29uc3QgbG9nSW5mb3MgPSAnQVNUUk5UX0xPR19BQ1RJVklUWV9JTkZPUydcbmNvbnN0IHN0b3JhZ2VLZXlzID0gW1xuICBsb2dFbnYsXG4gIGxvZ0Jhc2VJbmZvLFxuICBsb2dJbmZvc1xuXVxuXG5jb25zdCBnZXRFbnYgPSAoKSA9PiB7XG4gIGNvbnN0IGVudiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvZ0VudilcbiAgcmV0dXJuIGVudlxufVxuXG5jb25zdCBnZXRCYXNlSW5mbyA9ICgpID0+IHtcbiAgY29uc3QgaW5mbyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvZ0Jhc2VJbmZvKVxuICByZXR1cm4gSlNPTi5wYXJzZShpbmZvKVxufVxuXG5jb25zdCBjb25zdHJ1Y3RVUkwgPSAoKSA9PiB7XG4gIGNvbnN0IGVudiA9IGdldEVudigpXG4gIGxldCBkb21haW5QcmVmaXggPSAnJ1xuXG4gIHN3aXRjaCAoZW52KSB7XG4gICAgY2FzZSAnYmV0YSc6IGNhc2UgJ2Rldic6XG4gICAgICBkb21haW5QcmVmaXggPSAnbG9nLWJldGEnXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3Byb2R1Y3Rpb24nOiBjYXNlICdsaXZlJzpcbiAgICAgIGRvbWFpblByZWZpeCA9ICdhcHAnXG4gICAgICBicmVha1xuICB9XG5cbiAgY29uc3QgYmFzZVVSTCA9IGBodHRwczovLyR7ZG9tYWluUHJlZml4fS5hc3RybnQuY29gXG4gIHJldHVybiBgJHtiYXNlVVJMfS9hcGkvdjIvbG9ncy9hY3Rpdml0eWBcbn1cblxuY29uc3QgY29uc3RydWN0SW50ZXJ2aWV3SW5mbyA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgZGV2aWNlID0gZGV2aWNlSW5mbygpXG4gIGNvbnN0IHRpbWVab25lID0gRGF0ZVV0aWxzLmdldFRpbWV6b25lKClcbiAgY29uc3QgbG9nVGltZSA9IERhdGVVdGlscy5nZXRDdXJyZW50RGF0ZVRpbWUoKVxuICBjb25zdCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnRcbiAgY29uc3Qgb3MgPSBgJHtkZXZpY2Uub3N9ICgke2RldmljZS5vc1ZlcnNpb259KWBcbiAgY29uc3QgdmVyc2lvbiA9IGAke2RldmljZS5icm93c2VyfSwgVmVyc2lvbiAke2RldmljZS5icm93c2VyVmVyc2lvbn0gKCR7ZGV2aWNlLmJyb3dzZXJNYWpvclZlcnNpb259KWBcblxuICBsZXQgcmVjb3JkZWRQYXJhbSA9IGdldEJhc2VJbmZvKClcbiAgcmVjb3JkZWRQYXJhbS5ldmVudCA9IHBhcmFtcy5ldmVudCB8fCAnJ1xuICByZWNvcmRlZFBhcmFtLmFjdGl2aXR5ID0gcGFyYW1zLmFjdGl2aXR5IHx8ICcnXG4gIHJlY29yZGVkUGFyYW0ubWVzc2FnZSA9IHBhcmFtcy5tZXNzYWdlIHx8ICcnXG4gIHJlY29yZGVkUGFyYW0ub3MgPSBvc1xuICByZWNvcmRlZFBhcmFtLnZlcnNpb24gPSB2ZXJzaW9uXG4gIHJlY29yZGVkUGFyYW0uaW1laSA9IHVhXG4gIHJlY29yZGVkUGFyYW0ubG9nX3RpbWUgPSBsb2dUaW1lXG4gIHJlY29yZGVkUGFyYW0udGltZV96b25lID0gdGltZVpvbmVcblxuICByZXR1cm4gcmVjb3JkZWRQYXJhbVxufVxuXG5jb25zdCBzZW5kRXZlbnQgPSAocGFyYW1zKSA9PiB7XG4gIGxldCByZWNvcmRlZFBhcmFtcyA9IGdldEJhc2VJbmZvKClcbiAgaWYgKCFyZWNvcmRlZFBhcmFtcy5pc1Byb2N0b3JpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcmVzb2x2ZSgnbm8gYWN0aW9uJylcbiAgICB9KTtcbiAgfVxuICBjb25zdCBVUkwgPSBjb25zdHJ1Y3RVUkwoKVxuICBjb25zdCBsb2dJbmZvID0gY29uc3RydWN0SW50ZXJ2aWV3SW5mbyhwYXJhbXMpXG4gIGNvbnN0IHJlcXVlc3RQYXJhbXMgPSB7XG4gICAgYWN0aXZpdHk6IGxvZ0luZm8uYWN0aXZpdHksXG4gICAgaW50ZXJ2aWV3X2NvZGU6IGxvZ0luZm8uaW50ZXJ2aWV3Q29kZVxuICB9XG4gIC8vIGNvbnNvbGUubG9nKGxvZ0luZm8pXG4gIC8vIGNvbnNvbGUubG9nKHJlcXVlc3RQYXJhbXMpXG5cbiAgcmV0dXJuIGh0dHBIYW5kbGVyKCdQT1NUJywgVVJMLCByZXF1ZXN0UGFyYW1zKVxufVxuXG5jb25zdCBzdG9yZUV2ZW50ID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCBsb2dJdGVtcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvZ0luZm9zKVxuXG4gIGxldCBzdG9yZWRMb2dzXG4gIGlmICghbG9nSXRlbXMpIHtcbiAgICBzdG9yZWRMb2dzID0gW11cbiAgfSBlbHNlIHtcbiAgICBzdG9yZWRMb2dzID0gSlNPTi5wYXJzZShsb2dJdGVtcylcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShsb2dJbmZvcylcbiAgfVxuXG4gIGNvbnN0IGludGVydmlld0luZm8gPSBjb25zdHJ1Y3RJbnRlcnZpZXdJbmZvKHBhcmFtcylcbiAgc3RvcmVkTG9ncy5wdXNoKGludGVydmlld0luZm8pXG5cbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obG9nSW5mb3MsIEpTT04uc3RyaW5naWZ5KHN0b3JlZExvZ3MpKVxuXG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoaW50ZXJ2aWV3SW5mbylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemUoZW52LCBwYXJhbXMsIG9uRXJyb3IgPSAoKSA9PiB7fSwgb25VbmhhbmRsZWRSZWplY3Rpb24gPSAoKSA9PiB7fSkge1xuICBjb25zdCBiYXNlUGFyYW0gPSB7XG4gICAgJ2ludGVydmlld0NvZGUnOiBwYXJhbXMuaW50ZXJ2aWV3X2NvZGUgfHwgJycsXG4gICAgJ2NhbmRpZGF0ZV9pZCc6IHBhcmFtcy5jYW5kaWRhdGVfaWQgfHwgMCxcbiAgICAnam9iX2lkJzogcGFyYW1zLmpvYl9pZCB8fCAwLFxuICAgICdjb21wYW55X2lkJzogcGFyYW1zLmNvbXBhbnlfaWQgfHwgMCxcbiAgICAnaXNQcm9jdG9yaW5nJzogcGFyYW1zLmlzUHJvY3RvcmluZyB8fCAwXG4gIH1cblxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2dFbnYsIGVudilcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obG9nQmFzZUluZm8sIEpTT04uc3RyaW5naWZ5KGJhc2VQYXJhbSkpXG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGVyckV2dCkgPT4ge1xuICAgIG9uRXJyb3IoZXJyRXZ0LmVycm9yKVxuICAgIHJldHVybiBmYWxzZVxuICB9KVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd1bmhhbmRsZWRyZWplY3Rpb24nLCAoZXJyRXZ0KSA9PiB7XG4gICAgb25VbmhhbmRsZWRSZWplY3Rpb24oZXJyRXZ0LnJlYXNvbilcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlY29yZEV2ZW50KHBhcmFtcykge1xuICBzd2l0Y2ggKHBhcmFtcy5zdGF0dXMpIHtcbiAgICBjYXNlICdvbmxpbmUnOlxuICAgICAgcmV0dXJuIHNlbmRFdmVudChwYXJhbXMpXG5cbiAgICBjYXNlICdvZmZsaW5lJzpcbiAgICAgIHJldHVybiBzdG9yZUV2ZW50KHBhcmFtcylcbiAgfVxuXG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoJ05vIGV2ZW50IHRvIHNlbmQnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VuZFNhdmVkRXZlbnRzKCkge1xuICBjb25zdCBsb2dJdGVtcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvZ0luZm9zKVxuICBpZiAoIWxvZ0l0ZW1zKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gIH1cblxuICBjb25zdCBVUkwgPSBjb25zdHJ1Y3RVUkwoKVxuICBjb25zdCByZXF1ZXN0UGFyYW1zID0ge1xuICAgIGxvZ3M6IEpTT04ucGFyc2UobG9nSXRlbXMpXG4gIH1cblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGh0dHBIYW5kbGVyKCdQT1NUJywgVVJMLCByZXF1ZXN0UGFyYW1zKVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0obG9nSW5mb3MpXG4gICAgICAgIHJlc29sdmUocmVzdWx0KVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiByZWplY3QoZXJyb3IpKVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgc3RvcmFnZUtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSlcbiAgfSlcbn1cbiIsIlxuZXhwb3J0IGRlZmF1bHQgKG1ldGhvZCwgdXJsLCBwYXJhbXMsIG1pbWVUeXBlID0gJ2FwcGxpY2F0aW9uL2pzb24nKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuXG4gICAgcmVxdWVzdC5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKVxuXG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04JylcblxuICAgIGlmIChtaW1lVHlwZSAmJiByZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUpIHtcbiAgICAgIHJlcXVlc3Qub3ZlcnJpZGVNaW1lVHlwZShtaW1lVHlwZSlcbiAgICB9XG5cbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoZXZ0KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0XG4gICAgICBjb25zdCByZXNwb25zZSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dClcbiAgICAgIGNvbnN0IHJlc3BvbnNlQ29kZSA9IHJlc3BvbnNlLnN0YXR1cyB8fCByZXF1ZXN0LnN0YXR1c1xuXG4gICAgICBpZiAocmVzcG9uc2VDb2RlID49IDIwMCAmJiByZXNwb25zZUNvZGUgPCAzMDApIHtcbiAgICAgICAgcmVzb2x2ZShyZXNwb25zZSB8fCByZXNwb25zZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChyZXNwb25zZS5tZXNzYWdlIHx8IHJlc3BvbnNlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCByZXF1ZXN0UGFyYW1zID0gSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0UGFyYW1zKVxuICB9KVxufVxuIiwiXG5leHBvcnQgY29uc3QgZ2V0VGltZXpvbmUgPSAoKSA9PiB7XG4gIHZhciBjdXJyZW50VGltZSA9IG5ldyBEYXRlKClcbiAgdmFyIGN1cnJlbnRUaW1lem9uZSA9IGN1cnJlbnRUaW1lLmdldFRpbWV6b25lT2Zmc2V0KClcblxuICByZXR1cm4gKGN1cnJlbnRUaW1lem9uZSAvIDYwKSAqIC0xXG59XG5cbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50RGF0ZVRpbWUgPSAoKSA9PiB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gIGxldCBkID0gbmV3IERhdGUoZGF0ZSksXG4gICAgbW9udGggPSAnJyArIChkLmdldE1vbnRoKCkgKyAxKSxcbiAgICBkYXkgPSAnJyArIGQuZ2V0RGF0ZSgpLFxuICAgIHllYXIgPSBkLmdldEZ1bGxZZWFyKCksXG4gICAgaG91ciA9IGQuZ2V0SG91cnMoKSxcbiAgICBtaW51dGUgPSBkLmdldE1pbnV0ZXMoKSxcbiAgICBzZWNvbmQgPSBkLmdldFNlY29uZHMoKVxuXG4gIGlmIChtb250aC5sZW5ndGggPCAyKSB7XG4gICAgbW9udGggPSAnMCcgKyBtb250aFxuICB9XG5cbiAgaWYgKGRheS5sZW5ndGggPCAyKSB7XG4gICAgZGF5ID0gJzAnICsgZGF5XG4gIH1cblxuICBob3VyID0gaG91ciAlIDEyO1xuICBob3VyID0gaG91ciA/IGhvdXIgOiAxMjtcbiAgbWludXRlID0gbWludXRlIDwgMTAgPyAnMCcgKyBtaW51dGUgOiBtaW51dGU7XG5cbiAgY29uc3QgcmVzdWx0ID0gYCR7W3llYXIsIG1vbnRoLCBkYXldLmpvaW4oJy0nKX0gJHtob3VyfToke21pbnV0ZX06JHtzZWNvbmR9YFxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCIvKipcbiAqIHNvdXJjZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE4NzA2ODE4Lzk5Mzg1MzlcbiovXG5cbmNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudFxuY29uc3QgblZlciA9IG5hdmlnYXRvci5hcHBWZXJzaW9uXG5sZXQgY29va2llRW5hYmxlZCA9IG5hdmlnYXRvci5jb29raWVFbmFibGVkXG5cbmNvbnN0IGdldE9TSW5mbyA9ICgpID0+IHtcbiAgbGV0IG9zID0gJy0nXG4gIGxldCBvc1ZlcnNpb24gPSAnLSdcblxuICBjb25zdCBjbGllbnRTdHJpbmdzID0gW1xuICAgIHtzOiAnV2luZG93cyAxMCcsIHI6IC8oV2luZG93cyAxMC4wfFdpbmRvd3MgTlQgMTAuMCkvfSxcbiAgICB7czogJ1dpbmRvd3MgOC4xJywgcjogLyhXaW5kb3dzIDguMXxXaW5kb3dzIE5UIDYuMykvfSxcbiAgICB7czogJ1dpbmRvd3MgOCcsIHI6IC8oV2luZG93cyA4fFdpbmRvd3MgTlQgNi4yKS99LFxuICAgIHtzOiAnV2luZG93cyA3JywgcjogLyhXaW5kb3dzIDd8V2luZG93cyBOVCA2LjEpL30sXG4gICAge3M6ICdXaW5kb3dzIFZpc3RhJywgcjogL1dpbmRvd3MgTlQgNi4wL30sXG4gICAge3M6ICdXaW5kb3dzIFNlcnZlciAyMDAzJywgcjogL1dpbmRvd3MgTlQgNS4yL30sXG4gICAge3M6ICdXaW5kb3dzIFhQJywgcjogLyhXaW5kb3dzIE5UIDUuMXxXaW5kb3dzIFhQKS99LFxuICAgIHtzOiAnV2luZG93cyAyMDAwJywgcjogLyhXaW5kb3dzIE5UIDUuMHxXaW5kb3dzIDIwMDApL30sXG4gICAge3M6ICdXaW5kb3dzIE1FJywgcjogLyhXaW4gOXggNC45MHxXaW5kb3dzIE1FKS99LFxuICAgIHtzOiAnV2luZG93cyA5OCcsIHI6IC8oV2luZG93cyA5OHxXaW45OCkvfSxcbiAgICB7czogJ1dpbmRvd3MgOTUnLCByOiAvKFdpbmRvd3MgOTV8V2luOTV8V2luZG93c185NSkvfSxcbiAgICB7czogJ1dpbmRvd3MgTlQgNC4wJywgcjogLyhXaW5kb3dzIE5UIDQuMHxXaW5OVDQuMHxXaW5OVHxXaW5kb3dzIE5UKS99LFxuICAgIHtzOiAnV2luZG93cyBDRScsIHI6IC9XaW5kb3dzIENFL30sXG4gICAge3M6ICdXaW5kb3dzIDMuMTEnLCByOiAvV2luMTYvfSxcbiAgICB7czogJ0FuZHJvaWQnLCByOiAvQW5kcm9pZC99LFxuICAgIHtzOiAnT3BlbiBCU0QnLCByOiAvT3BlbkJTRC99LFxuICAgIHtzOiAnU3VuIE9TJywgcjogL1N1bk9TL30sXG4gICAge3M6ICdMaW51eCcsIHI6IC8oTGludXh8WDExKS99LFxuICAgIHtzOiAnaU9TJywgcjogLyhpUGhvbmV8aVBhZHxpUG9kKS99LFxuICAgIHtzOiAnTWFjIE9TIFgnLCByOiAvTWFjIE9TIFgvfSxcbiAgICB7czogJ01hYyBPUycsIHI6IC8oTWFjUFBDfE1hY0ludGVsfE1hY19Qb3dlclBDfE1hY2ludG9zaCkvfSxcbiAgICB7czogJ1FOWCcsIHI6IC9RTlgvfSxcbiAgICB7czogJ1VOSVgnLCByOiAvVU5JWC99LFxuICAgIHtzOiAnQmVPUycsIHI6IC9CZU9TL30sXG4gICAge3M6ICdPUy8yJywgcjogL09TXFwvMi99LFxuICAgIHtzOiAnU2VhcmNoIEJvdCcsIHI6IC8obnVoa3xHb29nbGVib3R8WWFtbXlib3R8T3BlbmJvdHxTbHVycHxNU05Cb3R8QXNrIEplZXZlc1xcL1Rlb21hfGlhX2FyY2hpdmVyKS99XG4gIF1cblxuICBmb3IgKGxldCBpZCBpbiBjbGllbnRTdHJpbmdzKSB7XG4gICAgbGV0IGNzID0gY2xpZW50U3RyaW5nc1tpZF1cbiAgICBpZiAoY3Muci50ZXN0KHVhKSkge1xuICAgICAgb3MgPSBjcy5zXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICgvV2luZG93cy8udGVzdChvcykpIHtcbiAgICBvc1ZlcnNpb24gPSAvV2luZG93cyAoLiopLy5leGVjKG9zKVsxXVxuICAgIG9zID0gJ1dpbmRvd3MnXG4gIH1cblxuICBzd2l0Y2ggKG9zKSB7XG4gICAgY2FzZSAnTWFjIE9TIFgnOlxuICAgICAgb3NWZXJzaW9uID0gL01hYyBPUyBYICgxMFtcXC5cXF9cXGRdKykvLmV4ZWModWEpWzFdXG4gICAgICBicmVha1xuXG4gICAgY2FzZSAnQW5kcm9pZCc6XG4gICAgICBvc1ZlcnNpb24gPSAvQW5kcm9pZCAoW1xcLlxcX1xcZF0rKS8uZXhlYyh1YSlbMV1cbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdpT1MnOlxuICAgICAgb3NWZXJzaW9uID0gL09TIChcXGQrKV8oXFxkKylfPyhcXGQrKT8vLmV4ZWMoblZlcilcbiAgICAgIG9zVmVyc2lvbiA9IG9zVmVyc2lvblsxXSArICcuJyArIG9zVmVyc2lvblsyXSArICcuJyArIChvc1ZlcnNpb25bM10gfCAwKVxuICAgICAgYnJlYWtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbmFtZTogb3MsXG4gICAgdmVyc2lvbjogb3NWZXJzaW9uXG4gIH1cbn1cblxuY29uc3QgZ2V0QnJvd3NlckluZm8gPSAoKSA9PiB7XG4gIGxldCBtYWpvclZlcnNpb24gPSBwYXJzZUludChuVmVyLCAxMClcbiAgbGV0IGJyb3dzZXIgPSBuYXZpZ2F0b3IuYXBwTmFtZVxuICBsZXQgdmVyc2lvbiA9ICcnICsgcGFyc2VGbG9hdChuYXZpZ2F0b3IuYXBwVmVyc2lvbilcbiAgbGV0IG5hbWVPZmZzZXQsIHZlck9mZnNldCwgaXhcblxuICBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ09wZXJhJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnT3BlcmEnXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA2KVxuICAgIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignVmVyc2lvbicpKSAhPT0gLTEpIHtcbiAgICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOClcbiAgICB9XG4gIH0gZWxzZSBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ09QUicpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ09wZXJhJ1xuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNClcbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignRWRnZScpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ01pY3Jvc29mdCBFZGdlJ1xuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNSlcbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignTVNJRScpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlcidcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDUpXG4gIH0gZWxzZSBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ0Nocm9tZScpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ0Nocm9tZSdcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDcpXG4gIH0gZWxzZSBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ1NhZmFyaScpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ1NhZmFyaSdcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDcpXG4gICAgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdWZXJzaW9uJykpICE9PSAtMSkge1xuICAgICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KVxuICAgIH1cbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignRmlyZWZveCcpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ0ZpcmVmb3gnXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KVxuICB9IGVsc2UgaWYgKHVhLmluZGV4T2YoJ1RyaWRlbnQvJykgIT09IC0xKSB7XG4gICAgYnJvd3NlciA9ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh1YS5pbmRleE9mKCdydjonKSArIDMpXG4gIH0gZWxzZSBpZiAoKG5hbWVPZmZzZXQgPSB1YS5sYXN0SW5kZXhPZignICcpICsgMSkgPCAodmVyT2Zmc2V0ID0gdWEubGFzdEluZGV4T2YoJy8nKSkpIHtcbiAgICBicm93c2VyID0gdWEuc3Vic3RyaW5nKG5hbWVPZmZzZXQsIHZlck9mZnNldClcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDEpXG4gICAgaWYgKGJyb3dzZXIudG9Mb3dlckNhc2UoKSA9PT0gYnJvd3Nlci50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBicm93c2VyID0gbmF2aWdhdG9yLmFwcE5hbWVcbiAgICB9XG4gIH1cblxuICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCcnKSkgIT09IC0xKSB7XG4gICAgdmVyc2lvbiA9IHZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KVxuICB9XG5cbiAgaWYgKChpeCA9IHZlcnNpb24uaW5kZXhPZignICcpKSAhPT0gLTEpIHtcbiAgICB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpXG4gIH1cblxuICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCcpJykpICE9PSAtMSkge1xuICAgIHZlcnNpb24gPSB2ZXJzaW9uLnN1YnN0cmluZygwLCBpeClcbiAgfVxuXG4gIG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KCcnICsgdmVyc2lvbiwgMTApXG4gIGlmIChpc05hTihtYWpvclZlcnNpb24pKSB7XG4gICAgdmVyc2lvbiA9ICcnICsgcGFyc2VGbG9hdChuVmVyKVxuICAgIG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KG5WZXIsIDEwKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBicm93c2VyIHx8ICcnLFxuICAgIHZlcnNpb246IHZlcnNpb24gfHwgJycsXG4gICAgbWFqb3JWZXJzaW9uOiBtYWpvclZlcnNpb24gfHwgJydcbiAgfVxufVxuXG5jb25zdCBnZXRTY3JlZW5TaXplID0gKCkgPT4ge1xuICBpZiAoIXNjcmVlbi53aWR0aCkge1xuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuXG4gIGNvbnN0IHdpZHRoID0gKHNjcmVlbi53aWR0aCkgPyBzY3JlZW4ud2lkdGggOiAnJ1xuICBjb25zdCBoZWlnaHQgPSAoc2NyZWVuLmhlaWdodCkgPyBzY3JlZW4uaGVpZ2h0IDogJydcblxuICByZXR1cm4gJycgKyB3aWR0aCArICcgeCAnICsgaGVpZ2h0XG59XG5cbmNvbnN0IGlzQ29va2llRW5hYmxlZCA9ICgpID0+IHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IuY29va2llRW5hYmxlZCA9PT0gJ3VuZGVmaW5lZCcgJiYgIWNvb2tpZUVuYWJsZWQpIHtcbiAgICBkb2N1bWVudC5jb29raWUgPSAndGVzdGNvb2tpZSdcbiAgICByZXR1cm4gZG9jdW1lbnQuY29va2llLmluZGV4T2YoJ3Rlc3Rjb29raWUnKSAhPT0gLTFcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGV2aWNlSW5mbygpIHtcbiAgY29uc3Qgb3MgPSBnZXRPU0luZm8oKVxuICBjb25zdCBicm93c2VyID0gZ2V0QnJvd3NlckluZm8oKVxuICBjb25zdCBzY3JlZW5TaXplID0gZ2V0U2NyZWVuU2l6ZSgpXG4gIGNvbnN0IG1vYmlsZSA9IC9Nb2JpbGV8bWluaXxGZW5uZWN8QW5kcm9pZHxpUChhZHxvZHxob25lKS8udGVzdChuVmVyKVxuXG4gIHJldHVybiB7XG4gICAgc2NyZWVuOiBzY3JlZW5TaXplLFxuICAgIGJyb3dzZXI6IGJyb3dzZXIubmFtZSxcbiAgICBicm93c2VyVmVyc2lvbjogYnJvd3Nlci52ZXJzaW9uLFxuICAgIGJyb3dzZXJNYWpvclZlcnNpb246IGJyb3dzZXIubWFqb3JWZXJzaW9uLFxuICAgIG1vYmlsZTogbW9iaWxlLFxuICAgIG9zOiBvcy5uYW1lLFxuICAgIG9zVmVyc2lvbjogb3MudmVyc2lvbixcbiAgICBjb29raWVzOiBpc0Nvb2tpZUVuYWJsZWRcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==