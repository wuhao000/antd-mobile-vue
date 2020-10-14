import {defineComponent, isVNode, PropType} from 'vue';
import Badge from '../../badge';
import IconRes from '../../mixins/icon-res';

const Tab = defineComponent({
  name: 'Tab',
  props: {
    dot: {
      type: Boolean as PropType<boolean>
    },
    badge: {
      type: [String, Number] as PropType<string | number>
    },
    selected: {
      type: Boolean as PropType<boolean>
    },
    selectedIcon: {},
    icon: {},
    title: {
      type: String as PropType<string>
    },
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-tab-item'
    },
    unselectedTintColor: {
      type: String as PropType<string>
    },
    tintColor: {
      type: String as PropType<string>
    },
    dataAttrs: {}
  },
  setup(props, {emit, slots}) {
    const renderIcon = () => {
      const {
        dot,
        badge,
        selected,
        selectedIcon,
        icon,
        title,
        prefixCls
      } = props;
      const realIcon = selected ? selectedIcon : icon;
      const iconDom = realIcon ? (
        isVNode(realIcon) ? realIcon : <IconRes
          class={`${prefixCls}-image`}
          type={realIcon}
        />
      ) : null;
      if (badge) {
        return (
          <Badge text={badge} class={`${prefixCls}-badge tab-badge`}>
            {' '}
            {iconDom}{' '}
          </Badge>
        );
      }
      if (dot) {
        return (
          <Badge dot class={`${prefixCls}-badge tab-dot`}>
            {iconDom}
          </Badge>
        );
      }
      return iconDom;
    };
    const onClick = () => {
      emit('click');
    };
    return {
      onClick, renderIcon
    };
  },
  render() {
    const {
      title,
      prefixCls,
      selected,
      unselectedTintColor,
      tintColor
    } = this;
    const iconColor = selected ? tintColor : unselectedTintColor;
    return (
      <div
        {...this.dataAttrs}
        onClick={this.onClick}
        class={`${prefixCls}`}>
        <div class={`${prefixCls}-icon`} style={{color: iconColor}}>
          {this.renderIcon()}
        </div>
        <p
          class={`${prefixCls}-title`}
          style={{color: selected ? tintColor : unselectedTintColor}}
        >
          {title}
        </p>
      </div>
    );
  }
});

export default Tab as any;
