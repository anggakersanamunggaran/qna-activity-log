
export default (method, url, params, mimeType = 'application/json') => {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest()

    request.open(method, url, true)

    request.setRequestHeader('Content-type', 'application/json;charset=UTF-8')

    if (mimeType && request.overrideMimeType) {
      request.overrideMimeType(mimeType)
    }

    request.addEventListener('load', (evt) => {
      const target = evt.target
      const response = JSON.parse(target.responseText)
      const responseCode = response.status || request.status

      if (responseCode >= 200 && responseCode < 300) {
        resolve(response.message || response)
      } else {
        reject(response.message || response)
      }
    })

    const requestParams = JSON.stringify(params)
    request.send(requestParams)
  })
}
