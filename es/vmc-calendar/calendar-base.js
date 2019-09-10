import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _class3, _temp2;

import Component from 'vue-class-component';
import { Provide, Watch } from 'vue-property-decorator';
import CalendarProps from './calendar-props';
import ConfirmPanel from './calendar/confirm-panel';
import Header from './calendar/header';
import ShortcutPanel from './calendar/shortcut-panel';
import DatePicker from './date-picker';
import TimePicker from './time-picker';
import { mergeDateTime } from './util';
export var StateType = function StateType() {
  this.showTimePicker = false;
  this.startDate = undefined;
  this.endDate = undefined;
  this.disConfirmBtn = true;
  this.clientHight = 0;
  this.visible = false;
};
var CalendarBase = (_dec = Component({
  name: 'CalendarBase'
}), _dec2 = Provide('currentValue'), _dec3 = Watch('state', {
  deep: true
}), _dec4 = Watch('defaultValue'), _dec(_class = (_class2 = (_temp2 = _class3 =
/*#__PURE__*/
function (_CalendarProps) {
  _inheritsLoose(CalendarBase, _CalendarProps);

  function CalendarBase() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _CalendarProps.call.apply(_CalendarProps, [this].concat(args)) || this, _this.state = {
      showTimePicker: false,
      timePickerTitle: '',
      startDate: undefined,
      endDate: undefined,
      disConfirmBtn: true,
      clientHeight: 0,
      contentStyle: {},
      visible: _this.visible
    }, _initializerDefineProperty(_this, "currentValue", _descriptor, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = CalendarBase.prototype;

  _proto.stateChanged = function stateChanged(value) {
    this.currentValue[0] = value.startDate;
    this.currentValue[1] = value.endDate;
  };

  _proto.created = function created() {
    if (this.defaultValue) {
      var defaultValue = this.defaultValue;
      this.state = _extends({}, this.state, this.selectDate(defaultValue[1], true, {
        startDate: defaultValue[0]
      }));
    }
  };

  _proto.defaultValueChanged = function defaultValueChanged(defaultValue) {
    if (this.visible && this.defaultValue) {
      this.shortcutSelect(this.defaultValue[0], this.defaultValue[1]);
    }
  };

  _proto.selectDate = function selectDate(date, useDateTime, oldState) {
    if (useDateTime === void 0) {
      useDateTime = false;
    }

    if (oldState === void 0) {
      oldState = {};
    }

    if (!date) {
      return {};
    }

    var newState = {};
    var type = this.type,
        pickTime = this.pickTime,
        defaultTimeValue = this.defaultTimeValue,
        _this$locale = this.locale,
        locale = _this$locale === void 0 ? {} : _this$locale;
    var newDate = pickTime && !useDateTime ? mergeDateTime(date, defaultTimeValue) : date;
    var _oldState = oldState,
        startDate = _oldState.startDate,
        endDate = _oldState.endDate;

    switch (type) {
      case 'one':
        newState = _extends({}, newState, {
          startDate: newDate,
          disConfirmBtn: false
        });

        if (pickTime) {
          newState = _extends({}, newState, {
            timePickerTitle: locale.selectTime,
            showTimePicker: true
          });
        }

        break;

      case 'range':
        if (!startDate || endDate) {
          newState = _extends({}, newState, {
            startDate: newDate,
            endDate: undefined,
            disConfirmBtn: true
          });

          if (pickTime) {
            newState = _extends({}, newState, {
              timePickerTitle: locale.selectStartTime,
              showTimePicker: true
            });
          }
        } else {
          newState = _extends({}, newState, {
            timePickerTitle: +newDate >= +startDate ? locale.selectEndTime : locale.selectStartTime,
            disConfirmBtn: false,
            endDate: pickTime && !useDateTime && +newDate >= +startDate ? new Date(+mergeDateTime(newDate, startDate) + 3600000) : newDate
          });
        }

        break;
    }

    return newState;
  };

  _proto.onSelectedDate = function onSelectedDate(date) {
    var _this$state = this.state,
        startDate = _this$state.startDate,
        endDate = _this$state.endDate;
    var onSelect = this.onSelect;

    if (onSelect) {
      var value = onSelect(date, [startDate, endDate]);

      if (value) {
        this.shortcutSelect(value[0], value[1]);
        return;
      }
    }

    this.state = _extends(this.state, this.selectDate(date, false, {
      startDate: startDate,
      endDate: endDate
    }));
  }
  /** 选择区间包含不可用日期 */
  ;

  _proto.onSelectHasDisableDate = function onSelectHasDisableDate(date) {
    this.onClear();
    this.$emit('select-has-disable-date', date);
  };

  _proto.onClose = function onClose() {
    this.state = _extends(this.state, new StateType());
    this.$emit('close');
    this.$emit('update:visible', false);
  }
  /** 关闭时回调 */
  ;

  _proto.onCancel = function onCancel() {
    this.$emit('cancel');
    this.onClose();
  }
  /** 确认时回调 */
  ;

  _proto.onConfirm = function onConfirm() {
    var _this$state2 = this.state,
        startDate = _this$state2.startDate,
        endDate = _this$state2.endDate;

    if (startDate && endDate && +startDate > +endDate) {
      return this.$emit('confirm', endDate, startDate);
    }

    this.$emit('confirm', startDate, endDate);
    this.onClose();
  };

  _proto.onTimeChange = function onTimeChange(timeValue) {
    var _this$state3 = this.state,
        startDate = _this$state3.startDate,
        endDate = _this$state3.endDate;
    var date = null;

    if (endDate) {
      date = endDate;
    } else if (startDate) {
      date = startDate;
    }

    if (date) {
      var hours = timeValue[0];

      if (timeValue[2] === 1) {
        hours += 12;
        date.setUTCHours(timeValue[0]);
      }

      date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), timeValue[0], timeValue[1], 0);
    }

    if (endDate) {
      this.state.endDate = date;
    } else if (startDate) {
      this.state.startDate = date;
    }
  }
  /** 清除时回调 */
  ;

  _proto.onClear = function onClear() {
    this.state.startDate = undefined;
    this.state.endDate = undefined;
    this.state.showTimePicker = false;
    this.$emit('clear');
  };

  _proto.shortcutSelect = function shortcutSelect(startDate, endDate) {
    this.state = _extends(this.state, _extends({
      startDate: startDate
    }, this.selectDate(endDate, true, {
      startDate: startDate
    }), {
      showTimePicker: false
    }));
  };

  _proto.setClientHeight = function setClientHeight(height) {
    this.state.clientHeight = height;
  };

  _proto.renderCalendar = function renderCalendar() {
    var h = this.$createElement;
    var type = this.type,
        _this$locale2 = this.locale,
        locale = _this$locale2 === void 0 ? {} : _this$locale2,
        prefixCls = this.prefixCls,
        pickTime = this.pickTime,
        showShortcut = this.showShortcut,
        renderHeader = this.renderHeader,
        infiniteOpt = this.infiniteOpt,
        initialMonths = this.initialMonths,
        defaultDate = this.defaultDate,
        minDate = this.minDate,
        maxDate = this.maxDate,
        getDateExtra = this.getDateExtra,
        rowSize = this.rowSize,
        defaultTimeValue = this.defaultTimeValue,
        renderShortcut = this.renderShortcut,
        timePickerPrefixCls = this.timePickerPrefixCls,
        timePickerPickerPrefixCls = this.timePickerPickerPrefixCls;
    var _this$state4 = this.state,
        showTimePicker = _this$state4.showTimePicker,
        timePickerTitle = _this$state4.timePickerTitle,
        startDate = _this$state4.startDate,
        endDate = _this$state4.endDate,
        disConfirmBtn = _this$state4.disConfirmBtn,
        clientHeight = _this$state4.clientHeight;
    var headerProps = {
      locale: locale,
      showClear: !!startDate
    };
    return h("div", {
      "class": "" + prefixCls
    }, [h("div", {
      "style": this.state.contentStyle,
      "class": "content"
    }, [renderHeader ? renderHeader(headerProps) : h(Header, _mergeJSXProps([{}, {
      "attrs": _extends({}, headerProps)
    }, {
      "on": {
        "clear": this.onCancel,
        "cancel": this.onCancel
      }
    }])), h(DatePicker, {
      "attrs": {
        "locale": locale,
        "type": type,
        "displayMode": this.displayMode,
        "prefixCls": prefixCls,
        "infiniteOpt": infiniteOpt,
        "initialMonths": initialMonths,
        "currentStartDate": this.state.startDate,
        "currentEndDate": this.state.endDate,
        "defaultDate": defaultDate,
        "minDate": minDate,
        "maxDate": maxDate,
        "getDateExtra": getDateExtra,
        "startDate": startDate,
        "endDate": endDate,
        "rowSize": rowSize
      },
      "on": {
        "cellClick": this.onSelectedDate,
        "selectHasDisableDate": this.onSelectHasDisableDate,
        "layout": this.setClientHeight
      }
    }), !this.displayMode && showTimePicker && h(TimePicker, {
      "attrs": {
        "prefixCls": timePickerPrefixCls,
        "pickerPrefixCls": timePickerPickerPrefixCls,
        "locale": locale,
        "title": timePickerTitle,
        "defaultValue": defaultTimeValue,
        "value": endDate ? endDate : startDate,
        "minDate": minDate,
        "maxDate": maxDate,
        "clientHeight": clientHeight
      },
      "on": {
        "change": this.onTimeChange
      }
    }), !this.displayMode && showShortcut && !showTimePicker && (renderShortcut ? renderShortcut(this.shortcutSelect) : h(ShortcutPanel, {
      "attrs": {
        "locale": locale
      },
      "on": {
        "select": this.shortcutSelect
      }
    })), startDate && !this.displayMode && h(ConfirmPanel, {
      "attrs": {
        "type": type,
        "locale": locale,
        "startDateTime": startDate,
        "endDateTime": endDate,
        "disableBtn": disConfirmBtn,
        "formatStr": pickTime ? locale.dateTimeFormat : locale.dateFormat
      },
      "on": {
        "confirm": this.onConfirm
      }
    })])]);
  };

  return CalendarBase;
}(CalendarProps), _class3.DefaultHeader = Header, _class3.DefaultShortcut = ShortcutPanel, _temp2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "currentValue", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "stateChanged", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "stateChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defaultValueChanged", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultValueChanged"), _class2.prototype)), _class2)) || _class);
export { CalendarBase as default };