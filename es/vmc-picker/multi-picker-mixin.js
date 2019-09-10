import _extends from "@babel/runtime/helpers/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
export default function MultiPickerMixin(ComposedComponent) {
  var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

  var MultiPickerMixin = (_dec = Component({
    name: 'MultiPickerMixin'
  }), _dec2 = Prop(), _dec3 = Prop(), _dec(_class = (_class2 =
  /*#__PURE__*/
  function (_Vue) {
    _inheritsLoose(MultiPickerMixin, _Vue);

    function MultiPickerMixin() {
      var _temp, _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "selectedValue", _descriptor2, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
    }

    var _proto = MultiPickerMixin.prototype;

    _proto.getValue = function getValue() {
      var selectedValue = this.selectedValue;

      if (selectedValue && selectedValue.length) {
        return selectedValue;
      } else {
        if (!this.$slots.default) {
          return [];
        }

        return this.$slots.default.map(function (c) {
          var cc = c.$children;
          return cc && cc[0] && cc[0].props.value;
        });
      }
    };

    _proto.onChange = function onChange(i, v, cb) {
      var value = this.getValue().concat();
      value[i] = v;

      if (cb) {
        cb(value, i);
      }
    };

    _proto.onValueChange = function onValueChange(i, v) {
      var _this2 = this;

      this.onChange(i, v, function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        _this2.$emit.apply(_this2, ['input'].concat(args));
      });
      this.$emit('value-change', i, v);
    };

    _proto.onScrollChange = function onScrollChange(i, v) {
      var _this3 = this;

      this.onChange(i, v, function () {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        _this3.$emit.apply(_this3, ['scroll-change'].concat(args));
      });
    };

    _proto.render = function render() {
      var h = arguments[0];
      return h(ComposedComponent, _mergeJSXProps([{}, {
        "attrs": _extends({}, this.$props, {
          getValue: this.getValue
        })
      }, {}, {
        "on": {
          input: this.onValueChange,
          scrollChange: this.onScrollChange
        }
      }]), [this.$slots.default]);
    };

    return MultiPickerMixin;
  }(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "selectedValue", [_dec3], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class2)) || _class);
  return MultiPickerMixin;
}