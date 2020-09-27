import {defineComponent, PropType} from 'vue';
import RmcDrawer from '../../vmc-drawer';

const Drawer = defineComponent({
  install: null,
  name: 'Drawer',
  props: {
    /**
     * 抽屉内容容器样式
     */
    sidebarStyle: {
      type: Object as PropType<any>
    },
    contentStyle: {
      type: Object as PropType<any>
    },
    overlayStyle: {
      type: Object as PropType<any>
    },
    dragHandleStyle: {
      type: Object as PropType<any>
    },
    docked: {
      type: Boolean as PropType<boolean>
    },
    transitions: {
      type: Boolean as PropType<boolean>
    },
    touch: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    dragToggleDistance: {
      type: Number as PropType<number>
    },
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-drawer'
    },
    sidebar: {},
    value: {
      type: Boolean as PropType<boolean>
    },
    position: {
      type: String as PropType<'left' | 'right' | 'top' | 'bottom'>,
      default: 'left'
    }
  },
  render() {
    // @ts-ignore
    return <RmcDrawer
      {
        ...{
          ...this.$props,
          ...this.$attrs,
          sidebar: this.$slots.sidebar?.() ?? this.sidebar
        }
      }
      open={this.value}
      {...{
        onOpen: (value) => {
          this.$emit('update:value', value);
          this.$emit('open', value);
        }
      }}>
      {this.$slots.default?.()}
    </RmcDrawer>;
  }
});

export default Drawer;
