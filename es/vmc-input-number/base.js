import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

function defaultParser(input) {
  if (typeof input === 'number') {
    return input;
  }

  return input.replace(/[^\w\.-]+/g, '');
}
/**
 * When click and hold on a button - the speed of auto changin the value.
 */


var SPEED = 200;
/**
 * When click and hold on a button - the delay before auto changin the value.
 */

var DELAY = 600;
/**
 * Max Safe Integer -- on IE this is not available, so manually set the number in that case.
 * The reason this is used, instead of Infinity is because numbers above the MSI are unstable
 */

var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
var BaseComponent = (_dec = Component({
  name: 'BaseComponent'
}), _dec2 = Prop([String, Number]), _dec3 = Prop({
  type: Function,
  default: defaultParser
}), _dec4 = Prop(Number), _dec5 = Prop(Number), _dec6 = Prop(Number), _dec7 = Prop(Number), _dec8 = Prop({
  type: Boolean,
  default: false
}), _dec9 = Prop({
  type: Boolean,
  default: false
}), _dec10 = Prop({
  type: Boolean,
  default: false
}), _dec11 = Prop(Number), _dec12 = Watch('value'), _dec13 = Watch('state.inputValue'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(BaseComponent, _Vue);

  function BaseComponent() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "step", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "parser", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "defaultValue", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "min", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "max", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "autoFocus", _descriptor7, _assertThisInitialized(_this)), _this.state = {
      inputValue: null,
      focused: _this.autoFocus
    }, _initializerDefineProperty(_this, "disabled", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "readOnly", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "precision", _descriptor10, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = BaseComponent.prototype;

  _proto.created = function created() {
    var _this2 = this;

    var value = this.value !== undefined ? this.toNumber(this.value) : this.defaultValue;
    this.state.inputValue = this.toPrecisionAsStep(value);
    this.$watch(function () {
      return _this2.value;
    }, function () {
      _this2.state.inputValue = _this2.state.focused ? _this2.value : _this2.getValidValue(_this2.value);
    });
  };

  _proto.beforeDestroy = function beforeDestroy() {
    this.stop();
  };

  _proto.onChange = function onChange(e) {
    var parser = this.parser;
    var input = typeof e === 'number' ? e : parser && parser(e.target.value);
    this.state.inputValue = parseFloat(input);
    this.$emit('change', this.toNumberWhenUserInput(input));
  };

  _proto.valueChanged = function valueChanged(value) {
    var v = value !== undefined ? this.toNumber(value) : this.defaultValue;
    this.state.inputValue = this.toPrecisionAsStep(v);
  };

  _proto.onFocus = function onFocus() {
    this.state.focused = true;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    this.$emit.apply(this, ['focus'].concat(args));
  };

  _proto.onBlur = function onBlur(e) {
    var _this3 = this;

    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    this.state.focused = false;
    var value = this.getCurrentValidValue(this.state.inputValue);

    if (e.persist) {
      e.persist(); // fix https://github.com/react-component/input-number/issues/51
    }

    this.setValue(value, function () {
      _this3.$emit.apply(_this3, ['blur', e].concat(args));
    });
  };

  _proto.getCurrentValidValue = function getCurrentValidValue(value) {
    var val = value;

    if (val === '') {
      val = '';
    } else if (!this.isNotCompleteNumber(val)) {
      val = this.getValidValue(val);
    } else {
      val = this.state.inputValue;
    }

    return this.toNumber(val);
  };

  _proto.getValidValue = function getValidValue(value) {
    var val = parseFloat(value.toString());

    if (isNaN(val)) {
      return value;
    }

    if (val < this.min) {
      val = this.min;
    }

    if (val > this.max) {
      val = this.max;
    }

    return val;
  };

  _proto.setValue = function setValue(v, callback) {
    // trigger onChange
    var newValue = this.isNotCompleteNumber(parseFloat(v)) ? undefined : parseFloat(v);
    var changed = newValue !== this.state.inputValue || "" + newValue !== "" + this.state.inputValue; // https://github.com/ant-design/ant-design/issues/7363

    if (this.value === undefined) {
      this.state.inputValue = this.toPrecisionAsStep(v);
      callback && callback();
    } else {
      // always set input value same as value
      this.state.inputValue = this.toPrecisionAsStep(v);
      callback && callback();
    }

    if (changed) {
      this.$emit('change', newValue);
    }
  };

  _proto.stateValueChanged = function stateValueChanged(v) {
    this.$emit('input', v);
  };

  _proto.getPrecision = function getPrecision(value) {
    if (this.precision) {
      return this.precision;
    }

    var valueString = value.toString();

    if (valueString.indexOf('e-') >= 0) {
      return parseInt(valueString.slice(valueString.indexOf('e-') + 2), 10);
    }

    var precision = 0;

    if (valueString.indexOf('.') >= 0) {
      precision = valueString.length - valueString.indexOf('.') - 1;
    }

    return precision;
  };

  _proto.getMaxPrecision = function getMaxPrecision(currentValue, ratio) {
    if (ratio === void 0) {
      ratio = 1;
    }

    if (this.precision) {
      return this.precision;
    }

    var step = this.step;
    var ratioPrecision = this.getPrecision(ratio);
    var stepPrecision = this.getPrecision(step);
    var currentValuePrecision = this.getPrecision(currentValue);

    if (!currentValue) {
      return ratioPrecision + stepPrecision;
    }

    return Math.max(currentValuePrecision, ratioPrecision + stepPrecision);
  };

  _proto.getPrecisionFactor = function getPrecisionFactor(currentValue, ratio) {
    if (ratio === void 0) {
      ratio = 1;
    }

    var precision = this.getMaxPrecision(currentValue, ratio);
    return Math.pow(10, precision);
  };

  _proto.toPrecisionAsStep = function toPrecisionAsStep(num) {
    if (this.isNotCompleteNumber(num)) {
      return num;
    }

    var precision = Math.abs(this.getMaxPrecision(num));

    if (!isNaN(precision)) {
      return parseFloat(Number(num).toFixed(precision));
    }

    return num;
  };

  _proto.isNotCompleteNumber = function isNotCompleteNumber(num) {
    return isNaN(num) || num === '' || num === null || num && num.toString().indexOf('.') === num.toString().length - 1;
  };

  _proto.toNumber = function toNumber(num) {
    if (this.isNotCompleteNumber(num)) {
      return num;
    }

    if (this.precision) {
      return Number(Number(num).toFixed(this.precision));
    }

    return Number(num);
  };

  _proto.toNumberWhenUserInput = function toNumberWhenUserInput(num) {
    // num.length > 16 => prevent input large number will became Infinity
    if ((/\.\d*0$/.test(num) || num.length > 16) && this.state.focused) {
      return num;
    }

    return this.toNumber(num);
  };

  _proto.stepCompute = function stepCompute(type, val, rat) {
    var step = this.step,
        min = this.min;
    var precisionFactor = this.getPrecisionFactor(val, rat);
    var precision = Math.abs(this.getMaxPrecision(val, rat));
    var result;
    var direct = type === 'up' ? 1 : -1;

    if (typeof val === 'number') {
      result = ((precisionFactor * val + direct * precisionFactor * +step * rat) / precisionFactor).toFixed(precision);
    } else {
      result = min === -Infinity ? direct * +step : min;
    }

    return this.toNumber(result);
  };

  _proto.stepTo = function stepTo(type, e, ratio) {
    if (ratio === void 0) {
      ratio = 1;
    }

    if (e) {
      e.preventDefault();
    }

    var props = this;

    if (this.disabled) {
      return false;
    }

    var value = this.getCurrentValidValue(this.state.inputValue) || 0;

    if (this.isNotCompleteNumber(value)) {
      return false;
    }

    var val = this.stepCompute(type, value, ratio);
    var outOfRange = val > props.max || val < props.min;

    if (val > props.max) {
      val = props.max;
    } else if (val < props.min) {
      val = props.min;
    }

    this.setValue(val);
    this.state.focused = true;
    return !outOfRange;
  };

  _proto.stop = function stop() {
    if (this.autoStepTimer) {
      clearTimeout(this.autoStepTimer);
    }
  };

  _proto.action = function action(type, e, ratio, recursive) {
    var _this4 = this;

    if (e.persist) {
      e.persist();
    }

    this.stop();

    if (this.stepTo(type, e, ratio)) {
      this.autoStepTimer = setTimeout(function () {
        _this4.action(type, e, ratio, true);
      }, recursive ? SPEED : DELAY);
    }
  };

  _proto.down = function down(e, ratio, recursive) {
    this.action('down', e, ratio, recursive);
  };

  _proto.up = function up(e, ratio, recursive) {
    this.action('up', e, ratio, recursive);
  };

  return BaseComponent;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "step", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "parser", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "defaultValue", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "min", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "max", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "autoFocus", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "readOnly", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "precision", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stateValueChanged", [_dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "stateValueChanged"), _class2.prototype)), _class2)) || _class);
export { BaseComponent as default };