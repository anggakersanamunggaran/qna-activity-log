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
  return "".concat(baseURL, "/api/v2/activity/logs");
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
  var URL = constructURL();
  var logInfo = constructInterviewInfo(params);
  var requestParams = {
    activity: logInfo.activity,
    interview_code: logInfo.interview_code
  };
  console.log(requestParams);
  console.log(requestParams);
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
    'company_id': params.company_id || 0
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
        resolve(response.message || response);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xbmEtYWN0aXZpdHktbG9nL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9xbmEtYWN0aXZpdHktbG9nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3FuYS1hY3Rpdml0eS1sb2cvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcW5hLWFjdGl2aXR5LWxvZy8uL3NyYy91dGlscy9hc3RybnQtaHR0cC1oYW5kbGVyLmpzIiwid2VicGFjazovL3FuYS1hY3Rpdml0eS1sb2cvLi9zcmMvdXRpbHMvZGF0ZS11dGlscy5qcyIsIndlYnBhY2s6Ly9xbmEtYWN0aXZpdHktbG9nLy4vc3JjL3V0aWxzL25hdmlnYXRpb24taGVscGVyLmpzIl0sIm5hbWVzIjpbImxvZ0VudiIsImxvZ0Jhc2VJbmZvIiwibG9nSW5mb3MiLCJzdG9yYWdlS2V5cyIsImdldEVudiIsImVudiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJnZXRCYXNlSW5mbyIsImluZm8iLCJKU09OIiwicGFyc2UiLCJjb25zdHJ1Y3RVUkwiLCJkb21haW5QcmVmaXgiLCJiYXNlVVJMIiwiY29uc3RydWN0SW50ZXJ2aWV3SW5mbyIsInBhcmFtcyIsImRldmljZSIsImRldmljZUluZm8iLCJ0aW1lWm9uZSIsIkRhdGVVdGlscyIsImxvZ1RpbWUiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm9zIiwib3NWZXJzaW9uIiwidmVyc2lvbiIsImJyb3dzZXIiLCJicm93c2VyVmVyc2lvbiIsImJyb3dzZXJNYWpvclZlcnNpb24iLCJyZWNvcmRlZFBhcmFtIiwiZXZlbnQiLCJhY3Rpdml0eSIsIm1lc3NhZ2UiLCJpbWVpIiwibG9nX3RpbWUiLCJ0aW1lX3pvbmUiLCJzZW5kRXZlbnQiLCJVUkwiLCJsb2dJbmZvIiwicmVxdWVzdFBhcmFtcyIsImludGVydmlld19jb2RlIiwiY29uc29sZSIsImxvZyIsImh0dHBIYW5kbGVyIiwic3RvcmVFdmVudCIsImxvZ0l0ZW1zIiwic3RvcmVkTG9ncyIsInJlbW92ZUl0ZW0iLCJpbnRlcnZpZXdJbmZvIiwicHVzaCIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJQcm9taXNlIiwicmVzb2x2ZSIsImluaXRpYWxpemUiLCJvbkVycm9yIiwib25VbmhhbmRsZWRSZWplY3Rpb24iLCJiYXNlUGFyYW0iLCJjYW5kaWRhdGVfaWQiLCJqb2JfaWQiLCJjb21wYW55X2lkIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImVyckV2dCIsImVycm9yIiwicmVhc29uIiwicmVjb3JkRXZlbnQiLCJzdGF0dXMiLCJzZW5kU2F2ZWRFdmVudHMiLCJsb2dzIiwicmVqZWN0IiwidGhlbiIsInJlc3VsdCIsImNhdGNoIiwiY2xlYXJDYWNoZSIsImZvckVhY2giLCJrZXkiLCJtZXRob2QiLCJ1cmwiLCJtaW1lVHlwZSIsInJlcXVlc3QiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwib3ZlcnJpZGVNaW1lVHlwZSIsImV2dCIsInRhcmdldCIsInJlc3BvbnNlIiwicmVzcG9uc2VUZXh0IiwicmVzcG9uc2VDb2RlIiwic2VuZCIsImdldFRpbWV6b25lIiwiY3VycmVudFRpbWUiLCJEYXRlIiwiY3VycmVudFRpbWV6b25lIiwiZ2V0VGltZXpvbmVPZmZzZXQiLCJnZXRDdXJyZW50RGF0ZVRpbWUiLCJkYXRlIiwiZCIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwiaG91ciIsImdldEhvdXJzIiwibWludXRlIiwiZ2V0TWludXRlcyIsInNlY29uZCIsImdldFNlY29uZHMiLCJsZW5ndGgiLCJqb2luIiwiblZlciIsImFwcFZlcnNpb24iLCJjb29raWVFbmFibGVkIiwiZ2V0T1NJbmZvIiwiY2xpZW50U3RyaW5ncyIsInMiLCJyIiwiaWQiLCJjcyIsInRlc3QiLCJleGVjIiwibmFtZSIsImdldEJyb3dzZXJJbmZvIiwibWFqb3JWZXJzaW9uIiwicGFyc2VJbnQiLCJhcHBOYW1lIiwicGFyc2VGbG9hdCIsIm5hbWVPZmZzZXQiLCJ2ZXJPZmZzZXQiLCJpeCIsImluZGV4T2YiLCJzdWJzdHJpbmciLCJsYXN0SW5kZXhPZiIsInRvTG93ZXJDYXNlIiwidG9VcHBlckNhc2UiLCJpc05hTiIsImdldFNjcmVlblNpemUiLCJzY3JlZW4iLCJ3aWR0aCIsInVuZGVmaW5lZCIsImhlaWdodCIsImlzQ29va2llRW5hYmxlZCIsImRvY3VtZW50IiwiY29va2llIiwic2NyZWVuU2l6ZSIsIm1vYmlsZSIsImNvb2tpZXMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxNQUFNLEdB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NEgsV0FBTyxFQUFFTDtBQVJKLEdBQVA7QUFVRCxDIiwiZmlsZSI6InFuYS1hY3Rpdml0eS1sb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcInFuYS1hY3Rpdml0eS1sb2dcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wicW5hLWFjdGl2aXR5LWxvZ1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJxbmEtYWN0aXZpdHktbG9nXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IGh0dHBIYW5kbGVyIGZyb20gJ3V0aWxzL2FzdHJudC1odHRwLWhhbmRsZXInXG5pbXBvcnQgeyBkZXZpY2VJbmZvIH0gZnJvbSAndXRpbHMvbmF2aWdhdGlvbi1oZWxwZXInXG5pbXBvcnQgKiBhcyBEYXRlVXRpbHMgZnJvbSAndXRpbHMvZGF0ZS11dGlscydcblxuY29uc3QgbG9nRW52ID0gJ0FTVFJOVF9BQ1RJVklUWV9MT0dfRU5WJ1xuY29uc3QgbG9nQmFzZUluZm8gPSAnQVNUUk5UX0JBU0VfQUNUSVZJVFlfTE9HX0lORk8nXG5jb25zdCBsb2dJbmZvcyA9ICdBU1RSTlRfTE9HX0FDVElWSVRZX0lORk9TJ1xuY29uc3Qgc3RvcmFnZUtleXMgPSBbXG4gIGxvZ0VudixcbiAgbG9nQmFzZUluZm8sXG4gIGxvZ0luZm9zXG5dXG5cbmNvbnN0IGdldEVudiA9ICgpID0+IHtcbiAgY29uc3QgZW52ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9nRW52KVxuICByZXR1cm4gZW52XG59XG5cbmNvbnN0IGdldEJhc2VJbmZvID0gKCkgPT4ge1xuICBjb25zdCBpbmZvID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9nQmFzZUluZm8pXG4gIHJldHVybiBKU09OLnBhcnNlKGluZm8pXG59XG5cbmNvbnN0IGNvbnN0cnVjdFVSTCA9ICgpID0+IHtcbiAgY29uc3QgZW52ID0gZ2V0RW52KClcbiAgbGV0IGRvbWFpblByZWZpeCA9ICcnXG5cbiAgc3dpdGNoIChlbnYpIHtcbiAgICBjYXNlICdiZXRhJzogY2FzZSAnZGV2JzpcbiAgICAgIGRvbWFpblByZWZpeCA9ICdsb2ctYmV0YSdcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAncHJvZHVjdGlvbic6IGNhc2UgJ2xpdmUnOlxuICAgICAgZG9tYWluUHJlZml4ID0gJ2FwcCdcbiAgICAgIGJyZWFrXG4gIH1cblxuICBjb25zdCBiYXNlVVJMID0gYGh0dHBzOi8vJHtkb21haW5QcmVmaXh9LmFzdHJudC5jb2BcbiAgcmV0dXJuIGAke2Jhc2VVUkx9L2FwaS92Mi9hY3Rpdml0eS9sb2dzYFxufVxuXG5jb25zdCBjb25zdHJ1Y3RJbnRlcnZpZXdJbmZvID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCBkZXZpY2UgPSBkZXZpY2VJbmZvKClcbiAgY29uc3QgdGltZVpvbmUgPSBEYXRlVXRpbHMuZ2V0VGltZXpvbmUoKVxuICBjb25zdCBsb2dUaW1lID0gRGF0ZVV0aWxzLmdldEN1cnJlbnREYXRlVGltZSgpXG4gIGNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudFxuICBjb25zdCBvcyA9IGAke2RldmljZS5vc30gKCR7ZGV2aWNlLm9zVmVyc2lvbn0pYFxuICBjb25zdCB2ZXJzaW9uID0gYCR7ZGV2aWNlLmJyb3dzZXJ9LCBWZXJzaW9uICR7ZGV2aWNlLmJyb3dzZXJWZXJzaW9ufSAoJHtkZXZpY2UuYnJvd3Nlck1ham9yVmVyc2lvbn0pYFxuXG4gIGxldCByZWNvcmRlZFBhcmFtID0gZ2V0QmFzZUluZm8oKVxuICByZWNvcmRlZFBhcmFtLmV2ZW50ID0gcGFyYW1zLmV2ZW50IHx8ICcnXG4gIHJlY29yZGVkUGFyYW0uYWN0aXZpdHkgPSBwYXJhbXMuYWN0aXZpdHkgfHwgJydcbiAgcmVjb3JkZWRQYXJhbS5tZXNzYWdlID0gcGFyYW1zLm1lc3NhZ2UgfHwgJydcbiAgcmVjb3JkZWRQYXJhbS5vcyA9IG9zXG4gIHJlY29yZGVkUGFyYW0udmVyc2lvbiA9IHZlcnNpb25cbiAgcmVjb3JkZWRQYXJhbS5pbWVpID0gdWFcbiAgcmVjb3JkZWRQYXJhbS5sb2dfdGltZSA9IGxvZ1RpbWVcbiAgcmVjb3JkZWRQYXJhbS50aW1lX3pvbmUgPSB0aW1lWm9uZVxuXG4gIHJldHVybiByZWNvcmRlZFBhcmFtXG59XG5cbmNvbnN0IHNlbmRFdmVudCA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgVVJMID0gY29uc3RydWN0VVJMKClcbiAgY29uc3QgbG9nSW5mbyA9IGNvbnN0cnVjdEludGVydmlld0luZm8ocGFyYW1zKVxuICBjb25zdCByZXF1ZXN0UGFyYW1zID0ge1xuICAgIGFjdGl2aXR5OiBsb2dJbmZvLmFjdGl2aXR5LFxuICAgIGludGVydmlld19jb2RlOiBsb2dJbmZvLmludGVydmlld19jb2RlXG4gIH1cbiAgY29uc29sZS5sb2cocmVxdWVzdFBhcmFtcylcbiAgY29uc29sZS5sb2cocmVxdWVzdFBhcmFtcylcblxuICByZXR1cm4gaHR0cEhhbmRsZXIoJ1BPU1QnLCBVUkwsIHJlcXVlc3RQYXJhbXMpXG59XG5cbmNvbnN0IHN0b3JlRXZlbnQgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IGxvZ0l0ZW1zID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9nSW5mb3MpXG5cbiAgbGV0IHN0b3JlZExvZ3NcbiAgaWYgKCFsb2dJdGVtcykge1xuICAgIHN0b3JlZExvZ3MgPSBbXVxuICB9IGVsc2Uge1xuICAgIHN0b3JlZExvZ3MgPSBKU09OLnBhcnNlKGxvZ0l0ZW1zKVxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGxvZ0luZm9zKVxuICB9XG5cbiAgY29uc3QgaW50ZXJ2aWV3SW5mbyA9IGNvbnN0cnVjdEludGVydmlld0luZm8ocGFyYW1zKVxuICBzdG9yZWRMb2dzLnB1c2goaW50ZXJ2aWV3SW5mbylcblxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2dJbmZvcywgSlNPTi5zdHJpbmdpZnkoc3RvcmVkTG9ncykpXG5cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpbnRlcnZpZXdJbmZvKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZShlbnYsIHBhcmFtcywgb25FcnJvciA9ICgpID0+IHt9LCBvblVuaGFuZGxlZFJlamVjdGlvbiA9ICgpID0+IHt9KSB7XG4gIGNvbnN0IGJhc2VQYXJhbSA9IHtcbiAgICAnaW50ZXJ2aWV3Q29kZSc6IHBhcmFtcy5pbnRlcnZpZXdfY29kZSB8fCAnJyxcbiAgICAnY2FuZGlkYXRlX2lkJzogcGFyYW1zLmNhbmRpZGF0ZV9pZCB8fCAwLFxuICAgICdqb2JfaWQnOiBwYXJhbXMuam9iX2lkIHx8IDAsXG4gICAgJ2NvbXBhbnlfaWQnOiBwYXJhbXMuY29tcGFueV9pZCB8fCAwXG4gIH1cblxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2dFbnYsIGVudilcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obG9nQmFzZUluZm8sIEpTT04uc3RyaW5naWZ5KGJhc2VQYXJhbSkpXG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGVyckV2dCkgPT4ge1xuICAgIG9uRXJyb3IoZXJyRXZ0LmVycm9yKVxuICAgIHJldHVybiBmYWxzZVxuICB9KVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd1bmhhbmRsZWRyZWplY3Rpb24nLCAoZXJyRXZ0KSA9PiB7XG4gICAgb25VbmhhbmRsZWRSZWplY3Rpb24oZXJyRXZ0LnJlYXNvbilcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlY29yZEV2ZW50KHBhcmFtcykge1xuICBzd2l0Y2ggKHBhcmFtcy5zdGF0dXMpIHtcbiAgICBjYXNlICdvbmxpbmUnOlxuICAgICAgcmV0dXJuIHNlbmRFdmVudChwYXJhbXMpXG5cbiAgICBjYXNlICdvZmZsaW5lJzpcbiAgICAgIHJldHVybiBzdG9yZUV2ZW50KHBhcmFtcylcbiAgfVxuXG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoJ05vIGV2ZW50IHRvIHNlbmQnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VuZFNhdmVkRXZlbnRzKCkge1xuICBjb25zdCBsb2dJdGVtcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvZ0luZm9zKVxuICBpZiAoIWxvZ0l0ZW1zKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gIH1cblxuICBjb25zdCBVUkwgPSBjb25zdHJ1Y3RVUkwoKVxuICBjb25zdCByZXF1ZXN0UGFyYW1zID0ge1xuICAgIGxvZ3M6IEpTT04ucGFyc2UobG9nSXRlbXMpXG4gIH1cblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGh0dHBIYW5kbGVyKCdQT1NUJywgVVJMLCByZXF1ZXN0UGFyYW1zKVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0obG9nSW5mb3MpXG4gICAgICAgIHJlc29sdmUocmVzdWx0KVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiByZWplY3QoZXJyb3IpKVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgc3RvcmFnZUtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSlcbiAgfSlcbn1cbiIsIlxuZXhwb3J0IGRlZmF1bHQgKG1ldGhvZCwgdXJsLCBwYXJhbXMsIG1pbWVUeXBlID0gJ2FwcGxpY2F0aW9uL2pzb24nKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuXG4gICAgcmVxdWVzdC5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKVxuXG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04JylcblxuICAgIGlmIChtaW1lVHlwZSAmJiByZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUpIHtcbiAgICAgIHJlcXVlc3Qub3ZlcnJpZGVNaW1lVHlwZShtaW1lVHlwZSlcbiAgICB9XG5cbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoZXZ0KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0XG4gICAgICBjb25zdCByZXNwb25zZSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dClcbiAgICAgIGNvbnN0IHJlc3BvbnNlQ29kZSA9IHJlc3BvbnNlLnN0YXR1cyB8fCByZXF1ZXN0LnN0YXR1c1xuXG4gICAgICBpZiAocmVzcG9uc2VDb2RlID49IDIwMCAmJiByZXNwb25zZUNvZGUgPCAzMDApIHtcbiAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5tZXNzYWdlIHx8IHJlc3BvbnNlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KHJlc3BvbnNlLm1lc3NhZ2UgfHwgcmVzcG9uc2UpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHJlcXVlc3RQYXJhbXMgPSBKU09OLnN0cmluZ2lmeShwYXJhbXMpXG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3RQYXJhbXMpXG4gIH0pXG59XG4iLCJcbmV4cG9ydCBjb25zdCBnZXRUaW1lem9uZSA9ICgpID0+IHtcbiAgdmFyIGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKVxuICB2YXIgY3VycmVudFRpbWV6b25lID0gY3VycmVudFRpbWUuZ2V0VGltZXpvbmVPZmZzZXQoKVxuXG4gIHJldHVybiAoY3VycmVudFRpbWV6b25lIC8gNjApICogLTFcbn1cblxuZXhwb3J0IGNvbnN0IGdldEN1cnJlbnREYXRlVGltZSA9ICgpID0+IHtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKClcbiAgbGV0IGQgPSBuZXcgRGF0ZShkYXRlKSxcbiAgICBtb250aCA9ICcnICsgKGQuZ2V0TW9udGgoKSArIDEpLFxuICAgIGRheSA9ICcnICsgZC5nZXREYXRlKCksXG4gICAgeWVhciA9IGQuZ2V0RnVsbFllYXIoKSxcbiAgICBob3VyID0gZC5nZXRIb3VycygpLFxuICAgIG1pbnV0ZSA9IGQuZ2V0TWludXRlcygpLFxuICAgIHNlY29uZCA9IGQuZ2V0U2Vjb25kcygpXG5cbiAgaWYgKG1vbnRoLmxlbmd0aCA8IDIpIHtcbiAgICBtb250aCA9ICcwJyArIG1vbnRoXG4gIH1cblxuICBpZiAoZGF5Lmxlbmd0aCA8IDIpIHtcbiAgICBkYXkgPSAnMCcgKyBkYXlcbiAgfVxuXG4gIGhvdXIgPSBob3VyICUgMTI7XG4gIGhvdXIgPSBob3VyID8gaG91ciA6IDEyO1xuICBtaW51dGUgPSBtaW51dGUgPCAxMCA/ICcwJyArIG1pbnV0ZSA6IG1pbnV0ZTtcblxuICBjb25zdCByZXN1bHQgPSBgJHtbeWVhciwgbW9udGgsIGRheV0uam9pbignLScpfSAke2hvdXJ9OiR7bWludXRlfToke3NlY29uZH1gXG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsIi8qKlxuICogc291cmNlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTg3MDY4MTgvOTkzODUzOVxuKi9cblxuY29uc3QgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50XG5jb25zdCBuVmVyID0gbmF2aWdhdG9yLmFwcFZlcnNpb25cbmxldCBjb29raWVFbmFibGVkID0gbmF2aWdhdG9yLmNvb2tpZUVuYWJsZWRcblxuY29uc3QgZ2V0T1NJbmZvID0gKCkgPT4ge1xuICBsZXQgb3MgPSAnLSdcbiAgbGV0IG9zVmVyc2lvbiA9ICctJ1xuXG4gIGNvbnN0IGNsaWVudFN0cmluZ3MgPSBbXG4gICAge3M6ICdXaW5kb3dzIDEwJywgcjogLyhXaW5kb3dzIDEwLjB8V2luZG93cyBOVCAxMC4wKS99LFxuICAgIHtzOiAnV2luZG93cyA4LjEnLCByOiAvKFdpbmRvd3MgOC4xfFdpbmRvd3MgTlQgNi4zKS99LFxuICAgIHtzOiAnV2luZG93cyA4JywgcjogLyhXaW5kb3dzIDh8V2luZG93cyBOVCA2LjIpL30sXG4gICAge3M6ICdXaW5kb3dzIDcnLCByOiAvKFdpbmRvd3MgN3xXaW5kb3dzIE5UIDYuMSkvfSxcbiAgICB7czogJ1dpbmRvd3MgVmlzdGEnLCByOiAvV2luZG93cyBOVCA2LjAvfSxcbiAgICB7czogJ1dpbmRvd3MgU2VydmVyIDIwMDMnLCByOiAvV2luZG93cyBOVCA1LjIvfSxcbiAgICB7czogJ1dpbmRvd3MgWFAnLCByOiAvKFdpbmRvd3MgTlQgNS4xfFdpbmRvd3MgWFApL30sXG4gICAge3M6ICdXaW5kb3dzIDIwMDAnLCByOiAvKFdpbmRvd3MgTlQgNS4wfFdpbmRvd3MgMjAwMCkvfSxcbiAgICB7czogJ1dpbmRvd3MgTUUnLCByOiAvKFdpbiA5eCA0LjkwfFdpbmRvd3MgTUUpL30sXG4gICAge3M6ICdXaW5kb3dzIDk4JywgcjogLyhXaW5kb3dzIDk4fFdpbjk4KS99LFxuICAgIHtzOiAnV2luZG93cyA5NScsIHI6IC8oV2luZG93cyA5NXxXaW45NXxXaW5kb3dzXzk1KS99LFxuICAgIHtzOiAnV2luZG93cyBOVCA0LjAnLCByOiAvKFdpbmRvd3MgTlQgNC4wfFdpbk5UNC4wfFdpbk5UfFdpbmRvd3MgTlQpL30sXG4gICAge3M6ICdXaW5kb3dzIENFJywgcjogL1dpbmRvd3MgQ0UvfSxcbiAgICB7czogJ1dpbmRvd3MgMy4xMScsIHI6IC9XaW4xNi99LFxuICAgIHtzOiAnQW5kcm9pZCcsIHI6IC9BbmRyb2lkL30sXG4gICAge3M6ICdPcGVuIEJTRCcsIHI6IC9PcGVuQlNEL30sXG4gICAge3M6ICdTdW4gT1MnLCByOiAvU3VuT1MvfSxcbiAgICB7czogJ0xpbnV4JywgcjogLyhMaW51eHxYMTEpL30sXG4gICAge3M6ICdpT1MnLCByOiAvKGlQaG9uZXxpUGFkfGlQb2QpL30sXG4gICAge3M6ICdNYWMgT1MgWCcsIHI6IC9NYWMgT1MgWC99LFxuICAgIHtzOiAnTWFjIE9TJywgcjogLyhNYWNQUEN8TWFjSW50ZWx8TWFjX1Bvd2VyUEN8TWFjaW50b3NoKS99LFxuICAgIHtzOiAnUU5YJywgcjogL1FOWC99LFxuICAgIHtzOiAnVU5JWCcsIHI6IC9VTklYL30sXG4gICAge3M6ICdCZU9TJywgcjogL0JlT1MvfSxcbiAgICB7czogJ09TLzInLCByOiAvT1NcXC8yL30sXG4gICAge3M6ICdTZWFyY2ggQm90JywgcjogLyhudWhrfEdvb2dsZWJvdHxZYW1teWJvdHxPcGVuYm90fFNsdXJwfE1TTkJvdHxBc2sgSmVldmVzXFwvVGVvbWF8aWFfYXJjaGl2ZXIpL31cbiAgXVxuXG4gIGZvciAobGV0IGlkIGluIGNsaWVudFN0cmluZ3MpIHtcbiAgICBsZXQgY3MgPSBjbGllbnRTdHJpbmdzW2lkXVxuICAgIGlmIChjcy5yLnRlc3QodWEpKSB7XG4gICAgICBvcyA9IGNzLnNcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKC9XaW5kb3dzLy50ZXN0KG9zKSkge1xuICAgIG9zVmVyc2lvbiA9IC9XaW5kb3dzICguKikvLmV4ZWMob3MpWzFdXG4gICAgb3MgPSAnV2luZG93cydcbiAgfVxuXG4gIHN3aXRjaCAob3MpIHtcbiAgICBjYXNlICdNYWMgT1MgWCc6XG4gICAgICBvc1ZlcnNpb24gPSAvTWFjIE9TIFggKDEwW1xcLlxcX1xcZF0rKS8uZXhlYyh1YSlbMV1cbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdBbmRyb2lkJzpcbiAgICAgIG9zVmVyc2lvbiA9IC9BbmRyb2lkIChbXFwuXFxfXFxkXSspLy5leGVjKHVhKVsxXVxuICAgICAgYnJlYWtcblxuICAgIGNhc2UgJ2lPUyc6XG4gICAgICBvc1ZlcnNpb24gPSAvT1MgKFxcZCspXyhcXGQrKV8/KFxcZCspPy8uZXhlYyhuVmVyKVxuICAgICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uWzFdICsgJy4nICsgb3NWZXJzaW9uWzJdICsgJy4nICsgKG9zVmVyc2lvblszXSB8IDApXG4gICAgICBicmVha1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBvcyxcbiAgICB2ZXJzaW9uOiBvc1ZlcnNpb25cbiAgfVxufVxuXG5jb25zdCBnZXRCcm93c2VySW5mbyA9ICgpID0+IHtcbiAgbGV0IG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KG5WZXIsIDEwKVxuICBsZXQgYnJvd3NlciA9IG5hdmlnYXRvci5hcHBOYW1lXG4gIGxldCB2ZXJzaW9uID0gJycgKyBwYXJzZUZsb2F0KG5hdmlnYXRvci5hcHBWZXJzaW9uKVxuICBsZXQgbmFtZU9mZnNldCwgdmVyT2Zmc2V0LCBpeFxuXG4gIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignT3BlcmEnKSkgIT09IC0xKSB7XG4gICAgYnJvd3NlciA9ICdPcGVyYSdcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDYpXG4gICAgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdWZXJzaW9uJykpICE9PSAtMSkge1xuICAgICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KVxuICAgIH1cbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignT1BSJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnT3BlcmEnXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA0KVxuICB9IGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdFZGdlJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEVkZ2UnXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA1KVxuICB9IGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdNU0lFJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyJ1xuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNSlcbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignQ2hyb21lJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnQ2hyb21lJ1xuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNylcbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignU2FmYXJpJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnU2FmYXJpJ1xuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNylcbiAgICBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ1ZlcnNpb24nKSkgIT09IC0xKSB7XG4gICAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDgpXG4gICAgfVxuICB9IGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdGaXJlZm94JykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnRmlyZWZveCdcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDgpXG4gIH0gZWxzZSBpZiAodWEuaW5kZXhPZignVHJpZGVudC8nKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlcidcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHVhLmluZGV4T2YoJ3J2OicpICsgMylcbiAgfSBlbHNlIGlmICgobmFtZU9mZnNldCA9IHVhLmxhc3RJbmRleE9mKCcgJykgKyAxKSA8ICh2ZXJPZmZzZXQgPSB1YS5sYXN0SW5kZXhPZignLycpKSkge1xuICAgIGJyb3dzZXIgPSB1YS5zdWJzdHJpbmcobmFtZU9mZnNldCwgdmVyT2Zmc2V0KVxuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgMSlcbiAgICBpZiAoYnJvd3Nlci50b0xvd2VyQ2FzZSgpID09PSBicm93c2VyLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGJyb3dzZXIgPSBuYXZpZ2F0b3IuYXBwTmFtZVxuICAgIH1cbiAgfVxuXG4gIGlmICgoaXggPSB2ZXJzaW9uLmluZGV4T2YoJycpKSAhPT0gLTEpIHtcbiAgICB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpXG4gIH1cblxuICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCcgJykpICE9PSAtMSkge1xuICAgIHZlcnNpb24gPSB2ZXJzaW9uLnN1YnN0cmluZygwLCBpeClcbiAgfVxuXG4gIGlmICgoaXggPSB2ZXJzaW9uLmluZGV4T2YoJyknKSkgIT09IC0xKSB7XG4gICAgdmVyc2lvbiA9IHZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KVxuICB9XG5cbiAgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQoJycgKyB2ZXJzaW9uLCAxMClcbiAgaWYgKGlzTmFOKG1ham9yVmVyc2lvbikpIHtcbiAgICB2ZXJzaW9uID0gJycgKyBwYXJzZUZsb2F0KG5WZXIpXG4gICAgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQoblZlciwgMTApXG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5hbWU6IGJyb3dzZXIgfHwgJycsXG4gICAgdmVyc2lvbjogdmVyc2lvbiB8fCAnJyxcbiAgICBtYWpvclZlcnNpb246IG1ham9yVmVyc2lvbiB8fCAnJ1xuICB9XG59XG5cbmNvbnN0IGdldFNjcmVlblNpemUgPSAoKSA9PiB7XG4gIGlmICghc2NyZWVuLndpZHRoKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG5cbiAgY29uc3Qgd2lkdGggPSAoc2NyZWVuLndpZHRoKSA/IHNjcmVlbi53aWR0aCA6ICcnXG4gIGNvbnN0IGhlaWdodCA9IChzY3JlZW4uaGVpZ2h0KSA/IHNjcmVlbi5oZWlnaHQgOiAnJ1xuXG4gIHJldHVybiAnJyArIHdpZHRoICsgJyB4ICcgKyBoZWlnaHRcbn1cblxuY29uc3QgaXNDb29raWVFbmFibGVkID0gKCkgPT4ge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvci5jb29raWVFbmFibGVkID09PSAndW5kZWZpbmVkJyAmJiAhY29va2llRW5hYmxlZCkge1xuICAgIGRvY3VtZW50LmNvb2tpZSA9ICd0ZXN0Y29va2llJ1xuICAgIHJldHVybiBkb2N1bWVudC5jb29raWUuaW5kZXhPZigndGVzdGNvb2tpZScpICE9PSAtMVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXZpY2VJbmZvKCkge1xuICBjb25zdCBvcyA9IGdldE9TSW5mbygpXG4gIGNvbnN0IGJyb3dzZXIgPSBnZXRCcm93c2VySW5mbygpXG4gIGNvbnN0IHNjcmVlblNpemUgPSBnZXRTY3JlZW5TaXplKClcbiAgY29uc3QgbW9iaWxlID0gL01vYmlsZXxtaW5pfEZlbm5lY3xBbmRyb2lkfGlQKGFkfG9kfGhvbmUpLy50ZXN0KG5WZXIpXG5cbiAgcmV0dXJuIHtcbiAgICBzY3JlZW46IHNjcmVlblNpemUsXG4gICAgYnJvd3NlcjogYnJvd3Nlci5uYW1lLFxuICAgIGJyb3dzZXJWZXJzaW9uOiBicm93c2VyLnZlcnNpb24sXG4gICAgYnJvd3Nlck1ham9yVmVyc2lvbjogYnJvd3Nlci5tYWpvclZlcnNpb24sXG4gICAgbW9iaWxlOiBtb2JpbGUsXG4gICAgb3M6IG9zLm5hbWUsXG4gICAgb3NWZXJzaW9uOiBvcy52ZXJzaW9uLFxuICAgIGNvb2tpZXM6IGlzQ29va2llRW5hYmxlZFxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9