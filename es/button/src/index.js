import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import IconRes from '../../mixins/icon-res';
import TouchFeedback from '../../vmc-feedback';
var httpReg = /^http(s)?:\/\//;
var rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

function isString(str) {
  return typeof str === 'string';
}

var Button = (_dec = Component({
  name: 'Button'
}), _dec2 = Prop({
  type: String,
  default: 'am-button'
}), _dec3 = Prop({
  type: String
}), _dec4 = Prop({
  type: Boolean,
  default: false
}), _dec5 = Prop({
  type: [String, Object]
}), _dec6 = Prop({
  type: String
}), _dec7 = Prop({
  type: [Boolean, Object],
  default: function _default() {
    return {};
  }
}), _dec8 = Prop({
  type: String
}), _dec9 = Prop({
  type: String,
  default: 'large'
}), _dec10 = Prop({
  type: Boolean,
  default: false
}), _dec11 = Prop({
  type: Boolean,
  default: false
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Button, _Vue);

  function Button() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "role", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "inline", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "icon", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "activeClassName", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "activeStyle", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "type", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "size", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "loading", _descriptor10, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Button.prototype;

  _proto.insertSpace = function insertSpace(child) {
    var h = this.$createElement;

    if (isString(child.text) && isTwoCNChar(child.text)) {
      return h("span", [child.text.split('').join(' ')]);
    }

    return child;
  };

  _proto.render = function render() {
    var _classnames,
        _this2 = this;

    var h = arguments[0];
    var prefixCls = this.prefixCls,
        type = this.type,
        size = this.size,
        inline = this.inline,
        disabled = this.disabled,
        icon = this.icon,
        loading = this.loading,
        activeStyle = this.activeStyle,
        activeClassName = this.activeClassName;
    var iconType = loading ? 'loading' : icon;
    var wrapCls = classnames(prefixCls, (_classnames = {}, _classnames[prefixCls + "-primary"] = type === 'primary', _classnames[prefixCls + "-ghost"] = type === 'ghost', _classnames[prefixCls + "-warning"] = type === 'warning', _classnames[prefixCls + "-small"] = size === 'small', _classnames[prefixCls + "-inline"] = inline, _classnames[prefixCls + "-disabled"] = disabled, _classnames[prefixCls + "-loading"] = loading, _classnames[prefixCls + "-icon"] = !!iconType, _classnames));
    var kids = this.$slots.default ? this.$slots.default.map(this.insertSpace) : '';
    var iconEl;

    if (typeof iconType === 'string') {
      iconEl = h(IconRes, _mergeJSXProps([{
        "class": prefixCls + "-icon"
      }, {
        "props": {
          type: httpReg.test(iconType) ? iconType : {
            mobile: true,
            iconType: 'icon',
            type: iconType,
            size: size === 'small' ? 'xxs' : 'md'
          }
        }
      }]));
    } else if (iconType) {
      var cls = classnames('am-icon', prefixCls + "-icon", size === 'small' ? 'am-icon-xxs' : 'am-icon-md');
      iconEl = // @ts-ignore
      h(IconRes, _mergeJSXProps2([{
        "class": cls
      }, {
        "props": {
          type: iconType
        }
      }]));
    } // use div, button native is buggy @yiminghe


    return h(TouchFeedback, {
      "attrs": {
        "activeClassName": activeClassName || (activeStyle ? prefixCls + "-active" : undefined),
        "disabled": disabled,
        "activeStyle": activeStyle
      }
    }, [h("a", {
      "attrs": {
        "role": "button",
        "aria-disabled": disabled
      },
      "class": wrapCls,
      "on": {
        "click": function click(e) {
          if (!_this2.disabled) {
            _this2.$emit('click', e);
          }
        }
      }
    }, [iconEl, kids])]);
  };

  return Button;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "role", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "inline", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "icon", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "activeClassName", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "activeStyle", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "size", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "loading", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default Button;