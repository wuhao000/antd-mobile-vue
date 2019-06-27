import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'ActivityIndicator'
})
export default class ActivityIndicator extends Vue {
  @Prop({
    type: String,
    default: 'am-activity-indicator'
  })
  public prefixCls?: string;
  @Prop({type: String})
  public className?: string;
  @Prop({
    type: Boolean,
    default: true
  })
  public animating?: boolean;
  @Prop({
    type: Boolean,
    default: false
  })
  public toast?: boolean;
  @Prop({default: 'small'})
  public size?: 'large' | 'small';
  @Prop({type: String})
  public text?: string;
  public static install: (Vue) => void;

  public render() {
    const {prefixCls, className, animating, toast, size, text} = this;
    const wrapClass = classnames(prefixCls, className, {
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-toast`]: toast
    });
    const spinnerClass = classnames(`${prefixCls}-spinner`, {
      [`${prefixCls}-spinner-lg`]: toast || size === 'large'
    });
    if (animating) {
      if (toast) {
        return (
            <div class={wrapClass}>
              {text ? (
                  <div class={`${prefixCls}-content`}>
                    <span class={spinnerClass} aria-hidden="true"/>
                    <span class={`${prefixCls}-toast`}>{text}</span>
                  </div>
              ) : (
                  <div class={`${prefixCls}-content`}>
                    <span class={spinnerClass} aria-label="Loading"/>
                  </div>
              )}
            </div>
        );
      } else {
        return text ? (
            <div class={wrapClass}>
              <span class={spinnerClass} aria-hidden="true"/>
              <span class={`${prefixCls}-tip`}>{text}</span>
            </div>
        ) : (
            <div class={wrapClass}>
              <span class={spinnerClass} aria-label="loading"/>
            </div>
        );
      }
    } else {
      return null;
    }
  }
}
