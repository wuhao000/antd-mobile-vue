import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _extends from "@babel/runtime/helpers/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

import classnames from 'classnames';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { FormComponent } from '../../mixins/form-component';
import List from '../../list';
import Switch from './switch';
var ListItem = List.Item;
var SwitchItem = (_dec = Component({
  name: 'SwitchItem'
}), _dec2 = Prop({
  default: 'am-switch'
}), _dec3 = Prop({
  default: 'am-list'
}), _dec4 = Prop({
  default: function _default() {
    return {};
  }
}), _dec5 = Prop({
  type: String
}), _dec6 = Watch('value'), _dec7 = Watch('state.value'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_FormComponent) {
  _inheritsLoose(SwitchItem, _FormComponent);

  function SwitchItem() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _FormComponent.call.apply(_FormComponent, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "listPrefixCls", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "switchProps", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "title", _descriptor4, _assertThisInitialized(_this)), _this.state = {
      value: _this.value
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = SwitchItem.prototype;

  _proto.valueChanged = function valueChanged(value) {
    this.state.value = value;
  };

  _proto.stateValueChanged = function stateValueChanged(value, oldValue) {
    this.$emit('input', value);

    if (value !== oldValue) {
      this.$emit('change', value);
    }
  };

  _proto.onClick = function onClick(e) {
    if (!this.disabled) {
      this.$emit('click');
    }
  };

  _proto.render = function render() {
    var _classnames,
        _this2 = this;

    var h = arguments[0];

    var _this$$props = this.$props,
        listPrefixCls = _this$$props.listPrefixCls,
        disabled = _this$$props.disabled,
        switchProps = _this$$props.switchProps,
        otherProps = _objectWithoutPropertiesLoose(_this$$props, ["listPrefixCls", "disabled", "switchProps"]);

    var prefixCls = otherProps.prefixCls;
    var wrapCls = classnames(prefixCls + "-item", (_classnames = {}, _classnames[prefixCls + "-item-disabled"] = disabled === true, _classnames));
    var extraProps = {};
    ['name', 'disabled'].forEach(function (i) {
      if (i in _this2.$props) {
        extraProps[i] = _this2.$props[i];
      }
    }); // @ts-ignore

    var extra = h(Switch, _mergeJSXProps([{}, {
      "attrs": _extends({}, switchProps, extraProps, this.$attrs)
    }, {
      "attrs": {
        "disabled": this.isDisabled
      },
      "on": {
        "click": this.onClick
      },
      "model": {
        value: _this2.state.value,
        callback: function callback($$v) {
          _this2.state.value = $$v;
        }
      }
    }]));
    return h(ListItem, _mergeJSXProps2([{}, {
      "attrs": _extends({}, otherProps)
    }, {
      "attrs": {
        "disabled": this.isDisabled,
        "prefixCls": listPrefixCls,
        "extra": extra
      },
      "class": wrapCls
    }]), [this.$slots.default]);
  };

  return SwitchItem;
}(FormComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "listPrefixCls", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "switchProps", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stateValueChanged", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "stateValueChanged"), _class2.prototype)), _class2)) || _class);
export { SwitchItem as default };