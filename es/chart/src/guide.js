import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { camelAttrs } from './util';
var types = ['line', 'text', 'tag', 'rect', 'html', 'arc'];
var VGuide = (_dec = Component({
  name: 'VGuide'
}), _dec2 = Prop({
  type: String,
  validator: function validator(val) {
    return types.filter(function (type) {
      return type === val;
    }).length === 1;
  }
}), _dec3 = Prop({
  type: Object,
  default: function _default() {
    return {};
  }
}), _dec4 = Prop(Boolean), _dec5 = Prop({
  type: Boolean,
  default: true
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(VGuide, _Vue);

  function VGuide() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "type", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "options", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "top", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "withPoint", _descriptor4, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = VGuide.prototype;

  _proto.created = function created() {
    this.$parent.addGuide({
      type: this.type,
      options: _extends({
        top: this.top,
        withPoint: this.withPoint
      }, camelAttrs(this.options), camelAttrs(this.$attrs))
    });
  };

  _proto.render = function render() {};

  return VGuide;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "options", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "top", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "withPoint", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { VGuide as default };