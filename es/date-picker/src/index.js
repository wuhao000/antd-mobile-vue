import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

import Component from 'vue-class-component';
import { Prop, Provide } from 'vue-property-decorator';
import { getComponentLocale } from '../../utils/getLocale';
import { setProps } from '../../utils/vnode';
import RCDatePicker from '../../vmc-date-picker/date-picker';
import PopupDatePicker from '../../vmc-date-picker/popup';
import DatePickerProps from './props-type';
import { formatFn } from './utils';
var DatePicker = (_dec = Component({
  name: 'MDatePicker'
}), _dec2 = Prop({
  type: String,
  default: ''
}), _dec3 = Prop({
  type: String,
  default: 'am-picker'
}), _dec4 = Prop({
  type: Boolean,
  default: false
}), _dec5 = Prop({
  type: String,
  default: 'am-picker-col'
}), _dec6 = Prop({
  type: String,
  default: 'am-picker-popup'
}), _dec7 = Provide('store'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_DatePickerProps) {
  _inheritsLoose(DatePicker, _DatePickerProps);

  function DatePicker() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _DatePickerProps.call.apply(_DatePickerProps, [this].concat(args)) || this, _initializerDefineProperty(_this, "placeholder", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "use12Hours", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "pickerPrefixCls", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "popupPrefixCls", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "store", _descriptor6, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = DatePicker.prototype;

  _proto.setScrollValue = function setScrollValue(v) {
    this.scrollValue = v;
  };

  _proto.onOk = function onOk(v) {
    var value = v;

    if (this.scrollValue !== undefined) {
      value = this.scrollValue;
    }

    this.$emit('change', value);
    this.$emit('ok', value);
  };

  _proto.onVisibleChange = function onVisibleChange(visible) {
    this.scrollValue = undefined;
    this.$emit('visible-change', visible);
  };

  _proto.fixOnOk = function fixOnOk(picker) {
    if (picker) {
      picker.onOk = this.onOk;
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var h = arguments[0];
    var value = this.value,
        popupPrefixCls = this.popupPrefixCls;
    var locale = getComponentLocale(this.$props, null, 'DatePicker', function () {
      return require('./locale/zh_CN');
    });
    var okText = locale.okText,
        dismissText = locale.dismissText,
        extra = locale.extra,
        DatePickerLocale = locale.DatePickerLocale;
    /**
     * 注意:
     * 受控 表示 通过设置 value 属性、组件的最终状态跟 value 设置值一致。
     * 默认不设置 value 或 只设置 defaultValue 表示非受控。
     *
     * DatePickerView 对外通过 value “只支持 受控” 模式（可以使用 defaultDate 支持 非受控 模式，但不对外）
     * PickerView 对外通过 value “只支持 受控” 模式
     *
     * DatePicker / Picker 对外只有 value 属性 (没有 defaultValue)，
     * 其中 List 展示部分 “只支持 受控” 模式，
     * 弹出的 选择器部分 会随外部 value 改变而变、同时能自由滚动
     * （即不会因为传入的 value 不变而不能滚动 (不像原生 input 的受控行为)）
     *
     */

    var datePicker = // @ts-ignore
    h(RCDatePicker, {
      "attrs": {
        "minuteStep": this.minuteStep,
        "locale": DatePickerLocale,
        "minDate": this.minDate,
        "maxDate": this.maxDate,
        "mode": this.mode,
        "pickerPrefixCls": this.pickerPrefixCls,
        "prefixCls": this.prefixCls,
        "date": this.getDate(),
        "use12Hours": this.use12Hours
      },
      "on": {
        "input": function input(v) {
          _this2.onInput(v);
        },
        "valueChange": function valueChange() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          _this2.$emit.apply(_this2, ['value-change'].concat(args));
        },
        "scrollChange": this.setScrollValue
      }
    });
    var textValue = value ? formatFn(this, value) : null;
    var childExtra = textValue ? textValue : this.extra || extra || this.placeholder;
    var visible = this.disabled || !this.editable ? false : this.visible;
    return h(PopupDatePicker, _mergeJSXProps([{
      "attrs": {
        "datePicker": datePicker,
        "wrapComponent": "div",
        "transitionName": "am-slide-up",
        "maskTransitionName": "am-fade"
      }
    }, this.$props, {
      "attrs": {
        "title": this.title,
        "disabled": this.disabled,
        "editable": this.editable,
        "visible": visible,
        "prefixCls": popupPrefixCls,
        "date": this.getDate(),
        "dismissText": this.dismissText || dismissText,
        "okText": this.okText || okText
      },
      "ref": this.fixOnOk,
      "on": {
        "visibleChange": this.onVisibleChange
      }
    }]), [this.$slots.default && this.$slots.default.map(function (it) {
      setProps(it, {
        text: !!textValue,
        extra: childExtra,
        arrow: 'horizontal'
      });
      return it;
    })]);
  };

  _proto.onInput = function onInput(v) {
    this.$emit('change', v);
    this.$emit('input', v);
  };

  _proto.getDate = function getDate() {
    if (typeof this.value === 'number') {
      return new Date(this.value);
    } else {
      return this.value || new Date();
    }
  };

  return DatePicker;
}(DatePickerProps), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "placeholder", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "use12Hours", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "pickerPrefixCls", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "popupPrefixCls", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "store", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      onOk: null
    };
  }
})), _class2)) || _class);
export default DatePicker;