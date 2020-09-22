import RcCollapse from 'ant-design-vue/lib/vc-collapse';
import {Options, Vue} from 'vue-class-component';

@Options({
  name: 'Accordion',
  props: {
    prefixCls: {default: 'am-accordion'},
    openAnimation: {},
    accordion: {type: Boolean, default: false},
    activeKey: {type: [String, Array]}
  }
})
class Accordion extends Vue {
  public prefixCls?: string;
  /**
   * 设置自定义切换动画，禁止动画可设为`{}`
   */
  public openAnimation?: any;
  /**
   * `手风琴`模式
   */
  public accordion?: boolean;
  /**
   * 当前激活 tab 面板的 key,
   * 无默认值，accordion模式下默认第一个元素
   */
  public activeKey?: string | string[];
  public static Panel = RcCollapse.Panel;
  public static install: (Vue) => void;

  public render(): any {
    return this.$slots.default ? <RcCollapse
      {...this.$props}
      onChange={(...args) => {
        this.$emit('change', ...args);
      }}
    >{this.$slots.default()}</RcCollapse> : null;
  }
}

export default Accordion;
