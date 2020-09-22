import {Options, Vue} from 'vue-class-component';
import classnames from 'classnames';

@Options({
  name: 'Badge',
  props: {
    prefixCls: {default: 'am-badge'},
    hot: {type: Boolean, default: false},
    size: {type: String, default: 'small'},
    overflowCount: {type: Number, default: 99},
    corner: {type: Boolean, default: false},
    dot: {type: Boolean, default: false},
    text: {type: [String, Number]},
    textStyle: {type: Object}
  }
})

class Badge extends Vue {
  /**
   * class前缀
   */
  public prefixCls?: string;
  /**
   * 营销样式
   */
  public hot?: boolean;
  /**
   * 大小
   */
  public size?: 'large' | 'small';
  /**
   * 展示封顶的数字值
   */
  public overflowCount?: number;
  public corner?: boolean;
  /**
   * 不展示数字，只有一个小红点
   */
  public dot?: boolean;
  /**
   * 展示的数字或文案，当为数字时候，大于 overflowCount <br/> 时显示为 ${overflowCount}+，为 0 时隐藏
   */
  public text?: string | number;
  /**
   * 文本样式
   */
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

export default Badge;
