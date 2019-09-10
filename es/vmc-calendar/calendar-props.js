import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import defaultLocale from './locale/zh_CN';
var CalendarProps = (_dec = Component({
  name: 'CalendarProps'
}), _dec2 = Prop({}), _dec3 = Prop({
  type: Date,
  default: function _default() {
    return new Date(2000, 0, 1, 8);
  }
}), _dec4 = Prop({}), _dec5 = Prop({
  type: Boolean,
  default: false
}), _dec6 = Prop({
  type: String,
  default: 'vertical'
}), _dec7 = Prop({
  type: Function
}), _dec8 = Prop({
  type: Boolean,
  default: false
}), _dec9 = Prop({
  type: Number
}), _dec10 = Prop({
  type: Object,
  default: function _default() {
    return defaultLocale;
  }
}), _dec11 = Prop({
  type: Date
}), _dec12 = Prop({
  type: Date
}), _dec13 = Prop({}), _dec14 = Prop({
  type: Boolean,
  default: false
}), _dec15 = Prop({
  type: String,
  default: 'rmc-calendar'
}), _dec16 = Prop({}), _dec17 = Prop({}), _dec18 = Prop({}), _dec19 = Prop({
  type: Boolean,
  default: true
}), _dec20 = Prop({
  type: Boolean,
  default: false
}), _dec21 = Prop({
  type: String
}), _dec22 = Prop({
  type: String
}), _dec23 = Prop({
  type: String
}), _dec24 = Prop({
  type: String,
  default: 'range'
}), _dec25 = Prop({
  type: Boolean,
  default: false
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(CalendarProps, _Vue);

  function CalendarProps() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "defaultDate", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "defaultTimeValue", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "defaultValue", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "displayMode", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "enterDirection", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "getDateExtra", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "infiniteOpt", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "initialMonths", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "locale", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "maxDate", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "minDate", _descriptor11, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onSelect", _descriptor12, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "pickTime", _descriptor13, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor14, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "renderHeader", _descriptor15, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "renderShortcut", _descriptor16, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "rowSize", _descriptor17, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "showHeader", _descriptor18, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "showShortcut", _descriptor19, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "timePickerPickerPrefixCls", _descriptor20, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "timePickerPrefixCls", _descriptor21, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "title", _descriptor22, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "type", _descriptor23, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "visible", _descriptor24, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  return CalendarProps;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "defaultDate", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "defaultTimeValue", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "defaultValue", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "displayMode", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "enterDirection", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "getDateExtra", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "infiniteOpt", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "initialMonths", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "locale", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "maxDate", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "minDate", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "onSelect", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "pickTime", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "renderHeader", [_dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "renderShortcut", [_dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "rowSize", [_dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "showHeader", [_dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "showShortcut", [_dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "timePickerPickerPrefixCls", [_dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "timePickerPrefixCls", [_dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "visible", [_dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { CalendarProps as default };