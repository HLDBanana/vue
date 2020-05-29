import Cookies from 'js-cookie'

const TokenKey = 'platform_token'
const domain = getCookieDomain()

export function getToken() {
  //return '5axr4wB7teypllbutj2pok1utaydl'
  return getCookie(TokenKey) || localStorage.getItem(TokenKey)
}
export function setToken(token) {
  localStorage.setItem(TokenKey, token)
  return setCookie(TokenKey, token, 30)
}
export function removeToken() {
  localStorage.removeItem(TokenKey)
  return Cookies.remove(TokenKey, { domain: domain })
}
export function setCookie(name, value, days) {
  return Cookies.set(name, value, { domain: domain, expires: days })
}
export function getCookie(name) {
  return Cookies.get(name, { domain: domain })
}
export function removeCookie(name) {
  return Cookies.remove(name, { domain: domain })
}

// 获取一级域名
function getCookieDomain() {
  var host = location.hostname
  var ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  if (ip.test(host) === true || host === 'localhost') return host
  var regex = /([^]*).*/
  var match = host.match(regex)
  if (typeof match !== 'undefined' && match !== null) {
    host = match[1]
  }
  if (typeof host !== 'undefined' && host !== null) {
    var strAry = host.split('.')
    if (strAry.length > 1) {
      host = strAry[strAry.length - 2] + '.' + strAry[strAry.length - 1]
    }
  }
  return '.' + host
}
