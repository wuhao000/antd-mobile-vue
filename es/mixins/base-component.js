import _extends from "@babel/runtime/helpers/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _createClass from "@babel/runtime/helpers/createClass";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";

var _dec, _class;

import Component from 'vue-class-component';
import Emitter from './emitter';
var BaseComponent = (_dec = Component({
  name: 'BaseComponent'
}), _dec(_class =
/*#__PURE__*/
function (_Emitter) {
  _inheritsLoose(BaseComponent, _Emitter);

  function BaseComponent() {
    return _Emitter.apply(this, arguments) || this;
  }

  var _proto = BaseComponent.prototype;

  _proto.getInputComponent = function getInputComponent() {
    return {};
  };

  _proto.getProps = function getProps() {
    return {};
  };

  _proto.getSlotProps = function getSlotProps() {
    var _this = this;

    var props = {};
    Object.keys(this.$slots).forEach(function (slotKey) {
      if (slotKey !== 'default') {
        props[slotKey] = _this.$slots[slotKey];
      }
    });
    return props;
  };

  _proto.render = function render() {
    var h = arguments[0];
    var InputComponent = this.getInputComponent();
    return h(InputComponent, _mergeJSXProps([{}, {
      "props": this.props
    }, {}, {
      "on": this.listeners
    }, {
      "attrs": {
        "slots": this.$slots
      },
      "scopedSlots": this.$scopedSlots,
      "class": this.cssClass,
      "style": cssStyle
    }]));
  };

  _createClass(BaseComponent, [{
    key: "cssClass",
    get: function get() {
      return {};
    }
  }, {
    key: "cssStyle",
    get: function get() {
      return {};
    }
  }, {
    key: "listeners",
    get: function get() {
      var _this2 = this;

      var listeners = {};
      Object.keys(this.$listeners).forEach(function (listener) {
        if (listener !== 'change') {
          listeners[listener] = _this2.$listeners[listener];
        }
      });
      return listeners;
    }
  }, {
    key: "props",
    get: function get() {
      return _extends({}, this.getSlotProps(), this.$attrs, this.$props, this.getProps());
    }
  }, {
    key: "slotNames",
    get: function get() {
      return Object.keys(this.$slots);
    }
  }]);

  return BaseComponent;
}(Emitter)) || _class);
export { BaseComponent as default };