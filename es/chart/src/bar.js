import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _class, _class2, _descriptor;

import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Base from './mixin';
var VBar = (_dec = Component({
  name: 'VBar'
}), _dec2 = Prop({
  type: String,
  default: 'vertical'
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_mixins) {
  _inheritsLoose(VBar, _mixins);

  function VBar() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _mixins.call.apply(_mixins, [this].concat(args)) || this, _initializerDefineProperty(_this, "direction", _descriptor, _assertThisInitialized(_this)), _this.chartName = 'bar', _temp) || _assertThisInitialized(_this);
  }

  return VBar;
}(mixins(Base)), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "direction", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { VBar as default };