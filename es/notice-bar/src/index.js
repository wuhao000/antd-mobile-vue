import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Icon from '../../icon';
import Marquee from './marquee';
var NoticeBar = (_dec = Component({
  name: 'NoticeBar'
}), _dec2 = Prop({}), _dec3 = Prop({
  type: String,
  default: 'am-notice-bar'
}), _dec4 = Prop({
  default: ''
}), _dec5 = Prop(), _dec6 = Prop({}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(NoticeBar, _Vue);

  function NoticeBar() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "marqueeProps", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "mode", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "icon", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "action", _descriptor5, _assertThisInitialized(_this)), _this.show = true, _temp) || _assertThisInitialized(_this);
  }

  var _proto = NoticeBar.prototype;

  _proto.onClick = function onClick() {
    var mode = this.mode;
    this.$emit('click');

    if (mode === 'closable') {
      this.show = false;
    }
  };

  _proto.render = function render() {
    var h = arguments[0];

    var mode = this.mode,
        prefixCls = this.prefixCls,
        action = this.action,
        marqueeProps = this.marqueeProps,
        restProps = _objectWithoutPropertiesLoose(this, ["mode", "prefixCls", "action", "marqueeProps"]);

    var icon = this.icon || h(Icon, {
      "attrs": {
        "type": "voice",
        "size": "xxs"
      }
    });
    var extraProps = {};
    var operationDom = null;

    if (mode === 'closable') {
      operationDom = h("div", {
        "class": prefixCls + "-operation",
        "on": {
          "click": this.onClick
        },
        "attrs": {
          "role": "button",
          "aria-label": "close"
        }
      }, [action ? action : h(Icon, {
        "attrs": {
          "type": "cross",
          "size": "md"
        }
      })]);
    } else {
      if (mode === 'link') {
        operationDom = h("div", {
          "class": prefixCls + "-operation",
          "attrs": {
            "role": "button",
            "aria-label": "go to detail"
          }
        }, [action ? action : h(Icon, {
          "attrs": {
            "type": "right",
            "size": "md"
          }
        })]);
      }

      extraProps.onClick = this.onClick;
    }

    var wrapCls = classnames(prefixCls);
    return this.show ? h("div", {
      "class": wrapCls,
      "on": {
        "click": function click(e) {
          if (extraProps.onClick) {
            extraProps.onClick(e);
          }
        }
      },
      "attrs": {
        "role": "alert"
      }
    }, [icon && // tslint:disable-next-line:jsx-no-multiline-js
    h("div", {
      "class": prefixCls + "-icon",
      "attrs": {
        "aria-hidden": "true"
      }
    }, [icon]), h("div", {
      "class": prefixCls + "-content"
    }, [h(Marquee, _mergeJSXProps([{
      "attrs": {
        "prefixCls": prefixCls,
        "text": this.$slots.default ? this.$slots.default[0] : null
      }
    }, {
      "props": marqueeProps
    }]))]), operationDom]) : null;
  };

  return NoticeBar;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "marqueeProps", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "mode", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "icon", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "action", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { NoticeBar as default };