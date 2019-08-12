import * as tslib_1 from "tslib";
import raf from 'raf';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Provide } from 'vue-property-decorator';
let Container = class Container extends Vue {
    constructor() {
        super(...arguments);
        this.framePending = false;
        this.context = {
            subscribe: this.subscribe,
            unsubscribe: this.unsubscribe,
            getParent: this.getParent
        };
        this.events = [
            'resize',
            'scroll',
            'touchstart',
            'touchmove',
            'touchend',
            'pageshow',
            'load'
        ];
        this.subscribers = [];
        this.rafHandle = null;
    }
    subscribe(handler) {
        this.subscribers = this.subscribers.concat(handler);
    }
    unsubscribe(handler) {
        this.subscribers = this.subscribers.filter(current => current !== handler);
    }
    notifySubscribers(evt) {
        if (!this.framePending) {
            const { currentTarget } = evt;
            this.rafHandle = raf(() => {
                this.framePending = false;
                const { top, bottom } = this.node.getBoundingClientRect();
                this.subscribers.forEach(handler => handler({
                    distanceFromTop: top,
                    distanceFromBottom: bottom,
                    eventSource: currentTarget === window ? document.body : this.node
                }));
            });
            this.framePending = true;
        }
    }
    get node() {
        return this.$refs.node;
    }
    getParent() {
        return this.node;
    }
    mounted() {
        this.events.forEach(event => {
            window.addEventListener(event, this.notifySubscribers);
            document.body.addEventListener(event, this.notifySubscribers);
        });
    }
    beforeDestroy() {
        if (this.rafHandle) {
            raf.cancel(this.rafHandle);
            this.rafHandle = null;
        }
        this.events.forEach(event => {
            window.removeEventListener(event, this.notifySubscribers);
            document.body.removeEventListener(event, this.notifySubscribers);
        });
    }
    render() {
        return (<div {...this.$props} ref="node" on={{
            scroll: this.notifySubscribers
        }} onTouchStart={this.notifySubscribers} onTouchMove={this.notifySubscribers} onTouchEnd={this.notifySubscribers}>
        {this.$slots.default}
      </div>);
    }
};
tslib_1.__decorate([
    Provide('stickyContext')
], Container.prototype, "context", void 0);
Container = tslib_1.__decorate([
    Component({
        name: 'Container'
    })
], Container);
export default Container;
//# sourceMappingURL=container.jsx.map