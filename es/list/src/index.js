import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _class3, _temp2;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Provide } from 'vue-property-decorator';
import Item from './item';
var List = (_dec = Component({
  name: 'MList'
}), _dec2 = Prop({
  type: Boolean,
  default: false
}), _dec3 = Prop({
  default: 'am-list'
}), _dec4 = Prop({
  type: String
}), _dec5 = Prop({
  type: [String, Object]
}), _dec6 = Prop({
  type: Number,
  default: 8
}), _dec7 = Prop({
  type: Boolean,
  default: true
}), _dec8 = Provide('list'), _dec9 = Prop({
  type: Object
}), _dec10 = Prop({
  type: Object
}), _dec11 = Prop({
  type: Boolean,
  default: false
}), _dec12 = Prop({
  type: Boolean,
  default: true
}), _dec(_class = (_class2 = (_temp2 = _class3 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(List, _Vue);

  function List() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "section", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "role", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "title", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "spaceBetweenSection", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "touchFeedback", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "list", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "model", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "rules", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "editable", _descriptor11, _assertThisInitialized(_this)), _this.fields = [], _temp) || _assertThisInitialized(_this);
  }

  var _proto = List.prototype;

  _proto.created = function created() {
    var _this2 = this;

    this.$on('d.form.addField', function (field) {
      if (field) {
        _this2.fields.push(field);
      }
    });
    /* istanbul ignore next */

    this.$on('d.form.removeField', function (field) {
      if (field.prop) {
        _this2.fields.splice(_this2.fields.indexOf(field), 1);
      }
    });
  };

  _proto.clearValidate = function clearValidate(props) {
    if (props === void 0) {
      props = [];
    }

    var fields = props.length ? typeof props === 'string' ? this.fields.filter(function (field) {
      return props === field.prop;
    }) : this.fields.filter(function (field) {
      return props.indexOf(field.prop) > -1;
    }) : this.fields;
    fields.forEach(function (field) {
      field.clearValidate();
    });
  };

  _proto.resetFields = function resetFields() {
    if (!this.model) {
      console.warn('[Element Warn][Form]model is required for resetFields to work.');
      return;
    }

    this.fields.forEach(function (field) {
      field.resetField();
    });
  };

  _proto.validate = function validate(callback) {
    var _this3 = this;

    if (!this.model) {
      return;
    }

    var promise;
    var copyCallback = callback; // if no callback, return promise

    if (typeof copyCallback !== 'function' && Promise) {
      promise = new Promise(function (resolve, reject) {
        copyCallback = function copyCallback(valid) {
          var errorField = _this3.fields.find(function (it) {
            return it.validateStatus === 'error';
          });

          if (errorField) {
            errorField.focus();
          }

          valid ? resolve(valid) : reject(valid);
        };
      });
    }

    var valid = true;
    var count = 0; // 如果需要验证的fields为空，调用验证时立刻返回callback

    if (this.fields.length === 0 && copyCallback) {
      copyCallback(true);
    }

    var invalidFields = {};
    this.fields.forEach(function (field) {
      field.validate('', function (message, field) {
        if (message) {
          valid = false;
        }

        invalidFields = _extends({}, invalidFields, field);

        if (typeof copyCallback === 'function' && ++count === _this3.fields.length) {
          copyCallback(valid, invalidFields);
        }
      });
    });

    if (promise) {
      return promise;
    }
  };

  _proto.validateField = function validateField(props, cb) {
    var copyProps = [].concat(props);
    var fields = this.fields.filter(function (field) {
      return copyProps.indexOf(field.prop) !== -1;
    });

    if (!fields.length) {
      console.warn('[Element Warn]please pass correct props!');
      return;
    }

    fields.forEach(function (field) {
      field.validate('', cb);
    });
  };

  _proto.render = function render() {
    var _classnames,
        _this4 = this;

    var h = arguments[0];
    var prefixCls = this.prefixCls;
    var wrapCls = classnames(prefixCls, (_classnames = {}, _classnames[prefixCls + '-section'] = this.section, _classnames));
    var children = [];

    if (this.$slots.default) {
      this.$slots.default.forEach(function (it, index) {
        if (index < _this4.$slots.default.length - 1) {
          if (_this4.section && it.data) {
            if (it.data.staticStyle) {
              it.data.staticStyle.marginBottom = _this4.spaceBetweenSection + 'px';
            } else {
              it.data.staticStyle = {
                marginBottom: _this4.spaceBetweenSection + 'px'
              };
            }
          }
        }

        children.push(it);
      });
    }

    return h("div", {
      "class": wrapCls
    }, [this.$slots.title ? this.$slots.title : this.title ? h("div", {
      "class": prefixCls + "-header"
    }, [this.title]) : null, children.length ? h("div", {
      "class": prefixCls + "-body"
    }, [children]) : null, this.$slots.footer ? this.$slots.footer : null]);
  };

  return List;
}(Vue), _class3.Item = Item, _temp2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "section", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "role", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "spaceBetweenSection", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "touchFeedback", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "list", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return this;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "model", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "rules", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "editable", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default List;