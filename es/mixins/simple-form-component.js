import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
export var SimpleFormComponent = (_dec = Component({
  name: 'SimpleFormComponent'
}), _dec2 = Prop({
  type: String
}), _dec3 = Prop({
  type: Boolean
}), _dec4 = Prop({
  type: Boolean
}), _dec5 = Inject({
  from: 'list',
  default: undefined
}), _dec6 = Prop({
  type: Boolean,
  default: false
}), _dec7 = Prop({
  type: String
}), _dec8 = Prop({
  type: String
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(SimpleFormComponent, _Vue);

  function SimpleFormComponent() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "size", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "readOnly", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "form", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "error", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "errorMessage", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "errorDisplayType", _descriptor7, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  _createClass(SimpleFormComponent, [{
    key: "isDisabled",
    get: function get() {
      var disabled = this.disabled;

      if (this.form) {
        if (!disabled) {
          disabled = this.form.disabled;
        }
      }

      return disabled;
    }
  }, {
    key: "componentSize",
    get: function get() {
      var size = this.size;

      if (this.form) {
        if (size === undefined || size === null) {
          size = this.form.size;
        }
      }

      return size;
    }
  }, {
    key: "isReadonly",
    get: function get() {
      var isReadonly = this.readOnly;

      if (this.form) {
        if (!isReadonly) {
          isReadonly = !this.form.editable;
        }
      }

      return isReadonly;
    }
  }]);

  return SimpleFormComponent;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "size", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "readOnly", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "form", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "error", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "errorMessage", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "errorDisplayType", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);