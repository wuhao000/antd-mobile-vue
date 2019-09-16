import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15;

import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FormComponent } from '../../mixins/form-component';
import List from '../../list';
import Slider from './index';
var SliderItem = (_dec = Component({
  name: 'SliderItem'
}), _dec2 = Prop({
  type: String,
  default: 'am-slider'
}), _dec3 = Prop({}), _dec4 = Prop({
  type: Boolean
}), _dec5 = Prop({
  type: Boolean
}), _dec6 = Prop({}), _dec7 = Prop({}), _dec8 = Prop({}), _dec9 = Prop({}), _dec10 = Prop({}), _dec11 = Prop({}), _dec12 = Prop({
  type: Number
}), _dec13 = Prop({
  type: Number
}), _dec14 = Prop({
  type: Number
}), _dec15 = Prop({}), _dec16 = Prop({
  type: String
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_FormComponent) {
  _inheritsLoose(SliderItem, _FormComponent);

  function SliderItem() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _FormComponent.call.apply(_FormComponent, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "marks", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "dots", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "included", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "maximumTrackStyle", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "minimumTrackStyle", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "handleStyle", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "trackStyle", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "railStyle", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tipFormatter", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "min", _descriptor11, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "max", _descriptor12, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "step", _descriptor13, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "handle", _descriptor14, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "title", _descriptor15, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = SliderItem.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var h = arguments[0];
    return h(List.Item, {
      "attrs": {
        "multipleLine": true,
        "disabled": this.isDisabled
      }
    }, [this.title, h(List.Item.Brief, {
      "style": {
        padding: '15px'
      }
    }, [h(Slider, _mergeJSXProps([{}, {
      "props": this.$props
    }, {
      "attrs": {
        "disabled": this.isDisabled,
        "value": this.currentValue
      }
    }, {
      "on": {
        change: function change(v) {
          _this2.currentValue = v;
        }
      }
    }]))])]);
  };

  return SliderItem;
}(FormComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "marks", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "dots", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "included", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "maximumTrackStyle", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "minimumTrackStyle", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "handleStyle", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "trackStyle", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "railStyle", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "tipFormatter", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "min", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "max", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "step", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "handle", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { SliderItem as default };