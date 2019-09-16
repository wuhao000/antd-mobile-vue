import Vue from 'vue';
import closest from '../../utils/closest';
import Modal from './modal';
export default function alert(title, message, actions, platform) {
  if (actions === void 0) {
    actions = [{
      text: '确定'
    }];
  }

  if (platform === void 0) {
    platform = 'ios';
  }

  var closed = false;

  if (!title && !message) {
    // console.log('Must specify either an alert title, or message, or both');
    return {
      close: function close() {}
    };
  }

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

  return new Promise(function (resolve, reject) {
    var footer = actions.map(function (button, index) {
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

            if (actions.length === 2 && index === 0) {
              reject();
            } else {
              resolve();
            }
          }).catch(function (err) {
            reject(err);
          });
        } else {
          closed = true;
          close();

          if (actions.length === 2 && index === 0) {
            reject();
          } else {
            resolve();
          }
        }
      };

      return button;
    });
    var prefixCls = 'am-modal';

    function onWrapTouchStart(e) {
      if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
        return;
      }

      var pNode = closest(e.target, "." + prefixCls + "-footer");

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
            "transparent": true,
            "title": title,
            "transitionName": "am-zoom",
            "closable": false,
            "maskClosable": false,
            "footer": footer,
            "maskTransitionName": "am-fade",
            "platform": platform,
            "wrapProps": {
              onTouchStart: onWrapTouchStart
            }
          }
        }, [h("div", {
          "class": prefixCls + "-alert-content"
        }, [message])]);
      }
    });
    return {
      close: close
    };
  });
}