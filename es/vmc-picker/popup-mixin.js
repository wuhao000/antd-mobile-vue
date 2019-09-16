import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { cloneElement, setListeners, setProps } from '../utils/vnode';
import { PopupPickerProps } from './popup-picker-types';
export default function PopupMixin(getModal, newProps) {
  var _dec, _dec2, _dec3, _dec4, _class, _class2;

  var PopupMixin = (_dec = Component({
    name: 'PopupMixin'
  }), _dec2 = Watch('state.visible'), _dec3 = Watch('value'), _dec4 = Watch('visible'), _dec(_class = (_class2 =
  /*#__PURE__*/
  function (_PopupPickerProps) {
    _inheritsLoose(PopupMixin, _PopupPickerProps);

    function PopupMixin() {
      var _temp, _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (_temp = _this = _PopupPickerProps.call.apply(_PopupPickerProps, [this].concat(args)) || this, _this.state = {
        pickerValue: 'value' in _assertThisInitialized(_this) ? _this.value : null,
        visible: _this.visible || false
      }, _temp) || _assertThisInitialized(_this);
    }

    var _proto = PopupMixin.prototype;

    _proto.stateVisibleChanged = function stateVisibleChanged() {
      this.$emit('visible-change', this.state.visible);
    };

    _proto.valueChanged = function valueChanged(value) {
      this.state.pickerValue = value;
    };

    _proto.visibleChanged = function visibleChanged(value) {
      this.setVisibleState(value);
    };

    _proto.onPickerChange = function onPickerChange(pickerValue) {
      if (this.state.pickerValue !== pickerValue) {
        this.state.pickerValue = pickerValue;
        var picker = this.picker,
            pickerValueChangeProp = this.pickerValueChangeProp;

        if (picker && picker.props[pickerValueChangeProp]) {
          picker.props[pickerValueChangeProp](pickerValue);
        }
      }
    };

    _proto.saveRef = function saveRef(picker) {
      this.picker = picker;
    };

    _proto.setVisibleState = function setVisibleState(visible) {
      this.state.visible = visible;

      if (!visible) {
        this.state.pickerValue = null;
      }
    };

    _proto.fireVisibleChange = function fireVisibleChange(visible) {
      if (this.state.visible !== visible) {
        this.setVisibleState(visible);
        this.$emit('visible-change', visible);
        this.$emit('update:visible', visible);
      }
    };

    _proto.onTriggerClick = function onTriggerClick(e) {
      var child = this.$slots.default;
      var childProps = child.props || {};

      if (childProps[this.triggerType]) {
        childProps[this.triggerType](e);
      }

      this.fireVisibleChange(!this.state.visible);
    };

    _proto.onOk = function onOk() {
      this.$emit('ok');
      this.fireVisibleChange(false);
    };

    _proto.getContent = function getContent() {
      if (this.$slots.picker) {
        var _setProps;

        var picker = this.$slots.picker[0];
        var pickerValue = this.state.pickerValue;

        if (pickerValue === null) {
          pickerValue = this.value;
        }

        setProps(this.picker, (_setProps = {}, _setProps[this.pickerValueProp] = pickerValue, _setProps[this.pickerValueChangeProp] = this.onPickerChange, _setProps));
        picker.data.ref = 'picker';
        return picker;
      }

      if (this.picker) {
        var _cloneElement;

        var _pickerValue = this.state.pickerValue;

        if (_pickerValue === null) {
          _pickerValue = this.value;
        }

        return cloneElement(this.picker, (_cloneElement = {}, _cloneElement[this.pickerValueProp] = _pickerValue, _cloneElement[this.pickerValueChangeProp] = this.onPickerChange, _cloneElement.ref = this.saveRef, _cloneElement));
      } else {
        return this.content;
      }
    };

    _proto.onDismiss = function onDismiss() {
      this.fireVisibleChange(false);
      this.$emit('dismiss');
    };

    _proto.hide = function hide() {
      this.fireVisibleChange(false);
      this.$emit('hide');
    };

    _proto.render = function render() {
      var _this2 = this;

      var h = arguments[0];
      var props = this.$props;
      var children = this.$slots.default;

      if (!children) {
        return getModal(this.$createElement, props, this.state.visible, {
          getContent: this.getContent,
          onOk: this.onOk,
          hide: this.hide,
          onDismiss: this.onDismiss
        });
      }

      var disabled = this.$props.disabled;

      if (!disabled) {
        children.forEach(function (child) {
          var _setListeners;

          setListeners(child, (_setListeners = {}, _setListeners[_this2.triggerType] = _this2.onTriggerClick, _setListeners));
        });
      }

      var modal = getModal(this.$createElement, props, this.state.visible, {
        getContent: this.getContent,
        onOk: this.onOk,
        hide: this.hide,
        onDismiss: this.onDismiss
      });
      return h("div", {
        "style": props.wrapStyle
      }, [children, modal]);
    };

    return PopupMixin;
  }(PopupPickerProps), (_applyDecoratedDescriptor(_class2.prototype, "stateVisibleChanged", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "stateVisibleChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "visibleChanged", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "visibleChanged"), _class2.prototype)), _class2)) || _class);
  return PopupMixin;
}