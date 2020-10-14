import { __rest } from "tslib";
import classNames from 'classnames';
import { computed, defineComponent, inject, isVNode } from 'vue';
import Icon from '../../icon';
function isString(str) {
    return typeof str === 'string';
}
const statusIcon = {
    finish: 'check-circle',
    error: 'cross-circle-o',
    wait: 'ellipsis'
};
export default defineComponent({
    name: 'Step',
    props: {
        prefixCls: {
            type: String,
            default: 'am-step'
        },
        wrapperStyle: {},
        itemWidth: {
            type: [Number, String]
        },
        status: {
            type: String
        },
        iconPrefix: {
            type: String,
            default: 'ant'
        },
        /**
         * 图标类型，仅支持的图标名称
         */
        icon: {
            type: String
        },
        adjustMarginRight: {
            type: [Number, String]
        },
        stepNumber: {
            type: Number
        },
        description: {
            type: String
        },
        title: {
            type: String
        },
        progressDot: {}
    },
    setup(props, { emit, slots }) {
        const steps = inject('steps');
        const iconSize = computed(() => {
            if (steps.size === 'small') {
                return 18;
            }
            else {
                return 22;
            }
        });
        const renderIconNode = () => {
            var _a;
            const { prefixCls, progressDot, stepNumber, status, title, description, icon, iconPrefix } = props;
            if (slots.icon) {
                return <span class={`${prefixCls}-icon`}>{(_a = slots.icon) === null || _a === void 0 ? void 0 : _a.call(slots)}</span>;
            }
            let iconNode;
            const iconClassName = classNames(`${prefixCls}-icon`, `${iconPrefix}icon`, {
                [`${iconPrefix}icon-${icon}`]: icon && isString(icon),
                [`${iconPrefix}icon-check`]: !icon && status === 'finish',
                [`${iconPrefix}icon-cross`]: !icon && status === 'error'
            });
            const iconStyle = {
                position: 'relative',
                left: '-1px'
            };
            const iconDot = <span class={`${prefixCls}-icon-dot`}/>;
            // `progressDot` enjoy the highest priority
            if (progressDot) {
                if (typeof progressDot === 'function') {
                    iconNode = (<span class={`${prefixCls}-icon`}>
                    {progressDot(iconDot, { index: stepNumber - 1, status, title, description })}
                  </span>);
                }
                else {
                    iconNode = <span class={`${prefixCls}-icon`}>{iconDot}</span>;
                }
            }
            else if (icon && isString(icon)) {
                iconNode = <span class={`${prefixCls}-icon`}>{<Icon style={iconStyle} size={iconSize.value} type={icon}/>}</span>;
            }
            else if (isVNode(icon)) {
                iconNode = <span class={iconClassName}>{icon}</span>;
            }
            else if (status === 'finish' || status === 'error') {
                iconNode = <span class={iconClassName}/>;
            }
            else {
                iconNode = <span class={`${prefixCls}-icon`}>{stepNumber}</span>;
            }
            return iconNode;
        };
        return {
            renderIconNode
        };
    },
    render() {
        var _a, _b, _c, _d, _e, _f;
        const _g = this, { prefixCls, itemWidth, status = 'wait', iconPrefix, icon, wrapperStyle, adjustMarginRight, stepNumber, description, title, progressDot } = _g, restProps = __rest(_g, ["prefixCls", "itemWidth", "status", "iconPrefix", "icon", "wrapperStyle", "adjustMarginRight", "stepNumber", "description", "title", "progressDot"]);
        const classString = classNames(`${prefixCls}-item`, `${prefixCls}-item-${status}`, { [`${prefixCls}-item-custom`]: icon });
        const stepItemStyle = {};
        if (itemWidth) {
            stepItemStyle.width = itemWidth;
        }
        if (adjustMarginRight) {
            stepItemStyle.marginRight = adjustMarginRight;
        }
        return (<div {...restProps} class={classString} style={stepItemStyle}>
        <div class={`${prefixCls}-item-tail`}/>
        <div class={`${prefixCls}-item-icon`}>
          {this.renderIconNode()}
        </div>
        <div class={`${prefixCls}-item-content`}>
          <div class={`${prefixCls}-item-title`}>
            {(_c = (_b = (_a = this.$slots) === null || _a === void 0 ? void 0 : _a.title) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : title}
          </div>
          {(description || this.$slots.description) && <div class={`${prefixCls}-item-description`}>{(_f = (_e = (_d = this.$slots) === null || _d === void 0 ? void 0 : _d.description) === null || _e === void 0 ? void 0 : _e.call(_d)) !== null && _f !== void 0 ? _f : description}</div>}
        </div>
      </div>);
    }
});
//# sourceMappingURL=step.jsx.map