import classnames from 'classnames';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import TouchFeedback from '../../vmc-feedback';

@Component({
  name: 'PopoverItem'
})
export default class Item extends Vue {
  static defaultProps = {
    prefixCls: 'am-popover',
    disabled: false
  };
  static myName = 'PopoverItem';
  @Prop({type: String, default: 'm-tooltip'})
  public prefixCls?: string;
  @Prop()
  public icon?: VNode | string;
  @Prop({type: Boolean})
  public disabled?: boolean;
  @Prop({type: String})
  public firstItem?: string;
  @Prop()
  public activeStyle?: object;

  render() {
    const {
      children,
      className,
      prefixCls,
      icon,
      disabled,
      firstItem,
      activeStyle,
      ...restProps
    } = this.$props;
    const cls = classnames(`${prefixCls}-item`, className, {
      [`${prefixCls}-item-disabled`]: disabled
    });

    let activeClass = `${prefixCls}-item-active `;
    if (firstItem) {
      activeClass += `${prefixCls}-item-fix-active-arrow`;
    }

    return (
        <TouchFeedback
            disabled={disabled}
            activeClassName={activeClass}
            activeStyle={activeStyle}
        >
          <div className={cls} {...restProps}>
            <div className={`${prefixCls}-item-container`}>
              {icon ? (
                  // tslint:disable-next-line:jsx-no-multiline-js
                  <span className={`${prefixCls}-item-icon`} aria-hidden="true">
                    {icon}
                  </span>
              ) : null}
              <span className={`${prefixCls}-item-content`}>{children}</span>
            </div>
          </div>
        </TouchFeedback>
    );
  }
}
