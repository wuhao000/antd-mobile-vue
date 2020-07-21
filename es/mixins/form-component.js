import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;

import AsyncValidator from 'async-validator';
import Component from 'vue-class-component';
import { Inject, Prop, Watch } from 'vue-property-decorator';
import Emitter from './emitter';
import { getPropByPath } from './utils';

var noop = function noop(a, b) {};

export var FormComponent = (_dec = Component({
  name: 'FormComponent'
}), _dec2 = Prop({
  type: String
}), _dec3 = Prop({
  type: Boolean
}), _dec4 = Prop({
  type: Boolean,
  default: false
}), _dec5 = Prop({
  type: String
}), _dec6 = Inject({
  from: 'list',
  default: undefined
}), _dec7 = Prop({
  type: String
}), _dec8 = Prop({
  type: Boolean,
  default: true
}), _dec9 = Prop({
  type: Boolean,
  default: false
}), _dec10 = Prop({
  type: Array
}), _dec11 = Prop(), _dec12 = Prop(String), _dec13 = Watch('errorMessage'), _dec14 = Watch('value'), _dec15 = Watch('currentValue'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Emitter) {
  _inheritsLoose(FormComponent, _Emitter);

  function FormComponent() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Emitter.call.apply(_Emitter, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "error", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "errorMessage", _descriptor4, _assertThisInitialized(_this)), _this.currentErrorMessage = _this.errorMessage, _initializerDefineProperty(_this, "list", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prop", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "editable", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "required", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "rules", _descriptor9, _assertThisInitialized(_this)), _this.validateStatus = '', _initializerDefineProperty(_this, "value", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "errorDisplayType", _descriptor11, _assertThisInitialized(_this)), _this.currentValue = _this.value, _this.validateDisabled = true, _this.isCurrentError = false, _temp) || _assertThisInitialized(_this);
  }

  var _proto = FormComponent.prototype;

  _proto.created = function created() {
    if (this.list) {
      this.dispatch('DForm', 'd.form.addField', [this]);
    }
  };

  _proto.errorMessageChanged = function errorMessageChanged(errorMessage) {
    this.currentErrorMessage = errorMessage;
  };

  _proto.getFilteredRule = function getFilteredRule(trigger) {
    var rules = this.getRules();
    return rules.filter(function (rule) {
      if (!rule.trigger || trigger === '') {
        return true;
      }

      if (Array.isArray(rule.trigger)) {
        return rule.trigger.indexOf(trigger) > -1;
      } else {
        return rule.trigger === trigger;
      }
    }).map(function (rule) {
      return _extends({}, rule);
    });
  };

  _proto.getRules = function getRules() {
    var formRules = this.list && this.list.rules;
    var prop = getPropByPath(formRules, this.prop || '');
    formRules = formRules ? prop.o[this.prop || ''] || prop.v : [];
    var selfRules = this.rules;
    var requiredRule = this.required !== undefined ? {
      required: this.required
    } : [];

    if (formRules && formRules.some(function (rule) {
      return rule.required !== undefined;
    }) || selfRules && selfRules.some(function (rule) {
      return rule.required !== undefined;
    })) {
      requiredRule = [];
    }

    return [].concat(selfRules || formRules || []).concat(requiredRule);
  };

  _proto.onFieldBlur = function onFieldBlur() {};

  _proto.onFieldChange = function onFieldChange() {
    if (this.validateDisabled) {
      this.validateDisabled = false;
      return;
    }
  };

  _proto.validate = function validate(trigger, callback) {
    var _this2 = this;

    if (callback === void 0) {
      callback = noop;
    }

    this.$nextTick(function () {
      var _model;

      _this2.validateDisabled = false;

      var rules = _this2.getFilteredRule(trigger);

      if ((!rules || rules.length === 0) && _this2.required === undefined) {
        callback();
        return true;
      }

      _this2.validateStatus = 'validating';
      var descriptor = {};

      if (rules && rules.length > 0) {
        rules.forEach(function (rule) {
          delete rule.trigger;
        });
      }

      descriptor[_this2.prop] = rules;
      var validator = new AsyncValidator(descriptor);
      var model = (_model = {}, _model[_this2.prop] = _this2.fieldValue, _model);
      validator.validate(model, {
        firstFields: true
      }, function (errors, invalidFields) {
        _this2.validateStatus = !errors ? 'success' : 'error';
        _this2.isCurrentError = _this2.validateStatus === 'error';
        _this2.currentErrorMessage = errors ? errors[0].message : '';
        callback(_this2.currentErrorMessage, invalidFields);

        _this2.$emit('validate', !errors, errors);

        _this2.list && _this2.list.$emit('validate', _this2.prop, !errors, _this2.currentErrorMessage || null);
      });
    });
  };

  _proto.valueChanged = function valueChanged(value) {
    if (this.currentValue !== value) {
      this.currentValue = value;
    }
  };

  _proto.currentValueChanged = function currentValueChanged(currentValue) {
    this.$emit('input', currentValue);
    this.$emit('change', currentValue);
  };

  _createClass(FormComponent, [{
    key: "fieldValue",
    get: function get() {
      return this.currentValue;
    }
  }, {
    key: "isDisabled",
    get: function get() {
      var disabled = this.disabled;

      if (this.list) {
        if (!disabled) {
          disabled = this.list.disabled;
        }
      }

      return disabled;
    }
  }, {
    key: "isReadonly",
    get: function get() {
      var isReadonly = !this.editable;

      if (this.list && !isReadonly) {
        isReadonly = !this.list.editable;
      }

      return isReadonly;
    }
  }]);

  return FormComponent;
}(Emitter), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "error", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "errorMessage", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "list", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "prop", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "editable", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "required", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "rules", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "errorDisplayType", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "errorMessageChanged", [_dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "errorMessageChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentValueChanged", [_dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "currentValueChanged"), _class2.prototype)), _class2)) || _class);