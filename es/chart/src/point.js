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
var VPoint = (_dec = Component({
  name: 'VPoint'
}), _dec2 = Prop({
  type: Object
}), _dec3 = Prop({
  type: Array
}), _dec4 = Prop(String), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(VPoint, _Vue);

  function VPoint() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "styles", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "colors", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "seriesField", _descriptor3, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = VPoint.prototype;

  _proto.created = function created() {
    this.$parent.setPoint(_extends({}, this.$props, this.$attrs));
  };

  _proto.render = function render() {};

  return VPoint;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "styles", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "colors", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "seriesField", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { VPoint as default };