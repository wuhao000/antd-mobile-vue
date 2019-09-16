import Notification from 'ant-design-vue/lib/vc-notification';
import classnames from 'classnames';
import Icon from '../../icon';
var prefixCls = 'am-toast';

function getMessageInstance(mask, callback) {
  var _classnames;

  Notification.newInstance({
    prefixCls: prefixCls,
    style: {},
    // clear rmc-notification default style
    transitionName: 'am-fade',
    class: classnames((_classnames = {}, _classnames[prefixCls + "-mask"] = mask, _classnames[prefixCls + "-nomask"] = !mask, _classnames))
  }, function (notification) {
    return callback && callback(notification);
  });
}

function notice(_content, type, duration, _onClose, mask) {
  if (duration === void 0) {
    duration = 3;
  }

  if (mask === void 0) {
    mask = true;
  }

  var iconTypes = {
    info: '',
    success: 'success',
    fail: 'fail',
    offline: 'dislike',
    loading: 'loading'
  };
  var iconType = iconTypes[type];
  var messageInstance = {
    $destroy: function $destroy() {
      console.error('Toast渲染未完成');
    },
    destroyed: false
  };

  messageInstance.destroy = function () {
    if (!messageInstance.destroyed) {
      messageInstance.destroyed = true;
      messageInstance.$destroy();
    }
  };

  messageInstance.hide = function () {
    if (typeof messageInstance.destroy === 'function') {
      messageInstance.destroy();
    }
  };

  getMessageInstance(mask, function (notification) {
    messageInstance.$destroy = notification.destroy;
    messageInstance.component = notification.component;
    notification.notice({
      duration: duration,
      style: {},
      onClick: function onClick() {},
      content: function content(h) {
        return !!iconType ? h("div", {
          "class": prefixCls + "-text " + prefixCls + "-text-icon",
          "attrs": {
            "role": 'alert',
            "aria-live": 'assertive'
          }
        }, [h(Icon, {
          "attrs": {
            "type": iconType,
            "size": 'lg'
          }
        }), h("div", {
          "class": prefixCls + "-text-info"
        }, [_content])]) : h("div", {
          "class": prefixCls + "-text",
          "attrs": {
            "role": 'alert',
            "aria-live": 'assertive'
          }
        }, [h("div", [_content])]);
      },
      closable: true,
      onClose: function onClose() {
        if (_onClose) {
          _onClose();
        }

        if (typeof notification.destroy === 'function') {
          notification.destroy();
        }

        messageInstance.destroy = null;
      }
    });
  });
  return messageInstance;
}

export default {
  install: function install(any) {},
  show: function show(content, duration, mask) {
    return notice(content, 'info', duration, function () {}, mask);
  },
  info: function info(content, duration, onClose, mask) {
    if (mask === void 0) {
      mask = false;
    }

    return notice(content, 'info', duration, onClose, mask);
  },
  success: function success(content, duration, onClose, mask) {
    if (mask === void 0) {
      mask = false;
    }

    return notice(content, 'success', duration, onClose, mask);
  },
  fail: function fail(content, duration, onClose, mask) {
    if (mask === void 0) {
      mask = false;
    }

    return notice(content, 'fail', duration, onClose, mask);
  },
  offline: function offline(content, duration, onClose, mask) {
    if (mask === void 0) {
      mask = false;
    }

    return notice(content, 'offline', duration, onClose, mask);
  },
  loading: function loading(content, duration, onClose, mask) {
    return notice(content, 'loading', duration, onClose, mask);
  }
};