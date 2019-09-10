import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import Vue from 'vue';
import closest from '../../utils/closest';
import Modal from './modal';
export default function prompt(title, message, callbackOrActions, type, defaultValue, placeholders, platform) {
  if (callbackOrActions === void 0) {
    callbackOrActions = [{
      text: '取消'
    }, {
      text: '确认'
    }];
  }

  if (type === void 0) {
    type = 'default';
  }

  if (defaultValue === void 0) {
    defaultValue = '';
  }

  if (placeholders === void 0) {
    placeholders = ['', ''];
  }

  if (platform === void 0) {
    platform = 'ios';
  }

  var closed = false;
  return new Promise(function (resolve, reject) {
    var copyDefaultValue = typeof defaultValue === 'string' ? defaultValue : typeof defaultValue === 'number' ? "" + defaultValue : '';
    var prefixCls = 'am-modal';
    var data = {
      text: copyDefaultValue
    };

    function onChange(e) {
      var target = e.target;
      var inputType = target.getAttribute('type');

      if (inputType !== null) {
        data[inputType] = target.value;
      }
    } // hotfix issue: https://github.com/ant-design/ant-design-mobile/issues/2177


    function onClick(e) {
      var target = e.currentTarget || e.target;

      if (target) {
        target.focus();
      }
    }

    var focusFn = function focusFn(input) {
      setTimeout(function () {
        if (input) {
          input.focus();
        }
      }, 500);
    };

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

    function handleConfirm() {
      var _data$text = data.text,
          text = _data$text === void 0 ? '' : _data$text,
          _data$password = data.password,
          password = _data$password === void 0 ? '' : _data$password;
      var callbackArgs = type === 'login-password' ? [text, password] : type === 'secure-text' ? [password] : [text];
      return resolve(callbackArgs[0]);
    }

    var actions = typeof callbackOrActions === 'function' ? [{
      text: '取消'
    }, {
      text: '确定',
      onPress: callbackOrActions
    }] : callbackOrActions.map(function (item, index) {
      return {
        text: item.text,
        onPress: item.onPress || function () {
          if (index === 1) {
            return handleConfirm();
          }
        }
      };
    });
    var footer = actions.map(function (button) {
      // tslint:disable-next-line:only-arrow-functions
      var orginPress = button.onPress || function () {};

      button.onPress = function () {
        if (closed) {
          return;
        }

        var args = [];

        if (type === 'secure-text') {
          args.push(data['password']);
        } else if (type === 'login-password') {
          args.push(data['text']);
          args.push(data['password']);
        } else {
          args.push(data['text']);
        }

        var res = orginPress.apply(void 0, args);

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
      // exclude input element for focus
      if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
        return;
      }

      var pNode = closest(e.target, "." + prefixCls + "-content");

      if (!pNode) {
        e.preventDefault();
      }
    }

    modal = new Vue({
      el: div,
      methods: {
        createContent: function createContent() {
          var _this = this;

          var h = this.$createElement;
          var inputDom;

          switch (type) {
            case 'login-password':
              inputDom = h("div", {
                "class": prefixCls + "-input-container"
              }, [h("div", {
                "class": prefixCls + "-input"
              }, [h("label", [h("input", {
                "attrs": {
                  "type": "text",
                  "defaultValue": data.text,
                  "placeholder": placeholders[0]
                },
                "ref": function ref(input) {
                  return focusFn(input);
                },
                "on": {
                  "click": onClick,
                  "change": onChange
                }
              })])]), h("div", {
                "class": prefixCls + "-input"
              }, [h("label", [h("input", {
                "attrs": {
                  "type": "password",
                  "defaultValue": data.password,
                  "placeholder": placeholders[1]
                },
                "on": {
                  "click": onClick,
                  "change": onChange
                }
              })])])]);
              break;

            case 'secure-text':
              inputDom = h("div", {
                "class": prefixCls + "-input-container"
              }, [h("div", {
                "class": prefixCls + "-input"
              }, [h("label", [h("input", {
                "attrs": {
                  "type": "password",
                  "defaultValue": data.password,
                  "placeholder": placeholders[0]
                },
                "ref": function ref(input) {
                  return focusFn(input);
                },
                "on": {
                  "click": onClick,
                  "change": onChange
                }
              })])])]);
              break;

            case 'default':
            default:
              inputDom = h("div", {
                "class": prefixCls + "-input-container"
              }, [h("div", {
                "class": prefixCls + "-input"
              }, [h("label", [h("input", _mergeJSXProps([{
                "attrs": {
                  "type": "text"
                },
                "domProps": {
                  "value": data.text
                },
                "ref": "input"
              }, {
                "hook": {
                  mounted: function mounted() {
                    focusFn(_this.$refs['input']);
                  }
                }
              }, {
                "on": {
                  "click": onClick,
                  "change": onChange
                },
                "attrs": {
                  "placeholder": placeholders[0]
                }
              }]))])])]);
          }

          return h("div", [message, inputDom]);
        }
      },
      render: function render() {
        var h = arguments[0];
        // @ts-ignore
        return h(Modal, {
          "attrs": {
            "visible": true,
            "transparent": true,
            "prefixCls": prefixCls,
            "title": title,
            "closable": false,
            "maskClosable": false,
            "transitionName": "am-zoom",
            "footer": footer,
            "maskTransitionName": "am-fade",
            "platform": platform,
            "wrapProps": {
              onTouchStart: onWrapTouchStart
            }
          }
        }, [h("div", {
          "class": prefixCls + "-propmt-content"
        }, [this.createContent()])]);
      }
    });
    return {
      close: close
    };
  });
}