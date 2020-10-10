import classnames from 'classnames';
import {defineComponent, PropType, ref, VNode} from 'vue';
import Icon from '../../icon';
import Marquee, {MarqueeProps} from './marquee';

export default defineComponent({
  inheritAttrs: false,
  install: null,
  name: 'NoticeBar',
  props: {
    marqueeProps: {
      type: Object as PropType<MarqueeProps>
    },
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-notice-bar'
    },
    mode: {
      type: String as PropType<'closable' | 'link'>,
      default: ''
    },
    icon: {
      type: [String, Object] as PropType<string | VNode>
    },
    action: {
      type: Object as PropType<VNode>
    }
  },
  setup(props, {emit, slots}) {
    const show = ref(true);


    const onClick = () => {
      const {mode} = props;
      emit('click');
      if (mode === 'closable') {
        show.value = false;
      }
    };


    return {
      onClick, show
    };
  },
  render() {
    const {
      mode,
      prefixCls,
      action,
      marqueeProps,
      ...restProps
    } = this;
    const icon = this.$slots.icon?.() ?? this.icon ?? <Icon type="voice" size="xxs"/>;
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
          {this.$slots.action?.() ?? action ?? <Icon type="cross" size="md"/>}
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
            {...marqueeProps}
            prefixCls={prefixCls}
            text={this.$slots.default ? this.$slots.default()[0] : null}
          />
        </div>
        {operationDom}
      </div>
    ) : null;
  }
});
