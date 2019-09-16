import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18;

/* tslint:disable:jsx-no-multiline-js */
import treeFilter from 'array-tree-filter';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Provide, Watch } from 'vue-property-decorator';
import { cloneVNode, setProps } from '../../utils/vnode';
import RMCCascader from '../../vmc-cascader/cascader';
import RMCPopupCascader from '../../vmc-cascader/popup';
import RMCMultiPicker from '../../vmc-picker/multi-picker';
import RMCPicker from '../../vmc-picker/picker';
var Picker = (_dec = Component({
  name: 'Picker'
}), _dec2 = Prop({
  type: String,
  default: ''
}), _dec3 = Prop({
  type: String,
  default: '取消'
}), _dec4 = Prop({
  type: String,
  default: '确定'
}), _dec5 = Prop({
  type: String,
  default: 'am-picker'
}), _dec6 = Prop({
  type: String,
  default: 'click'
}), _dec7 = Prop({
  type: String,
  default: 'am-picker-col'
}), _dec8 = Prop({
  type: String,
  default: 'am-picker-popup'
}), _dec9 = Prop({
  type: String,
  default: ''
}), _dec10 = Prop(), _dec11 = Prop({
  type: Boolean,
  default: true
}), _dec12 = Prop(), _dec13 = Prop({
  type: Function,
  default: function _default(values) {
    // label is JSX.Element or other
    if (values.length > 0 && typeof values[0] !== 'string') {
      return values;
    }

    return values.join(',');
  }
}), _dec14 = Prop({
  type: Number,
  default: 3
}), _dec15 = Prop(), _dec16 = Prop(), _dec17 = Prop(), _dec18 = Prop(), _dec19 = Provide('store'), _dec20 = Watch('value', {
  immediate: true
}), _dec21 = Watch('currentValue'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Picker, _Vue);

  function Picker() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "placeholder", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "dismissText", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "okText", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "triggerType", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "pickerPrefixCls", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "popupPrefixCls", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "title", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "data", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "cascade", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor11, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "format", _descriptor12, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "cols", _descriptor13, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "extra", _descriptor14, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onChange", _descriptor15, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "itemStyle", _descriptor16, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "indicatorStyle", _descriptor17, _assertThisInitialized(_this)), _this.currentValue = [], _initializerDefineProperty(_this, "store", _descriptor18, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Picker.prototype;

  _proto.valueChanged = function valueChanged(v) {
    if (v && v !== this.currentValue) {
      this.currentValue = v;
    }
  };

  _proto.onClick = function onClick(e) {
    return this.$emit('click', e);
  };

  _proto.getSel = function getSel() {
    var value = this.currentValue || [];
    var treeChildren;
    var data = this.data;

    if (this.cascade) {
      treeChildren = treeFilter(data, function (c, level) {
        return c.value === value[level];
      });
    } else {
      treeChildren = value.map(function (v, i) {
        return data[i].filter(function (d) {
          return d.value === v;
        })[0];
      });
    }

    var extra = this.format && this.format(treeChildren.map(function (v) {
      return v.label;
    }));

    if (Array.isArray(extra)) {
      return extra[0];
    }

    return extra;
  };

  _proto.getPickerCol = function getPickerCol() {
    var h = this.$createElement;
    var data = this.data,
        pickerPrefixCls = this.pickerPrefixCls,
        itemStyle = this.itemStyle,
        indicatorStyle = this.indicatorStyle;
    return data.map(function (col, index) {
      return (// @ts-ignore
        h(RMCPicker, {
          "key": index,
          "attrs": {
            "prefixCls": pickerPrefixCls,
            "itemStyle": itemStyle,
            "indicatorStyle": indicatorStyle
          },
          "style": {
            flex: 1
          }
        }, [col.map(function (item) {
          return (// @ts-ignore
            h(RMCPicker.Item, {
              "key": item.value,
              "attrs": {
                "value": item.value
              }
            }, [item.label])
          );
        })])
      );
    });
  };

  _proto.onOk = function onOk(v) {
    var value = v;

    if (this.scrollValue !== undefined) {
      value = this.scrollValue;
    }

    if (this.onChange) {
      this.onChange(value);
    }

    this.$emit('ok', value);
  };

  _proto.setScrollValue = function setScrollValue(v) {
    this.scrollValue = v;
  };

  _proto.setCasecadeScrollValue = function setCasecadeScrollValue(v) {
    // 级联情况下保证数据正确性，滚动过程中只有当最后一级变化时才变更数据
    if (v && this.scrollValue) {
      var length = this.scrollValue.length;

      if (length === v.length && this.scrollValue[length - 1] === v[length - 1]) {
        return;
      }
    }

    this.setScrollValue(v);
  };

  _proto.fixOnOk = function fixOnOk(cascader) {
    if (cascader && cascader.onOk !== this.onOk.bind(this)) {
      cascader.onOk = this.onOk;
      cascader.forceUpdate();
    }
  };

  _proto.onPickerChange = function onPickerChange(v, i) {
    this.setScrollValue(v);
    this.$emit('pickerChange', v, i);
  };

  _proto.onVisibleChange = function onVisibleChange(visible) {
    this.setScrollValue(undefined);
    this.$emit('visibleChange', visible);
  };

  _proto.render = function render() {
    var _this2 = this;

    var h = arguments[0];

    var _this$$props = this.$props,
        popupPrefixCls = _this$$props.popupPrefixCls,
        itemStyle = _this$$props.itemStyle,
        indicatorStyle = _this$$props.indicatorStyle,
        okText = _this$$props.okText,
        dismissText = _this$$props.dismissText,
        extra = _this$$props.extra,
        cascade = _this$$props.cascade,
        prefixCls = _this$$props.prefixCls,
        pickerPrefixCls = _this$$props.pickerPrefixCls,
        data = _this$$props.data,
        cols = _this$$props.cols,
        onOk = _this$$props.onOk,
        restProps = _objectWithoutPropertiesLoose(_this$$props, ["popupPrefixCls", "itemStyle", "indicatorStyle", "okText", "dismissText", "extra", "cascade", "prefixCls", "pickerPrefixCls", "data", "cols", "onOk"]);

    var cascader;
    var popupMoreProps = {};

    if (cascade) {
      cascader = // @ts-ignore
      h(RMCCascader, {
        "slot": "cascader",
        "attrs": {
          "prefixCls": prefixCls,
          "pickerPrefixCls": pickerPrefixCls,
          "data": data,
          "cols": cols,
          "pickerItemStyle": itemStyle,
          "indicatorStyle": indicatorStyle
        },
        "on": {
          "input": function input(v) {
            _this2.onInput(v);
          },
          "change": this.onPickerChange,
          "scrollChange": this.setCasecadeScrollValue
        }
      });
    } else {
      cascader = // @ts-ignore
      h(RMCMultiPicker, {
        "slot": "cascader",
        "style": {
          flexDirection: 'row',
          alignItems: 'center'
        },
        "attrs": {
          "prefixCls": prefixCls
        },
        "on": {
          "input": function input(v) {
            _this2.onInput(v);
          },
          "scrollChange": this.setScrollValue
        }
      }, [this.getPickerCol()]);
      popupMoreProps = {
        pickerValueProp: 'selectedValue',
        pickerValueChangeProp: 'onValueChange'
      };
    }

    var props = _extends({}, this.popupProps, {
      cascader: cascader
    }, restProps, {
      prefixCls: popupPrefixCls,
      value: this.currentValue,
      dismissText: dismissText,
      okText: okText
    }, popupMoreProps);

    var childExtra = this.getSel() || extra || this.getPlaceholder() || '';
    return (// @ts-ignore
      h(RMCPopupCascader, _mergeJSXProps([{}, {
        "attrs": props
      }]), [cascader, this.$slots.default && this.$slots.default.map(function (child) {
        var node = cloneVNode(child, true);
        setProps(node, {
          extra: childExtra,
          arrow: 'horizontal'
        });
        return node;
      })])
    );
  };

  _proto.currentValueChanged = function currentValueChanged(currentValue) {
    if (currentValue !== this.value) {
      this.$emit('input', currentValue);
      this.$emit('change', currentValue);
    }
  };

  _proto.onInput = function onInput(v) {
    this.currentValue = v;
  };

  _proto.getPlaceholder = function getPlaceholder() {
    return this.placeholder || '';
  };

  return Picker;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "placeholder", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "dismissText", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "okText", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "triggerType", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "pickerPrefixCls", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "popupPrefixCls", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "data", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "cascade", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "format", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "cols", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "extra", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "onChange", [_dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "itemStyle", [_dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "indicatorStyle", [_dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "store", [_dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      onOk: null
    };
  }
}), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentValueChanged", [_dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "currentValueChanged"), _class2.prototype)), _class2)) || _class);
export { Picker as default };