import classnames from 'classnames';
import {defineComponent, PropType, VNode} from 'vue';
import Icon from '../../icon';

const NavBar = defineComponent({
  install: null,
  name: 'NavBar',
  props: {
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-navbar'
    },
    className: {
      type: String as PropType<string>
    },
    mode: {
      default: 'dark'
    },
    icon: {
      type: [String, Object] as PropType<string | VNode>
    },
    leftContent: {
      type: [String, Object] as PropType<string | VNode>
    },
    rightContent: {
      type: [String, Object] as PropType<string | VNode>
    }
  },
  render() {
    const {
      prefixCls,
      className,
      mode,
      icon
    } = this;
    const rightContent = this.$slots.rightContent?.() ?? this.$slots['right-content']?.() ?? this.rightContent;
    const leftContent = this.$slots.leftContent?.() ?? this.$slots['left-content']?.() ?? this.leftContent;
    return (
      <div
        class={classnames(className, prefixCls, `${prefixCls}-${mode}`)}
      >
        <div
          class={`${prefixCls}-left`}
          role="button"
          onClick={(e) => {
            this.$emit('left-click', e);
            this.$emit('leftClick', e);
          }}
        >
          {icon ? (
            <span class={`${prefixCls}-left-icon`} aria-hidden="true">
                  {typeof icon === 'string' ? <Icon type={icon}/> : icon}
                </span>
          ) : this.$slots.icon?.()}
          {leftContent}
        </div>
        <div class={`${prefixCls}-title`}>{this.$slots.default()}</div>
        <div class={`${prefixCls}-right`}>{rightContent}</div>
      </div>
    );
  }
});

export default NavBar;
