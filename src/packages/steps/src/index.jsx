import { __rest } from "tslib";
import classNames from 'classnames';
import { defineComponent, getCurrentInstance, provide } from 'vue';
import { filterHTMLAttrs } from '../../utils/dom';
import { unwrapFragment } from '../../utils/vue';
export default defineComponent({
    name: 'Step',
    props: {
        icon: {
            type: String
        },
        prefixCls: {
            type: String,
            default: 'am-steps'
        },
        iconPrefix: {
            type: String,
            default: 'ant'
        },
        direction: {
            type: String,
            default: 'vertical'
        },
        labelPlacement: {
            type: String,
            default: 'vertical'
        },
        status: {
            type: String,
            default: 'process'
        },
        size: {
            type: String,
            default: ''
        },
        progressDot: {
            type: Boolean,
            default: false
        },
        current: {
            type: Number,
            default: 0
        }
    },
    setup() {
        const instance = getCurrentInstance();
        provide('steps', instance);
        return {};
    },
    render() {
        const _a = this, { prefixCls, direction, labelPlacement, iconPrefix, status, size, current, progressDot } = _a, restProps = __rest(_a, ["prefixCls", "direction", "labelPlacement", "iconPrefix", "status", "size", "current", "progressDot"]);
        const adjustedlabelPlacement = !!progressDot ? 'vertical' : labelPlacement;
        const classString = classNames(prefixCls, `${prefixCls}-${direction}`, {
            [`${prefixCls}-${size}`]: size,
            [`${prefixCls}-label-${adjustedlabelPlacement}`]: direction === 'horizontal',
            [`${prefixCls}-dot`]: !!progressDot
        });
        const content = unwrapFragment(this.$slots.default()).map((child, index) => {
            if (!child) {
                return null;
            }
            const childProps = {
                stepNumber: index + 1,
                prefixCls,
                iconPrefix,
                icon: child.props.icon || '',
                wrapperStyle: {},
                progressDot,
                status: child.props.status || '',
                class: ''
            };
            let icon = childProps.icon;
            if (!icon) {
                if (index < current) {
                    // 对应 state: finish
                    icon = 'check-circle-o';
                }
                else if (index > current) {
                    // 对应 state: wait
                    icon = 'ellipsis';
                    childProps.class = 'ellipsis-item';
                }
                if ((status === 'error' && index === current)
                    || child.props.status === 'error') {
                    icon = 'cross-circle-o';
                }
            }
            if (icon) {
                childProps.icon = icon;
            }
            // fix tail color
            if (status === 'error' && index === current - 1) {
                childProps.class = `${prefixCls}-next-error`;
            }
            if (!child.props.status) {
                if (index === current) {
                    childProps.status = status;
                }
                else if (index < current) {
                    childProps.status = 'finish';
                }
                else {
                    childProps.status = 'wait';
                }
            }
            Object.keys(childProps).forEach(key => {
                child.props[key] = childProps[key];
            });
            return child;
        });
        return (<div class={classString} {...filterHTMLAttrs(restProps)}>
        {content}
      </div>);
    }
});
//# sourceMappingURL=index.jsx.map