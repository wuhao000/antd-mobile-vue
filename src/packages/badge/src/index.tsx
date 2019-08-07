import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'Badge'
})
export default class Badge extends Vue {
  /**
   * class前缀
   */
  @Prop({default: 'am-badge'})
  public prefixCls?: string;
  /**
   * 营销样式
   */
  @Prop({type: Boolean, default: false})
  public hot?: boolean;
  /**
   * 大小
   */
  @Prop({type: String, default: 'small'})
  public size?: 'large' | 'small';
  /**
   * 展示封顶的数字值
   */
  @Prop({type: Number, default: 99})
  public overflowCount?: number;
  @Prop({type: Boolean, default: false})
  public corner?: boolean;
  /**
   * 不展示数字，只有一个小红点
   */
  @Prop({type: Boolean, default: false})
  public dot?: boolean;
  /**
   * 展示的数字或文案，当为数字时候，大于 overflowCount <br/> 时显示为 ${overflowCount}+，为 0 时隐藏
   */
  @Prop({type: [String, Number]})
  public text?: string | number;
  /**
   * 文本样式
   */
  @Prop({type: Object})
  public textStyle: object;

  public render() {
    let {
      overflowCount,
      text
    } = this;
    const {
      prefixCls,
      size,
      dot,
      corner,
      hot
    } = this;
    overflowCount = overflowCount as number;
    text =
      typeof text === 'number' && text > overflowCount
        ? `${overflowCount}+`
        : text;
    // dot mode don't need text
    if (dot) {
      text = '';
    }

    const scrollNumberCls = classnames({
      [`${prefixCls}-dot`]: dot,
      [`${prefixCls}-dot-large`]: dot && size === 'large',
      [`${prefixCls}-text`]: !dot && !corner,
      [`${prefixCls}-corner`]: corner,
      [`${prefixCls}-corner-large`]: corner && size === 'large'
    });

    const badgeCls = classnames(prefixCls, {
      [`${prefixCls}-not-a-wrapper`]: !this.$slots.default,
      [`${prefixCls}-corner-wrapper`]: corner,
      [`${prefixCls}-hot`]: hot,
      [`${prefixCls}-corner-wrapper-large`]: corner && size === 'large'
    });

    return (
      <span class={badgeCls}>
          {this.$slots.default}
        {(text || dot) && (
          // tslint:disable-next-line:jsx-no-multiline-js
          <sup class={scrollNumberCls}
               style={this.textStyle}>
            {text}
          </sup>
        )}
        </span>
    );
  }
}
