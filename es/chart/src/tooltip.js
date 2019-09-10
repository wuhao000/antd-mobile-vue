import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { camelAttrs } from './util';
var VTooltip = (_dec = Component({
  name: 'VTooltip'
}), _dec2 = Prop({
  type: Boolean,
  default: false
}), _dec3 = Prop({
  type: Boolean,
  default: true
}), _dec4 = Prop({
  type: Boolean,
  default: true
}), _dec5 = Prop({
  type: Boolean,
  default: false
}), _dec6 = Prop({
  type: Boolean,
  default: false
}), _dec7 = Prop({
  type: Object,
  default: function _default() {
    return {};
  }
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(VTooltip, _Vue);

  function VTooltip() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "disabled", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "showCrosshairs", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "showItemMarker", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "showXValue", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "showValueInLegend", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "options", _descriptor6, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = VTooltip.prototype;

  _proto.created = function created() {
    var options = _extends({
      disabled: this.disabled,
      showCrosshairs: this.showCrosshairs,
      showItemMarker: this.showItemMarker,
      showValueInLegend: this.showValueInLegend
    }, camelAttrs(this.options), camelAttrs(this.$attrs));

    if (this.showXValue) {
      options.onShow = function (ev) {
        var items = ev.items;
        items[0].name = items[0].title;
      };
    }

    this.$parent.setTooltip(options);
  };

  _proto.render = function render() {};

  return VTooltip;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "showCrosshairs", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "showItemMarker", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "showXValue", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "showValueInLegend", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "options", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { VTooltip as default };