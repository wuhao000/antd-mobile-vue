import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";

var _dec, _class;

import Component, { mixins } from 'vue-class-component';
import Base from './mixin';
var VLine = (_dec = Component({
  name: 'VLine'
}), _dec(_class =
/*#__PURE__*/
function (_mixins) {
  _inheritsLoose(VLine, _mixins);

  function VLine() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _mixins.call.apply(_mixins, [this].concat(args)) || this, _this.chartName = 'line', _temp) || _assertThisInitialized(_this);
  }

  return VLine;
}(mixins(Base))) || _class);
export { VLine as default };