import httpHandler from 'utils/astrnt-http-handler'
import { deviceInfo } from 'utils/navigation-helper'
import * as DateUtils from 'utils/date-utils'

const logEnv = 'ASTRNT_ACTIVITY_LOG_ENV'
const logBaseInfo = 'ASTRNT_BASE_ACTIVITY_LOG_INFO'
const logInfos = 'ASTRNT_LOG_ACTIVITY_INFOS'
const storageKeys = [
  logEnv,
  logBaseInfo,
  logInfos
]

const getEnv = () => {
  const env = localStorage.getItem(logEnv)
  return env
}

const getBaseInfo = () => {
  const info = localStorage.getItem(logBaseInfo)
  return JSON.parse(info)
}

const constructURL = () => {
  const env = getEnv()
  let domainPrefix = ''

  switch (env) {
    case 'beta': case 'dev':
      domainPrefix = 'log-beta'
      break
    case 'production': case 'live':
      domainPrefix = 'app'
      break
  }

  const baseURL = `https://${domainPrefix}.astrnt.co`
  return `${baseURL}/api/v2/logs/activity`
}

const constructInterviewInfo = (params) => {
  const device = deviceInfo()
  const timeZone = DateUtils.getTimezone()
  const logTime = DateUtils.getCurrentDateTime()
  const ua = navigator.userAgent
  const os = `${device.os} (${device.osVersion})`
  const version = `${device.browser}, Version ${device.browserVersion} (${device.browserMajorVersion})`

  let recordedParam = getBaseInfo()
  recordedParam.event = params.event || ''
  recordedParam.activity = params.activity || ''
  recordedParam.message = params.message || ''
  recordedParam.os = os
  recordedParam.version = version
  recordedParam.imei = ua
  recordedParam.log_time = logTime
  recordedParam.time_zone = timeZone

  return recordedParam
}

const sendEvent = (params) => {
  let recordedParams = getBaseInfo()
  if (!recordedParams.isProctoring) {
    return new Promise((resolve, reject) => {
      resolve('no action')
    });
  }
  const URL = constructURL()
  const logInfo = constructInterviewInfo(params)
  const requestParams = {
    activity: logInfo.activity,
    interview_code: logInfo.interviewCode
  }
  // console.log(logInfo)
  // console.log(requestParams)

  return httpHandler('POST', URL, requestParams)
}

const storeEvent = (params) => {
  const logItems = localStorage.getItem(logInfos)

  let storedLogs
  if (!logItems) {
    storedLogs = []
  } else {
    storedLogs = JSON.parse(logItems)
    localStorage.removeItem(logInfos)
  }

  const interviewInfo = constructInterviewInfo(params)
  storedLogs.push(interviewInfo)

  localStorage.setItem(logInfos, JSON.stringify(storedLogs))

  return Promise.resolve(interviewInfo)
}

export function initialize(env, params, onError = () => {}, onUnhandledRejection = () => {}) {
  const baseParam = {
    'interviewCode': params.interview_code || '',
    'candidate_id': params.candidate_id || 0,
    'job_id': params.job_id || 0,
    'company_id': params.company_id || 0,
    'isProctoring': params.isProctoring || 0
  }

  localStorage.setItem(logEnv, env)
  localStorage.setItem(logBaseInfo, JSON.stringify(baseParam))

  window.addEventListener('error', (errEvt) => {
    onError(errEvt.error)
    return false
  })

  window.addEventListener('unhandledrejection', (errEvt) => {
    onUnhandledRejection(errEvt.reason)
  })
}

export function recordEvent(params) {
  switch (params.status) {
    case 'online':
      return sendEvent(params)

    case 'offline':
      return storeEvent(params)
  }

  return Promise.resolve('No event to send')
}

export function sendSavedEvents() {
  const logItems = localStorage.getItem(logInfos)
  if (!logItems) {
    return Promise.resolve()
  }

  const URL = constructURL()
  const requestParams = {
    logs: JSON.parse(logItems)
  }

  return new Promise((resolve, reject) => {
    httpHandler('POST', URL, requestParams)
      .then(result => {
        localStorage.removeItem(logInfos)
        resolve(result)
      })
      .catch(error => reject(error))
  })
}

export function clearCache() {
  storageKeys.forEach(key => {
    localStorage.removeItem(key)
  })
}
