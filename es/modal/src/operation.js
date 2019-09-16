import Vue from 'vue';
import closest from '../../utils/closest';
import Modal from './modal';
export default function operation(actions, platform) {
  if (actions === void 0) {
    actions = [{
      text: '确定'
    }];
  }

  if (platform === void 0) {
    platform = 'ios';
  }

  var closed = false;
  var prefixCls = 'am-modal';
  var div = document.createElement('div');
  document.body.appendChild(div);
  var modal = null;

  function close() {
    if (modal && modal.$destroy) {
      modal.$destroy();
    }

    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  var footer = actions.map(function (button) {
    // tslint:disable-next-line:only-arrow-functions
    var orginPress = button.onPress || function () {};

    button.onPress = function () {
      if (closed) {
        return;
      }

      var res = orginPress();

      if (res && res.then) {
        res.then(function () {
          closed = true;
          close();
        }).catch(function () {});
      } else {
        closed = true;
        close();
      }
    };

    return button;
  });

  function onWrapTouchStart(e) {
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }

    var pNode = closest(e.target, ".am-modal-footer");

    if (!pNode) {
      e.preventDefault();
    }
  }

  modal = new Vue({
    el: div,
    render: function render() {
      var h = arguments[0];
      // @ts-ignore
      return h(Modal, {
        "attrs": {
          "visible": true,
          "operation": true,
          "transparent": true,
          "prefixCls": prefixCls,
          "transitionName": "am-zoom",
          "closable": false,
          "maskClosable": true,
          "footer": footer,
          "maskTransitionName": "am-fade",
          "platform": platform,
          "wrapProps": {
            onTouchStart: onWrapTouchStart
          }
        },
        "on": {
          "close": close
        },
        "class": "am-modal-operation"
      }, [this.$slots.default]);
    }
  });
  return {
    close: close
  };
}