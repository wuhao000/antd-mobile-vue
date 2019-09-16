import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import Popup from '../popup';
import PopupMixin from './popup-mixin';

var getModal = function getModal(h, props, visible, _ref) {
  var getContent = _ref.getContent,
      hide = _ref.hide,
      onDismiss = _ref.onDismiss,
      onOk = _ref.onOk;
  var content = getContent(); // @ts-ignore

  return h(Popup, _mergeJSXProps([{}, {
    "attrs": {
      title: props.title,
      value: visible,
      showCancel: true,
      showOk: true,
      closable: false,
      transitionName: props.transitionName || props.popupTransitionName,
      maskTransitionName: props.maskTransitionName
    }
  }, {
    "on": {
      "cancel": onDismiss,
      "ok": onOk
    },
    "style": props.style
  }]), [h("div", [content])]);
};

export default PopupMixin(getModal, {
  prefixCls: 'rmc-picker-popup',
  WrapComponent: 'span',
  triggerType: 'onClick',
  pickerValueProp: 'selectedValue',
  pickerValueChangeProp: 'onValueChange'
});