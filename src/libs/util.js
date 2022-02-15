import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'
import storage from './util.storage'
import message from './util.message'

const util = {
  cookies,
  db,
  log,
  storage,
  message
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  const processTitle = 'Admin'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('link-temp'))
}

export default util
