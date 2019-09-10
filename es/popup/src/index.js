import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;

import { Drawer } from 'ant-design-vue';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import BaseFormComponent from '../../mixins/base-input-component';
import Touchable from '../../vmc-feedback/feedback';
Vue.use(Drawer);
var MPopup = (_dec = Component({
  name: 'MPopup'
}), _dec2 = Prop({
  type: String,
  default: '取消'
}), _dec3 = Prop({
  type: Boolean,
  default: false
}), _dec4 = Prop({
  type: Object
}), _dec5 = Prop({
  type: Boolean,
  default: true
}), _dec6 = Prop({
  type: String,
  default: ''
}), _dec7 = Prop({
  type: String,
  default: 'am-popup'
}), _dec8 = Prop({
  type: String
}), _dec9 = Prop({
  type: String
}), _dec10 = Prop({
  type: String,
  default: 'bottom'
}), _dec11 = Prop({
  type: Boolean,
  default: true
}), _dec12 = Prop({
  type: Boolean,
  default: true
}), _dec13 = Watch('value'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_BaseFormComponent) {
  _inheritsLoose(MPopup, _BaseFormComponent);

  function MPopup() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _BaseFormComponent.call.apply(_BaseFormComponent, [this].concat(args)) || this, _initializerDefineProperty(_this, "cancelText", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "showCancel", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "cancelButton", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "showOk", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "title", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "height", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "width", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "placement", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "showTitle", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "closable", _descriptor11, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = MPopup.prototype;

  _proto.onCancel = function onCancel() {
    // @ts-ignore
    if (this.value !== undefined) {
      this.$emit('input', false);
    } else {
      // @ts-ignore
      this.stateValue = false;
    }

    this.$emit('cancel');
  };

  _proto.onOk = function onOk() {
    // @ts-ignore
    if (this.value !== undefined) {
      this.$emit('input', false);
    } else {
      // @ts-ignore
      this.stateValue = false;
    }

    this.$emit('ok');
  };

  _proto.valueChanged = function valueChanged(value) {
    this.stateValue = value;
  };

  _proto.getProps = function getProps() {
    return {
      title: this.renderHeader(),
      height: this.height || 'auto',
      width: this.width || 'auto',
      disabled: this.isDisabled,
      placement: this.placement,
      visible: this.isDisabled ? false : this.stateValue
    };
  };

  _proto.getListeners = function getListeners() {
    var _this2 = this;

    return {
      close: function close(e) {
        _this2.$emit('cancel'); // @ts-ignore


        _this2.stateValue = false;
      }
    };
  };

  _proto.getInputComponent = function getInputComponent() {
    return 'a-drawer';
  };

  _proto.renderHeader = function renderHeader() {
    var h = this.$createElement;
    return this.showTitle ? h("div", {
      "class": this.prefixCls + '-title-wrap'
    }, [this.renderCancel(), h("div", {
      "class": this.prefixCls + "-item " + this.prefixCls + "-title"
    }, [this.title]), this.renderOk()]) : null;
  };

  _proto.renderCancel = function renderCancel() {
    var h = this.$createElement;
    return this.showCancel ? h(Touchable, {
      "attrs": {
        "activeClassName": this.prefixCls + "-item-active"
      }
    }, [this.cancelButton ? this.cancelButton : h("div", {
      "on": {
        "click": this.onCancel
      },
      "class": this.prefixCls + "-item " + this.prefixCls + "-header-left"
    }, [this.cancelText])]) : null;
  };

  _proto.renderOk = function renderOk() {
    var h = this.$createElement;
    return this.showOk ? h(Touchable, {
      "attrs": {
        "activeClassName": this.prefixCls + "-item-active"
      }
    }, [h("div", {
      "on": {
        "click": this.onOk
      },
      "class": this.prefixCls + "-item " + this.prefixCls + "-header-right"
    }, ["\u786E\u5B9A"])]) : null;
  };

  return MPopup;
}(BaseFormComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cancelText", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "showCancel", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "cancelButton", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "showOk", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "height", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "width", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "placement", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "showTitle", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "closable", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype)), _class2)) || _class);
export default MPopup;