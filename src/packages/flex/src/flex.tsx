import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'Flex'
})
export default class Flex extends Vue {
  @Prop(String)
  public alignContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'stretch';
  @Prop({type: String, default: 'am-flexbox'})
  public prefixCls?: string;
  @Prop(String)
  public role?: string;
  @Prop(String)
  public direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  @Prop(String)
  public wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  @Prop(String)
  public justify?: 'start' | 'end' | 'center' | 'between' | 'around';
  @Prop({type: String, default: 'center'})
  public align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  @Prop(Boolean)
  public disabled?: boolean;
  public static Item: any;

  public render() {
    const {
      direction,
      wrap,
      justify,
      align,
      alignContent,
      prefixCls,
      ...restProps
    } = this;
    const wrapCls = classnames(prefixCls, {
      [`${prefixCls}-dir-row`]: direction === 'row',
      [`${prefixCls}-dir-row-reverse`]: direction === 'row-reverse',
      [`${prefixCls}-dir-column`]: direction === 'column',
      [`${prefixCls}-dir-column-reverse`]: direction === 'column-reverse',

      [`${prefixCls}-nowrap`]: wrap === 'nowrap',
      [`${prefixCls}-wrap`]: wrap === 'wrap',
      [`${prefixCls}-wrap-reverse`]: wrap === 'wrap-reverse',

      [`${prefixCls}-justify-start`]: justify === 'start',
      [`${prefixCls}-justify-end`]: justify === 'end',
      [`${prefixCls}-justify-center`]: justify === 'center',
      [`${prefixCls}-justify-between`]: justify === 'between',
      [`${prefixCls}-justify-around`]: justify === 'around',

      [`${prefixCls}-align-start`]: align === 'start',
      [`${prefixCls}-align-center`]: align === 'center',
      [`${prefixCls}-align-end`]: align === 'end',
      [`${prefixCls}-align-baseline`]: align === 'baseline',
      [`${prefixCls}-align-stretch`]: align === 'stretch',

      [`${prefixCls}-align-content-start`]: alignContent === 'start',
      [`${prefixCls}-align-content-end`]: alignContent === 'end',
      [`${prefixCls}-align-content-center`]: alignContent === 'center',
      [`${prefixCls}-align-content-between`]: alignContent === 'between',
      [`${prefixCls}-align-content-around`]: alignContent === 'around',
      [`${prefixCls}-align-content-stretch`]: alignContent === 'stretch'
    });

    return (
        <div class={wrapCls} {...{props: restProps}}>
          {this.$slots.default}
        </div>
    );
  }
}
