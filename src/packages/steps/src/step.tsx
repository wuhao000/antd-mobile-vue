import classNames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject, Prop} from 'vue-property-decorator';
import Icon from '../../icon';

function isString(str) {
  return typeof str === 'string';
}

const statusIcon = {
  finish: 'check-circle',
  error: 'cross-circle-o',
  wait: 'ellipsis'
};
@Component({
  name: 'Step'
})
export default class Step extends Vue {
  @Prop({type: String, default: 'am-step'})
  public prefixCls?: string;
  @Prop()
  public wrapperStyle?: any;
  @Prop([Number, String])
  public itemWidth?: number | string;
  @Prop(String)
  public status?: 'wait' | 'process' | 'finish' | 'error';
  @Prop({type: String, default: 'ant'})
  public iconPrefix?: string;
  /**
   * 图标类型，仅支持的图标名称
   */
  @Prop(String)
  public icon?: string;
  @Prop([Number, String])
  public adjustMarginRight?: number | string;
  @Prop(Number)
  public stepNumber?: number;
  @Prop(String)
  public description?: string;
  @Prop(String)
  public title?: string;
  @Prop()
  public progressDot?: boolean | any;
  @Inject('steps')
  public steps: any;

  get iconSize() {
    if (this.steps.size === 'small') {
      return 18;
    } else {
      return 22;
    }
  }

  public renderIconNode() {
    const {
      prefixCls, progressDot, stepNumber, status, title, description, icon,
      iconPrefix
    } = this;
    if (this.$slots.icon) {
      return <span class={`${prefixCls}-icon`}>{this.$slots.icon}</span>;
    }
    let iconNode;
    const iconClassName = classNames(`${prefixCls}-icon`, `${iconPrefix}icon`, {
      [`${iconPrefix}icon-${icon}`]: icon && isString(icon),
      [`${iconPrefix}icon-check`]: !icon && status === 'finish',
      [`${iconPrefix}icon-cross`]: !icon && status === 'error'
    });
    const iconStyle = {
      position: 'relative',
      left: '-1px'
    };
    const iconDot = <span class={`${prefixCls}-icon-dot`}/>;
    // `progressDot` enjoy the highest priority
    if (progressDot) {
      if (typeof progressDot === 'function') {
        iconNode = (
          <span class={`${prefixCls}-icon`}>
              {progressDot(iconDot, {index: stepNumber! - 1, status, title, description})}
            </span>
        );
      } else {
        iconNode = <span class={`${prefixCls}-icon`}>{iconDot}</span>;
      }
    } else if (icon && isString(icon)) {
      iconNode = <span class={`${prefixCls}-icon`}>{
        <Icon style={iconStyle}
              size={this.iconSize}
              type={icon}/>
      }</span>;
    } else if (icon || status === 'finish' || status === 'error') {
      iconNode = <span class={iconClassName}/>;
    } else {
      iconNode = <span class={`${prefixCls}-icon`}>{stepNumber}</span>;
    }
    return iconNode;
  }

  public render() {
    const {
      prefixCls, itemWidth,
      status = 'wait', iconPrefix, icon, wrapperStyle,
      adjustMarginRight, stepNumber,
      description, title, progressDot, ...restProps
    } = this;

    const classString = classNames(
      `${prefixCls}-item`,
      `${prefixCls}-item-${status}`,
      {[`${prefixCls}-item-custom`]: icon}
    );
    const stepItemStyle: any = {};
    if (itemWidth) {
      stepItemStyle.width = itemWidth;
    }
    if (adjustMarginRight) {
      stepItemStyle.marginRight = adjustMarginRight;
    }
    return (
      <div
        {...restProps}
        class={classString}
        style={stepItemStyle}
      >
        <div class={`${prefixCls}-item-tail`}/>
        <div class={`${prefixCls}-item-icon`}>
          {this.renderIconNode()}
        </div>
        <div class={`${prefixCls}-item-content`}>
          <div class={`${prefixCls}-item-title`}>
            {
              this.$slots.title ? this.$slots.title : title
            }
          </div>
          {(description || this.$slots.description) && <div class={`${prefixCls}-item-description`}>{
            this.$slots.description ? this.$slots.description : description
          }</div>}
        </div>
      </div>
    );
  }
}
