import _extends from "@babel/runtime/helpers/extends";
import _createClass from "@babel/runtime/helpers/createClass";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";

var _dec, _class;

import PureInputComponent from './pure-input-component';
import Component from 'vue-class-component';
import { mixins } from 'vue-class-component';
import { SimpleFormComponent } from './simple-form-component';
var BaseFormComponent = (_dec = Component({
  name: 'BaseFormComponent'
}), _dec(_class =
/*#__PURE__*/
function (_mixins) {
  _inheritsLoose(BaseFormComponent, _mixins);

  function BaseFormComponent() {
    return _mixins.apply(this, arguments) || this;
  }

  _createClass(BaseFormComponent, [{
    key: "props",
    get: function get() {
      return _extends({}, this.getSlotProps(), this.$attrs, this.$props, this.getProps(), {
        disabled: this.isDisabled,
        readOnly: this.isReadonly,
        visible: this.stateValue
      });
    }
  }]);

  return BaseFormComponent;
}(mixins(PureInputComponent, SimpleFormComponent))) || _class);
export { BaseFormComponent as default };