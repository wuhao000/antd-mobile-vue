import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import RmcDrawer from '../../vmc-drawer';

@Component({
  name: 'Drawer'
})
export default class Drawer extends Vue {
  /**
   * 抽屉内容容器样式
   */
  @Prop({type: Object})
  public sidebarStyle?: any;
  @Prop({type: Object})
  public contentStyle?: any;
  @Prop({type: Object})
  public overlayStyle?: any;
  @Prop({type: Object})
  public dragHandleStyle?: any;
  @Prop({type: Boolean})
  public docked?: boolean;
  @Prop({type: Boolean})
  public transitions?: boolean;
  @Prop({type: Boolean, default: true})
  public touch?: boolean;
  @Prop({type: Number})
  public dragToggleDistance?: number;
  @Prop({
    type: String,
    default: 'am-drawer'
  })
  public prefixCls?: string;
  @Prop({})
  public sidebar?: VNode;
  @Prop({type: Boolean})
  public value?: boolean;
  @Prop({type: String, default: 'left'})
  public position?: 'left' | 'right' | 'top' | 'bottom';
  public static install: (Vue) => void;

  public render() {
    // @ts-ignore
    return <RmcDrawer
      attrs={
        {
          ...this.$props,
          ...this.$attrs,
          sidebar: this.$slots.sidebar || this.sidebar
        }
      }
      open={this.value}
      on={{
        ...this.$listeners,
        open: (value) => {
          this.$emit('input', value);
          this.$emit('open', value);
        }
      }}>
      {this.$slots.default}
    </RmcDrawer>;
  }
}
