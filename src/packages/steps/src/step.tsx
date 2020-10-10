import classNames from 'classnames';
import {computed, defineComponent, inject, PropType} from 'vue';
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
      type: String as PropType<string>,
      default: 'am-step'
    },
    wrapperStyle: {},
    itemWidth: {
      type: [Number, String] as PropType<number | string>
    },
    status: {
      type: String as PropType<'wait' | 'process' | 'finish' | 'error'>
    },
    iconPrefix: {
      type: String as PropType<string>,
      default: 'ant'
    },
    /**
     * 图标类型，仅支持的图标名称
     */
    icon: {
      type: String as PropType<string>
    },
    adjustMarginRight: {
      type: [Number, String] as PropType<number | string>
    },
    stepNumber: {
      type: Number as PropType<number>
    },
    description: {
      type: String as PropType<string>
    },
    title: {
      type: String as PropType<string>
    },
    progressDot: {}
  },
  setup(props, {emit, slots}) {
    const steps: any = inject('steps');

    const iconSize = computed(() => {
      if (steps.size === 'small') {
        return 18;
      } else {
        return 22;
      }
    });
    const renderIconNode = () => {
      const {
        prefixCls, progressDot, stepNumber, status, title, description, icon,
        iconPrefix
      } = props;
      if (slots.icon) {
        return <span class={`${prefixCls}-icon`}>{slots.icon?.()}</span>;
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
          iconNode = (
            <span class={`${prefixCls}-icon`}>
                    {progressDot(iconDot, {index: stepNumber! - 1, status, title, description})}
                  </span>
          );
        } else {
          iconNode = <span class={`${prefixCls}-icon`}>{iconDot}</span>;
        }
      } else if (icon && isString(icon)) {
        iconNode = <span class={`${prefixCls}-icon`}>{
          <Icon style={iconStyle}
                size={iconSize.value}
                type={icon}/>
        }</span>;
      } else if (icon || status === 'finish' || status === 'error') {
        iconNode = <span class={iconClassName}/>;
      } else {
        iconNode = <span class={`${prefixCls}-icon`}>{stepNumber}</span>;
      }
      return iconNode;
    };
    return {
      renderIconNode
    };
  },
  render() {
    const {
      prefixCls, itemWidth,
      status = 'wait', iconPrefix, icon, wrapperStyle,
      adjustMarginRight, stepNumber,
      description, title, progressDot, ...restProps
    } = this;

    const classString = classNames(
      `${prefixCls}-item`,
      `${prefixCls}-item-${status}`,
      {[`${prefixCls}-item-custom`]: icon}
    );
    const stepItemStyle: any = {};
    if (itemWidth) {
      stepItemStyle.width = itemWidth;
    }
    if (adjustMarginRight) {
      stepItemStyle.marginRight = adjustMarginRight;
    }
    return (
      <div
        {...restProps}
        class={classString}
        style={stepItemStyle}
      >
        <div class={`${prefixCls}-item-tail`}/>
        <div class={`${prefixCls}-item-icon`}>
          {this.renderIconNode()}
        </div>
        <div class={`${prefixCls}-item-content`}>
          <div class={`${prefixCls}-item-title`}>
            {
              this.$slots?.title() ?? title
            }
          </div>
          {(description || this.$slots.description) && <div class={`${prefixCls}-item-description`}>{
            this.$slots?.description() ?? description
          }</div>}
        </div>
      </div>
    );
  }
});
