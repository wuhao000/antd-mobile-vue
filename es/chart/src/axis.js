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
var VAxis = (_dec = Component({
  name: 'VAxis'
}), _dec2 = Prop(Boolean), _dec3 = Prop(Boolean), _dec4 = Prop(String), _dec5 = Prop(Boolean), _dec6 = Prop(Boolean), _dec7 = Prop({
  type: Object,
  default: function _default() {
    return {};
  }
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(VAxis, _Vue);

  function VAxis() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "x", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "y", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "field", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "autoAlign", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "options", _descriptor6, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = VAxis.prototype;

  _proto.created = function created() {
    var _options = _extends({}, this.$props, this.options, camelAttrs(this.$attrs));

    this.$parent.setAxis(_options);
  };

  _proto.render = function render() {};

  return VAxis;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "x", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "y", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "field", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "autoAlign", [_dec6], {
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
export { VAxis as default };