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
var VScale = (_dec = Component({
  name: 'VScale'
}), _dec2 = Prop(Boolean), _dec3 = Prop(Boolean), _dec4 = Prop(String), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(VScale, _Vue);

  function VScale() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "x", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "y", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "field", _descriptor3, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = VScale.prototype;

  _proto.created = function created() {
    this.emitSetting();
  };

  _proto.emitSetting = function emitSetting() {
    var _this2 = this;

    ['x', 'y'].forEach(function (item) {
      if (_this2[item]) {
        var _this2$$parent$setSca;

        _this2.$parent.setScale((_this2$$parent$setSca = {}, _this2$$parent$setSca[item] = _extends({}, camelAttrs(_this2.$attrs)), _this2$$parent$setSca));

        if (_this2.field) {
          _this2.$parent.setField(item, _this2.field);
        }
      }
    });
  };

  _proto.render = function render() {};

  return VScale;
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
})), _class2)) || _class);
export { VScale as default };