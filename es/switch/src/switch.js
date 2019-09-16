import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

import classnames from 'classnames';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FormComponent } from '../../mixins/form-component';
var Switch = (_dec = Component({
  name: 'MSwitch'
}), _dec2 = Prop({
  type: String
}), _dec3 = Prop({
  type: String
}), _dec4 = Prop({
  type: String,
  default: 'am-switch'
}), _dec5 = Prop({
  type: String,
  default: 'ios'
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_FormComponent) {
  _inheritsLoose(Switch, _FormComponent);

  function Switch() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _FormComponent.call.apply(_FormComponent, [this].concat(args)) || this, _initializerDefineProperty(_this, "color", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "name", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "platform", _descriptor4, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Switch.prototype;

  _proto.onChange = function onChange(e) {
    this.currentValue = e.target.checked;
  };

  _proto.onClick = function onClick(e) {
    var val; // tslint:disable-next-line:prefer-conditional-expression

    if (e && e.target && e.target.checked !== undefined) {
      val = e.target.checked;
    } else {
      val = this.value;
    }

    this.currentValue = val;
  };

  _proto.render = function render() {
    var _classnames, _classnames2;

    var h = arguments[0];

    var prefixCls = this.prefixCls,
        name = this.name,
        disabled = this.disabled,
        platform = this.platform,
        color = this.color,
        restProps = _objectWithoutPropertiesLoose(this, ["prefixCls", "name", "disabled", "platform", "color"]);

    var wrapCls = classnames(prefixCls, (_classnames = {}, _classnames[prefixCls + "-android"] = platform === 'android', _classnames));
    var fackInputCls = classnames('checkbox', (_classnames2 = {}, _classnames2["checkbox-disabled"] = disabled, _classnames2));
    var globalProps = Object.keys(restProps).reduce(function (prev, key) {
      if (key.substr(0, 5) === 'aria-' || key.substr(0, 5) === 'data-' || key === 'role') {
        prev[key] = restProps[key];
      }

      return prev;
    }, {});
    var style = {};

    if (color && this.currentValue) {
      style.backgroundColor = color;
    }

    return h("label", {
      "class": wrapCls
    }, [h("input", _mergeJSXProps([{
      "attrs": {
        "type": "checkbox",
        "name": name,
        "disabled": disabled
      },
      "class": prefixCls + "-checkbox",
      "domProps": {
        "checked": this.currentValue,
        "value": this.currentValue ? 'on' : 'off'
      },
      "on": {
        "change": this.onChange
      }
    }, !disabled ? {
      onClick: this.onClick
    } : {}, {}, globalProps])), h("div", _mergeJSXProps2([{
      "class": fackInputCls,
      "style": style
    }, disabled ? {
      onClick: this.onClick
    } : {}]))]);
  };

  return Switch;
}(FormComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "color", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "name", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "platform", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { Switch as default };