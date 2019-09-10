import _extends from "@babel/runtime/helpers/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _class, _class2, _descriptor;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Icon from '../icon';
var httpReg = /^http(s)?:\/\//;
var IconRes = (_dec = Component({
  name: 'IconRes'
}), _dec2 = Prop({
  type: [String, Object]
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(IconRes, _Vue);

  function IconRes() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "type", _descriptor, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = IconRes.prototype;

  _proto.render = function render() {
    var h = arguments[0];
    var icon = this.type;

    if (typeof icon === 'string') {
      if (httpReg.test(icon)) {
        return h("img", {
          "attrs": {
            "src": icon,
            "alt": ''
          }
        });
      } else {
        return h(Icon, {
          "attrs": {
            "type": icon,
            "size": 'md'
          }
        });
      }
    } else if (typeof icon === 'object') {
      if (icon.context) {
        return icon;
      } else if (icon.iconType === 'img') {
        return h("img", _mergeJSXProps([{
          "attrs": {
            "src": icon
          }
        }, icon, {
          "attrs": {
            "alt": ''
          }
        }]));
      } else if (icon.iconType === 'icon') {
        return h(Icon, {
          "props": _extends({}, icon)
        });
      }
    }
  };

  return IconRes;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default IconRes;