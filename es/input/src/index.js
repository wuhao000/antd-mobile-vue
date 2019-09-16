import _extends from "@babel/runtime/helpers/extends";
import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17;

/* tslint:disable:jsx-no-multiline-js */
import classnames from 'classnames';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { FormComponent } from '../../mixins/form-component';
import List from '../../list';
import TouchFeedback from '../../vmc-feedback';
import CustomInput from './custom-input';
import Input from './input';

function noop() {}

function normalizeValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }

  return value + '';
}

var InputItem = (_dec = Component({
  name: 'InputItem'
}), _dec2 = Prop({
  type: String
}), _dec3 = Prop({
  type: String,
  default: 'am-input'
}), _dec4 = Prop({
  type: String,
  default: 'am-list'
}), _dec5 = Prop({
  type: String,
  default: 'right'
}), _dec6 = Prop({
  type: Function,
  default: function _default() {
    return {};
  }
}), _dec7 = Prop({
  default: null
}), _dec8 = Prop({
  type: String,
  default: 'text'
}), _dec9 = Prop({
  type: String
}), _dec10 = Prop({
  type: String,
  default: ''
}), _dec11 = Prop({
  type: Boolean,
  default: false
}), _dec12 = Prop({
  type: Number
}), _dec13 = Prop({
  default: ''
}), _dec14 = Prop({
  default: 5
}), _dec15 = Prop({
  type: String
}), _dec16 = Prop(), _dec17 = Prop({
  type: Boolean,
  default: false
}), _dec18 = Prop({
  type: Boolean,
  default: false
}), _dec19 = Watch('placeholder'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_FormComponent) {
  _inheritsLoose(InputItem, _FormComponent);

  function InputItem() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _FormComponent.call.apply(_FormComponent, [this].concat(args)) || this, _initializerDefineProperty(_this, "title", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixListCls", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "moneyKeyboardAlign", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "moneyKeyboardWrapProps", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "moneyKeyboardHeader", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "type", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "name", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "placeholder", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "clearable", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "maxLength", _descriptor11, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "extra", _descriptor12, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "labelNumber", _descriptor13, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "textAlign", _descriptor14, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "locale", _descriptor15, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "android", _descriptor16, _assertThisInitialized(_this)), _this.state = {
      placeholder: _this.placeholder || ''
    }, _initializerDefineProperty(_this, "required", _descriptor17, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = InputItem.prototype;

  _proto.renderLabel = function renderLabel() {
    var _classnames;

    var h = this.$createElement;
    var prefixCls = this.prefixCls;
    var labelNumber = this.labelNumber;
    var labelCls = classnames(prefixCls + "-label", (_classnames = {}, _classnames[prefixCls + "-label-2"] = labelNumber === 2, _classnames[prefixCls + "-label-3"] = labelNumber === 3, _classnames[prefixCls + "-label-4"] = labelNumber === 4, _classnames[prefixCls + "-label-5"] = labelNumber === 5, _classnames[prefixCls + "-label-6"] = labelNumber === 6, _classnames[prefixCls + "-label-7"] = labelNumber === 7, _classnames));

    if (this.$slots.default) {
      return h("div", {
        "class": labelCls
      }, [this.$slots.default]);
    } else if (this.title) {
      return h("div", {
        "class": labelCls
      }, [this.title]);
    }

    return null;
  };

  _proto.placeholderChanged = function placeholderChanged(placeholder) {
    this.state.placeholder = placeholder;
  };

  _proto.created = function created() {
    var _this2 = this;

    this.currentValue = normalizeValue((this.value || '') + '');

    if (this.value === undefined) {
      this.$watch(function () {
        return _this2.value;
      }, function (value, old) {
        if (old === undefined) {
          _this2.$forceUpdate();
        }
      });
    }
  };

  _proto.beforeDestroy = function beforeDestroy() {
    if (this.debounceTimeout) {
      window.clearTimeout(this.debounceTimeout);
      this.debounceTimeout = null;
    }
  };

  _proto.onInputChange = function onInputChange(e) {
    var _this3 = this;

    var el = e.target;
    var rawVal = el.value,
        prePos = el.selectionEnd;
    var _this$currentValue = this.currentValue,
        preCtrlVal = _this$currentValue === void 0 ? '' : _this$currentValue;
    var type = this.type;
    var ctrlValue = rawVal;

    switch (type) {
      case 'bankCard':
        ctrlValue = rawVal.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
        break;

      case 'phone':
        ctrlValue = rawVal.replace(/\D/g, '').substring(0, 11);
        var valueLen = ctrlValue.length;

        if (valueLen > 3 && valueLen < 8) {
          ctrlValue = ctrlValue.substr(0, 3) + " " + ctrlValue.substr(3);
        } else if (valueLen >= 8) {
          ctrlValue = ctrlValue.substr(0, 3) + " " + ctrlValue.substr(3, 4) + " " + ctrlValue.substr(7);
        }

        break;

      case 'number':
        ctrlValue = rawVal.replace(/\D/g, '');
        break;

      case 'digit':
        ctrlValue = rawVal.replace(/[^0-9.]/g, '');
        break;

      case 'text':
      case 'password':
      default:
        break;
    }

    if (this.maxLength && ctrlValue.length > this.maxLength) {
      ctrlValue = ctrlValue.substring(0, this.maxLength);
    }

    this.handleOnChange(ctrlValue, ctrlValue !== rawVal, function () {
      switch (type) {
        case 'bankCard':
        case 'phone':
        case 'number':
          // controlled input type needs to adjust the position of the caret
          try {
            // set selection may throw error (https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange)
            el.selectionStart = el.selectionEnd = _this3.calcPos(prePos || 0, preCtrlVal, rawVal, ctrlValue, [' '], /\D/g);
          } catch (error) {
            console.warn('Set selection error:', error);
          }

          break;

        default:
          break;
      }
    });
    this.onFieldChange();
  };

  _proto.handleOnChange = function handleOnChange(value, isMutated, adjustPos) {
    if (isMutated === void 0) {
      isMutated = false;
    }

    if (adjustPos === void 0) {
      adjustPos = noop;
    }

    this.currentValue = value;
    this.$emit('input', value);
    this.$emit('change', value);
    adjustPos();

    if (this.inputRef.$forceUpdate) {
      this.inputRef.$forceUpdate();
    }

    this.$forceUpdate();
  };

  _proto.onInputFocus = function onInputFocus(value) {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = null;
    }

    this.$el.focus();
    this.$emit('focus', value);
  };

  _proto.onInputBlur = function onInputBlur(value) {
    var _this4 = this;

    if (this.inputRef) {
      // this.inputRef may be null if customKeyboard unmount
      this.debounceTimeout = window.setTimeout(function () {
        if (document.activeElement !== (_this4.inputRef && _this4.inputRef.inputRef)) {
          _this4.$el.blur();
        }
      }, 200);
    } // fix autoFocus item blur with flash


    setTimeout(function () {
      // fix ios12 wechat browser click failure after input
      if (document.body) {
        document.body.scrollTop = document.body.scrollTop;
      }
    }, 100);
    this.onFieldBlur();
    this.$emit('blur', value);
  };

  _proto.clearInput = function clearInput() {
    this.handleOnChange('');
    this.focus();
  };

  _proto.focus = function focus() {
    if (this.inputRef) {
      if (typeof this.inputRef.focus === 'function') {
        this.inputRef.focus();
      } else {
        this.inputRef.focus = true;
      }
    }
  };

  _proto.calcPos = function calcPos(prePos, preCtrlVal, rawVal, ctrlVal, placeholderChars, maskReg) {
    var editLength = rawVal.length - preCtrlVal.length;
    var isAddition = editLength > 0;
    var pos = prePos;

    if (isAddition) {
      var additionStr = rawVal.substr(pos - editLength, editLength);
      var ctrlCharCount = additionStr.replace(maskReg, '').length;
      pos -= editLength - ctrlCharCount;
      var placeholderCharCount = 0;

      while (ctrlCharCount > 0) {
        if (placeholderChars.indexOf(ctrlVal.charAt(pos - ctrlCharCount + placeholderCharCount)) === -1) {
          ctrlCharCount--;
        } else {
          placeholderCharCount++;
        }
      }

      pos += placeholderCharCount;
    }

    return pos;
  };

  _proto.render = function render() {
    var _classnames2,
        _this5 = this;

    var h = arguments[0];
    var prefixCls = this.prefixCls,
        prefixListCls = this.prefixListCls,
        isReadonly = this.isReadonly,
        isDisabled = this.isDisabled,
        clearable = this.clearable,
        type = this.type,
        currentValue = this.currentValue,
        moneyKeyboardAlign = this.moneyKeyboardAlign,
        moneyKeyboardWrapProps = this.moneyKeyboardWrapProps,
        moneyKeyboardHeader = this.moneyKeyboardHeader,
        name = this.name,
        maxLength = this.maxLength;
    var extra = this.$slots.extra || this.extra;
    var _confirmLabel$backspa = {
      confirmLabel: '确定',
      backspaceLabel: '退格',
      cancelKeyboardLabel: '收起键盘'
    },
        confirmLabel = _confirmLabel$backspa.confirmLabel,
        backspaceLabel = _confirmLabel$backspa.backspaceLabel,
        cancelKeyboardLabel = _confirmLabel$backspa.cancelKeyboardLabel;
    var focus = this.focus,
        placeholder = this.state.placeholder;
    var wrapCls = classnames(prefixListCls + "-item", prefixCls + "-item", prefixListCls + "-item-middle", (_classnames2 = {}, _classnames2[prefixCls + "-disabled"] = isDisabled, _classnames2[prefixCls + "-focus"] = focus, _classnames2[prefixCls + "-android"] = this.android, _classnames2));
    var controlCls = prefixCls + "-control";
    var inputType = 'text';

    if (type === 'bankCard' || type === 'phone') {
      inputType = 'tel';
    } else if (type === 'password') {
      inputType = 'password';
    } else if (type === 'digit') {
      inputType = 'number';
    } else if (type !== 'text' && type !== 'number') {
      inputType = type;
    }

    var patternProps;

    if (type === 'number') {
      patternProps = {
        pattern: '[0-9]*'
      };
    }

    var classNameProp = '';

    if (type === 'digit') {
      classNameProp = 'h5numInput';
    }

    return h(List.Item, {
      "attrs": {
        "title": this.renderLabel(),
        "error": this.error,
        "errorMessage": this.errorMessage,
        "errorDisplayType": this.errorDisplayType
      },
      "class": wrapCls
    }, [h("div", {
      "class": controlCls,
      "slot": "extra"
    }, [type === 'money' ? // @ts-ignore
    h(CustomInput, _mergeJSXProps([{}, {
      "attrs": {
        value: normalizeValue(currentValue),
        type: type,
        maxLength: maxLength,
        placeholder: placeholder,
        disabled: isDisabled,
        editable: !isReadonly,
        prefixCls: prefixCls,
        confirmLabel: confirmLabel,
        backspaceLabel: backspaceLabel,
        cancelKeyboardLabel: cancelKeyboardLabel,
        moneyKeyboardAlign: moneyKeyboardAlign,
        moneyKeyboardWrapProps: moneyKeyboardWrapProps,
        moneyKeyboardHeader: moneyKeyboardHeader
      }
    }, {
      "on": {
        "change": this.onInputChange,
        "focus": this.onInputFocus,
        "blur": this.onInputBlur,
        "confirm": function confirm(v) {
          _this5.$emit('confirm', v);
        }
      },
      "ref": "input"
    }])) : h(Input, _mergeJSXProps2([{}, {
      "props": _extends({}, patternProps, {
        value: normalizeValue(currentValue),
        defaultValue: undefined,
        textAlign: this.textAlign,
        type: inputType,
        maxLength: maxLength,
        name: name,
        placeholder: placeholder,
        readonly: isReadonly,
        disabled: isDisabled
      })
    }, {
      "class": classNameProp,
      "ref": "input"
    }, {
      "on": {
        change: this.onInputChange,
        focus: this.onInputFocus,
        blur: this.onInputBlur
      }
    }]))]), clearable && !isReadonly && !isDisabled && currentValue && ("" + currentValue).length > 0 ? // @ts-ignore
    h(TouchFeedback, {
      "slot": "suffix",
      "attrs": {
        "activeClassName": prefixCls + "-clear-active"
      }
    }, [h("div", {
      "class": prefixCls + "-clear",
      "on": {
        "click": this.clearInput
      }
    })]) : null, extra !== '' ? h("div", {
      "class": prefixCls + "-extra",
      "on": {
        "click": function click(e) {
          _this5.$emit('extra-click', e);
        }
      }
    }, [extra]) : null]);
  };

  _createClass(InputItem, [{
    key: "inputRef",
    get: function get() {
      return this.$refs.input;
    }
  }]);

  return InputItem;
}(FormComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "prefixListCls", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "moneyKeyboardAlign", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "moneyKeyboardWrapProps", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "moneyKeyboardHeader", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "name", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "placeholder", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "clearable", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "maxLength", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "extra", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "labelNumber", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "textAlign", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "locale", [_dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "android", [_dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "required", [_dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "placeholderChanged", [_dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "placeholderChanged"), _class2.prototype)), _class2)) || _class);
export { InputItem as default };