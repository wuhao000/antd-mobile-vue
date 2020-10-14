import { __decorate } from "tslib";
import { Options, Vue } from 'vue-class-component';
import classnames from 'classnames';
let ActivityIndicator = class ActivityIndicator extends Vue {
    render() {
        const { prefixCls, className, animating, toast, size, text } = this;
        const wrapClass = classnames(prefixCls, className, {
            [`${prefixCls}-lg`]: size === 'large',
            [`${prefixCls}-sm`]: size === 'small',
            [`${prefixCls}-toast`]: toast
        });
        const spinnerClass = classnames(`${prefixCls}-spinner`, {
            [`${prefixCls}-spinner-lg`]: toast || size === 'large'
        });
        if (animating) {
            if (toast) {
                return (<div class={wrapClass}>
            {text ? (<div class={`${prefixCls}-content`}>
                <span class={spinnerClass} aria-hidden="true"/>
                <span class={`${prefixCls}-toast`}>{text}</span>
              </div>) : (<div class={`${prefixCls}-content`}>
                <span class={spinnerClass} aria-label="Loading"/>
              </div>)}
          </div>);
            }
            else {
                return text ? (<div class={wrapClass}>
            <span class={spinnerClass} aria-hidden="true"/>
            <span class={`${prefixCls}-tip`}>{text}</span>
          </div>) : (<div class={wrapClass}>
            <span class={spinnerClass} aria-label="loading"/>
          </div>);
            }
        }
        else {
            return null;
        }
    }
};
ActivityIndicator = __decorate([
    Options({
        name: 'ActivityIndicator',
        props: {
            prefixCls: {
                type: String,
                default: 'am-activity-indicator'
            },
            className: { type: String },
            animating: {
                type: Boolean,
                default: true
            },
            toast: {
                type: Boolean,
                default: false
            },
            size: { default: 'small' },
            text: { type: String }
        }
    })
], ActivityIndicator);
export default ActivityIndicator;
//# sourceMappingURL=index.jsx.map