import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

var camel = function camel(key) {
  return key.replace(/(-[a-z])/g, function ($1) {
    return $1.toUpperCase().replace('-', '');
  });
};

var camelBatch = function camelBatch(attrs) {
  for (var i in attrs) {
    if (attrs) {
      var key = camel(i);
      attrs[key] = attrs[i];

      if (key !== i) {
        delete attrs[i];
      }
    }
  }

  return attrs;
};

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
var VPie = (_dec = Component({
  name: 'VPie'
}), _dec2 = Prop({
  type: String,
  default: 'polar'
}), _dec3 = Prop({
  type: Boolean,
  default: true
}), _dec4 = Prop({
  type: String
}), _dec5 = Prop({
  type: Array
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(VPie, _Vue);

  function VPie() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "coord", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "transposed", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "serialField", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "colors", _descriptor4, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = VPie.prototype;

  _proto.created = function created() {
    this.$parent.setPie(_extends({}, this.$props, camelBatch(this.$attrs)));
  };

  _proto.render = function render() {};

  return VPie;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "coord", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "transposed", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "serialField", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "colors", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { VPie as default };