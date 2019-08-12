import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let Marquee = class Marquee extends Vue {
    constructor() {
        super(...arguments);
        this.state = {
            animatedWidth: 0,
            overflowWidth: 0
        };
    }
    get textRef() {
        return this.$refs.textRef;
    }
    mounted() {
        this._measureText();
        this._startAnimation();
    }
    updated() {
        this._measureText();
        if (!this._marqueeTimer) {
            this._startAnimation();
        }
    }
    beforeDestroy() {
        clearTimeout(this._marqueeTimer);
    }
    render() {
        const { prefixCls, text } = this;
        const style = {
            position: 'relative',
            right: this.state.animatedWidth + 'px',
            whiteSpace: 'nowrap',
            display: 'inline-block'
        };
        return (<div class={`${prefixCls}-marquee-wrap`} style={{ overflow: 'hidden' }} role="marquee">
          <div ref={'textRef'} class={`${prefixCls}-marquee`} style={style}>
            {text}
          </div>
        </div>);
    }
    _startAnimation() {
        if (this._marqueeTimer) {
            window.clearTimeout(this._marqueeTimer);
        }
        const fps = this.fps;
        const TIMEOUT = 1 / fps * 1000;
        const isLeading = this.state.animatedWidth === 0;
        const timeout = isLeading ? this.leading : TIMEOUT;
        const animate = () => {
            const { overflowWidth } = this.state;
            let animatedWidth = this.state.animatedWidth + 1;
            const isRoundOver = animatedWidth > overflowWidth;
            if (isRoundOver) {
                if (this.loop) {
                    animatedWidth = 0;
                }
                else {
                    return;
                }
            }
            if (isRoundOver && this.trailing) {
                this._marqueeTimer = window.setTimeout(() => {
                    this.state.animatedWidth = animatedWidth;
                    this._marqueeTimer = window.setTimeout(animate, TIMEOUT);
                }, this.trailing);
            }
            else {
                this.state.animatedWidth = animatedWidth;
                this._marqueeTimer = window.setTimeout(animate, TIMEOUT);
            }
        };
        if (this.state.overflowWidth !== 0) {
            this._marqueeTimer = window.setTimeout(animate, timeout);
        }
    }
    _measureText() {
        const container = this.$el;
        const node = this.textRef;
        if (container && node) {
            const containerWidth = container.offsetWidth;
            const textWidth = node.offsetWidth;
            this.state.overflowWidth = textWidth - containerWidth;
        }
    }
};
tslib_1.__decorate([
    Prop({ type: String })
], Marquee.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({
        type: [String, Object],
        default: ''
    })
], Marquee.prototype, "text", void 0);
tslib_1.__decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Marquee.prototype, "loop", void 0);
tslib_1.__decorate([
    Prop({
        type: Number,
        default: 500
    })
], Marquee.prototype, "leading", void 0);
tslib_1.__decorate([
    Prop({
        type: Number,
        default: 800
    })
], Marquee.prototype, "trailing", void 0);
tslib_1.__decorate([
    Prop({
        type: Number,
        default: 40
    })
], Marquee.prototype, "fps", void 0);
Marquee = tslib_1.__decorate([
    Component({
        name: 'Marquee'
    })
], Marquee);
export default Marquee;
//# sourceMappingURL=marquee.jsx.map