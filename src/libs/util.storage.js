import LocalStorage from 'lowdb/adapters/LocalStorage'

const storage = {};
/**
 * @description 存放本地数据
 * @description 永久保存的数据，除非用户手动删除。（）
 * @param {Object}  key {String} 键
 * @param {Object}  value {Object} 值
 */
storage.setLocalData = function ({
    key = '',
    value = ''
  }) {
    return LocalStorage.setItem(`${process.env.VUE_APP_PROJECT_NAME}-${process.env.VUE_APP_VERSION}-${key}`, JSON.stringify(value))
}


/**
 * @description 获取本地数据
 * @param {Object}  key {String} 键
 */
storage.getLocalData = function ({
    key = ''
  }) {
    var obj = LocalStorage.getItem(`${process.env.VUE_APP_PROJECT_NAME}-${process.env.VUE_APP_VERSION}-${key}`);
    return obj && obj!='undefined' && JSON.parse(obj) || null;
}


/**
 * @description 删除本地数据
 * @param {Object}  key {String} 键
 */
storage.removeLocalData = function ({
    key = ''
  }) {
    return LocalStorage.removeItem(`${process.env.VUE_APP_PROJECT_NAME}-${process.env.VUE_APP_VERSION}-${key}`)
}

/**
 * @description 删除本地所有数据
 */
storage.clearLocalData = function ({
  }) {
    return LocalStorage.clear()
}


/**
 * @description 存放临时数据
 * @description 浏览器关闭则消失
 * @param {Object}  key {String} 键
 * @param {Object}  value {Object} 值
 */
storage.setSessionData = function ({
    key = '',
    value = ''
  }) {
    return sessionStorage.setItem(`${process.env.VUE_APP_PROJECT_NAME}-${process.env.VUE_APP_VERSION}-${key}`, JSON.stringify(value))
}


/**
 * @description 获取临时数据
 * @param {Object}  key {String} 键
 */
storage.getSessionData = function ({
    key = ''
  }) {
    var obj = sessionStorage.getItem(`${process.env.VUE_APP_PROJECT_NAME}-${process.env.VUE_APP_VERSION}-${key}`);
    return obj && obj!='undefined' && JSON.parse(obj) || null;
}


/**
 * @description 删除临时数据
 * @param {Object}  key {String} 键
 */
storage.removeSessionData = function ({
    key = ''
  }) {
    return sessionStorage.removeItem(`${process.env.VUE_APP_PROJECT_NAME}-${process.env.VUE_APP_VERSION}-${key}`)
}

/**
 * @description 删除临时所有数据
 */
storage.clearSessionData = function ({
  }) {
    return sessionStorage.clear()
}

export default storage
