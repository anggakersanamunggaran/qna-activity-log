
export const getTimezone = () => {
  var currentTime = new Date()
  var currentTimezone = currentTime.getTimezoneOffset()

  return (currentTimezone / 60) * -1
}

export const getCurrentDateTime = () => {
  const date = new Date()
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hour = d.getHours(),
    minute = d.getMinutes(),
    second = d.getSeconds()

  if (month.length < 2) {
    month = '0' + month
  }

  if (day.length < 2) {
    day = '0' + day
  }

  hour = hour % 12;
  hour = hour ? hour : 12;
  minute = minute < 10 ? '0' + minute : minute;

  const result = `${[year, month, day].join('-')} ${hour}:${minute}:${second}`

  return result;
}
