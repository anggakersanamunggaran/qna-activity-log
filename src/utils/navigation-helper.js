/**
 * source: https://stackoverflow.com/a/18706818/9938539
*/

const ua = navigator.userAgent
const nVer = navigator.appVersion
let cookieEnabled = navigator.cookieEnabled

const getOSInfo = () => {
  let os = '-'
  let osVersion = '-'

  const clientStrings = [
    {s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/},
    {s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/},
    {s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/},
    {s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/},
    {s: 'Windows Vista', r: /Windows NT 6.0/},
    {s: 'Windows Server 2003', r: /Windows NT 5.2/},
    {s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/},
    {s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/},
    {s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/},
    {s: 'Windows 98', r: /(Windows 98|Win98)/},
    {s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/},
    {s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
    {s: 'Windows CE', r: /Windows CE/},
    {s: 'Windows 3.11', r: /Win16/},
    {s: 'Android', r: /Android/},
    {s: 'Open BSD', r: /OpenBSD/},
    {s: 'Sun OS', r: /SunOS/},
    {s: 'Linux', r: /(Linux|X11)/},
    {s: 'iOS', r: /(iPhone|iPad|iPod)/},
    {s: 'Mac OS X', r: /Mac OS X/},
    {s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
    {s: 'QNX', r: /QNX/},
    {s: 'UNIX', r: /UNIX/},
    {s: 'BeOS', r: /BeOS/},
    {s: 'OS/2', r: /OS\/2/},
    {s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
  ]

  for (let id in clientStrings) {
    let cs = clientStrings[id]
    if (cs.r.test(ua)) {
      os = cs.s
      break
    }
  }

  if (/Windows/.test(os)) {
    osVersion = /Windows (.*)/.exec(os)[1]
    os = 'Windows'
  }

  switch (os) {
    case 'Mac OS X':
      osVersion = /Mac OS X (10[\.\_\d]+)/.exec(ua)[1]
      break

    case 'Android':
      osVersion = /Android ([\.\_\d]+)/.exec(ua)[1]
      break

    case 'iOS':
      osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer)
      osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0)
      break
  }

  return {
    name: os,
    version: osVersion
  }
}

const getBrowserInfo = () => {
  let majorVersion = parseInt(nVer, 10)
  let browser = navigator.appName
  let version = '' + parseFloat(navigator.appVersion)
  let nameOffset, verOffset, ix

  if ((verOffset = ua.indexOf('Opera')) !== -1) {
    browser = 'Opera'
    version = ua.substring(verOffset + 6)
    if ((verOffset = ua.indexOf('Version')) !== -1) {
      version = ua.substring(verOffset + 8)
    }
  } else if ((verOffset = ua.indexOf('OPR')) !== -1) {
    browser = 'Opera'
    version = ua.substring(verOffset + 4)
  } else if ((verOffset = ua.indexOf('Edge')) !== -1) {
    browser = 'Microsoft Edge'
    version = ua.substring(verOffset + 5)
  } else if ((verOffset = ua.indexOf('MSIE')) !== -1) {
    browser = 'Microsoft Internet Explorer'
    version = ua.substring(verOffset + 5)
  } else if ((verOffset = ua.indexOf('Chrome')) !== -1) {
    browser = 'Chrome'
    version = ua.substring(verOffset + 7)
  } else if ((verOffset = ua.indexOf('Safari')) !== -1) {
    browser = 'Safari'
    version = ua.substring(verOffset + 7)
    if ((verOffset = ua.indexOf('Version')) !== -1) {
      version = ua.substring(verOffset + 8)
    }
  } else if ((verOffset = ua.indexOf('Firefox')) !== -1) {
    browser = 'Firefox'
    version = ua.substring(verOffset + 8)
  } else if (ua.indexOf('Trident/') !== -1) {
    browser = 'Microsoft Internet Explorer'
    version = ua.substring(ua.indexOf('rv:') + 3)
  } else if ((nameOffset = ua.lastIndexOf(' ') + 1) < (verOffset = ua.lastIndexOf('/'))) {
    browser = ua.substring(nameOffset, verOffset)
    version = ua.substring(verOffset + 1)
    if (browser.toLowerCase() === browser.toUpperCase()) {
      browser = navigator.appName
    }
  }

  if ((ix = version.indexOf('')) !== -1) {
    version = version.substring(0, ix)
  }

  if ((ix = version.indexOf(' ')) !== -1) {
    version = version.substring(0, ix)
  }

  if ((ix = version.indexOf(')')) !== -1) {
    version = version.substring(0, ix)
  }

  majorVersion = parseInt('' + version, 10)
  if (isNaN(majorVersion)) {
    version = '' + parseFloat(nVer)
    majorVersion = parseInt(nVer, 10)
  }

  return {
    name: browser || '',
    version: version || '',
    majorVersion: majorVersion || ''
  }
}

const getScreenSize = () => {
  if (!screen.width) {
    return undefined
  }

  const width = (screen.width) ? screen.width : ''
  const height = (screen.height) ? screen.height : ''

  return '' + width + ' x ' + height
}

const isCookieEnabled = () => {
  if (typeof navigator.cookieEnabled === 'undefined' && !cookieEnabled) {
    document.cookie = 'testcookie'
    return document.cookie.indexOf('testcookie') !== -1
  }

  return false
}

export function deviceInfo() {
  const os = getOSInfo()
  const browser = getBrowserInfo()
  const screenSize = getScreenSize()
  const mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer)

  return {
    screen: screenSize,
    browser: browser.name,
    browserVersion: browser.version,
    browserMajorVersion: browser.majorVersion,
    mobile: mobile,
    os: os.name,
    osVersion: os.version,
    cookies: isCookieEnabled
  }
}
