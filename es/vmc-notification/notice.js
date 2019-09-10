import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

import classNames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
var Notice = (_dec = Component({
  name: 'Notice'
}), _dec2 = Prop(Number), _dec3 = Prop(Function), _dec4 = Prop(), _dec5 = Prop(String), _dec6 = Prop(Boolean), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Notice, _Vue);

  function Notice() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "duration", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onClose", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "children", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "closable", _descriptor5, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Notice.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.startCloseTimer();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.clearCloseTimer();
  };

  _proto.close = function close() {
    this.clearCloseTimer();
    this.onClose();
  };

  _proto.startCloseTimer = function startCloseTimer() {
    var _this2 = this;

    if (this.duration) {
      this.closeTimer = setTimeout(function () {
        _this2.close();
      }, this.duration * 1000);
    }
  };

  _proto.clearCloseTimer = function clearCloseTimer() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  };

  _proto.render = function render() {
    var _className;

    var h = arguments[0];
    var componentClass = this.prefixCls + "-notice";
    var className = (_className = {}, _className["" + componentClass] = 1, _className[componentClass + "-closable"] = this.closable, _className);
    return h("div", {
      "class": classNames(className)
    }, [h("div", {
      "class": componentClass + "-content"
    }, [this.$slots.default]), this.closable ? h("a", {
      "attrs": {
        "tabIndex": 0
      },
      "on": {
        "click": this.close
      },
      "class": componentClass + "-close"
    }, [h("span", {
      "class": componentClass + "-close-x"
    })]) : null]);
  };

  return Notice;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "duration", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "onClose", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "children", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "closable", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { Notice as default };