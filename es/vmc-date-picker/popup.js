import _extends from "@babel/runtime/helpers/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
import PopupPicker from '../vmc-picker/popup';
var PopupDatePicker = (_dec = Component({
  name: 'PopupDatePicker'
}), _dec2 = Prop(), _dec3 = Prop(), _dec4 = Prop({
  type: Boolean,
  default: false
}), _dec5 = Prop({
  type: Boolean,
  default: true
}), _dec6 = Inject({
  from: 'store',
  default: undefined
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(PopupDatePicker, _Vue);

  function PopupDatePicker() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "datePicker", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "date", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "editable", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "store", _descriptor5, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = PopupDatePicker.prototype;

  _proto.onDismiss = function onDismiss() {
    if (this.store.onDismiss) {
      this.store.onDismiss();
    }

    this.$emit('dismiss');
  };

  _proto.onOk = function onOk(v) {
    if (this.store.onOk) {
      this.store.onOk();
    }

    this.$emit('change', v);
    this.$emit('ok', v);
  };

  _proto.render = function render() {
    var h = arguments[0];
    // @ts-ignore
    return h(PopupPicker, _mergeJSXProps([{}, {
      "attrs": _extends({
        picker: this.datePicker,
        value: this.date
      }, this.$props, this.$attrs)
    }, {
      "attrs": {
        "disabled": this.disabled || !this.editable
      },
      "on": {
        "dismiss": this.onDismiss,
        "ok": this.onOk
      }
    }]), [this.$slots.default]);
  };

  return PopupDatePicker;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "datePicker", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "date", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "editable", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "store", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { PopupDatePicker as default };