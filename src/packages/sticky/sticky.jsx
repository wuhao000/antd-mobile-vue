import { computed, defineComponent, inject, onBeforeUnmount, onMounted, onUpdated, reactive, ref } from 'vue';
export default defineComponent({
    name: 'Container',
    props: {
        topOffset: {
            type: Number,
            default: 0
        },
        bottomOffset: {
            type: Number,
            default: 0
        },
        relative: {
            type: Boolean,
            default: false
        },
        disableCompensation: {
            type: Boolean,
            default: false
        },
        disableHardwareAcceleration: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit, slots }) {
        const context = inject('stickyContext', undefined);
        const state = reactive({
            isSticky: false,
            wasSticky: false,
            style: {},
            distanceFromTop: null,
            distanceFromBottom: null,
            calculatedHeight: null
        });
        const contentWrapRef = ref(null);
        const placeholderRef = ref(null);
        const content = computed(() => {
            return contentWrapRef.value.children[0];
        });
        const handleContainerEvent = ({ distanceFromTop, distanceFromBottom, eventSource }) => {
            const parent = context.getParent();
            let preventingStickyStateChanges = false;
            let distanceFromTopCopy = distanceFromTop;
            if (props.relative) {
                preventingStickyStateChanges = eventSource !== parent;
                distanceFromTopCopy = -(eventSource.scrollTop + eventSource.offsetTop) + placeholderRef.value.offsetTop;
            }
            let distanceFromBottomCopy = distanceFromBottom;
            const placeholderClientRect = placeholderRef.value.getBoundingClientRect();
            const contentClientRect = content.value.getBoundingClientRect();
            const calculatedHeight = contentClientRect.height;
            const bottomDifference = distanceFromBottomCopy - props.bottomOffset - calculatedHeight;
            const wasSticky = state.isSticky;
            const isSticky = preventingStickyStateChanges
                ? wasSticky
                : distanceFromTopCopy <= -props.topOffset &&
                    distanceFromBottomCopy > -props.bottomOffset;
            distanceFromBottomCopy =
                (props.relative
                    ? parent.scrollHeight - parent.scrollTop
                    : distanceFromBottomCopy) - calculatedHeight;
            const style = !isSticky
                ? {}
                : {
                    position: 'fixed',
                    top: bottomDifference > 0
                        ? props.relative
                            ? parent.offsetTop - parent.offsetParent.scrollTop
                            : 0
                        : bottomDifference,
                    left: placeholderClientRect.left,
                    width: placeholderClientRect.width
                };
            if (!props.disableHardwareAcceleration) {
                style.transform = 'translateZ(0)';
            }
            state.isSticky = isSticky;
            state.wasSticky = wasSticky;
            state.distanceFromTop = distanceFromTopCopy;
            state.distanceFromBottom = distanceFromBottomCopy;
            state.calculatedHeight = calculatedHeight;
            state.style = style;
        };
        onMounted(() => {
            if (!context.subscribe) {
                throw new TypeError('Expected Sticky to be mounted within StickyContainer');
            }
            context.subscribe(handleContainerEvent);
        });
        onBeforeUnmount(() => {
            context.unsubscribe(handleContainerEvent);
        });
        onUpdated(() => {
            placeholderRef.value.style.paddingBottom = props.disableCompensation
                ? '0' : `${state.isSticky ? state.calculatedHeight : 0}px`;
        });
        return {
            setContentWrapRef(el) {
                contentWrapRef.value = el;
            },
            setPlaceholderRef(el) {
                placeholderRef.value = el;
            }, state
        };
    },
    render() {
        return (<div>
        <div ref={this.setPlaceholderRef}/>
        <div ref={this.setContentWrapRef} style={Object.assign({ zIndex: 1, width: '100%' }, this.state.style)}>
          {this.$slots.default()}
        </div>
      </div>);
    }
});
//# sourceMappingURL=sticky.jsx.map