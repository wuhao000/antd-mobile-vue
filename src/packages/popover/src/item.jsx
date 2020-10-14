import { __rest } from "tslib";
import classnames from 'classnames';
import { defineComponent } from 'vue';
import TouchFeedback from '../../vmc-feedback';
const Item = defineComponent({
    name: 'PopoverItem',
    props: {
        prefixCls: {
            type: String,
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
            type: Boolean
        },
        firstItem: {
            type: String
        },
        activeStyle: {}
    },
    setup(props) {
        return {};
    },
    render() {
        const _a = this, { prefixCls, icon, disabled, firstItem, activeStyle } = _a, restProps = __rest(_a, ["prefixCls", "icon", "disabled", "firstItem", "activeStyle"]);
        const cls = classnames(`${prefixCls}-item`, {
            [`${prefixCls}-item-disabled`]: disabled
        });
        let activeClass = `${prefixCls}-item-active`;
        if (firstItem) {
            activeClass += `${prefixCls}-item-fix-active-arrow`;
        }
        return (<TouchFeedback disabled={disabled} activeClassName={activeClass} activeStyle={activeStyle}>
        <div class={cls} {...restProps} onClick={(e) => {
            if (!this.disabled) {
                this.$emit('click', e);
            }
        }}>
          <div class={`${prefixCls}-item-container`}>
            {icon ? (
        // tslint:disable-next-line:jsx-no-multiline-js
        <span class={`${prefixCls}-item-icon`} aria-hidden="true">
                  {icon}
                </span>) : null}
            <span class={`${prefixCls}-item-content`}>{this.$slots.default}</span>
          </div>
        </div>
      </TouchFeedback>);
    }
});
export default Item;
//# sourceMappingURL=item.jsx.map