/* tslint:disable:jsx-no-multiline-js */
import classnames from 'classnames';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop, Provide} from 'vue-property-decorator';
import Item from './list-item';

@Component({
  name: 'MList'
})
export default class List extends Vue {
  /**
   * 是否分区样式
   */
  @Prop({type: Boolean, default: false})
  public section: boolean;
  @Prop({default: 'am-list'})
  public prefixCls?: string;
  @Prop({type: String})
  public role?: string;
  @Prop({type: String})
  public title: string;
  @Prop({type: Number, default: 8})
  public spaceBetweenSection: number;
  public static Item = Item;
  @Prop({type: Boolean, default: true})
  public touchFeedback: boolean;
  @Provide('list')
  public list = this;
  public static install: (Vue) => void;

  public render() {
    const {prefixCls} = this;
    const wrapCls = classnames(prefixCls, {
      [prefixCls + '-section']: this.section
    });
    const children = [];
    if (this.$slots.default) {
      this.$slots.default.forEach((it: VNode, index) => {
        if (index < this.$slots.default.length - 1) {
          if (this.section && it.data) {
            if (it.data.staticStyle) {
              it.data.staticStyle.marginBottom = this.spaceBetweenSection + 'px';
            } else {
              it.data.staticStyle = {marginBottom: this.spaceBetweenSection + 'px'};
            }
          }
        }
        children.push(it);
      });
    }
    return (
      <div class={wrapCls}>
        {this.$slots.title ? this.$slots.title : (
          this.title ? <div class={`${prefixCls}-header`}>
            {this.title}
          </div> : null
        )}
        {children.length ? (
          <div class={`${prefixCls}-body`}>{children}</div>
        ) : null}
        {this.$slots.footer ? this.$slots.footer : null}
      </div>
    );
  }
}
