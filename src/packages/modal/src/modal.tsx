import Dialog from 'ant-design-vue/lib/vc-dialog';
import classnames from 'classnames';
import {defineComponent, PropType, reactive, ref, Ref, watch} from 'vue';
import TouchFeedback from '../../vmc-feedback';
import {Action} from './props-type';

const Modal = defineComponent({
  alert: null,
  confirm: null,
  prompt: null,
  operation: null,
  install: null,
  name: 'Modal',
  props: {
    prefixCls: {
      default: 'am-modal'
    },
    transitionName: {
      type: String as PropType<string>
    },
    maskTransitionName: {
      type: String as PropType<string>
    },
    wrapClassName: {
      type: String as PropType<string>
    },
    wrapProps: {},
    platform: {
      type: String as PropType<string>,
      default: 'ios'
    },
    bodyStyle: {},
    title: {},
    maskClosable: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    closable: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    footer: {
      default: () => {
        return [];
      }
    },
    className: {
      type: [String, Object] as PropType<string | object>
    },
    onClose: {},
    transparent: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    popup: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    animated: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    animationType: {
      type: String as PropType<any>,
      default: 'slide-down'
    },
    onAnimationEnd: {},
    animateAppear: {
      type: Boolean as PropType<boolean>
    },
    operation: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, {emit, slots}) {
    const visible: Ref<boolean> = ref(null);
    const state = reactive({
      visible: visible.value
    });
    watch(() => visible.value, (visible: boolean) => {
      state.visible = visible;
    });

    const renderFooterButton = (button: Action<any>, prefixCls: string | undefined, i: number) => {
      let buttonStyle = {};
      if (button.style) {
        buttonStyle = button.style;
        if (typeof buttonStyle === 'string') {
          const styleMap: {
            [key: string]: object;
          } = {
            cancel: {},
            default: {},
            destructive: {color: 'red'}
          };
          buttonStyle = styleMap[buttonStyle] || {};
        }
      }

      const onClickFn = (e: any) => {
        e.preventDefault();
        if (button.onPress) {
          button.onPress();
        }
      };

      return (
        // @ts-ignore
        <TouchFeedback activeClassName={`${prefixCls}-button-active`} key={i}>
          <a
            class={`${prefixCls}-button`}
            role="button"
            style={buttonStyle}
            onClick={onClickFn}
          >
            {button.text || `Button`}
          </a>
        </TouchFeedback>
      );
    };
    return {
      renderFooterButton, visible
    };
  },
  render() {
    const {
      prefixCls,
      wrapClassName,
      transitionName,
      maskTransitionName,
      platform,
      footer = [],
      operation,
      animated,
      transparent,
      popup,
      animationType,
      ...restProps
    } = this.$props;

    const btnGroupClass = classnames(
      `${prefixCls}-button-group-${
        footer.length === 2 && !operation ? 'h' : 'v'
      }`,
      `${prefixCls}-button-group-${operation ? 'operation' : 'normal'}`
    );
    const footerDom = footer.length ? (
      <div class={btnGroupClass} role="group">
        {footer.map((button, i) =>
          // tslint:disable-next-line:jsx-no-multiline-js
          this.renderFooterButton(button, prefixCls, i)
        )}
      </div>
    ) : null;

    let transName;
    let maskTransName;
    if (animated) {
      // tslint:disable-next-line:prefer-conditional-expression
      if (transparent) {
        transName = maskTransName = 'am-fade';
      } else {
        transName = maskTransName = 'am-slide-up';
      }
      if (popup) {
        transName =
          animationType === 'slide-up' ? 'am-slide-up' : 'am-slide-down';
        maskTransName = 'am-fade';
      }
    }

    const wrapCls = classnames(wrapClassName, {
      [`${prefixCls}-wrap-popup`]: popup
    });
    const cls = classnames(this.className, {
      [`${prefixCls}-transparent`]: transparent,
      [`${prefixCls}-popup`]: popup,
      [`${prefixCls}-operation`]: operation,
      [`${prefixCls}-popup-${animationType}`]: popup && animationType,
      [`${prefixCls}-android`]: platform === 'android'
    });
    return (
      // @ts-ignore
      <Dialog
        {...restProps}
        maskClosable={this.maskClosable}
        visible={this.visible}
        prefixCls={prefixCls}
        title={this.title}
        closable={this.closable}
        class={cls}
        onClose={this.onClose || ((e) => {
          this.$emit('change', false);
          this.$emit('close', e);
        })}
        wrapClassName={wrapCls}
        transitionName={transitionName || transName}
        maskTransitionName={maskTransitionName || maskTransName}
        footer={footerDom}
      >{this.$slots.default?.()}</Dialog>
    );
  }
});

export default Modal as any;
