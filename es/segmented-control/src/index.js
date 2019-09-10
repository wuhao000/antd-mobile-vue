import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import TouchFeedback from '../../vmc-feedback';
var SegmentedControl = (_dec = Component({
  name: 'SegmentedControl'
}), _dec2 = Prop({
  type: String,
  default: 'am-segment'
}), _dec3 = Prop({
  type: String,
  default: ''
}), _dec4 = Prop({
  type: Boolean,
  default: false
}), _dec5 = Prop({
  type: Number,
  default: 0
}), _dec6 = Prop({
  default: function _default() {
    return [];
  }
}), _dec7 = Watch('value'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(SegmentedControl, _Vue);

  function SegmentedControl() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tintColor", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "values", _descriptor5, _assertThisInitialized(_this)), _this.state = {
      selectedIndex: _this.value
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = SegmentedControl.prototype;

  _proto.selectedIndexChanged = function selectedIndexChanged(value) {
    this.state.selectedIndex = value;
  };

  _proto.onClick = function onClick(e, index, value) {
    var disabled = this.disabled;

    if (!disabled && this.state.selectedIndex !== index) {
      // just do a mock so that the api to be the same as react-native
      e.nativeEvent = e.nativeEvent ? e.nativeEvent : {};
      e.nativeEvent.selectedSegmentIndex = index;
      e.nativeEvent.value = value;
      this.state.selectedIndex = index;
      this.$emit('input', index);
      this.$emit('change', index);
    }
  };

  _proto.renderSegmentItem = function renderSegmentItem(idx, value, selected) {
    var _classnames,
        _this2 = this;

    var h = this.$createElement;
    var prefixCls = this.prefixCls,
        disabled = this.disabled,
        tintColor = this.tintColor;
    var itemCls = classnames(prefixCls + "-item", (_classnames = {}, _classnames[prefixCls + "-item-selected"] = selected, _classnames));
    var itemStyle = {
      color: selected ? '#fff' : tintColor,
      backgroundColor: selected ? tintColor : 'transparent',
      borderColor: tintColor
    };
    var activeInnerStyle = tintColor ? {
      backgroundColor: tintColor
    } : {};
    return h(TouchFeedback, {
      "key": idx,
      "attrs": {
        "disabled": disabled,
        "activeClassName": prefixCls + "-item-active"
      }
    }, [h("div", {
      "class": itemCls,
      "style": itemStyle,
      "attrs": {
        "role": "tab",
        "aria-selected": selected && !disabled,
        "aria-disabled": disabled
      },
      "on": {
        "click": disabled ? undefined : function (e) {
          return _this2.onClick(e, idx, value);
        }
      }
    }, [h("div", {
      "class": prefixCls + "-item-inner",
      "style": activeInnerStyle
    }), value])]);
  };

  _proto.render = function render() {
    var _classnames2,
        _this3 = this;

    var h = arguments[0];
    var prefixCls = this.prefixCls,
        disabled = this.disabled,
        _this$values = this.values,
        values = _this$values === void 0 ? [] : _this$values;
    var wrapCls = classnames(prefixCls, (_classnames2 = {}, _classnames2[prefixCls + "-disabled"] = disabled, _classnames2));
    return h("div", {
      "class": wrapCls,
      "attrs": {
        "role": "tablist"
      }
    }, [values.map(function (value, idx) {
      return (// tslint:disable-next-line:jsx-no-multiline-js
        _this3.renderSegmentItem(idx, value, idx === _this3.state.selectedIndex)
      );
    })]);
  };

  return SegmentedControl;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "tintColor", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "values", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "selectedIndexChanged", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "selectedIndexChanged"), _class2.prototype)), _class2)) || _class);
export default SegmentedControl;