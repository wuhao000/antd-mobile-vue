import _extends from "@babel/runtime/helpers/extends";
import _mergeJSXProps7 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps6 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps5 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps4 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps3 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _class4, _class5, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { IS_IOS } from '../../utils/exenv';
import TouchFeedback from '../../vmc-feedback';
export var KeyboardItem = (_dec = Component({
  name: 'KeyboardItem'
}), _dec2 = Prop({
  type: [String, Number]
}), _dec3 = Prop(String), _dec4 = Prop({
  type: String
}), _dec5 = Prop({
  default: 'am-number-keyboard'
}), _dec6 = Prop(), _dec7 = Prop({
  type: Boolean,
  default: false
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(KeyboardItem, _Vue);

  function KeyboardItem() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "label", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "type", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "iconOnly", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor6, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = KeyboardItem.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var h = arguments[0];

    var prefixCls = this.prefixCls,
        disabled = this.disabled,
        label = this.label,
        iconOnly = this.iconOnly,
        restProps = _objectWithoutPropertiesLoose(this, ["prefixCls", "disabled", "label", "iconOnly"]);

    var value = this.$slots.default;
    var type = this.type;

    if (type === 'keyboard-delete') {
      value = 'delete';
    } else if (type === 'keyboard-hide') {
      value = 'hide';
    } else if (type === 'keyboard-confirm') {
      value = 'confirm';
    }

    var wrapCls = classnames(prefixCls + "-item");
    var TouchFeedback2 = TouchFeedback;
    return h(TouchFeedback2, _mergeJSXProps2([{
      "class": type
    }, {
      "props": {
        activeClassName: prefixCls + "-item-active"
      }
    }]), [h("td", _mergeJSXProps([{
      "ref": "td",
      "on": {
        "click": function click(e) {
          _this2.$emit('click', e, _this2.value);
        }
      },
      "class": wrapCls
    }, restProps]), [this.$slots.default, iconOnly && h("i", {
      "class": "sr-only"
    }, [label])])]);
  };

  _createClass(KeyboardItem, [{
    key: "tdRef",
    get: function get() {
      return this.$refs['td'];
    }
  }]);

  return KeyboardItem;
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
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "iconOnly", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
var CustomKeyboard = (_dec8 = Component({
  name: 'CustomKeyboard'
}), _dec9 = Prop(), _dec10 = Prop(), _dec11 = Prop(), _dec12 = Prop(), _dec13 = Prop(), _dec14 = Prop(), _dec8(_class4 = (_class5 =
/*#__PURE__*/
function (_Vue2) {
  _inheritsLoose(CustomKeyboard, _Vue2);

  function CustomKeyboard() {
    var _temp2, _this3;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return (_temp2 = _this3 = _Vue2.call.apply(_Vue2, [this].concat(args)) || this, _initializerDefineProperty(_this3, "prefixCls", _descriptor7, _assertThisInitialized(_this3)), _initializerDefineProperty(_this3, "confirmLabel", _descriptor8, _assertThisInitialized(_this3)), _initializerDefineProperty(_this3, "backspaceLabel", _descriptor9, _assertThisInitialized(_this3)), _initializerDefineProperty(_this3, "cancelKeyboardLabel", _descriptor10, _assertThisInitialized(_this3)), _initializerDefineProperty(_this3, "wrapProps", _descriptor11, _assertThisInitialized(_this3)), _initializerDefineProperty(_this3, "header", _descriptor12, _assertThisInitialized(_this3)), _temp2) || _assertThisInitialized(_this3);
  }

  var _proto2 = CustomKeyboard.prototype;

  _proto2.onKeyboardClick = function onKeyboardClick(e, value) {
    if (value === void 0) {
      value = '';
    }

    e.stopImmediatePropagation();

    if (value === 'confirm' && this.confirmDisabled) {
      return null;
    } else {
      if (this.linkedInput) {
        this.linkedInput.onKeyboardClick(value);
      }
    }
  };

  _proto2.renderKeyboardItem = function renderKeyboardItem(item, index) {
    var h = this.$createElement;
    var KeyboardItem2 = KeyboardItem;
    return h(KeyboardItem2, _mergeJSXProps3([{}, {
      "props": {
        value: item
      }
    }, {
      "on": {
        "click": this.onKeyboardClick
      },
      "key": "item-" + item + "-" + index
    }]), [item]);
  };

  _proto2.render = function render() {
    var _this4 = this;

    var h = arguments[0];
    var prefixCls = this.prefixCls,
        confirmLabel = this.confirmLabel,
        backspaceLabel = this.backspaceLabel,
        cancelKeyboardLabel = this.cancelKeyboardLabel,
        wrapProps = this.wrapProps,
        header = this.header;
    var wrapperCls = classnames(prefixCls + "-wrapper", prefixCls + "-wrapper-hide");
    var KeyboardItem2 = KeyboardItem;
    return h("div", _mergeJSXProps7([{
      "class": wrapperCls,
      "ref": "antmKeyboard"
    }, wrapProps]), [header, h("table", [h("tbody", [h("tr", [['1', '2', '3'].map(function (item, index) {
      return (// tslint:disable-next-line:jsx-no-multiline-js
        _this4.renderKeyboardItem(item, index)
      );
    }), h(KeyboardItem2, _mergeJSXProps4([{}, {
      "props": _extends({}, this.getAriaAttr(backspaceLabel), {
        type: 'keyboard-delete',
        rowSpan: 2
      })
    }, {}, {
      "on": {
        click: function click(e) {
          return _this4.onKeyboardClick(e, 'delete');
        }
      }
    }]))]), h("tr", [['4', '5', '6'].map(function (item, index) {
      return (// tslint:disable-next-line:jsx-no-multiline-js
        _this4.renderKeyboardItem(item, index)
      );
    })]), h("tr", [['7', '8', '9'].map(function (item, index) {
      return (// tslint:disable-next-line:jsx-no-multiline-js
        _this4.renderKeyboardItem(item, index)
      );
    }), h(KeyboardItem2, _mergeJSXProps5([{}, {
      "props": {
        type: 'keyboard-confirm',
        rowSpan: 2
      }
    }, {}, {
      "on": {
        click: function click(e) {
          return _this4.onKeyboardClick(e, 'confirm');
        }
      }
    }, {
      "attrs": {
        "tdRef": "td"
      }
    }]), [confirmLabel])]), h("tr", [['.', '0'].map(function (item, index) {
      return (// tslint:disable-next-line:jsx-no-multiline-js
        _this4.renderKeyboardItem(item, index)
      );
    }), h(KeyboardItem2, _mergeJSXProps6([{}, {
      "props": _extends({}, this.getAriaAttr(cancelKeyboardLabel), {
        type: 'keyboard-hide'
      })
    }, {}, {
      "on": {
        click: function click(e) {
          return _this4.onKeyboardClick(e, 'hide');
        }
      }
    }]))])])])]);
  };

  _proto2.getAriaAttr = function getAriaAttr(label) {
    if (IS_IOS) {
      return {
        label: label,
        iconOnly: true
      };
    } else {
      return {
        role: 'button',
        'aria-label': label
      };
    }
  };

  _createClass(CustomKeyboard, [{
    key: "antmKeyboard",
    get: function get() {
      return this.$refs.antmKeyboard;
    }
  }]);

  return CustomKeyboard;
}(Vue), (_descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "prefixCls", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class5.prototype, "confirmLabel", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class5.prototype, "backspaceLabel", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class5.prototype, "cancelKeyboardLabel", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class5.prototype, "wrapProps", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class5.prototype, "header", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class5)) || _class4);
export default CustomKeyboard;