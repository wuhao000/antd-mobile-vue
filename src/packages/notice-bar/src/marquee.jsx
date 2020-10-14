import { defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, onUpdated, reactive, ref } from 'vue';
const Marquee = defineComponent({
    name: 'Marquee',
    props: {
        prefixCls: {
            type: String
        },
        text: {
            type: [String, Object],
            default: ''
        },
        loop: {
            type: Boolean,
            default: false
        },
        leading: {
            type: Number,
            default: 500
        },
        trailing: {
            type: Number,
            default: 800
        },
        fps: {
            type: Number,
            default: 40
        }
    },
    setup(props, { emit, slots }) {
        const state = reactive({
            animatedWidth: 0,
            overflowWidth: 0
        });
        const _marqueeTimer = ref(null);
        const textRef = ref(null);
        const _startAnimation = () => {
            if (_marqueeTimer.value) {
                window.clearTimeout(_marqueeTimer.value);
            }
            const fps = props.fps;
            const TIMEOUT = 1 / fps * 1000;
            const isLeading = state.animatedWidth === 0;
            const timeout = isLeading ? props.leading : TIMEOUT;
            const animate = () => {
                const { overflowWidth } = state;
                let animatedWidth = state.animatedWidth + 1;
                const isRoundOver = animatedWidth > overflowWidth;
                if (isRoundOver) {
                    if (props.loop) {
                        animatedWidth = 0;
                    }
                    else {
                        return;
                    }
                }
                if (isRoundOver && props.trailing) {
                    _marqueeTimer.value = window.setTimeout(() => {
                        state.animatedWidth = animatedWidth;
                        _marqueeTimer.value = window.setTimeout(animate, TIMEOUT);
                    }, props.trailing);
                }
                else {
                    state.animatedWidth = animatedWidth;
                    _marqueeTimer.value = window.setTimeout(animate, TIMEOUT);
                }
            };
            if (state.overflowWidth !== 0) {
                _marqueeTimer.value = window.setTimeout(animate, timeout);
            }
        };
        const instance = getCurrentInstance();
        const _measureText = () => {
            const container = instance.vnode.el;
            const node = textRef.value;
            if (container && node) {
                const containerWidth = container.offsetWidth;
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
        const { prefixCls, text } = this;
        const style = {
            position: 'relative',
            right: this.state.animatedWidth + 'px',
            whiteSpace: 'nowrap',
            display: 'inline-block'
        };
        return (<div class={`${prefixCls}-marquee-wrap`} style={{ overflow: 'hidden' }} role="marquee">
        <div ref={this.textRef} class={`${prefixCls}-marquee`} style={style}>
          {text}
        </div>
      </div>);
    }
});
export default Marquee;
//# sourceMappingURL=marquee.jsx.map