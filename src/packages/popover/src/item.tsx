import classnames from 'classnames';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import TouchFeedback from '../../vmc-feedback';

@Component({
  name: 'PopoverItem'
})
export default class Item extends Vue {
  @Prop({type: String, default: 'am-popover'})
  public prefixCls?: string;
  /**
   * 图标
   */
  @Prop()
  public icon?: VNode | string;
  /**
   * 是否禁用
   */
  @Prop({type: Boolean})
  public disabled?: boolean;
  @Prop({type: String})
  public firstItem?: string;
  @Prop()
  public activeStyle?: object;

  public render() {
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
}
