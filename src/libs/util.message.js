const message = {}
import Vue from "vue";
import { Loading } from 'element-ui';

/**
 * @description 推送一个消息
 * @param {String} type 主题 success/warning/info/error
 * @param {String} message 信息
 * @param {boolean} center 是否居中
 * @param {String} iconClass 自定义图标（覆盖type）
 * @param {number} duration 显示时间, 毫秒。设为 0 则不会自动关闭	
 */
message.pushMessage = function ({ type, message,  iconClass, center = false, duration = 3000 }) {
  Vue.prototype.$message({
    type: type,
    message: message,
    iconClass: iconClass,
    center: center,
    duration: duration
  });
}

/**
 * @description 推送一个通知
 * @param {String} type 主题 success/warning/info/error
 * @param {String} title 标题
 * @param {String} message 信息
 * @param {number} duration 显示时间, 毫秒。设为 0 则不会自动关闭	4500
 * @param {boolean} dangerouslyUseHTMLString 是否是html片段（如果是true则message是html）
 */
message.pushNotify = function ({ type, title,  message, dangerouslyUseHTMLString = true, duration = 4500 }) {
  Vue.prototype.$notify({
    type: type,
    title: title,
    message: message,
    dangerouslyUseHTMLString: dangerouslyUseHTMLString,
    duration: duration
  });
}

/**
 * @description 弹框
 * @param {String} message 信息
 * @param {String} title 标题
 * @param {String} confirmButtonText 按钮文本
 * @param {function} callback 回调函数
 * @param {String} type 主题 success/warning/info/error
 * @param {boolean} dangerouslyUseHTMLString 是否是html片段（如果是true则message是html）
 */
message.alter = function ({ message, title, confirmButtonText, callback, type, dangerouslyUseHTMLString }) {
  Vue.prototype.$alert(message, title, {
    confirmButtonText: confirmButtonText,
    dangerouslyUseHTMLString: dangerouslyUseHTMLString,
    type: type,
    callback: callback
  });
}

/**
 * @description 双按钮弹框
 * @param {String} message 信息
 * @param {String} title 标题
 * @param {String} confirmButtonText 确认按钮文本
 * @param {String} cancelButtonText 取消按妞文本
 * @param {function} confirmCallback 确认回调函数
 * @param {function} cancelCallback 取消回调函数
 * @param {String} type 主题 success/warning/info/error
 * @param {boolean} dangerouslyUseHTMLString 是否是html片段（如果是true则message是html）
 */
message.confirm = function ({ message, title, confirmButtonText, cancelButtonText, confirmCallback, cancelCallback, type, dangerouslyUseHTMLString }) {
  Vue.prototype.$confirm( message, title,  {
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    dangerouslyUseHTMLString: dangerouslyUseHTMLString,
    type: type
  }).then(() => {
    if(confirmCallback) confirmCallback();
  }).catch(() => {
    if(cancelCallback) cancelCallback();      
  });
}

// 遮罩层全局实例
var $sysmFullLoading;
var $requestCount = 0;

/**
 * @description 打开遮罩层
 * @param {String} text 信息
 */
message.startLoading = function ({ text = 'loading'}) {
  // 没有遮罩层会显示遮罩层
  if( $requestCount == 0 ) {
    $sysmFullLoading = Loading.service({
      fullscreen: true,
      text: text
    })
  }
  $requestCount++;
}


/**
 * @description 关闭遮罩层
 */
message.stopLoading = function () {
  if( $requestCount <= 0 ) return;
  $requestCount--;
  if( $requestCount === 0 ) {
    $sysmFullLoading.close();
  }
}

export default message
