import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import List from '../../list';
import BaseInputComponent from '../../mixins/base-input-component';
import Calendar from './index';
var MIN_DATE = new Date(2000, 1, 1, 0, 0, 0);
var MAX_DATE = new Date(new Date().getFullYear() + 10, 12, 31, 23, 59, 59);
var MCalendarItem = (_dec = Component({
  name: 'MCalendarItem'
}), _dec2 = Prop({
  type: [String, Object]
}), _dec3 = Prop({
  type: Date,
  default: function _default() {
    return new Date();
  }
}), _dec4 = Prop({
  type: Date,
  default: function _default() {
    return MIN_DATE;
  }
}), _dec5 = Prop({
  type: Date,
  default: function _default() {
    return MAX_DATE;
  }
}), _dec6 = Prop({
  type: Boolean,
  default: false
}), _dec7 = Prop({
  type: String,
  default: 'range'
}), _dec8 = Prop({
  type: String
}), _dec9 = Watch('value', {
  immediate: true
}), _dec10 = Watch('currentValue', {
  immediate: true
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_BaseInputComponent) {
  _inheritsLoose(MCalendarItem, _BaseInputComponent);

  function MCalendarItem() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _BaseInputComponent.call.apply(_BaseInputComponent, [this].concat(args)) || this, _initializerDefineProperty(_this, "title", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "defaultDate", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "minDate", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "maxDate", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "pickTime", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "type", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "placeholder", _descriptor7, _assertThisInitialized(_this)), _this.currentValue = [], _this.visible = false, _temp) || _assertThisInitialized(_this);
  }

  var _proto = MCalendarItem.prototype;

  _proto.getInputComponent = function getInputComponent() {
    return Calendar;
  };

  _proto.valueChanged = function valueChanged(value) {
    if (this.type === 'one') {
      this.currentValue = [value];
    } else if (value) {
      this.currentValue = value;
    }
  };

  _proto.currentValueChanged = function currentValueChanged() {
    if (this.currentValue.length) {
      this.displayValue = this.getDisplayValue();
    } else {
      this.displayValue = '';
    }
  };

  _proto.onClick = function onClick() {
    this.visible = true;
  };

  _proto.onConfirm = function onConfirm(value1, value2) {
    if (this.type === 'range') {
      this.currentValue = [value1, value2];
      this.$emit('input', [value1, value2]);
    } else {
      this.currentValue = [value1];
      this.$emit('input', value1);
    }
  };

  _proto.getDisplayValue = function getDisplayValue() {
    var _this2 = this;

    var valueStrs = this.currentValue.map(function (it) {
      if (_this2.pickTime) {
        return moment(it).format('YYYY/MM/DD HH:mm');
      } else {
        return moment(it).format('YYYY/MM/DD');
      }
    });

    if (this.type === 'range') {
      return valueStrs[0] + ' ~ ' + (valueStrs[1] || '');
    } else {
      return valueStrs[0];
    }
  };

  _proto.onClose = function onClose() {
    this.visible = false;
  };

  _proto.render = function render() {
    var h = arguments[0];
    return h(List.Item, {
      "attrs": {
        "text": !!this.displayValue,
        "required": this.required,
        "arrow": "horizontal",
        "title": this.title
      },
      "on": {
        "click": this.onClick
      }
    }, [h(Calendar, _mergeJSXProps([{}, {
      "attrs": this.props
    }, {
      "attrs": {
        "value": this.stateValue,
        "visible": this.visible,
        "defaultValue": this.currentValue,
        "slots": this.slots
      },
      "scopedSlots": this.$scopedSlots,
      "on": {
        "close": this.onClose,
        "confirm": this.onConfirm
      }
    }, {
      "on": this.listeners
    }, {
      "style": this.cssStyle
    }]), [this.getDefaultSlot()]), h("span", [this.title]), h("span", {
      "slot": "extra"
    }, [this.displayValue || this.placeholder])]);
  };

  return MCalendarItem;
}(BaseInputComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "defaultDate", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "minDate", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "maxDate", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "pickTime", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "placeholder", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentValueChanged", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "currentValueChanged"), _class2.prototype)), _class2)) || _class);
export { MCalendarItem as default };