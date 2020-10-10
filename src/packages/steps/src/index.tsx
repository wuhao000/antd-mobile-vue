import classNames from 'classnames';
import {defineComponent, getCurrentInstance, PropType, provide, VNode} from 'vue';

export default defineComponent({
  name: 'Step',
  props: {
    icon: {
      type: String as PropType<string>
    },
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-steps'
    },
    iconPrefix: {
      type: String as PropType<string>,
      default: 'ant'
    },
    direction: {
      type: String as PropType<string>,
      default: 'vertical'
    },
    labelPlacement: {
      type: String as PropType<string>,
      default: 'vertical'
    },
    status: {
      type: String as PropType<'wait' | 'process' | 'finish' | 'error'>,
      default: 'process'
    },
    size: {
      type: String as PropType<string>,
      default: ''
    },
    progressDot: {
      type: Boolean as PropType<boolean | any>,
      default: false
    },
    current: {
      type: Number as PropType<number>,
      default: 0
    }
  },
  setup(props, {emit, slots}) {
    const instance = getCurrentInstance();
    provide('steps', instance);
    return {};
  },
  render() {
    const {
      prefixCls, direction,
      labelPlacement, iconPrefix, status, size, current, progressDot,
      ...restProps
    } = this;
    const adjustedlabelPlacement = !!progressDot ? 'vertical' : labelPlacement;
    const classString = classNames(prefixCls, `${prefixCls}-${direction}`, {
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-label-${adjustedlabelPlacement}`]: direction === 'horizontal',
      [`${prefixCls}-dot`]: !!progressDot
    });

    return (
      <div class={classString} {...restProps}>
        {
          this.$slots.default().map((child: VNode, index) => {
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
            let icon = this.icon;
            if (!icon) {
              if (index < current) {
                // 对应 state: finish
                icon = 'check-circle-o';
              } else if (index > current) {
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
            if (status === 'error' && index === current! - 1) {
              childProps.class = `${prefixCls}-next-error`;
            }
            if (!child.props.status) {
              if (index === current) {
                childProps.status = status;
              } else if (index < current!) {
                childProps.status = 'finish';
              } else {
                childProps.status = 'wait';
              }
            }
            Object.keys(childProps).forEach(key => {
              child.props[key] = childProps[key];
            });
            return child;
          })
        }
      </div>
    );
  }
});
