import classnames from 'classnames';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import Icon from '../../icon';
import Marquee, {MarqueeProps} from './marquee';

@Component({
  name: 'NoticeBar'
})
export default class NoticeBar extends Vue {
  @Prop({})
  public marqueeProps?: MarqueeProps;
  @Prop({
    type: String,
    default: 'am-notice-bar'
  })
  public prefixCls?: string;
  @Prop({default: ''})
  public mode?: 'closable' | 'link';
  @Prop()
  public icon?: string | VNode;
  @Prop({})
  public action?: VNode;
  public show = true;
  public static install: (Vue) => void;

  public onClick() {
    const {mode} = this;
    this.$emit('click');
    if (mode === 'closable') {
      this.show = false;
    }
  }

  public render() {
    const {
      mode,
      prefixCls,
      action,
      marqueeProps,
      ...restProps
    } = this;
    const icon = this.icon || <Icon type="voice" size="xxs"/>;
    const extraProps: any = {};
    let operationDom: any = null;
    if (mode === 'closable') {
      operationDom = (
          <div
              class={`${prefixCls}-operation`}
              onClick={this.onClick}
              role="button"
              aria-label="close"
          >
            {action ? action : <Icon type="cross" size="md"/>}
          </div>
      );
    } else {
      if (mode === 'link') {
        operationDom = (
            <div
                class={`${prefixCls}-operation`}
                role="button"
                aria-label="go to detail"
            >
              {action ? action : <Icon type="right" size="md"/>}
            </div>
        );
      }
      extraProps.onClick = this.onClick;
    }

    const wrapCls = classnames(prefixCls);

    return this.show ? (
        <div class={wrapCls} onClick={(e) => {
          if (extraProps.onClick) {
            extraProps.onClick(e);
          }
        }} role="alert">
          {icon && (
              // tslint:disable-next-line:jsx-no-multiline-js
              <div class={`${prefixCls}-icon`} aria-hidden="true">
                {icon}
              </div>
          )}
          <div class={`${prefixCls}-content`}>
            <Marquee
                prefixCls={prefixCls}
                text={this.$slots.default ? this.$slots.default[0] : null}
                props={marqueeProps}
            />
          </div>
          {operationDom}
        </div>
    ) : null;
  }
}
