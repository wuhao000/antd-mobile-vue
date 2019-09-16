import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { addClass, removeClass } from '../../utils/class';
import CustomKeyboard from './custom-keyboard';
import Portal from './portal';
var instanceArr = [];
var customNumberKeyboard = null;
var NumberInput = (_dec = Component({
  name: ''
}), _dec2 = Prop({
  default: ''
}), _dec3 = Prop({
  type: Boolean,
  default: false
}), _dec4 = Prop({
  type: Boolean,
  default: true
}), _dec5 = Prop(), _dec6 = Prop(), _dec7 = Prop(), _dec8 = Prop({
  type: [String, Number]
}), _dec9 = Prop({
  default: 'am-input'
}), _dec10 = Prop({
  default: 'am-number-keyboard'
}), _dec11 = Prop(), _dec12 = Prop(), _dec13 = Prop(), _dec14 = Prop(), _dec15 = Prop(), _dec16 = Watch('value'), _dec17 = Watch('focus'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(NumberInput, _Vue);

  function NumberInput() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "placeholder", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "editable", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "moneyKeyboardAlign", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "moneyKeyboardWrapProps", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "moneyKeyboardHeader", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "keyboardPrefixCls", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "confirmLabel", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "backspaceLabel", _descriptor11, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "cancelKeyboardLabel", _descriptor12, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "maxLength", _descriptor13, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "type", _descriptor14, _assertThisInitialized(_this)), _this.focus = false, _temp) || _assertThisInitialized(_this);
  }

  var _proto = NumberInput.prototype;

  _proto.created = function created() {
    this.currentValue = this.value || '';
  };

  _proto.onChange = function onChange(value) {
    if (!('value' in this)) {
      this.currentValue = value.target.value;
    }

    this.$emit('change', value);
  };

  _proto.onConfirm = function onConfirm(value) {
    this.$emit('confirm', value);
  };

  _proto.valueChanged = function valueChanged(value) {
    this.currentValue = value;
  };

  _proto.focusChanged = function focusChanged(focus) {
    if (focus) {
      this.onInputFocus();
    }
  };

  _proto.addBlurListener = function addBlurListener() {
    document.addEventListener('click', this.doBlur, false);
  };

  _proto.removeBlurListener = function removeBlurListener() {
    document.removeEventListener('click', this.doBlur, false);
  };

  _proto.beforeDestroy = function beforeDestroy() {
    // focus:true unmount 不能触发 blur
    if (!this.focus) {
      this.$emit('blur', this.value);
    }

    this.unLinkInput();
  };

  _proto.saveRef = function saveRef(el) {
    customNumberKeyboard = el;
    instanceArr.push({
      el: el,
      container: this.container
    });
  };

  _proto.getComponent = function getComponent() {
    var h = this.$createElement;
    var confirmLabel = this.confirmLabel,
        backspaceLabel = this.backspaceLabel,
        cancelKeyboardLabel = this.cancelKeyboardLabel,
        keyboardPrefixCls = this.keyboardPrefixCls,
        moneyKeyboardWrapProps = this.moneyKeyboardWrapProps,
        moneyKeyboardHeader = this.moneyKeyboardHeader;
    return h(CustomKeyboard, {
      "ref": "keyboard",
      "on": {
        "click": this.onKeyboardClick.bind(this)
      },
      "attrs": {
        "prefixCls": keyboardPrefixCls,
        "confirmLabel": confirmLabel,
        "backspaceLabel": backspaceLabel,
        "cancelKeyboardLabel": cancelKeyboardLabel,
        "wrapProps": moneyKeyboardWrapProps,
        "header": moneyKeyboardHeader
      }
    });
  };

  _proto.getContainer = function getContainer() {
    var keyboardPrefixCls = this.keyboardPrefixCls;

    if (!this.container) {
      var container = document.createElement('div');
      container.setAttribute('id', keyboardPrefixCls + "-container-" + new Date().getTime());
      document.body.appendChild(container);
      this.container = container;
    }

    return this.container;
  };

  _proto.doBlur = function doBlur(ev) {
    if (ev.target !== this.inputRef) {
      this.onInputBlur(this.value);
    }
  };

  _proto.removeCurrentExtraKeyboard = function removeCurrentExtraKeyboard() {
    instanceArr = instanceArr.filter(function (item) {
      var el = item.el,
          container = item.container;

      if (el && container && el !== customNumberKeyboard) {
        container.parentNode.removeChild(container);
      }

      return el === customNumberKeyboard;
    });
  };

  _proto.mounted = function mounted() {
    this.saveRef(this.$refs.keyboard);
  };

  _proto.unLinkInput = function unLinkInput() {
    if (customNumberKeyboard && customNumberKeyboard.antmKeyboard && customNumberKeyboard.linkedInput && customNumberKeyboard.linkedInput === this) {
      customNumberKeyboard.linkedInput = null;
      addClass(customNumberKeyboard.antmKeyboard, this.keyboardPrefixCls + "-wrapper-hide");
    } // for unmount


    this.removeBlurListener();
    this.removeCurrentExtraKeyboard();
  };

  _proto.onInputBlur = function onInputBlur(value) {
    var _this2 = this;

    if (this.focus) {
      this.focus = false;
      this.$emit('blur', value);
      setTimeout(function () {
        _this2.unLinkInput();
      }, 50);
    }
  };

  _proto.onInputFocus = function onInputFocus(e) {
    this.$emit('focus', this.value);
    this.focus = true;

    if (customNumberKeyboard) {
      customNumberKeyboard.linkedInput = this;

      if (customNumberKeyboard.antmKeyboard) {
        removeClass(customNumberKeyboard.antmKeyboard, this.keyboardPrefixCls + "-wrapper-hide");
      }

      customNumberKeyboard.confirmDisabled = this.value === '';

      if (customNumberKeyboard.confirmKeyboardItem) {
        if (this.value === '') {
          addClass(customNumberKeyboard.confirmKeyboardItem, this.keyboardPrefixCls + "-item-disabled");
        } else {
          removeClass(customNumberKeyboard.confirmKeyboardItem, this.keyboardPrefixCls + "-item-disabled");
        }
      }
    }
  };

  _proto.onKeyboardClick = function onKeyboardClick(KeyboardItemValue) {
    var maxLength = this.maxLength;
    var value = this.value; // tslint:disable-next-line:no-this-assignment

    var onChange = this.onChange;
    var valueAfterChange; // 删除键

    if (KeyboardItemValue === 'delete') {
      valueAfterChange = value.substring(0, value.length - 1);
      onChange({
        target: {
          value: valueAfterChange
        }
      }); // 确认键
    } else if (KeyboardItemValue === 'confirm') {
      valueAfterChange = value;
      onChange({
        target: {
          value: valueAfterChange
        }
      });
      this.onInputBlur(value);
      this.onConfirm(value); // 收起键
    } else if (KeyboardItemValue === 'hide') {
      valueAfterChange = value;
      this.onInputBlur(valueAfterChange);
    } else {
      if (maxLength !== undefined && +maxLength >= 0 && (value + KeyboardItemValue).length > maxLength) {
        valueAfterChange = (value + KeyboardItemValue).substr(0, maxLength);
        onChange({
          target: {
            value: valueAfterChange
          }
        });
      } else {
        valueAfterChange = value + KeyboardItemValue;
        onChange({
          target: {
            value: valueAfterChange
          }
        });
      }
    }

    if (customNumberKeyboard) {
      customNumberKeyboard.confirmDisabled = valueAfterChange === '';

      if (customNumberKeyboard.confirmKeyboardItem) {
        if (valueAfterChange === '') {
          addClass(customNumberKeyboard.confirmKeyboardItem, this.keyboardPrefixCls + "-item-disabled");
        } else {
          removeClass(customNumberKeyboard.confirmKeyboardItem, this.keyboardPrefixCls + "-item-disabled");
        }
      }
    }
  };

  _proto.onFakeInputClick = function onFakeInputClick(e) {
    this.focusFunc(e);
  };

  _proto.focusFunc = function focusFunc(e) {
    var _this3 = this;

    // this focus may invocked by users page button click, so this click may trigger blurEventListener at the same time
    this.removeBlurListener();
    var focus = this.focus;

    if (!focus) {
      this.onInputFocus(e);
    }

    setTimeout(function () {
      _this3.addBlurListener();
    }, 50);
  };

  _proto.renderPortal = function renderPortal() {
    var _this4 = this;

    var h = this.$createElement;
    return h(Portal, _mergeJSXProps([{}, {
      "props": {
        getContainer: function getContainer() {
          return _this4.getContainer();
        }
      }
    }]), [this.getComponent()]);
  };

  _proto.render = function render() {
    var h = arguments[0];
    var placeholder = this.placeholder,
        disabled = this.disabled,
        editable = this.editable,
        moneyKeyboardAlign = this.moneyKeyboardAlign;
    var focus = this.focus,
        value = this.value;
    var preventKeyboard = disabled || !editable;
    var fakeInputCls = classnames("fake-input", {
      focus: focus,
      'fake-input-disabled': disabled
    });
    var fakeInputContainerCls = classnames('fake-input-container', {
      'fake-input-container-left': moneyKeyboardAlign === 'left'
    });
    return h("div", {
      "class": fakeInputContainerCls
    }, [value === '' && h("div", {
      "class": "fake-input-placeholder"
    }, [placeholder]), h("div", {
      "attrs": {
        "role": "textbox",
        "aria-label": value || placeholder
      },
      "class": fakeInputCls,
      "ref": "input",
      "on": {
        "click": preventKeyboard ? function () {} : this.onFakeInputClick
      }
    }, [value]), this.renderPortal()]);
  };

  return NumberInput;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "placeholder", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "editable", [_dec4], {
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
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "keyboardPrefixCls", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "confirmLabel", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "backspaceLabel", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "cancelKeyboardLabel", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "maxLength", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "focusChanged", [_dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "focusChanged"), _class2.prototype)), _class2)) || _class);
export default NumberInput;