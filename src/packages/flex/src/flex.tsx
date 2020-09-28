import classnames from 'classnames';
import {defineComponent, PropType} from 'vue';

export default defineComponent({
  Item: null,
  name: 'Flex',
  props: {
    alignContent: {
      type: String as PropType<'start' | 'end' | 'center' | 'between' | 'around' | 'stretch'>
    },
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-flexbox'
    },
    role: {
      type: String as PropType<string>
    },
    direction: {
      type: String as PropType<'row' | 'row-reverse' | 'column' | 'column-reverse'>
    },
    wrap: {
      type: String as PropType<'nowrap' | 'wrap' | 'wrap-reverse'>
    },
    justify: {
      type: String as PropType<'start' | 'end' | 'center' | 'between' | 'around'>
    },
    align: {
      type: String as PropType<'start' | 'center' | 'end' | 'baseline' | 'stretch'>,
      default: 'center'
    },
    disabled: {
      type: Boolean as PropType<boolean>
    }
  },
  render() {
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
        {this.$slots.default?.()}
      </div>
    );
  }
});
