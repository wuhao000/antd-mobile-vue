import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
export var PopupPickerProps = (_dec = Component({
  name: 'PopupPickerProps'
}), _dec2 = Prop(), _dec3 = Prop(), _dec4 = Prop({
  type: String,
  default: 'click'
}), _dec5 = Prop(), _dec6 = Prop(), _dec7 = Prop(), _dec8 = Prop(), _dec9 = Prop({
  type: Boolean,
  default: false
}), _dec10 = Prop({
  type: Boolean,
  default: false
}), _dec11 = Prop(), _dec12 = Prop(), _dec13 = Prop(), _dec14 = Prop(), _dec15 = Prop(), _dec16 = Prop(), _dec17 = Prop(), _dec18 = Prop(), _dec19 = Prop(), _dec20 = Prop(), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(PopupPickerProps, _Vue);

  function PopupPickerProps() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "picker", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "triggerType", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "WrapComponent", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "dismissText", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "okText", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "title", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "visible", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "content", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "actionTextUnderlayColor", _descriptor11, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "actionTextActiveOpacity", _descriptor12, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "wrapStyle", _descriptor13, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor14, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "pickerValueProp", _descriptor15, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "pickerValueChangeProp", _descriptor16, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "transitionName", _descriptor17, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "popupTransitionName", _descriptor18, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "maskTransitionName", _descriptor19, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  return PopupPickerProps;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "picker", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "triggerType", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "WrapComponent", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "dismissText", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "okText", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "visible", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "content", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "actionTextUnderlayColor", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "actionTextActiveOpacity", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "wrapStyle", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "pickerValueProp", [_dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "pickerValueChangeProp", [_dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "transitionName", [_dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "popupTransitionName", [_dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "maskTransitionName", [_dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);