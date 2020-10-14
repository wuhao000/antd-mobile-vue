import { __rest } from "tslib";
import Dialog from 'ant-design-vue/lib/vc-dialog';
import classnames from 'classnames';
import { defineComponent, reactive, ref, watch } from 'vue';
import TouchFeedback from '../../vmc-feedback';
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
            type: String
        },
        maskTransitionName: {
            type: String
        },
        wrapClassName: {
            type: String
        },
        wrapProps: {},
        platform: {
            type: String,
            default: 'ios'
        },
        bodyStyle: {},
        title: {},
        maskClosable: {
            type: Boolean,
            default: true
        },
        closable: {
            type: Boolean,
            default: false
        },
        footer: {
            default: () => {
                return [];
            }
        },
        className: {
            type: [String, Object]
        },
        onClose: {},
        transparent: {
            type: Boolean,
            default: false
        },
        popup: {
            type: Boolean,
            default: false
        },
        animated: {
            type: Boolean,
            default: true
        },
        animationType: {
            type: String,
            default: 'slide-down'
        },
        onAnimationEnd: {},
        animateAppear: {
            type: Boolean
        },
        operation: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit, slots }) {
        const visible = ref(null);
        const state = reactive({
            visible: visible.value
        });
        watch(() => visible.value, (visible) => {
            state.visible = visible;
        });
        const renderFooterButton = (button, prefixCls, i) => {
            let buttonStyle = {};
            if (button.style) {
                buttonStyle = button.style;
                if (typeof buttonStyle === 'string') {
                    const styleMap = {
                        cancel: {},
                        default: {},
                        destructive: { color: 'red' }
                    };
                    buttonStyle = styleMap[buttonStyle] || {};
                }
            }
            const onClickFn = (e) => {
                e.preventDefault();
                if (button.onPress) {
                    button.onPress();
                }
            };
            return (
            // @ts-ignore
            <TouchFeedback activeClassName={`${prefixCls}-button-active`} key={i}>
          <a class={`${prefixCls}-button`} role="button" style={buttonStyle} onClick={onClickFn}>
            {button.text || `Button`}
          </a>
        </TouchFeedback>);
        };
        return {
            renderFooterButton, visible
        };
    },
    render() {
        var _a, _b;
        const _c = this.$props, { prefixCls, wrapClassName, transitionName, maskTransitionName, platform, footer = [], operation, animated, transparent, popup, animationType } = _c, restProps = __rest(_c, ["prefixCls", "wrapClassName", "transitionName", "maskTransitionName", "platform", "footer", "operation", "animated", "transparent", "popup", "animationType"]);
        const btnGroupClass = classnames(`${prefixCls}-button-group-${footer.length === 2 && !operation ? 'h' : 'v'}`, `${prefixCls}-button-group-${operation ? 'operation' : 'normal'}`);
        const footerDom = footer.length ? (<div class={btnGroupClass} role="group">
        {footer.map((button, i) => 
        // tslint:disable-next-line:jsx-no-multiline-js
        this.renderFooterButton(button, prefixCls, i))}
      </div>) : null;
        let transName;
        let maskTransName;
        if (animated) {
            // tslint:disable-next-line:prefer-conditional-expression
            if (transparent) {
                transName = maskTransName = 'am-fade';
            }
            else {
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
        <Dialog {...restProps} maskClosable={this.maskClosable} visible={this.visible} prefixCls={prefixCls} title={this.title} closable={this.closable} class={cls} onClose={this.onClose || ((e) => {
            this.$emit('change', false);
            this.$emit('close', e);
        })} wrapClassName={wrapCls} transitionName={transitionName || transName} maskTransitionName={maskTransitionName || maskTransName} footer={footerDom}>{(_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)}</Dialog>);
    }
});
export default Modal;
//# sourceMappingURL=modal.jsx.map