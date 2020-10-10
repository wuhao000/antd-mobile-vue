import Popup from '../popup';
import PopupMixin from './popup-mixin';

const getModal = (props, visible, {getContent, hide, onDismiss, onOk}) => {
  const content = getContent();
  // @ts-ignore
  return <Popup
      {...{
        title: props.title,
        value: visible,
        showCancel: true,
        showOk: true,
        closable: false,
        transitionName: props.transitionName || props.popupTransitionName,
        maskTransitionName: props.maskTransitionName
      }}
      onCancel={onDismiss}
      onOk={onOk}
      style={props.style}>
    <div>
      {content}
    </div>
  </Popup>;
};

export default PopupMixin(getModal, {
  prefixCls: 'rmc-picker-popup',
  WrapComponent: 'span',
  triggerType: 'onClick',
  pickerValueProp: 'selectedValue',
  pickerValueChangeProp: 'onValueChange'
}) as any;
