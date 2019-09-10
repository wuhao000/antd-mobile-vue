import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import DateTimePicker from '../vmc-date-picker';
export var MIN_DATE = new Date(0, 0, 0, 0, 0);
export var MAX_DATE = new Date(9999, 11, 31, 23, 59, 59);
var TimePicker = (_dec = Component({
  name: 'TimePicker'
}), _dec2 = Prop(), _dec3 = Prop(String), _dec4 = Prop(String), _dec5 = Prop(String), _dec6 = Prop(Date), _dec7 = Prop(Date), _dec8 = Prop({
  type: Date,
  default: function _default() {
    return MIN_DATE;
  }
}), _dec9 = Prop({
  type: Date,
  default: function _default() {
    return MAX_DATE;
  }
}), _dec10 = Prop(), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(TimePicker, _Vue);

  function TimePicker() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "locale", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "pickerPrefixCls", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "title", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "defaultValue", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "minDate", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "maxDate", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "clientHeight", _descriptor9, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = TimePicker.prototype;

  _proto.onDateChange = function onDateChange(date) {
    this.$emit('change', date);
  };

  _proto.getMinTime = function getMinTime(date) {
    var minDate = this.minDate;

    if (!date || date.getFullYear() > minDate.getFullYear() || date.getMonth() > minDate.getMonth() || date.getDate() > minDate.getDate()) {
      return MIN_DATE;
    }

    return minDate;
  };

  _proto.getMaxTime = function getMaxTime(date) {
    var maxDate = this.maxDate;

    if (!date || date.getFullYear() < maxDate.getFullYear() || date.getMonth() < maxDate.getMonth() || date.getDate() < maxDate.getDate()) {
      return MAX_DATE;
    }

    return maxDate;
  };

  _proto.render = function render() {
    var h = arguments[0];
    var _this$$props = this.$props,
        locale = _this$$props.locale,
        title = _this$$props.title,
        value = _this$$props.value,
        defaultValue = _this$$props.defaultValue,
        prefixCls = _this$$props.prefixCls,
        pickerPrefixCls = _this$$props.pickerPrefixCls,
        clientHeight = _this$$props.clientHeight;
    var date = value || defaultValue || undefined;
    var height = clientHeight && clientHeight * 3 / 8 - 52 || Number.POSITIVE_INFINITY;
    return h("div", {
      "class": "time-picker"
    }, [h("div", {
      "class": "title"
    }, [title]), // @ts-ignore
    h(DateTimePicker, {
      "attrs": {
        "prefixCls": prefixCls,
        "pickerPrefixCls": pickerPrefixCls,
        "mode": "time",
        "date": date,
        "locale": locale,
        "minDate": this.getMinTime(date),
        "maxDate": this.getMaxTime(date),
        "use12Hours": true
      },
      "style": {
        height: height > 164 || height < 0 ? 164 : height,
        overflow: 'hidden'
      },
      "on": {
        "change": this.onDateChange
      }
    })]);
  };

  return TimePicker;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "locale", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "pickerPrefixCls", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "defaultValue", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "minDate", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "maxDate", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "clientHeight", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default TimePicker;