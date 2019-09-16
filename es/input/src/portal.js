import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _class, _class2, _descriptor;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
var Portal = (_dec = Component({
  name: 'Portal'
}), _dec2 = Prop({
  required: true
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Portal, _Vue);

  function Portal() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "getContainer", _descriptor, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Portal.prototype;

  _proto.created = function created() {
    this.container = this.getContainer();
  };

  _proto.mounted = function mounted() {
    this.container.appendChild(this.$el);
  };

  _proto.render = function render() {
    return this.$slots.default;
  };

  return Portal;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "getContainer", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default Portal;