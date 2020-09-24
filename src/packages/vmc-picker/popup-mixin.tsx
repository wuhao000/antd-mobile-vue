import {defineComponent, reactive, ref, VNode, watch} from 'vue';
import {cloneElement, setListeners, setProps} from '../utils/vnode';
import {PopupPickerProps} from './popup-picker-types';

export default function PopupMixin(getModal, newProps) {
  return defineComponent({
    name: 'PopupMixin',
    props: {
      ...PopupPickerProps
    },
    setup(props, {emit, slots}) {
      const picker = ref(null);
      const state = reactive({
        pickerValue: props.value !== undefined ? props.value : null,
        visible: props.visible || false
      });
      watch(() => state.visible, () => {
        emit('visible-change', state.visible);
      });
      watch(() => props.value, (value) => {
        state.pickerValue = value;
      });
      watch(() => props.visible, (value: boolean) => {
        setVisibleState(value);
      });

      const onPickerChange = (pickerValue) => {
        if (state.pickerValue !== pickerValue) {
          state.pickerValue = pickerValue;
          const {pickerValueChangeProp} = props;
          if (picker && picker.props[pickerValueChangeProp!]) {
            picker.props[pickerValueChangeProp!](pickerValue);
          }
        }
      };
      const saveRef = (picker) => {
        picker.value = picker;
      };
      const setVisibleState = (visible) => {
        state.visible = visible;
        if (!visible) {
          state.pickerValue = null;
        }
      };
      const fireVisibleChange = (visible) => {
        if (state.visible !== visible) {
          setVisibleState(visible);
          emit('visible-change', visible);
          emit('update:visible', visible);
        }
      };
      const onTriggerClick = (e) => {
        const child: any = slots.default();
        const childProps = child.props || {};
        if (childProps[props.triggerType!]) {
          childProps[props.triggerType!](e);
        }
        fireVisibleChange(!state.visible);
      };
      const onOk = () => {
        emit('ok');
        fireVisibleChange(false);
      };
      const getContent = () => {
        if (slots.picker) {
          const localPicker: VNode = slots.picker()[0];
          let {pickerValue} = state;
          if (pickerValue === null) {
            pickerValue = props.value;
          }
          setProps(picker.value, ({
            [props.pickerValueProp!]: pickerValue,
            [props.pickerValueChangeProp]: onPickerChange
          }));

          // localPicker.ref = 'picker';
          return localPicker;
        }
        if (picker.value) {
          let {pickerValue} = state;
          if (pickerValue === null) {
            pickerValue = props.value;
          }
          return cloneElement(picker.value, ({
            [props.pickerValueProp!]: pickerValue,
            [props.pickerValueChangeProp]: onPickerChange,
            ref: saveRef
          }));
        } else {
          return props.content;
        }
      };
      const onDismiss = () => {
        fireVisibleChange(false);
        emit('dismiss');
      };
      const hide = () => {
        fireVisibleChange(false);
        emit('hide');
      };

      return {
        getContent, onOk, hide, onDismiss, state,
        onTriggerClick
      };
    },
    render() {
      const props = this.$props;
      const children = this.$slots.default();
      if (!children) {
        return getModal(props, this.state.visible, {
          getContent: this.getContent,
          onOk: this.onOk,
          hide: this.hide,
          onDismiss: this.onDismiss
        });
      }
      const {disabled} = this.$props;
      if (!disabled) {
        children.forEach((child) => {
          setListeners(child, {
            [this.triggerType]: this.onTriggerClick
          });
        });
      }
      const modal = getModal(props, this.state.visible, {
        getContent: this.getContent,
        onOk: this.onOk,
        hide: this.hide,
        onDismiss: this.onDismiss
      });
      return (
        <div style={props.wrapStyle}>
          {children}
          {modal}
        </div>
      );
    }
  });
}
