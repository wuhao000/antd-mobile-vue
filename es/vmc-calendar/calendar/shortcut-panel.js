import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
var ShortcutPanel = (_dec = Component({
  name: 'ShortcutPanel'
}), _dec2 = Prop({}), _dec3 = Prop({}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(ShortcutPanel, _Vue);

  function ShortcutPanel() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "locale", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onSelect", _descriptor2, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = ShortcutPanel.prototype;

  _proto.onClick = function onClick(type) {
    var today = new Date();

    switch (type) {
      case 'today':
        this.$emit('select', new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0), new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12));
        break;

      case 'yesterday':
        this.$emit('select', new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 0), new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 12));
        break;

      case 'lastweek':
        this.$emit('select', new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6, 0), new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12));
        break;

      case 'lastmonth':
        this.$emit('select', new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29, 0), new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12));
        break;
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var h = arguments[0];
    var locale = this.locale;
    return h("div", {
      "class": "shortcut-panel"
    }, [h("div", {
      "class": "item",
      "on": {
        "click": function click() {
          return _this2.onClick('today');
        }
      }
    }, [locale.today]), h("div", {
      "class": "item",
      "on": {
        "click": function click() {
          return _this2.onClick('yesterday');
        }
      }
    }, [locale.yesterday]), h("div", {
      "class": "item",
      "on": {
        "click": function click() {
          return _this2.onClick('lastweek');
        }
      }
    }, [locale.lastWeek]), h("div", {
      "class": "item",
      "on": {
        "click": function click() {
          return _this2.onClick('lastmonth');
        }
      }
    }, [locale.lastMonth])]);
  };

  return ShortcutPanel;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "locale", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "onSelect", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default ShortcutPanel;