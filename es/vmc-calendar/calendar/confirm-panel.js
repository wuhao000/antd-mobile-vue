import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { formatDate as _formatDate } from '../util';
var ConfirmPanel = (_dec = Component({
  name: 'ConfirmPanel'
}), _dec2 = Prop({}), _dec3 = Prop({}), _dec4 = Prop({
  type: Boolean
}), _dec5 = Prop({
  type: Boolean
}), _dec6 = Prop({}), _dec7 = Prop({}), _dec8 = Prop({
  type: String
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(ConfirmPanel, _Vue);

  function ConfirmPanel() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "type", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "locale", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onlyConfirm", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disableBtn", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "startDateTime", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "endDateTime", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "formatStr", _descriptor7, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = ConfirmPanel.prototype;

  _proto.onConfirm = function onConfirm() {
    if (!this.disableBtn) {
      this.$emit('confirm');
    }
  };

  _proto.formatDate = function formatDate(date) {
    var _this$formatStr = this.formatStr,
        formatStr = _this$formatStr === void 0 ? '' : _this$formatStr,
        locale = this.locale;
    return _formatDate(date, formatStr, locale);
  };

  _proto.render = function render() {
    var h = arguments[0];
    var type = this.type,
        locale = this.locale,
        disableBtn = this.disableBtn;
    var startDateTime = this.startDateTime,
        endDateTime = this.endDateTime;

    if (startDateTime && endDateTime && +startDateTime > +endDateTime) {
      var tmp = startDateTime;
      startDateTime = endDateTime;
      endDateTime = tmp;
    }

    var startTimeStr = startDateTime ? this.formatDate(startDateTime) : locale.noChoose;
    var endTimeStr = endDateTime ? this.formatDate(endDateTime) : locale.noChoose;
    var btnCls = disableBtn ? 'button button-disable' : 'button';

    if (type === 'one') {
      btnCls += ' button-full';
    }

    return h("div", {
      "class": "confirm-panel"
    }, [type === 'range' && h("div", {
      "class": 'info'
    }, [h("p", [locale.start, ": ", h("span", {
      "class": !startDateTime ? 'grey' : ''
    }, [startTimeStr])]), h("p", [locale.end, ": ", h("span", {
      "class": !endDateTime ? 'grey' : ''
    }, [endTimeStr])])]), h("div", {
      "class": btnCls,
      "on": {
        "click": this.onConfirm
      }
    }, [locale.confirm])]);
  };

  return ConfirmPanel;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "locale", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "onlyConfirm", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "disableBtn", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "startDateTime", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "endDateTime", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "formatStr", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default ConfirmPanel;