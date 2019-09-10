import _extends from "@babel/runtime/helpers/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
import PopupPicker from '../vmc-picker/popup';
var PopupCascader = (_dec = Component({
  name: 'PopupCascader'
}), _dec2 = Prop({
  type: Object
}), _dec3 = Inject({
  from: 'store',
  default: undefined
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(PopupCascader, _Vue);

  function PopupCascader() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "cascader", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "store", _descriptor2, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = PopupCascader.prototype;

  _proto.onDismiss = function onDismiss() {
    if (this.store.onDismiss) {
      this.store.onDismiss();
    }

    this.$emit('dismiss');
  };

  _proto.onChange = function onChange(v) {
    this.$emit('change', v);
  };

  _proto.onOk = function onOk(v) {
    if (this.store.onOk) {
      this.store.onOk(v);
    }

    this.$emit('change', v);
    this.$emit('ok');
  };

  _proto.render = function render() {
    var h = arguments[0];
    // @ts-ignore
    return h(PopupPicker, _mergeJSXProps([{}, {
      "attrs": _extends({
        picker: this.cascader
      }, this.$props, this.$attrs)
    }, {
      "on": {
        "dismiss": this.onDismiss,
        "change": this.onChange,
        "ok": this.onOk
      }
    }]), [h("template", {
      "slot": 'picker'
    }, [this.cascader]), this.$slots.default]);
  };

  return PopupCascader;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cascader", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "store", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { PopupCascader as default };