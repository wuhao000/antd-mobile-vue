import _extends from "@babel/runtime/helpers/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import DatePickerProps from '../../date-picker/src/props-type';
import { getComponentLocale } from '../../utils/getLocale';
import RCDatePicker from '../../vmc-date-picker/date-picker';
var DatePickerView = (_dec = Component({
  name: 'DatePickerView'
}), _dec2 = Prop({
  type: String,
  default: 'am-picker'
}), _dec3 = Prop({
  type: String,
  default: 'am-picker-col'
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_DatePickerProps) {
  _inheritsLoose(DatePickerView, _DatePickerProps);

  function DatePickerView() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _DatePickerProps.call.apply(_DatePickerProps, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "pickerPrefixCls", _descriptor2, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = DatePickerView.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var h = arguments[0];
    var locale = getComponentLocale(this.$props, this, 'DatePickerView', function () {
      return require('./locale/zh_CN');
    }); // DatePicker use `defaultDate`, maybe because there are PopupDatePicker inside? @yiminghe
    // Here Use `date` instead of `defaultDate`, make it controlled fully.

    return h(RCDatePicker, _mergeJSXProps([{}, {
      "props": _extends({}, this.$props, {
        locale: locale,
        date: this.value
      })
    }, {
      "on": {
        "change": function change(value) {
          var date = new Date(value[0], value[1], value[2], value[3], value[4]);

          _this2.$emit('input', date);

          _this2.$emit('change', date);
        },
        "scrollChange": function scrollChange(e) {
          _this2.$emit('scrollChange', e);

          _this2.$emit('scroll-change', e);
        }
      }
    }]));
  };

  return DatePickerView;
}(DatePickerProps), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "pickerPrefixCls", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default DatePickerView;