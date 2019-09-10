import _extends from "@babel/runtime/helpers/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3;

import Component from 'vue-class-component';
import { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Emitter from './emitter';

var hasListener = function hasListener(instance, listener) {
  var listeners = instance.$listeners || {};
  return Object.keys(listeners).includes(listener);
};

var hasProp = function hasProp(instance, prop) {
  var $options = instance.$options || {};
  var propsData = $options.propsData || {};
  return prop in propsData;
};

var PureInputComponent = (_dec = Component({
  name: 'PureInputComponent'
}), _dec2 = Prop(Boolean), _dec3 = Prop(), _dec4 = Prop([String, Number]), _dec5 = Watch('stateValue'), _dec6 = Watch('value'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_mixins) {
  _inheritsLoose(PureInputComponent, _mixins);

  function PureInputComponent() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _mixins.call.apply(_mixins, [this].concat(args)) || this, _initializerDefineProperty(_this, "block", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor2, _assertThisInitialized(_this)), _this.stateValue = _this.initValue, _initializerDefineProperty(_this, "width", _descriptor3, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = PureInputComponent.prototype;

  _proto.getSlots = function getSlots() {
    return {};
  };

  _proto.getInitValue = function getInitValue() {
    return null;
  };

  _proto.stateValueChanged = function stateValueChanged(value) {
    var val = this.convertValueBack(value);

    if (hasProp(this, 'value')) {
      this.$emit('input', val);
    }

    this.$emit('change', val);
    this.dispatch('DFormItem', 'd.form.change', [val]);
  };

  _proto.valueChanged = function valueChanged(value) {
    if (this.stateValue !== this.convertValue(value)) {
      this.stateValue = this.convertValue(value);
    }
  };

  _proto.mounted = function mounted() {
    this.dispatch('DFormItem', 'd.form-item.setControl', [this]);
  };

  _proto.beforeDestroy = function beforeDestroy() {
    this.dispatch('DFormItem', 'd.form-item.setControl', [null]);
  };

  _proto.convertValue = function convertValue(value) {
    return value;
  };

  _proto.convertValueBack = function convertValueBack(value) {
    return value;
  };

  _proto.getInputComponent = function getInputComponent() {
    return {};
  };

  _proto.getListeners = function getListeners() {
    return {};
  };

  _proto.getProps = function getProps() {
    return {};
  };

  _proto.getSlotProps = function getSlotProps() {
    var _this2 = this;

    var props = {};
    Object.keys(this.$slots).forEach(function (slotKey) {
      if (slotKey !== 'default') {
        props[slotKey] = _this2.$slots[slotKey];
      }
    });
    return props;
  };

  _proto.handleBlur = function handleBlur() {
    this.dispatch('DFormItem', 'd.form.blur', [this.stateValue]);
  };

  _proto.handleChange = function handleChange(value) {
    if (value !== null && value !== undefined && value.toString() === '[object InputEvent]') {
      return;
    }

    var comp = this.getInputComponent();

    if (comp.model && comp.model.prop === 'value' && comp.model.event === 'change') {
      this.stateValue = value;
    }
  };

  _proto.handleKeydown = function handleKeydown() {
    this.$emit('keydown');
  };

  _proto.handleKeyup = function handleKeyup() {
    this.$emit('keyup');
  };

  _proto.onInput = function onInput(value) {
    var val = value;

    if (value && value.toString() === '[object InputEvent]') {
      val = value.target.value;
    }

    this.$emit('input', val);

    if (!(hasProp(this, 'value') && hasListener(this, 'input'))) {
      this.stateValue = val;
    }
  };

  _proto.render = function render() {
    var h = arguments[0];
    var CustomComponent = this.getInputComponent(); // @ts-ignore

    return h(CustomComponent, _mergeJSXProps([{}, {
      "attrs": this.props
    }, {
      "attrs": {
        "value": this.stateValue,
        "slots": this.slots
      },
      "scopedSlots": this.$scopedSlots
    }, {
      "on": this.listeners
    }, {
      "style": this.cssStyle
    }]), [this.getDefaultSlot()]);
  };

  _proto.getDefaultSlot = function getDefaultSlot() {
    return this.$slots.default;
  };

  _createClass(PureInputComponent, [{
    key: "cssStyle",
    get: function get() {
      var style = {};

      if (this.block) {
        style.display = 'block';
      }

      if (this.width) {
        if (typeof this.width === 'number') {
          style.width = this.width + 'px';
        } else {
          style.width = this.width;
        }
      }

      return style;
    }
  }, {
    key: "initValue",
    get: function get() {
      var convertValue = this.convertValue(this.value);

      if (convertValue !== null && convertValue !== undefined) {
        return convertValue;
      } else {
        return this.getInitValue();
      }
    }
  }, {
    key: "listeners",
    get: function get() {
      return _extends({}, this.$listeners, {
        input: this.onInput,
        blur: this.handleBlur,
        change: this.handleChange,
        keydown: this.handleKeydown,
        keyup: this.handleKeyup
      }, this.getListeners());
    }
  }, {
    key: "slots",
    get: function get() {
      return _extends({}, this.$slots, this.getSlots());
    }
  }, {
    key: "props",
    get: function get() {
      return _extends({}, this.getSlotProps(), this.$attrs, this.$props, this.getProps(), {
        visible: this.stateValue
      });
    }
  }]);

  return PureInputComponent;
}(mixins(Emitter)), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "block", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "width", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "stateValueChanged", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "stateValueChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype)), _class2)) || _class);
export { PureInputComponent as default };