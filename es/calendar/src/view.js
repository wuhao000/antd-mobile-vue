import _extends from "@babel/runtime/helpers/extends";
import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Icon from '../../icon';
import { getComponentLocale } from '../../utils/getLocale';
import { CalendarView as VMCalendar } from '../../vmc-calendar';
import CalendarProps from '../../vmc-calendar/calendar-props';

var endOfMonth = function endOfMonth() {
  var now = new Date();
  return new Date(new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime() - 24 * 3600 * 1000);
};

var beginOfMonth = function beginOfMonth() {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
};

var Calendar = (_dec = Component({
  name: 'Calendar'
}), _dec2 = Prop({
  type: String,
  default: 'am-calendar'
}), _dec3 = Prop({
  type: String,
  default: 'am-picker'
}), _dec4 = Prop({
  type: String,
  default: 'am-picker-col'
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_CalendarProps) {
  _inheritsLoose(Calendar, _CalendarProps);

  function Calendar() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _CalendarProps.call.apply(_CalendarProps, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "timePickerPrefixCls", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "timePickerPickerPrefixCls", _descriptor3, _assertThisInitialized(_this)), _this.state = {
      visible: _this.visible
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = Calendar.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var h = arguments[0];
    var locale = getComponentLocale(this.$props, {}, 'Calendar', function () {
      return require('./locale/zh_CN');
    }); // @ts-ignore

    var Header = VMCalendar.DefaultHeader;
    return (// @ts-ignore
      h(VMCalendar, _mergeJSXProps([{
        "class": this.prefixCls + '-view',
        "attrs": {
          "locale": locale,
          "renderHeader": function renderHeader(headerProps) {
            return h(Header, _mergeJSXProps2([{}, headerProps, {
              "attrs": {
                "closeIcon": h(Icon, {
                  "attrs": {
                    "type": "cross"
                  }
                })
              }
            }]));
          }
        },
        "on": {
          "selectHasDisableDate": function selectHasDisableDate() {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            _this2.$emit.apply(_this2, ['select-has-disable-date'].concat(args));
          }
        }
      }, {
        "attrs": _extends({}, this.$props, {
          type: 'one',
          displayMode: true,
          minDate: this.minDate || beginOfMonth(),
          maxDate: this.maxDate || endOfMonth()
        })
      }, {
        "attrs": {
          "visible": this.state.visible
        }
      }]))
    );
  };

  return Calendar;
}(CalendarProps), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "timePickerPrefixCls", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "timePickerPickerPrefixCls", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default Calendar;