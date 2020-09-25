import {useBaseInputComponent} from '@/packages/mixins/base-input-component';
import {pureInputComponentProps} from '@/packages/mixins/pure-input-component';
import {Drawer} from 'ant-design-vue';
import {defineComponent, PropType, VNode, watch} from 'vue';
import Touchable from '../../vmc-feedback/feedback';


const Popup = defineComponent({
  name: 'MPopup',
  props: {
    ...pureInputComponentProps,
    cancelText: {
      type: String as PropType<string>,
      default: '取消'
    },
    showCancel: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    cancelButton: {
      type: Object as PropType<VNode>
    },
    showOk: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    title: {
      type: [String, Object] as PropType<string | VNode>,
      default: ''
    },
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-popup'
    },
    height: {
      type: String as PropType<string>
    },
    width: {
      type: String as PropType<string>
    },
    placement: {
      type: String as PropType<string>,
      default: 'bottom'
    },
    showTitle: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    closable: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },
  install: null,
  setup(props, {emit, attrs, slots}) {
    const {stateValue, cssStyle, getDefaultSlot, isDisabled, isReadonly} = useBaseInputComponent(props, {
      emit,
      attrs,
      slots
    });
    watch(() => props.value, (value) => {
      stateValue.value = value;
    });
    const onCancel = () => {
      // @ts-ignore
      if (this.value !== undefined) {
        emit('update:value', false);
      } else {
        // @ts-ignore
        this.stateValue = false;
      }
      emit('cancel');
    };
    const onOk = () => {
      // @ts-ignore
      if (this.value !== undefined) {
        emit('update:value', false);
      } else {
        // @ts-ignore
        this.stateValue = false;
      }
      emit('ok');
    };
    const getProps = () => {
      return {
        title: renderHeader(),
        height: props.height || 'auto',
        width: props.width || 'auto',
        disabled: isDisabled.value,
        placement: props.placement,
        visible: isDisabled.value ? false : stateValue.value
      };
    };
    const getListeners = () => {
      return {
        close: (e) => {
          emit('cancel');
          // @ts-ignore
          this.stateValue = false;
        }
      };
    };
    const getInputComponent = () => {
      return Drawer;
    };
    const renderHeader = () => {
      return props.showTitle ? <div class={props.prefixCls + '-title-wrap'}>
        {renderCancel()}
        <div class={`${props.prefixCls}-item ${props.prefixCls}-title`}>{props.title}</div>
        {renderOk()}
      </div> : null;
    };
    const renderCancel = () => {
      return props.showCancel ?
        <Touchable activeClassName={`${props.prefixCls}-item-active`}>
          {
            props.cancelButton ? props.cancelButton
              : <div onClick={onCancel}
                     class={`${props.prefixCls}-item ${props.prefixCls}-header-left`}>
                {props.cancelText}
              </div>
          }
        </Touchable> : null;
    };
    const renderOk = () => {
      return props.showOk ?
        <Touchable activeClassName={`${props.prefixCls}-item-active`}>
          <div onClick={onOk} class={`${props.prefixCls}-item ${props.prefixCls}-header-right`}>确定</div>
        </Touchable> : null;
    };
    return {
      getProps,
      slots,
      getDefaultSlot,
      cssStyle,
      stateValue,
      getListeners,
      getInputComponent,
      isReadonly,
      isDisabled
    };
  },
  render() {
    const CustomComponent = this.getInputComponent();
    const props = {
      ...this.getListeners(),
      ...this.getProps(),
      style: this.cssStyle,
      value: this.stateValue
    };
    // @ts-ignore
    return <CustomComponent {...props}
                            v-slots={this.slots}>
      {this.getDefaultSlot()}
    </CustomComponent>;
  }
});
export default Popup as any;
