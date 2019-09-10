import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

import arrayTreeFilter from 'array-tree-filter';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
import MultiPicker from '../vmc-picker/multi-picker';
import Picker from '../vmc-picker/picker';
var Cascader = (_dec = Component({
  name: 'Cascader'
}), _dec2 = Prop(), _dec3 = Prop(), _dec4 = Prop({
  default: function _default() {
    return [];
  }
}), _dec5 = Prop({
  default: 3
}), _dec6 = Prop({
  type: Boolean,
  default: false
}), _dec7 = Prop(), _dec8 = Prop(), _dec9 = Prop({
  default: 'rmc-cascader'
}), _dec10 = Prop({
  default: 'rmc-picker'
}), _dec11 = Inject({
  from: 'store',
  default: undefined
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Cascader, _Vue);

  function Cascader() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "defaultValue", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "data", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "cols", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "pickerItemStyle", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "indicatorStyle", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "pickerPrefixCls", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "store", _descriptor10, _assertThisInitialized(_this)), _this.state = {
      value: _this.getValue(_this.data, _this.defaultValue || _this.value)
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = Cascader.prototype;

  _proto.onOk = function onOk() {
    this.$emit('input', this.state.value);
    this.$emit('change', this.state.value);
  };

  _proto.onDismiss = function onDismiss() {
    this.state.value = this.getValue(this.data, this.defaultValue || this.value);
    this.$emit('dismiss', this.state.value);
  };

  _proto.created = function created() {
    if (this.store) {
      this.store.onOk = this.onOk;
      this.store.onDismiss = this.onDismiss;
    }
  };

  _proto.onScrollChange = function onScrollChange() {
    this.$emit('scroll-change');
  };

  _proto.beforeUpdate = function beforeUpdate() {
    if (this.value !== undefined) {
      this.value = this.getValue(this.data, this.value);
    }
  };

  _proto.onValueChange = function onValueChange(value, index) {
    var children = arrayTreeFilter(this.data, function (c, level) {
      return level <= index && c.value === value[level];
    });
    var data = children[index];
    var i;

    for (i = index + 1; data && data.children && data.children.length && i < this.cols; i++) {
      data = data.children[0];
      value[i] = data.value;
    }

    value.length = i;
    this.state.value = value;
    this.$emit('change', value, index);
  };

  _proto.getValue = function getValue(d, val) {
    var data = d || this.data;
    var value = val || this.value || this.defaultValue;

    if (!value || !value.length || value.indexOf(undefined) > -1) {
      value = [];

      for (var i = 0; i < this.cols; i++) {
        if (data && data.length) {
          value[i] = data[0].value;
          data = data[0].children;
        }
      }
    }

    return value;
  };

  _proto.getCols = function getCols() {
    var h = this.$createElement;
    var data = this.data,
        cols = this.cols,
        pickerPrefixCls = this.pickerPrefixCls,
        disabled = this.disabled,
        pickerItemStyle = this.pickerItemStyle,
        indicatorStyle = this.indicatorStyle;
    var value = this.state.value;
    var childrenTree = arrayTreeFilter(data, function (c, level) {
      return c.value === value[level];
    }).map(function (c) {
      return c.children;
    }); // in case the users data is async get when select change

    var needPad = cols - childrenTree.length;

    if (needPad > 0) {
      for (var i = 0; i < needPad; i++) {
        childrenTree.push([]);
      }
    }

    childrenTree.length = cols - 1;
    childrenTree.unshift(data);
    return childrenTree.map(function (children, level) {
      if (children === void 0) {
        children = [];
      }

      return (// @ts-ignore
        h(Picker, {
          "key": level,
          "attrs": {
            "prefixCls": pickerPrefixCls,
            "disabled": disabled,
            "itemStyle": pickerItemStyle,
            "indicatorStyle": indicatorStyle
          },
          "style": {
            flex: 1
          }
        }, [children.map(function (item) {
          // @ts-ignore
          return h(Picker.Item, {
            "attrs": {
              "value": item.value,
              "label": item.label
            },
            "key": item.value
          });
        })])
      );
    });
  };

  _proto.render = function render() {
    var h = arguments[0];
    var props = this.$props;
    var prefixCls = props.prefixCls;
    var cols = this.getCols();
    var multiStyle = {
      flexDirection: 'row',
      alignItems: 'center'
    };
    return (// @ts-ignore
      h(MultiPicker, {
        "style": multiStyle,
        "attrs": {
          "prefixCls": prefixCls,
          "selectedValue": this.state.value
        },
        "on": {
          "valueChange": this.onValueChange,
          "input": this.onValueChange,
          "scrollChange": this.onScrollChange
        }
      }, [cols])
    );
  };

  return Cascader;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "defaultValue", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "data", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "cols", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "pickerItemStyle", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "indicatorStyle", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "pickerPrefixCls", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "store", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { Cascader as default };