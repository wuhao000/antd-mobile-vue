import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { camelAttrs } from './util';
var defaultShapeMap = {
  line: 'line',
  point: 'circle',
  area: 'area'
};
var VChartMixin = (_dec = Component({
  name: 'VChartMixin'
}), _dec2 = Prop([String, Array]), _dec3 = Prop(String), _dec4 = Prop([String, Object]), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(VChartMixin, _Vue);

  function VChartMixin() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "colors", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "seriesField", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "adjust", _descriptor3, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = VChartMixin.prototype;

  _proto.created = function created() {
    this.$parent.set(this.chartName, _extends({
      shape: defaultShapeMap[this.chartName] || ''
    }, this.$props, camelAttrs(this.$attrs)));
  };

  _proto.render = function render() {
    return null;
  };

  return VChartMixin;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "colors", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "seriesField", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "adjust", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { VChartMixin as default };