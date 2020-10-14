import { defineComponent } from 'vue';
import RmcDrawer from '../../vmc-drawer';
const Drawer = defineComponent({
    install: null,
    name: 'Drawer',
    props: {
        /**
         * 抽屉内容容器样式
         */
        sidebarStyle: {
            type: Object
        },
        contentStyle: {
            type: Object
        },
        overlayStyle: {
            type: Object
        },
        dragHandleStyle: {
            type: Object
        },
        docked: {
            type: Boolean
        },
        transitions: {
            type: Boolean
        },
        touch: {
            type: Boolean,
            default: true
        },
        dragToggleDistance: {
            type: Number
        },
        prefixCls: {
            type: String,
            default: 'am-drawer'
        },
        sidebar: {},
        value: {
            type: Boolean
        },
        position: {
            type: String,
            default: 'left'
        }
    },
    render() {
        var _a, _b, _c, _d, _e;
        // @ts-ignore
        return <RmcDrawer {...Object.assign(Object.assign(Object.assign({}, this.$props), this.$attrs), { sidebar: (_c = (_b = (_a = this.$slots).sidebar) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : this.sidebar })} open={this.value} {...{
            onOpen: (value) => {
                this.$emit('update:value', value);
                this.$emit('open', value);
            }
        }}>
      {(_e = (_d = this.$slots).default) === null || _e === void 0 ? void 0 : _e.call(_d)}
    </RmcDrawer>;
    }
});
export default Drawer;
//# sourceMappingURL=index.jsx.map