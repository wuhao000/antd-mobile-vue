import _extends from "@babel/runtime/helpers/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
var PickerItem = (_dec = Component({
  name: 'PickerItem'
}), _dec2 = Prop(), _dec3 = Prop(), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(PickerItem, _Vue);

  function PickerItem() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "label", _descriptor2, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  return PickerItem;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default function PickerMixin(ComposedComponent) {
  var _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class4, _class5, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _class6, _temp3;

  var PickerMixin = (_dec4 = Component({
    name: 'PickerMixin'
  }), _dec5 = Prop({
    type: Boolean,
    default: false
  }), _dec6 = Prop(), _dec7 = Prop(), _dec8 = Prop(), _dec9 = Prop(), _dec10 = Prop(), _dec11 = Prop(), _dec12 = Prop(), _dec4(_class4 = (_class5 = (_temp3 = _class6 =
  /*#__PURE__*/
  function (_Vue2) {
    _inheritsLoose(PickerMixin, _Vue2);

    function PickerMixin() {
      var _temp2, _this2;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return (_temp2 = _this2 = _Vue2.call.apply(_Vue2, [this].concat(args)) || this, _initializerDefineProperty(_this2, "disabled", _descriptor3, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "selectedValue", _descriptor4, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "itemStyle", _descriptor5, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "prefixCls", _descriptor6, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "indicatorStyle", _descriptor7, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "indicatorClassName", _descriptor8, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "defaultSelectedValue", _descriptor9, _assertThisInitialized(_this2)), _initializerDefineProperty(_this2, "noAnimate", _descriptor10, _assertThisInitialized(_this2)), _temp2) || _assertThisInitialized(_this2);
    }

    var _proto = PickerMixin.prototype;

    _proto.select = function select(value, itemHeight, scrollTo) {
      var children = this.$slots.default;

      if (children) {
        for (var i = 0, len = children.length; i < len; i++) {
          if (children[i].componentOptions.propsData.value === value) {
            this.selectByIndex(i, itemHeight, scrollTo);
            return;
          }
        }

        this.selectByIndex(0, itemHeight, scrollTo);
      }
    };

    _proto.selectByIndex = function selectByIndex(index, itemHeight, zscrollTo) {
      if (index < 0 || index >= this.$slots.default.length || !itemHeight) {
        return;
      }

      zscrollTo(index * itemHeight);
    };

    _proto.computeChildIndex = function computeChildIndex(top, itemHeight, childrenLength) {
      var index = Math.round(top / itemHeight);
      return Math.min(index, childrenLength - 1);
    };

    _proto.doScrollingComplete = function doScrollingComplete(top, itemHeight, fireValueChange) {
      var children = this.$slots.default;
      var index = this.computeChildIndex(top, itemHeight, children.length);
      var child = children[index];

      if (child) {
        fireValueChange(child.componentOptions.propsData.value);
      } else if (console.warn) {
        console.warn('child not found', children, index);
      }
    };

    _proto.render = function render() {
      var h = arguments[0];
      return h(ComposedComponent, _mergeJSXProps([{}, {
        "attrs": _extends({}, this.$props, {
          doScrollingComplete: this.doScrollingComplete,
          computeChildIndex: this.computeChildIndex,
          select: this.select
        })
      }, {}, {
        "on": this.$listeners
      }]), [this.$slots.default]);
    };

    return PickerMixin;
  }(Vue), _class6.Item = PickerItem, _temp3), (_descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "disabled", [_dec5], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "selectedValue", [_dec6], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "itemStyle", [_dec7], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "prefixCls", [_dec8], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "indicatorStyle", [_dec9], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor8 = _applyDecoratedDescriptor(_class5.prototype, "indicatorClassName", [_dec10], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor9 = _applyDecoratedDescriptor(_class5.prototype, "defaultSelectedValue", [_dec11], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor10 = _applyDecoratedDescriptor(_class5.prototype, "noAnimate", [_dec12], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class5)) || _class4);
  return PickerMixin;
}