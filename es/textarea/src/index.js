import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;

import classnames from 'classnames';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { FormComponent } from '../../mixins/form-component';
import List from '../../list';
import { IS_IOS } from '../../utils/exenv';
import TouchFeedback from '../../vmc-feedback';

function fixControlledValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }

  return value;
}

var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\n/g;

function countSymbols(text) {
  if (text === void 0) {
    text = '';
  }

  return text.replace(regexAstralSymbols, '_').length;
}

var Textarea = (_dec = Component({
  name: 'MTextarea'
}), _dec2 = Prop({
  type: String,
  default: 'am-textarea'
}), _dec3 = Prop({
  type: String,
  default: 'am-list'
}), _dec4 = Prop({
  type: String
}), _dec5 = Prop({
  type: Number
}), _dec6 = Prop({
  type: String
}), _dec7 = Prop({
  default: ''
}), _dec8 = Prop({
  type: Boolean,
  default: false
}), _dec9 = Prop({
  type: Number,
  default: 1
}), _dec10 = Prop(), _dec11 = Prop({
  type: Boolean,
  default: false
}), _dec12 = Prop({
  type: Number,
  default: 5
}), _dec13 = Watch('value'), _dec14 = Watch('state.value'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_FormComponent) {
  _inheritsLoose(Textarea, _FormComponent);

  function Textarea() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _FormComponent.call.apply(_FormComponent, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixListCls", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "title", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "maxLength", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "name", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "placeholder", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "clearable", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "rows", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "count", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "autoHeight", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "labelNumber", _descriptor11, _assertThisInitialized(_this)), _this.state = {
      focus: false,
      value: _this.value || ''
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = Textarea.prototype;

  _proto.focus = function focus() {
    this.textareaRef.focus();
  };

  _proto.valueChanged = function valueChanged(value) {
    this.state.value = fixControlledValue(value);
  };

  _proto.mounted = function mounted() {
    if (this.autoHeight) {
      this.reAlignHeight();
    }
  };

  _proto.updated = function updated() {
    if (this.autoHeight && this.state.focus) {
      this.reAlignHeight();
    }
  };

  _proto.reAlignHeight = function reAlignHeight() {
    var textareaDom = this.textareaRef;
    textareaDom.style.height = ''; // 字数减少时能自动减小高度

    textareaDom.style.height = textareaDom.scrollHeight + "px";
  };

  _proto.beforeDestroy = function beforeDestroy() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = null;
    }
  };

  _proto.stateValueChanged = function stateValueChanged(value) {
    this.$emit('input', value);
  };

  _proto.onChange = function onChange(e) {
    var value = e.target.value;
    this.state.value = value;
    this.$emit('change', value);
  };

  _proto.onBlur = function onBlur(e) {
    var _this2 = this;

    this.debounceTimeout = setTimeout(function () {
      if (document.activeElement !== _this2.textareaRef) {
        _this2.state.focus = false;
      }
    }, 150);
    var value = e.currentTarget.value; // fix autoFocus item blur with flash

    setTimeout(function () {
      // fix ios12 wechat browser click failure after input
      if (document.body) {
        document.body.scrollTop = document.body.scrollTop;
      }
    }, 100);
    this.$emit('blur', value);
  };

  _proto.onFocus = function onFocus(e) {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = null;
    }

    this.state.focus = true;
    var value = e.currentTarget.value;
    this.$emit('focus', value);
  };

  _proto.clearInput = function clearInput() {
    this.state.value = '';
    this.$emit('change', '');
  };

  _proto.onInput = function onInput(e) {
    this.state.value = e.target.value;

    if (this.autoHeight && this.state.focus) {
      this.reAlignHeight();
    }
  };

  _proto.render = function render() {
    var _classnames;

    var h = arguments[0];
    var prefixCls = this.prefixCls,
        prefixListCls = this.prefixListCls,
        editable = this.editable,
        clearable = this.clearable,
        count = this.count,
        labelNumber = this.labelNumber,
        title = this.title,
        autoHeight = this.autoHeight,
        disabled = this.disabled;
    var _this$state = this.state,
        value = _this$state.value,
        focus = _this$state.focus;
    var hasCount = count > 0 && this.rows > 1;
    var wrapCls = classnames(prefixListCls + "-item", prefixCls + "-item", (_classnames = {}, _classnames[prefixCls + "-disabled"] = disabled, _classnames[prefixCls + "-item-single-line"] = this.rows === 1 && !autoHeight, _classnames[prefixCls + "-focus"] = focus, _classnames[prefixCls + "-has-count"] = hasCount, _classnames));
    var characterLength = countSymbols(value);
    var lengthCtrlProps = {};

    if (count > 0) {
      // Note: If in the iOS environment of dev-tools, It will fail.
      if (IS_IOS) {
        var entValue = value ? value.replace(regexAstralSymbols, '_') : '';
        var entLen = entValue ? entValue.split('_').length - 1 : 0;
        lengthCtrlProps.maxLength = count + entLen - characterLength + (value ? value.length : 0);
      } else {
        lengthCtrlProps.maxLength = count - characterLength + (value ? value.length : 0);
      }
    }

    return h(List.Item, {
      "class": wrapCls,
      "attrs": {
        "required": this.required,
        "disabled": this.isDisabled,
        "title": title
      }
    }, [h("div", {
      "class": prefixCls + "-control",
      "slot": "extra"
    }, [h("textarea", _mergeJSXProps([{
      "ref": "textarea"
    }, lengthCtrlProps, {
      "attrs": {
        "rows": this.rows,
        "disabled": this.isDisabled,
        "name": this.name,
        "placeholder": this.placeholder,
        "readOnly": !editable
      },
      "domProps": {
        "value": value
      },
      "on": {
        "input": this.onInput,
        "change": this.onChange,
        "blur": this.onBlur,
        "focus": this.onFocus
      }
    }])), clearable && editable && value && characterLength > 0 && // @ts-ignore
    h(TouchFeedback, {
      "attrs": {
        "activeClassName": prefixCls + "-clear-active"
      }
    }, [h("div", {
      "class": prefixCls + "-clear",
      "on": {
        "click": this.clearInput
      }
    })]), hasCount && h("span", {
      "class": prefixCls + "-count"
    }, [h("span", [value ? characterLength : 0]), "/", count])])]);
  };

  _createClass(Textarea, [{
    key: "textareaRef",
    get: function get() {
      return this.$refs['textarea'];
    }
  }]);

  return Textarea;
}(FormComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "prefixListCls", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "maxLength", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "name", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "placeholder", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "clearable", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "rows", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "count", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "autoHeight", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "labelNumber", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stateValueChanged", [_dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "stateValueChanged"), _class2.prototype)), _class2)) || _class);
export { Textarea as default };