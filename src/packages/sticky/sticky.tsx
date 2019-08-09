import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject, Prop} from 'vue-property-decorator';

@Component({
  name: 'Container'
})
export default class Sticky extends Vue {

  @Prop({type: Number, default: 0})
  public topOffset: number;
  @Prop({type: Number, default: 0})
  public bottomOffset: number;
  @Prop({type: Boolean, default: false})
  public relative: boolean;
  @Prop({type: Boolean, default: false})
  public disableCompensation: boolean;
  @Prop({type: Boolean, default: false})
  public disableHardwareAcceleration: boolean;
  @Inject({
    from: 'stickyContext',
    default: undefined
  })
  public context: {
    subscribe: any;
    unsubscribe: any;
    getParent: any;
  };

  public state = {
    isSticky: false,
    wasSticky: false,
    style: {},
    distanceFromTop: null,
    distanceFromBottom: null,
    calculatedHeight: null
  };

  public mounted() {
    if (!this.context.subscribe) {
      throw new TypeError(
        'Expected Sticky to be mounted within StickyContainer'
      );
    }
    this.context.subscribe(this.handleContainerEvent);
  }

  public beforeDestroy() {
    this.context.unsubscribe(this.handleContainerEvent);
  }

  public updated() {
    this.placeholder.style.paddingBottom = this.disableCompensation
      ? '0' : `${this.state.isSticky ? this.state.calculatedHeight : 0}px`;
  }

  get placeholder(): HTMLDivElement {
    return this.$refs.placeholder as any;
  }

  public handleContainerEvent({
                                distanceFromTop,
                                distanceFromBottom,
                                eventSource
                              }) {
    const parent = this.context.getParent();
    let preventingStickyStateChanges = false;
    let distanceFromTopCopy = distanceFromTop;
    if (this.relative) {
      preventingStickyStateChanges = eventSource !== parent;
      distanceFromTopCopy = -(eventSource.scrollTop + eventSource.offsetTop) + this.placeholder.offsetTop;
    }
    let distanceFromBottomCopy = distanceFromBottom;
    const placeholderClientRect = this.placeholder.getBoundingClientRect();
    const contentClientRect = this.content.getBoundingClientRect();
    const calculatedHeight = contentClientRect.height;

    const bottomDifference =
      distanceFromBottomCopy - this.bottomOffset - calculatedHeight;

    const wasSticky = this.state.isSticky;
    const isSticky = preventingStickyStateChanges
      ? wasSticky
      : distanceFromTopCopy <= -this.topOffset &&
      distanceFromBottomCopy > -this.bottomOffset;

    distanceFromBottomCopy =
      (this.relative
        ? parent.scrollHeight - parent.scrollTop
        : distanceFromBottomCopy) - calculatedHeight;

    const style: any = !isSticky
      ? {}
      : {
        position: 'fixed',
        top:
          bottomDifference > 0
            ? this.relative
            ? parent.offsetTop - parent.offsetParent.scrollTop
            : 0
            : bottomDifference,
        left: placeholderClientRect.left,
        width: placeholderClientRect.width
      };

    if (!this.disableHardwareAcceleration) {
      style.transform = 'translateZ(0)';
    }
    this.state.isSticky = isSticky;
    this.state.wasSticky = wasSticky;
    this.state.distanceFromTop = distanceFromTopCopy;
    this.state.distanceFromBottom = distanceFromBottomCopy;
    this.state.calculatedHeight = calculatedHeight;
    this.state.style = style;
  }

  get content(): HTMLDivElement {
    const child = this.$slots.default && this.$slots.default[0] as any;
    if (child && child.$el) {
      return child.$el;
    } else if (child && child.elm) {
      return child.elm;
    }
    return child;
  }

  public render() {
    return (
      <div>
        <div ref="placeholder"/>
        <div style={Object.assign({zIndex: 1, width: '100%'}, this.state.style)}>
          {this.$slots.default}
        </div>
      </div>
    );
  }
}
