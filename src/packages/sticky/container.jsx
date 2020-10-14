import raf from 'raf';
import { defineComponent, onBeforeUnmount, onMounted, provide, ref } from 'vue';
export default defineComponent({
    name: 'Container',
    props: {},
    setup(props, { emit, slots }) {
        const framePending = ref(false);
        const events = ref([
            'resize',
            'scroll',
            'touchstart',
            'touchmove',
            'touchend',
            'pageshow',
            'load'
        ]);
        const subscribers = ref([]);
        const rafHandle = ref(null);
        const nodeRef = ref(null);
        const subscribe = (handler) => {
            subscribers.value = subscribers.value.concat(handler);
        };
        const unsubscribe = (handler) => {
            subscribers.value = subscribers.value.filter(current => current !== handler);
        };
        const notifySubscribers = (evt) => {
            if (!framePending.value) {
                const { currentTarget } = evt;
                rafHandle.value = raf(() => {
                    framePending.value = false;
                    const { top, bottom } = nodeRef.value.getBoundingClientRect();
                    subscribers.value.forEach(handler => handler({
                        distanceFromTop: top,
                        distanceFromBottom: bottom,
                        eventSource: currentTarget === window ? document.body : nodeRef.value
                    }));
                });
                framePending.value = true;
            }
        };
        const getParent = () => {
            return nodeRef.value;
        };
        onMounted(() => {
            events.value.forEach(event => {
                window.addEventListener(event, notifySubscribers);
                document.body.addEventListener(event, notifySubscribers);
            });
        });
        onBeforeUnmount(() => {
            if (rafHandle.value) {
                raf.cancel(rafHandle.value);
                rafHandle.value = null;
            }
            events.value.forEach(event => {
                window.removeEventListener(event, notifySubscribers);
                document.body.removeEventListener(event, notifySubscribers);
            });
        });
        provide('stickyContext', {
            subscribe: subscribe,
            unsubscribe: unsubscribe,
            getParent: getParent
        });
        return {
            nodeRef, notifySubscribers,
            setNodeRef(el) {
                nodeRef.value = el;
            }
        };
    },
    render() {
        var _a, _b;
        return (<div {...this.$props} ref={this.setNodeRef} onScroll={this.notifySubscribers} onTouchstart={this.notifySubscribers} onTouchmove={this.notifySubscribers} onTouchend={this.notifySubscribers}>
        {(_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)}
      </div>);
    }
});
//# sourceMappingURL=container.jsx.map