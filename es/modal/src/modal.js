import _extends from "@babel/runtime/helpers/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Model, Prop, Watch } from 'vue-property-decorator';
import Dialog from 'ant-design-vue/lib/vc-dialog';
import TouchFeedback from '../../vmc-feedback';
export var ModalComponent =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(ModalComponent, _Vue);

  function ModalComponent() {
    return _Vue.apply(this, arguments) || this;
  }

  return ModalComponent;
}(Vue);
var Modal = (_dec = Component({
  name: 'Modal'
}), _dec2 = Prop({
  default: 'am-modal'
}), _dec3 = Prop({
  type: String
}), _dec4 = Prop({
  type: String
}), _dec5 = Prop({
  type: String
}), _dec6 = Prop(), _dec7 = Prop({
  type: String,
  default: 'ios'
}), _dec8 = Prop(), _dec9 = Prop(), _dec10 = Model('change', {
  type: Boolean,
  default: false
}), _dec11 = Prop({
  type: Boolean,
  default: true
}), _dec12 = Prop({
  type: Boolean,
  default: false
}), _dec13 = Prop({
  default: function _default() {
    return [];
  }
}), _dec14 = Prop({
  type: [String, Object]
}), _dec15 = Prop(), _dec16 = Prop({
  type: Boolean,
  default: false
}), _dec17 = Prop({
  type: Boolean,
  default: false
}), _dec18 = Prop({
  type: Boolean,
  default: true
}), _dec19 = Prop({
  type: String,
  default: 'slide-down'
}), _dec20 = Prop(), _dec21 = Prop({
  type: Boolean
}), _dec22 = Prop({
  type: Boolean,
  default: false
}), _dec23 = Watch('visible'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_ModalComponent) {
  _inheritsLoose(Modal, _ModalComponent);

  function Modal() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _ModalComponent.call.apply(_ModalComponent, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "transitionName", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "maskTransitionName", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "wrapClassName", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "wrapProps", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "platform", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "bodyStyle", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "title", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "visible", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "maskClosable", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "closable", _descriptor11, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "footer", _descriptor12, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "className", _descriptor13, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onClose", _descriptor14, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "transparent", _descriptor15, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "popup", _descriptor16, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "animated", _descriptor17, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "animationType", _descriptor18, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onAnimationEnd", _descriptor19, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "animateAppear", _descriptor20, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "operation", _descriptor21, _assertThisInitialized(_this)), _this.state = {
      visible: _this.visible
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = Modal.prototype;

  _proto.visibleChanged = function visibleChanged(visible) {
    this.state.visible = visible;
  };

  _proto.renderFooterButton = function renderFooterButton(button, prefixCls, i) {
    var h = this.$createElement;
    var buttonStyle = {};

    if (button.style) {
      buttonStyle = button.style;

      if (typeof buttonStyle === 'string') {
        var styleMap = {
          cancel: {},
          default: {},
          destructive: {
            color: 'red'
          }
        };
        buttonStyle = styleMap[buttonStyle] || {};
      }
    }

    var onClickFn = function onClickFn(e) {
      e.preventDefault();

      if (button.onPress) {
        button.onPress();
      }
    };

    return (// @ts-ignore
      h(TouchFeedback, {
        "attrs": {
          "activeClassName": prefixCls + "-button-active"
        },
        "key": i
      }, [h("a", {
        "class": prefixCls + "-button",
        "attrs": {
          "role": "button"
        },
        "style": buttonStyle,
        "on": {
          "click": onClickFn
        }
      }, [button.text || "Button"])])
    );
  };

  _proto.render = function render() {
    var _this2 = this,
        _classnames,
        _classnames2;

    var h = arguments[0];

    var _this$$props = this.$props,
        prefixCls = _this$$props.prefixCls,
        wrapClassName = _this$$props.wrapClassName,
        transitionName = _this$$props.transitionName,
        maskTransitionName = _this$$props.maskTransitionName,
        platform = _this$$props.platform,
        _this$$props$footer = _this$$props.footer,
        footer = _this$$props$footer === void 0 ? [] : _this$$props$footer,
        operation = _this$$props.operation,
        animated = _this$$props.animated,
        transparent = _this$$props.transparent,
        popup = _this$$props.popup,
        animationType = _this$$props.animationType,
        restProps = _objectWithoutPropertiesLoose(_this$$props, ["prefixCls", "wrapClassName", "transitionName", "maskTransitionName", "platform", "footer", "operation", "animated", "transparent", "popup", "animationType"]);

    var btnGroupClass = classnames(prefixCls + "-button-group-" + (footer.length === 2 && !operation ? 'h' : 'v'), prefixCls + "-button-group-" + (operation ? 'operation' : 'normal'));
    var footerDom = footer.length ? h("div", {
      "class": btnGroupClass,
      "attrs": {
        "role": "group"
      }
    }, [footer.map(function (button, i) {
      return (// tslint:disable-next-line:jsx-no-multiline-js
        _this2.renderFooterButton(button, prefixCls, i)
      );
    })]) : null;
    var transName;
    var maskTransName;

    if (animated) {
      // tslint:disable-next-line:prefer-conditional-expression
      if (transparent) {
        transName = maskTransName = 'am-fade';
      } else {
        transName = maskTransName = 'am-slide-up';
      }

      if (popup) {
        transName = animationType === 'slide-up' ? 'am-slide-up' : 'am-slide-down';
        maskTransName = 'am-fade';
      }
    }

    var wrapCls = classnames(wrapClassName, (_classnames = {}, _classnames[prefixCls + "-wrap-popup"] = popup, _classnames));
    var cls = classnames(this.className, (_classnames2 = {}, _classnames2[prefixCls + "-transparent"] = transparent, _classnames2[prefixCls + "-popup"] = popup, _classnames2[prefixCls + "-operation"] = operation, _classnames2[prefixCls + "-popup-" + animationType] = popup && animationType, _classnames2[prefixCls + "-android"] = platform === 'android', _classnames2));
    return (// @ts-ignore
      h(Dialog, _mergeJSXProps([{}, {
        "attrs": _extends({}, restProps)
      }, {
        "attrs": {
          "maskClosable": this.maskClosable,
          "visible": this.visible,
          "prefixCls": prefixCls,
          "title": this.title,
          "closable": this.closable,
          "wrapClassName": wrapCls,
          "transitionName": transitionName || transName,
          "maskTransitionName": maskTransitionName || maskTransName,
          "footer": footerDom
        },
        "class": cls,
        "on": {
          "close": this.onClose || function (e) {
            _this2.$emit('change', false);

            _this2.$emit('close', e);
          }
        }
      }]), [this.$slots.default])
    );
  };

  return Modal;
}(ModalComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "transitionName", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "maskTransitionName", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "wrapClassName", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "wrapProps", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "platform", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "bodyStyle", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "visible", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "maskClosable", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "closable", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "footer", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "className", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "onClose", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "transparent", [_dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "popup", [_dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "animated", [_dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "animationType", [_dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "onAnimationEnd", [_dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "animateAppear", [_dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "operation", [_dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "visibleChanged", [_dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "visibleChanged"), _class2.prototype)), _class2)) || _class);
export default Modal;