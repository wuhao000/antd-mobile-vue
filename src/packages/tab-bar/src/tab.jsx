import { defineComponent, isVNode } from 'vue';
import Badge from '../../badge';
import IconRes from '../../mixins/icon-res';
const Tab = defineComponent({
    name: 'Tab',
    props: {
        dot: {
            type: Boolean
        },
        badge: {
            type: [String, Number]
        },
        selected: {
            type: Boolean
        },
        selectedIcon: {},
        icon: {},
        title: {
            type: String
        },
        prefixCls: {
            type: String,
            default: 'am-tab-item'
        },
        unselectedTintColor: {
            type: String
        },
        tintColor: {
            type: String
        },
        dataAttrs: {}
    },
    setup(props, { emit, slots }) {
        const renderIcon = () => {
            const { dot, badge, selected, selectedIcon, icon, title, prefixCls } = props;
            const realIcon = selected ? selectedIcon : icon;
            const iconDom = realIcon ? (isVNode(realIcon) ? realIcon : <IconRes class={`${prefixCls}-image`} type={realIcon}/>) : null;
            if (badge) {
                return (<Badge text={badge} class={`${prefixCls}-badge tab-badge`}>
            {' '}
            {iconDom}{' '}
          </Badge>);
            }
            if (dot) {
                return (<Badge dot class={`${prefixCls}-badge tab-dot`}>
            {iconDom}
          </Badge>);
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
        const { title, prefixCls, selected, unselectedTintColor, tintColor } = this;
        const iconColor = selected ? tintColor : unselectedTintColor;
        return (<div {...this.dataAttrs} onClick={this.onClick} class={`${prefixCls}`}>
        <div class={`${prefixCls}-icon`} style={{ color: iconColor }}>
          {this.renderIcon()}
        </div>
        <p class={`${prefixCls}-title`} style={{ color: selected ? tintColor : unselectedTintColor }}>
          {title}
        </p>
      </div>);
    }
});
export default Tab;
//# sourceMappingURL=tab.jsx.map