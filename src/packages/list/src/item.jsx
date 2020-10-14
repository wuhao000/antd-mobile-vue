/* tslint:disable:jsx-no-multiline-js */
import classNames from 'classnames';
import { computed, defineComponent, getCurrentInstance, inject, onBeforeUnmount, ref } from 'vue';
import Popover from '../../popover';
import toast from '../../toast';
import { isEmptySlot } from '../../utils/vnode';
import TouchFeedback from '../../vmc-feedback';
const Brief = defineComponent({
    name: 'Brief',
    props: {
        prefixCls: {},
        role: {}
    },
    render() {
        return (<div class="am-list-brief">
        {this.$slots.default()}
      </div>);
    }
});
const Item = defineComponent({
    inheritAttrs: false,
    name: 'ListItem',
    props: {
        text: {
            type: Boolean,
            default: false
        },
        prefixCls: {
            default: 'am-list'
        },
        role: {
            type: String
        },
        platform: {
            type: String,
            default: 'iOS'
        },
        thumb: {
            type: [String, Object]
        },
        extra: {
            type: [String, Object]
        },
        extraPosition: {
            type: String,
            default: 'right'
        },
        activeStyle: {
            type: Object
        },
        multipleLine: {
            type: Boolean,
            default: false
        },
        error: {
            type: Boolean,
            default: false
        },
        errorMessage: {
            type: String
        },
        disabled: {
            type: Boolean,
            default: false
        },
        align: {
            type: String,
            default: 'middle'
        },
        wrap: {
            type: Boolean
        },
        arrow: {
            type: String
        },
        title: {
            type: [String, Object],
            default: ''
        },
        labelPosition: {
            type: String,
            default: 'left'
        },
        contentStyle: {
            type: Object,
            default: () => {
                return {};
            }
        },
        extraStyle: {
            type: Object,
            default: () => {
                return {};
            }
        },
        touchFeedback: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        },
        suffix: {},
        errorDisplayType: {
            type: String,
            default: 'text'
        }
    },
    Brief,
    setup(props, { emit, slots }) {
        const debounceTimeout = ref(null);
        const coverRippleStyle = ref({ display: 'none' });
        const rippleClicked = ref(false);
        const list = inject('list');
        const showErrorPopover = false;
        const instance = getCurrentInstance();
        const actualError = computed(() => {
            var _a, _b;
            return (_b = (_a = props.error) !== null && _a !== void 0 ? _a : instance.parent['error']) !== null && _b !== void 0 ? _b : false;
        });
        const actualErrorMessage = computed(() => {
            return props.errorMessage || instance.parent['errorMessage'];
        });
        const actualDisabled = computed(() => {
            return props.disabled;
        });
        const actualErrorDisplayType = computed(() => {
            var _a;
            return (_a = props.errorDisplayType) !== null && _a !== void 0 ? _a : instance.parent['errorDisplayType'];
        });
        const onClick = (ev) => {
            ev.stopPropagation();
            const isAndroid = props.platform === 'android';
            if (isAndroid) {
                if (debounceTimeout.value) {
                    clearTimeout(debounceTimeout.value);
                    debounceTimeout.value = null;
                }
                const Item = ev.currentTarget;
                const RippleWidth = Math.max(Item.offsetHeight, Item.offsetWidth);
                const ClientRect = ev.currentTarget.getBoundingClientRect();
                const pointX = ev.clientX - ClientRect.left - Item.offsetWidth / 2;
                const pointY = ev.clientY - ClientRect.top - Item.offsetWidth / 2;
                coverRippleStyle.value = {
                    width: `${RippleWidth}px`,
                    height: `${RippleWidth}px`,
                    left: `${pointX}px`,
                    top: `${pointY}px`
                };
                rippleClicked.value = true;
                debounceTimeout.value = setTimeout(() => {
                    coverRippleStyle.value = { display: 'none' };
                    rippleClicked.value = false;
                }, 1000);
            }
            emit('click');
        };
        const renderExtra = () => {
            var _a;
            return (!isEmptySlot(slots.extra) || props.extra) ? (<div style={props.extraStyle} class={classNames(`${props.prefixCls}-extra`, {
                [props.prefixCls + '-extra-text']: props.text
            })}>{((_a = slots.extra) === null || _a === void 0 ? void 0 : _a.call(slots)) || props.extra}
          {props.errorDisplayType === 'text' && actualError.value && actualErrorMessage.value ?
                <div>
                {actualErrorMessage.value}
              </div> : null}
        </div>) : null;
        };
        const renderThumb = () => {
            const { thumb, prefixCls } = props;
            if (slots.thumb) {
                return <div class={`${prefixCls}-thumb`}>{slots.thumb()}</div>;
            }
            else if (thumb) {
                return <div class={`${prefixCls}-thumb`}>
          {typeof thumb === 'string' ? <img src={thumb}/> : thumb}
        </div>;
            }
            else if (props.required) {
                return <div class={`${prefixCls}-required`}/>;
            }
            else {
                return null;
            }
        };
        const renderLabel = () => {
            if (!isEmptySlot(slots.default)) {
                return (<div class={`${props.prefixCls}-content`} style={props.contentStyle}>{slots.default()}</div>);
            }
            else if (props.title) {
                return (<div class={`${props.prefixCls}-content`} style={props.contentStyle}>{props.title}</div>);
            }
            else {
                return null;
            }
        };
        const renderControl = () => {
            return slots.control ? <div class={props.prefixCls + '-control'}>{slots.control()}</div> : null;
        };
        onBeforeUnmount(() => {
            if (debounceTimeout.value) {
                clearTimeout(debounceTimeout.value);
                debounceTimeout.value = null;
            }
        });
        return {
            coverRippleStyle, rippleClicked,
            actualErrorDisplayType,
            actualError, actualDisabled,
            onClick, renderThumb,
            renderLabel, renderControl,
            renderExtra, actualErrorMessage,
            showErrorPopover, list
        };
    },
    render() {
        var _a, _b;
        const { prefixCls, activeStyle, align, wrap, disabled, multipleLine, arrow, actualError } = this;
        const { coverRippleStyle, rippleClicked } = this;
        const section = this.$parent['section'];
        const wrapCls = classNames(`${prefixCls}-item`, `${prefixCls}-item-label-` + this.labelPosition, {
            [`${prefixCls}-item-disabled`]: this.actualDisabled,
            [`${prefixCls}-item-error`]: actualError,
            [`${prefixCls}-item-error-text`]: actualError && this.actualErrorDisplayType === 'text',
            [`${prefixCls}-item-top`]: align === 'top',
            [`${prefixCls}-item-middle`]: align === 'middle',
            [`${prefixCls}-item-bottom`]: align === 'bottom',
            [`${prefixCls}-item-section`]: section,
            [`${prefixCls}-item-extra-left`]: this.extraPosition === 'left',
            [`${prefixCls}-item-extra-center`]: this.extraPosition === 'center',
            [`${prefixCls}-item-extra-right`]: this.extraPosition === 'right'
        });
        const rippleCls = classNames(`${prefixCls}-ripple`, {
            [`${prefixCls}-ripple-animate`]: rippleClicked
        });
        const lineCls = classNames(`${prefixCls}-line`, {
            [`${prefixCls}-line-multiple`]: multipleLine,
            [`${prefixCls}-line-wrap`]: wrap
        });
        const arrowCls = classNames(`${prefixCls}-arrow`, {
            [`${prefixCls}-arrow-horizontal`]: arrow === 'horizontal',
            [`${prefixCls}-arrow-vertical`]: arrow === 'down' || arrow === 'up',
            [`${prefixCls}-arrow-vertical-up`]: arrow === 'up'
        });
        const content = (<div onClick={this.onClick} class={wrapCls}>
        {this.renderThumb()}
        <div class={lineCls}>
          {this.renderLabel()}
          {this.renderControl()}
          {this.renderExtra()}
          {arrow && <div class={arrowCls} aria-hidden="true"/>}
          {this.actualError && this.errorDisplayType !== 'text' ? (<div class={`${prefixCls}-error-extra`} onClick={(e) => {
            if (this.actualErrorMessage) {
                if (this.actualErrorDisplayType === 'toast') {
                    toast.fail(this.actualErrorMessage);
                }
                if (this.actualErrorDisplayType === 'popover' && !this.showErrorPopover) {
                    this.showErrorPopover = true;
                }
            }
            this.$emit('error-click', e);
            this.$emit('errorClick', e);
        }}>
              {this.errorDisplayType === 'popover' ? <Popover v-model={[this.showErrorPopover, 'value']} mask={false}>
                  <Popover.Item slot="content">
                    {this.errorMessage}
                  </Popover.Item>
                </Popover> : null}
            </div>) : null}
          {this.$slots.suffix || this.suffix ? <div class={this.prefixCls + '-suffix'}>
            {((_b = (_a = this.$slots).suffix) === null || _b === void 0 ? void 0 : _b.call(_a)) || this.suffix}
          </div> : null}
        </div>
        <div style={coverRippleStyle} class={rippleCls}/>
      </div>);
        return (
        // @ts-ignore
        <TouchFeedback disabled={disabled || !this.onClick || !this.touchFeedback || (this.list && !this.list.touchFeedback)} activeStyle={activeStyle} activeClassName={`${prefixCls}-item-active`}>
        {content}
      </TouchFeedback>);
    }
});
export default Item;
//# sourceMappingURL=item.jsx.map