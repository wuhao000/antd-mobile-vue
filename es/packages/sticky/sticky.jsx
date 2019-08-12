import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
let Sticky = class Sticky extends Vue {
    constructor() {
        super(...arguments);
        this.state = {
            isSticky: false,
            wasSticky: false,
            style: {},
            distanceFromTop: null,
            distanceFromBottom: null,
            calculatedHeight: null
        };
    }
    mounted() {
        if (!this.context.subscribe) {
            throw new TypeError('Expected Sticky to be mounted within StickyContainer');
        }
        this.context.subscribe(this.handleContainerEvent);
    }
    beforeDestroy() {
        this.context.unsubscribe(this.handleContainerEvent);
    }
    updated() {
        this.placeholder.style.paddingBottom = this.disableCompensation
            ? '0' : `${this.state.isSticky ? this.state.calculatedHeight : 0}px`;
    }
    get placeholder() {
        return this.$refs.placeholder;
    }
    handleContainerEvent({ distanceFromTop, distanceFromBottom, eventSource }) {
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
        const bottomDifference = distanceFromBottomCopy - this.bottomOffset - calculatedHeight;
        const wasSticky = this.state.isSticky;
        const isSticky = preventingStickyStateChanges
            ? wasSticky
            : distanceFromTopCopy <= -this.topOffset &&
                distanceFromBottomCopy > -this.bottomOffset;
        distanceFromBottomCopy =
            (this.relative
                ? parent.scrollHeight - parent.scrollTop
                : distanceFromBottomCopy) - calculatedHeight;
        const style = !isSticky
            ? {}
            : {
                position: 'fixed',
                top: bottomDifference > 0
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
    get content() {
        const child = this.$slots.default && this.$slots.default[0];
        if (child && child.$el) {
            return child.$el;
        }
        else if (child && child.elm) {
            return child.elm;
        }
        return child;
    }
    render() {
        return (<div>
        <div ref="placeholder"/>
        <div style={Object.assign({ zIndex: 1, width: '100%' }, this.state.style)}>
          {this.$slots.default}
        </div>
      </div>);
    }
};
tslib_1.__decorate([
    Prop({ type: Number, default: 0 })
], Sticky.prototype, "topOffset", void 0);
tslib_1.__decorate([
    Prop({ type: Number, default: 0 })
], Sticky.prototype, "bottomOffset", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Sticky.prototype, "relative", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Sticky.prototype, "disableCompensation", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Sticky.prototype, "disableHardwareAcceleration", void 0);
tslib_1.__decorate([
    Inject({
        from: 'stickyContext',
        default: undefined
    })
], Sticky.prototype, "context", void 0);
Sticky = tslib_1.__decorate([
    Component({
        name: 'Container'
    })
], Sticky);
export default Sticky;
//# sourceMappingURL=sticky.jsx.map