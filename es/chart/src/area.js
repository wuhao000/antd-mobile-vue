import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";

var _dec, _class;

import Component, { mixins } from 'vue-class-component';
import base from './mixin';
var VArea = (_dec = Component({
  name: 'VArea'
}), _dec(_class =
/*#__PURE__*/
function (_mixins) {
  _inheritsLoose(VArea, _mixins);

  function VArea() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _mixins.call.apply(_mixins, [this].concat(args)) || this, _this.chartName = 'area', _temp) || _assertThisInitialized(_this);
  }

  return VArea;
}(mixins(base))) || _class);
export { VArea as default };