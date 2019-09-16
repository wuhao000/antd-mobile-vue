import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

import RcRange from 'ant-design-vue/lib/vc-slider/src/Range';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FormComponent } from '../../mixins/form-component';
var Range = (_dec = Component({
  name: 'Range'
}), _dec2 = Prop({
  type: String,
  default: 'am-slider'
}), _dec3 = Prop({}), _dec4 = Prop({}), _dec5 = Prop({}), _dec6 = Prop({}), _dec7 = Prop({}), _dec8 = Prop({}), _dec9 = Prop({
  type: Number
}), _dec10 = Prop({
  type: Number
}), _dec11 = Prop({
  type: Number
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_FormComponent) {
  _inheritsLoose(Range, _FormComponent);

  function Range() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _FormComponent.call.apply(_FormComponent, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "handleStyle", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "trackStyle", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "railStyle", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onChange", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onAfterChange", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tipFormatter", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "min", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "max", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "step", _descriptor10, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Range.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var h = arguments[0];
    return h("div", {
      "class": this.prefixCls + "-wrapper"
    }, [h(RcRange, _mergeJSXProps([{}, {
      "props": this.$props
    }, {
      "attrs": {
        "value": this.currentValue
      }
    }, {
      "on": {
        change: function change(v) {
          _this2.currentValue = v;
        }
      }
    }]))]);
  };

  return Range;
}(FormComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "handleStyle", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "trackStyle", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "railStyle", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "onChange", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "onAfterChange", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "tipFormatter", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "min", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "max", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "step", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default Range;