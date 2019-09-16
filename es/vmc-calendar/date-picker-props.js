import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
var DatePickerProps = (_dec = Component({
  name: 'DatePickerProps'
}), _dec2 = Prop({}), _dec3 = Prop({}), _dec4 = Prop({}), _dec5 = Prop({
  type: Boolean
}), _dec6 = Prop({
  type: Number
}), _dec7 = Prop({}), _dec8 = Prop({
  type: Date
}), _dec9 = Prop({
  type: Date
}), _dec10 = Prop({}), _dec11 = Prop({
  type: String
}), _dec12 = Prop({}), _dec13 = Prop({
  type: Date
}), _dec14 = Prop({}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(DatePickerProps, _Vue);

  function DatePickerProps() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "defaultDate", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "endDate", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "getDateExtra", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "infiniteOpt", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "initialMonths", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "locale", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "maxDate", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "minDate", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onSelectHasDisableDate", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "rowSize", _descriptor11, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "startDate", _descriptor12, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "type", _descriptor13, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  return DatePickerProps;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "defaultDate", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "endDate", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "getDateExtra", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "infiniteOpt", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "initialMonths", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "locale", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "maxDate", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "minDate", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "onSelectHasDisableDate", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "rowSize", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "startDate", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { DatePickerProps as default };