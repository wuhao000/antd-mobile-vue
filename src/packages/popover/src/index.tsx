import {Popover} from 'ant-design-vue';
import classNames from 'classnames';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import {cloneElement} from '../../utils/vnode';


function recursiveCloneChildren(
  children: VNode[],
  cb = (ch: VNode, _: number) => ch
): VNode[] {
  return children.map((child, index) => {
    const newChild = cb(child, index);
    if (
      typeof newChild !== 'string' &&
      typeof newChild !== 'number' &&
      newChild &&
      newChild.children
    ) {
      return cloneElement(
        newChild,
        {},
        recursiveCloneChildren(newChild.children, cb)
      );
    }
    return newChild;
  });
}

@Component({
  name: 'MPopover'
})
class MPopover extends Vue {

  /**
   * 是否显示气泡（v-model）
   */
  @Prop({type: Boolean, default: false})
  public value: boolean;
  @Prop({type: String, default: 'am-popover'})
  public prefixCls: string;
  /**
   * 是否显示遮罩
   */
  @Prop({type: Boolean, default: true})
  public mask: boolean;
  /**
   * 是否允许点击遮罩层关闭
   */
  @Prop({type: Boolean, default: true})
  public maskClosable: boolean;
  // @ts-ignore
  public currentValue = this.value;
  public static Item: any;
  public static install: (Vue) => void;

  @Watch('value')
  public valueChanged(value: boolean) {
    this.currentValue = value;
  }

  @Watch('currentValue')
  public currentValueChanged(currentValue: boolean) {
    this.$emit('input', currentValue);
    this.$emit('change', currentValue);
  }

  public render() {
    const maskClass = classNames(this.prefixCls + '-mask', {
      [this.prefixCls + '-mask-hidden']: !this.currentValue
    });
    // @ts-ignore
    return <Popover attrs={this.$attrs}
                    prefixCls={this.prefixCls}
                    vModel={this.currentValue}
                    trigger="click"
                    on={this.$listeners}
                    scopedSlots={this.$scopedSlots}
                    slots={this.$slots}>
      {this.$slots.default}
      {this.mask ? <div onClick={(e) => {
        if (!this.maskClosable) {
          e.stopPropagation();
          e.preventDefault();
        }
      }} class={maskClass}/> : null}
    </Popover>;
  }
}
export default MPopover as any;
