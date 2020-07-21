import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Touchable from '../vmc-feedback';
var InputHandler = (_dec = Component({
  name: 'InputHandler'
}), _dec2 = Prop({
  type: String
}), _dec3 = Prop({
  type: Boolean
}), _dec4 = Prop({
  type: String
}), _dec5 = Prop({
  type: Boolean
}), _dec6 = Watch('disabled'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(InputHandler, _Vue);

  function InputHandler() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "role", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "unselectable", _descriptor4, _assertThisInitialized(_this)), _this.active = false, _temp) || _assertThisInitialized(_this);
  }

  var _proto = InputHandler.prototype;

  _proto.disabledChange = function disabledChange(disabled) {
    if (!disabled) {
      this.active = false;
    }
  };

  _proto.render = function render() {
    var _this2 = this,
        _class4;

    var h = arguments[0];

    var _this$$props = this.$props,
        prefixCls = _this$$props.prefixCls,
        disabled = _this$$props.disabled,
        otherProps = _objectWithoutPropertiesLoose(_this$$props, ["prefixCls", "disabled"]);

    return h(Touchable, _mergeJSXProps2([{
      "attrs": {
        "disabled": disabled
      }
    }, {
      "on": {
        touchstart: function touchstart() {
          _this2.active = true;

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          _this2.$emit.apply(_this2, ['touchstart'].concat(args));
        },
        touchend: function touchend() {
          _this2.active = false;

          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          _this2.$emit.apply(_this2, ['touchend'].concat(args));
        }
      }
    }]), [h("span", _mergeJSXProps([{
      "class": (_class4 = {}, _class4[prefixCls + "-handler-active"] = this.active && !this.disabled, _class4)
    }, otherProps, {
      "on": {
        "click": function click() {
          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          _this2.$emit.apply(_this2, ['click'].concat(args));
        }
      }
    }]), [this.$slots.default])]);
  };

  return InputHandler;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "role", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "unselectable", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "disabledChange", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "disabledChange"), _class2.prototype)), _class2)) || _class);
export default InputHandler;