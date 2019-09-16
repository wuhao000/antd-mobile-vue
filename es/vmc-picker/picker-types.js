import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
export var PickerProps = (_dec = Component({
  name: 'PickerProps'
}), _dec2 = Prop({
  type: Boolean,
  default: false
}), _dec3 = Prop(), _dec4 = Prop(), _dec5 = Prop(), _dec6 = Prop(), _dec7 = Prop(), _dec8 = Prop(), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(PickerProps, _Vue);

  function PickerProps() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "disabled", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "selectedValue", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "itemStyle", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "indicatorStyle", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "indicatorClassName", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "defaultSelectedValue", _descriptor7, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  return PickerProps;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "selectedValue", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "itemStyle", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "indicatorStyle", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "indicatorClassName", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "defaultSelectedValue", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);