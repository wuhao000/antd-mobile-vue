import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3;

import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Icon from '../../icon';
import { getComponentLocale } from '../../utils/getLocale';
import { Calendar as VMCalendar } from '../../vmc-calendar';
import CalendarProps from '../../vmc-calendar/calendar-props';
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
}), _dec5 = Watch('visible'), _dec(_class = (_class2 =
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

  _proto.visibleChanged = function visibleChanged(value) {
    this.state.visible = value;
  };

  _proto.onConfirm = function onConfirm() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    this.$emit.apply(this, ['confirm'].concat(args));
    this.onClose();
  };

  _proto.onClear = function onClear(e) {
    this.$emit('clear', e);
  };

  _proto.onClose = function onClose() {
    this.state.visible = false;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    this.$emit.apply(this, ['close'].concat(args));
    this.$emit('update:visible', false);
  };

  _proto.render = function render() {
    var _this2 = this;

    var h = arguments[0];
    var locale = getComponentLocale(this.$props, {}, 'Calendar', function () {
      return require('./locale/zh_CN');
    });
    var Header = VMCalendar.DefaultHeader;
    return h(VMCalendar, _mergeJSXProps([{
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
        "cancel": function cancel() {
          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          _this2.$emit.apply(_this2, ['cancel'].concat(args));
        },
        "close": this.onClose,
        "confirm": this.onConfirm,
        "clear": this.onClear,
        "selectHasDisableDate": function selectHasDisableDate() {
          for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
          }

          _this2.$emit.apply(_this2, ['select-has-disable-date'].concat(args));
        }
      }
    }, {
      "attrs": this.$props
    }, {
      "attrs": {
        "visible": this.state.visible
      }
    }]));
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
}), _applyDecoratedDescriptor(_class2.prototype, "visibleChanged", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "visibleChanged"), _class2.prototype)), _class2)) || _class);
export default Calendar;