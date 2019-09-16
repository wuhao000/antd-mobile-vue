import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _extends from "@babel/runtime/helpers/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import List from '../../list';
import Checkbox from './checkbox';
var ListItem = List.Item;
var CheckboxItem = (_dec = Component({
  name: 'MCheckboxItem'
}), _dec2 = Prop({
  type: Object,
  default: function _default() {
    return {};
  }
}), _dec3 = Prop({
  type: String,
  default: 'am-list'
}), _dec4 = Prop({
  type: String,
  default: 'am-checkbox'
}), _dec5 = Prop({
  type: String
}), _dec6 = Prop({
  type: Boolean,
  default: false
}), _dec7 = Prop({
  type: Object,
  default: function _default() {
    return {};
  }
}), _dec8 = Prop({
  type: String
}), _dec9 = Prop({
  type: Boolean,
  default: false
}), _dec10 = Prop({
  type: Boolean,
  default: false
}), _dec11 = Watch('value'), _dec12 = Watch('state.value'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(CheckboxItem, _Vue);

  function CheckboxItem() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "thumbStyle", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "listPrefixCls", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "name", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "wrapLabel", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "checkboxProps", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "extra", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor9, _assertThisInitialized(_this)), _this.state = {
      value: _this.value
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = CheckboxItem.prototype;

  _proto.valueCahnged = function valueCahnged(value) {
    this.state.value = value;
  };

  _proto.stateValueChanged = function stateValueChanged(value) {
    this.$emit('input', value);
    this.$emit('change', value);
  };

  _proto.onChange = function onChange(value) {};

  _proto.onClick = function onClick(e) {
    if (!this.disabled) {
      this.state.value = !this.state.value;
    }
  };

  _proto.render = function render() {
    var _classnames,
        _this2 = this;

    var h = arguments[0];

    var _this$$props = this.$props,
        listPrefixCls = _this$$props.listPrefixCls,
        disabled = _this$$props.disabled,
        checkboxProps = _this$$props.checkboxProps,
        restProps = _objectWithoutPropertiesLoose(_this$$props, ["listPrefixCls", "disabled", "checkboxProps"]);

    var prefixCls = restProps.prefixCls;
    var wrapCls = classnames(prefixCls + "-item", (_classnames = {}, _classnames[prefixCls + "-item-disabled"] = disabled === true, _classnames));
    var extraProps = {};
    ['name', 'defaultChecked', 'checked', 'onChange', 'disabled'].forEach(function (i) {
      if (i in _this2.$props) {
        extraProps[i] = _this2.$props[i];
      }
    }); // @ts-ignore

    var thumb = h(Checkbox, _mergeJSXProps([{}, {
      "attrs": _extends({}, checkboxProps, extraProps, {
        value: this.state.value
      })
    }, {
      "style": this.thumbStyle,
      "on": {
        "change": this.onChange
      }
    }]));
    return (// @ts-ignore
      h(ListItem, _mergeJSXProps2([{}, {
        "attrs": _extends({}, restProps)
      }, {
        "attrs": {
          "touchFeedback": !this.disabled,
          "prefixCls": listPrefixCls,
          "thumb": thumb
        },
        "on": {
          "click": this.onClick
        },
        "class": wrapCls
      }]), [this.$slots.default])
    );
  };

  return CheckboxItem;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "thumbStyle", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "listPrefixCls", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "name", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "wrapLabel", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "checkboxProps", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "extra", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "valueCahnged", [_dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "valueCahnged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stateValueChanged", [_dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "stateValueChanged"), _class2.prototype)), _class2)) || _class);
export default CheckboxItem;