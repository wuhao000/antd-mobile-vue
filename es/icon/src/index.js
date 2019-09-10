import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import loadSprite from './load-sprite';
var Icon = (_dec = Component({
  name: 'MIcon'
}), _dec2 = Prop({
  type: [String, Number],
  default: 'md'
}), _dec3 = Prop({
  type: String,
  required: true
}), _dec4 = Prop(String), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Icon, _Vue);

  function Icon() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "size", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "type", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "color", _descriptor3, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Icon.prototype;

  _proto.mounted = function mounted() {
    loadSprite();
  };

  _proto.render = function render() {
    var h = arguments[0];

    var type = this.type,
        size = this.size,
        restProps = _objectWithoutPropertiesLoose(this, ["type", "size"]);

    var cls = classnames('am-icon', "am-icon-" + type, "am-icon-" + size);
    var style = {};

    if (this.color) {
      style.color = this.color;
    }

    if (typeof this.size === 'number') {
      style.width = this.size + 'px';
      style.height = this.size + 'px';
    }

    return h("svg", {
      "class": cls,
      "style": style,
      "props": _extends({}, restProps)
    }, [h("use", {
      "attrs": {
        "xlink:href": "#" + type
      }
    })]);
  };

  return Icon;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "size", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "color", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { Icon as default };