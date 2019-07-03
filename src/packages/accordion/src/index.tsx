import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import RcCollapse from '../../../ant/vc-collapse';

@Component({
  name: 'Accordion'
})
export default class Accordion extends Vue {
  @Prop({default: 'am-accordion'})
  public prefixCls?: string;
  /**
   * 设置自定义切换动画，禁止动画可设为`{}`
   */
  @Prop({})
  public openAnimation?: any;
  /**
   * `手风琴`模式
   */
  @Prop({type: Boolean, default: false})
  public accordion?: boolean;
  /**
   * 当前激活 tab 面板的 key,
   * 无默认值，accordion模式下默认第一个元素
   */
  @Prop({type: [String, Array]})
  public activeKey?: string | string[];
  public static Panel = RcCollapse.Panel;
  public static install: (Vue) => void;

  public render() {
    return this.$slots.default ? <RcCollapse
      attrs={
        {...this.$props}
      }
      onChange={(...args) => {
        this.$emit('change', ...args);
      }}
    >{this.$slots.default}</RcCollapse> : null;
  }
}
