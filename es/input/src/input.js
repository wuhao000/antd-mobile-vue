import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
var Input = (_dec = Component({
  name: 'Input'
}), _dec2 = Prop({
  type: [String, Number]
}), _dec3 = Prop(Boolean), _dec4 = Prop(String), _dec5 = Prop(Boolean), _dec6 = Prop({
  type: String
}), _dec7 = Prop({
  type: String,
  default: 'left'
}), _dec8 = Watch('value'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Input, _Vue);

  function Input() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "placeholder", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "readonly", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "type", _descriptor5, _assertThisInitialized(_this)), _this.currentValue = _this.value || '', _initializerDefineProperty(_this, "textAlign", _descriptor6, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Input.prototype;

  _proto.valueChanged = function valueChanged(value) {
    this.currentValue = value;
  };

  _proto.onInputBlur = function onInputBlur(e) {
    var value = e.target.value;
    this.$emit('blur', value);
  };

  _proto.onInputFocus = function onInputFocus(e) {
    this.$emit('focus');
  };

  _proto.focus = function focus() {
    if (this.inputRef) {
      this.inputRef.focus();
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var h = arguments[0];
    var value = this.currentValue + '';
    var type = this.type === 'number' ? 'text' : this.type;
    return h("input", _mergeJSXProps([{
      "domProps": {
        "value": value
      },
      "ref": "input",
      "attrs": {
        "type": type,
        "disabled": this.disabled,
        "readonly": this.readonly,
        "placeholder": this.placeholder
      },
      "on": {
        "blur": function blur(e) {
          _this2.onInputBlur(e);
        }
      },
      "style": {
        textAlign: this.textAlign
      }
    }, this.$props, {}, this.$attrs, {
      "on": {
        "input": function input(e) {
          _this2.$emit('change', e);
        }
      }
    }]));
  };

  _createClass(Input, [{
    key: "inputRef",
    get: function get() {
      return this.$refs['input'];
    }
  }]);

  return Input;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "placeholder", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "readonly", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "textAlign", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype)), _class2)) || _class);
export default Input;