import {defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, onUpdated, PropType, reactive, Ref, ref, VNode} from 'vue';

/*
 * https://github.com/jasonslyvia/react-marquee
 * remove PC
 * support React Element for text prop
*/

export interface MarqueeProps {
  prefixCls?: string;
  text: string;
  loop?: boolean;
  leading?: number;
  trailing?: number;
  fps?: number;
}

const Marquee = defineComponent({
  name: 'Marquee',
  props: {
    prefixCls: {
      type: String as PropType<string>
    },
    text: {
      type: [String, Object] as PropType<string | VNode>,
      default: ''
    },
    loop: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    leading: {
      type: Number as PropType<number>,
      default: 500
    },
    trailing: {
      type: Number as PropType<number>,
      default: 800
    },
    fps: {
      type: Number as PropType<number>,
      default: 40
    }
  },
  setup(props, {emit, slots}) {
    const state = reactive({
      animatedWidth: 0,
      overflowWidth: 0
    });
    const _marqueeTimer: Ref<number> = ref(null);

    const textRef = ref(null);
    const _startAnimation = () => {
      if (_marqueeTimer.value) {
        window.clearTimeout(_marqueeTimer.value);
      }
      const fps = props.fps;
      const TIMEOUT = 1 / fps! * 1000;
      const isLeading = state.animatedWidth === 0;
      const timeout = isLeading ? props.leading : TIMEOUT;

      const animate = () => {
        const {overflowWidth} = state;
        let animatedWidth = state.animatedWidth + 1;
        const isRoundOver = animatedWidth > overflowWidth;
        if (isRoundOver) {
          if (props.loop) {
            animatedWidth = 0;
          } else {
            return;
          }
        }

        if (isRoundOver && props.trailing) {
          _marqueeTimer.value = window.setTimeout(() => {
            state.animatedWidth = animatedWidth;

            _marqueeTimer.value = window.setTimeout(animate, TIMEOUT);
          }, props.trailing);
        } else {
          state.animatedWidth = animatedWidth;
          _marqueeTimer.value = window.setTimeout(animate, TIMEOUT);
        }
      };

      if (state.overflowWidth !== 0) {
        _marqueeTimer.value = window.setTimeout(animate, timeout);
      }
    };
    const instance = getCurrentInstance()
    const _measureText = () => {
      const container = instance.vnode.el;
      const node: any = textRef.value;
      if (container && node) {
        const containerWidth = (container as any).offsetWidth;
        const textWidth = node.offsetWidth;
        state.overflowWidth = textWidth - containerWidth;
      }
    };
    onMounted(() => {
      _measureText();
      _startAnimation();
    });
    onUpdated(() => {
      _measureText();
      if (!_marqueeTimer.value) {
        _startAnimation();
      }
    });
    onBeforeUnmount(() => {
      clearTimeout(_marqueeTimer.value);
    });

    return {
      textRef, state
    };
  },
  render() {
    const {prefixCls, text} = this;
    const style: any = {
      position: 'relative',
      right: this.state.animatedWidth + 'px',
      whiteSpace: 'nowrap',
      display: 'inline-block'
    };
    return (
      <div
        class={`${prefixCls}-marquee-wrap`}
        style={{overflow: 'hidden'}}
        role="marquee"
      >
        <div
          ref={this.textRef}
          class={`${prefixCls}-marquee`}
          style={style}
        >
          {text}
        </div>
      </div>
    );
  }
});


export default Marquee as any;
