import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

import { Popover } from 'ant-design-vue';
import classNames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { cloneElement } from '../../utils/vnode';

function recursiveCloneChildren(children, cb) {
  if (cb === void 0) {
    cb = function cb(ch, _) {
      return ch;
    };
  }

  return children.map(function (child, index) {
    var newChild = cb(child, index);

    if (typeof newChild !== 'string' && typeof newChild !== 'number' && newChild && newChild.children) {
      return cloneElement(newChild, {}, recursiveCloneChildren(newChild.children, cb));
    }

    return newChild;
  });
}

var MPopover = (_dec = Component({
  name: 'MPopover'
}), _dec2 = Prop({
  type: Boolean,
  default: false
}), _dec3 = Prop({
  type: String,
  default: 'am-popover'
}), _dec4 = Prop({
  type: Boolean,
  default: true
}), _dec5 = Prop({
  type: Boolean,
  default: true
}), _dec6 = Watch('value'), _dec7 = Watch('currentValue'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(MPopover, _Vue);

  function MPopover() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "mask", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "maskClosable", _descriptor4, _assertThisInitialized(_this)), _this.currentValue = _this.value, _temp) || _assertThisInitialized(_this);
  }

  var _proto = MPopover.prototype;

  _proto.valueChanged = function valueChanged(value) {
    this.currentValue = value;
  };

  _proto.currentValueChanged = function currentValueChanged(currentValue) {
    this.$emit('input', currentValue);
    this.$emit('change', currentValue);
  };

  _proto.render = function render() {
    var _classNames,
        _this2 = this;

    var h = arguments[0];
    var maskClass = classNames(this.prefixCls + '-mask', (_classNames = {}, _classNames[this.prefixCls + '-mask-hidden'] = !this.currentValue, _classNames)); // @ts-ignore

    return h(Popover, _mergeJSXProps([{}, {
      "attrs": this.$attrs
    }, {
      "attrs": {
        "prefixCls": this.prefixCls,
        "trigger": "click"
      }
    }, {
      "on": this.$listeners
    }, {
      "scopedSlots": this.$scopedSlots,
      "attrs": {
        "slots": this.$slots
      },
      "model": {
        value: _this2.currentValue,
        callback: function callback($$v) {
          _this2.currentValue = $$v;
        }
      }
    }]), [this.$slots.default, this.mask ? h("div", {
      "on": {
        "click": function click(e) {
          if (!_this2.maskClosable) {
            e.stopPropagation();
            e.preventDefault();
          }
        }
      },
      "class": maskClass
    }) : null]);
  };

  return MPopover;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "mask", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "maskClosable", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentValueChanged", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "currentValueChanged"), _class2.prototype)), _class2)) || _class);
export default MPopover;