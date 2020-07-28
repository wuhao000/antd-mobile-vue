import _extends from "@babel/runtime/helpers/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Icon from '../../icon';
import RMCInputNumber from '../../vmc-input-number';
var MStepper = (_dec = Component({
  name: 'MStepper'
}), _dec2 = Prop({
  type: String,
  default: 'am-stepper'
}), _dec3 = Prop({
  type: Boolean,
  default: true
}), _dec4 = Prop({
  type: Number
}), _dec5 = Prop({
  type: Number
}), _dec6 = Prop({
  default: 1
}), _dec7 = Prop({
  type: Boolean,
  default: false
}), _dec8 = Prop({
  type: Boolean
}), _dec9 = Prop({
  type: Boolean
}), _dec10 = Prop({
  type: [Number, String]
}), _dec11 = Prop({
  type: Number
}), _dec12 = Prop({
  type: Boolean,
  default: true
}), _dec13 = Prop({}), _dec14 = Prop({}), _dec15 = Prop({}), _dec16 = Prop({
  type: String
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(MStepper, _Vue);

  function MStepper() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "showNumber", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "min", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "max", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "step", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "readOnly", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "autoFocus", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "defaultValue", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "valueEditable", _descriptor11, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "upStyle", _descriptor12, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "downStyle", _descriptor13, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "inputStyle", _descriptor14, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "name", _descriptor15, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = MStepper.prototype;

  _proto.getCurrentValue = function getCurrentValue() {
    var value = this.value;
    var currentValue = null;

    if (typeof value === 'string') {
      if (value === '') {
        currentValue = null;
      } else {
        currentValue = parseInt(value);
      }
    } else {
      currentValue = value;
    }

    return currentValue;
  };

  _proto.render = function render() {
    var h = arguments[0];

    var _this$$props = this.$props,
        showNumber = _this$$props.showNumber,
        value = _this$$props.value,
        restProps = _objectWithoutPropertiesLoose(_this$$props, ["showNumber", "value"]);

    var stepperClass = classnames({
      showNumber: !!showNumber
    });
    restProps.upHandler = h(Icon, {
      "attrs": {
        "type": "plus",
        "size": "xxs"
      }
    });
    restProps.downHandler = h(Icon, {
      "attrs": {
        "type": "minus",
        "size": "xxs"
      }
    });
    return h(RMCInputNumber, _mergeJSXProps([{}, {
      "on": this.$listeners
    }, {}, {
      "props": _extends({
        value: this.getCurrentValue()
      }, restProps)
    }, {
      "class": stepperClass
    }]));
  };

  return MStepper;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "showNumber", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "min", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "max", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "step", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "readOnly", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "autoFocus", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "defaultValue", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "valueEditable", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "upStyle", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "downStyle", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "inputStyle", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "name", [_dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default MStepper;