import classnames from 'classnames';
import {defineComponent, PropType} from 'vue';
import TouchFeedback from '../../vmc-feedback';

const Item = defineComponent({
  name: 'PopoverItem',
  props: {
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-popover'
    },
    /**
     * 图标
     */
    icon: {},
    /**
     * 是否禁用
     */
    disabled: {
      type: Boolean as PropType<boolean>
    },
    firstItem: {
      type: String as PropType<string>
    },
    activeStyle: {}
  },
  setup(props) {


    return {};
  },
  render() {
    const {
      prefixCls,
      icon,
      disabled,
      firstItem,
      activeStyle,
      ...restProps
    } = this;
    const cls = classnames(`${prefixCls}-item`, {
      [`${prefixCls}-item-disabled`]: disabled
    });

    let activeClass = `${prefixCls}-item-active`;
    if (firstItem) {
      activeClass += `${prefixCls}-item-fix-active-arrow`;
    }
    return (
      <TouchFeedback
        disabled={disabled}
        activeClassName={activeClass}
        activeStyle={activeStyle}
      >
        <div class={cls} {...restProps}
             onClick={(e) => {
               if (!this.disabled) {
                 this.$emit('click', e);
               }
             }}>
          <div class={`${prefixCls}-item-container`}>
            {icon ? (
              // tslint:disable-next-line:jsx-no-multiline-js
              <span class={`${prefixCls}-item-icon`} aria-hidden="true">
                  {icon}
                </span>
            ) : null}
            <span class={`${prefixCls}-item-content`}>{this.$slots.default}</span>
          </div>
        </div>
      </TouchFeedback>
    );
  }
});

export default Item;
