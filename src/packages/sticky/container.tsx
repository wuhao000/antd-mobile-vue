import raf from 'raf';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Provide} from 'vue-property-decorator';

@Component({
  name: 'Container'
})
export default class Container extends Vue {

  private framePending: boolean = false;

  @Provide('stickyContext')
  public context = {
    subscribe: this.subscribe,
    unsubscribe: this.unsubscribe,
    getParent: this.getParent
  };

  public events = [
    'resize',
    'scroll',
    'touchstart',
    'touchmove',
    'touchend',
    'pageshow',
    'load'
  ];

  public subscribers = [];

  public rafHandle = null;

  public subscribe(handler) {
    this.subscribers = this.subscribers.concat(handler);
  }

  public unsubscribe(handler) {
    this.subscribers = this.subscribers.filter(current => current !== handler);
  }

  public notifySubscribers(evt) {
    if (!this.framePending) {
      const {currentTarget} = evt;

      this.rafHandle = raf(() => {
        this.framePending = false;
        const {top, bottom} = this.node.getBoundingClientRect();

        this.subscribers.forEach(handler =>
            handler({
              distanceFromTop: top,
              distanceFromBottom: bottom,
              eventSource: currentTarget === window ? document.body : this.node
            })
        );
      });
      this.framePending = true;
    }
  }

  get node(): HTMLDivElement {
    return this.$refs.node as any;
  }

  public getParent() {
    return this.node;
  }

  public mounted() {
    this.events.forEach(event =>
        window.addEventListener(event, this.notifySubscribers)
    );
  }

  public beforeDestroy() {
    if (this.rafHandle) {
      raf.cancel(this.rafHandle);
      this.rafHandle = null;
    }

    this.events.forEach(event =>
        window.removeEventListener(event, this.notifySubscribers)
    );
  }

  public render() {
    return (
        <div
            {...this.$props}
            ref="node"
            onScroll={this.notifySubscribers}
            onTouchStart={this.notifySubscribers}
            onTouchMove={this.notifySubscribers}
            onTouchEnd={this.notifySubscribers}
        >
          {this.$slots.default}
        </div>
    );
  }
}
