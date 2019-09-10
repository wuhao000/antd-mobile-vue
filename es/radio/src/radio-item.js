import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _extends from "@babel/runtime/helpers/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import List from '../../list';
import Radio from './radio';
var ListItem = List.Item;
var RadioItem = (_dec = Component({
  name: 'MRadioItem'
}), _dec2 = Prop({
  default: 'am-radio'
}), _dec3 = Prop({
  default: 'am-list'
}), _dec4 = Prop({
  default: function _default() {
    return {};
  }
}), _dec5 = Prop({
  type: Boolean,
  default: false
}), _dec6 = Prop({
  type: Boolean,
  default: false
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(RadioItem, _Vue);

  function RadioItem() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "listPrefixCls", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "radioProps", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor5, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = RadioItem.prototype;

  _proto.onChange = function onChange(value) {
    this.$emit('change', value);
  };

  _proto.onClick = function onClick(e) {
    if (!this.disabled) {
      this.$emit('click', e);
    }
  };

  _proto.render = function render() {
    var _classnames,
        _this2 = this;

    var h = arguments[0];

    var _this$$props = this.$props,
        listPrefixCls = _this$$props.listPrefixCls,
        disabled = _this$$props.disabled,
        radioProps = _this$$props.radioProps,
        otherProps = _objectWithoutPropertiesLoose(_this$$props, ["listPrefixCls", "disabled", "radioProps"]);

    var prefixCls = otherProps.prefixCls;
    var wrapCls = classnames(prefixCls + "-item", (_classnames = {}, _classnames[prefixCls + "-item-disabled"] = disabled === true, _classnames));
    var extraProps = {};
    ['name', 'disabled'].forEach(function (i) {
      if (i in _this2.$props) {
        extraProps[i] = _this2.$props[i];
      }
    }); // @ts-ignore

    var extra = h(Radio, _mergeJSXProps([{}, {
      "attrs": _extends({}, radioProps, extraProps)
    }, {
      "attrs": {
        "value": this.value
      },
      "on": {
        "click": this.onClick,
        "change": this.onChange
      }
    }]));
    return h(ListItem, _mergeJSXProps2([{}, {
      "attrs": _extends({}, otherProps)
    }, {
      "attrs": {
        "prefixCls": listPrefixCls,
        "extra": extra
      },
      "class": wrapCls
    }]), [this.$slots.default]);
  };

  return RadioItem;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "listPrefixCls", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "radioProps", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default RadioItem;