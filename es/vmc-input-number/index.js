import _extends from "@babel/runtime/helpers/extends";
import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

import classNames from 'classnames';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BaseComponent from './base';
import InputHandler from './input-handler';

function noop() {}

function preventDefault(e) {
  e.preventDefault();
}

var InputNumber = (_dec = Component({
  name: 'InputNumber'
}), _dec2 = Prop({
  type: Boolean,
  default: false
}), _dec3 = Prop({
  type: Boolean,
  default: false
}), _dec4 = Prop({
  type: String,
  default: 'rmc-input-number'
}), _dec5 = Prop(Number), _dec6 = Prop(Object), _dec7 = Prop(Object), _dec8 = Prop(Function), _dec(_class = (_class2 =
/*#__PURE__*/
function (_BaseComponent) {
  _inheritsLoose(InputNumber, _BaseComponent);

  function InputNumber() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _BaseComponent.call.apply(_BaseComponent, [this].concat(args)) || this, _initializerDefineProperty(_this, "valueEditable", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "focusOnUpDown", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tabIndex", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "upHandler", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "downHandler", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "formatter", _descriptor7, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = InputNumber.prototype;

  _proto.update = function update() {
    if (this.focusOnUpDown && this.state.focused) {
      var selectionRange = this.input.setSelectionRange;

      if (selectionRange && typeof selectionRange === 'function' && this.start !== undefined && this.end !== undefined && this.start !== this.end) {
        this.input.setSelectionRange(this.start, this.end);
      } else {
        this.focus();
      }
    }
  };

  _proto.mounted = function mounted() {
    this.update();
  };

  _proto.beforeUpdate = function beforeUpdate() {
    try {
      this.start = this.input.selectionStart;
      this.end = this.input.selectionEnd;
    } catch (e) {// Fix error in Chrome:
      // Failed to read the 'selectionStart' property from 'HTMLInputElement'
      // http://stackoverflow.com/q/21177489/3040605
    }
  };

  _proto.focus = function focus() {
    this.input.focus();
  };

  _proto.formatWrapper = function formatWrapper(num) {
    if (this.formatter) {
      return this.formatter(num);
    }

    return num;
  };

  _proto.render = function render() {
    var _classNames;

    var h = arguments[0];
    var _this$prefixCls = this.prefixCls,
        prefixCls = _this$prefixCls === void 0 ? '' : _this$prefixCls,
        disabled = this.disabled,
        readOnly = this.readOnly,
        max = this.max,
        step = this.step,
        valueEditable = this.valueEditable,
        autoFocus = this.autoFocus,
        tabIndex = this.tabIndex,
        min = this.min;
    var classes = classNames((_classNames = {}, _classNames[prefixCls] = true, _classNames[prefixCls + "-disabled"] = disabled, _classNames[prefixCls + "-focused"] = this.state.focused, _classNames));
    var upDisabledClass = '';
    var downDisabledClass = '';
    var inputValue = this.state.inputValue;

    if (inputValue || inputValue === 0) {
      if (!isNaN(inputValue)) {
        var val = Number(inputValue);

        if (val >= max) {
          upDisabledClass = prefixCls + "-handler-up-disabled";
        }

        if (val <= min) {
          downDisabledClass = prefixCls + "-handler-down-disabled";
        }
      } else {
        upDisabledClass = prefixCls + "-handler-up-disabled";
        downDisabledClass = prefixCls + "-handler-down-disabled";
      }
    }

    var editable = !readOnly && !disabled; // focus state, show input value
    // unfocus state, show valid value

    var inputDisplayValue;

    if (this.state.focused) {
      inputDisplayValue = this.state.inputValue;
    } else {
      inputDisplayValue = this.toPrecisionAsStep(this.state.inputValue);
    }

    if (inputDisplayValue === undefined || inputDisplayValue === null) {
      inputDisplayValue = '';
    }

    var upEvents;
    var downEvents;
    upEvents = {
      touchstart: editable && !upDisabledClass ? this.up : noop,
      touchend: this.stop
    };
    downEvents = {
      touchstart: editable && !downDisabledClass ? this.down : noop,
      touchend: this.stop
    };
    var inputDisplayValueFormat = this.formatWrapper(inputDisplayValue);
    var isUpDisabled = !!upDisabledClass || disabled || readOnly;
    var isDownDisabled = !!downDisabledClass || disabled || readOnly;
    return h("div", {
      "class": classes
    }, [h("div", {
      "class": prefixCls + "-handler-wrap"
    }, [h(InputHandler, _mergeJSXProps([{
      "attrs": {
        "disabled": isUpDisabled,
        "prefixCls": prefixCls,
        "unselectable": "unselectable"
      }
    }, {
      "on": _extends({}, upEvents)
    }, {
      "attrs": {
        "role": "button",
        "aria-label": "Increase Value",
        "aria-disabled": isUpDisabled
      },
      "class": prefixCls + "-handler " + prefixCls + "-handler-up " + upDisabledClass
    }]), [this.upHandler || h("span", {
      "attrs": {
        "unselectable": "unselectable"
      },
      "class": prefixCls + "-handler-up-inner",
      "on": {
        "click": preventDefault
      }
    })]), h(InputHandler, _mergeJSXProps2([{
      "attrs": {
        "disabled": isDownDisabled,
        "prefixCls": prefixCls,
        "unselectable": "unselectable"
      }
    }, {
      "on": _extends({}, downEvents)
    }, {
      "attrs": {
        "role": "button",
        "aria-label": "Decrease Value",
        "aria-disabled": isDownDisabled
      },
      "class": prefixCls + "-handler " + prefixCls + "-handler-down " + downDisabledClass
    }]), [this.downHandler || h("span", {
      "attrs": {
        "unselectable": "unselectable"
      },
      "class": prefixCls + "-handler-down-inner",
      "on": {
        "click": preventDefault
      }
    })])]), h("div", {
      "class": prefixCls + "-input-wrap",
      "attrs": {
        "role": "spinbutton",
        "aria-valuemin": min,
        "aria-valuemax": max,
        "aria-valuenow": inputValue
      }
    }, [h("input", {
      "class": prefixCls + "-input",
      "attrs": {
        "tabIndex": tabIndex,
        "autoComplete": "off",
        "autoFocus": autoFocus,
        "readOnly": readOnly || !valueEditable,
        "disabled": disabled,
        "max": max,
        "min": min,
        "step": step
      },
      "on": {
        "focus": this.onFocus,
        "blur": this.onBlur,
        "change": this.onChange
      },
      "ref": "input",
      "domProps": {
        "value": inputDisplayValueFormat
      }
    })])]);
  };

  _createClass(InputNumber, [{
    key: "input",
    get: function get() {
      return this.$refs.input;
    }
  }]);

  return InputNumber;
}(BaseComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "valueEditable", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "focusOnUpDown", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "tabIndex", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "upHandler", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "downHandler", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "formatter", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default InputNumber;