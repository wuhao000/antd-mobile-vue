import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let TouchFeedback = class TouchFeedback extends Vue {
    constructor() {
        super(...arguments);
        this.active = false;
    }
    updated() {
        if (this.disabled && this.active) {
            this.active = false;
        }
    }
    triggerEvent(type, isActive, ev) {
        const eventType = `on${type}`;
        const children = this.$slots.default && this.$slots.default[0];
        if (children[eventType]) {
            children[eventType](ev);
        }
        if (isActive !== this.active) {
            this.active = isActive;
        }
    }
    onTouchStart(e) {
        this.triggerEvent('TouchStart', true, e);
    }
    onTouchMove(e) {
        this.triggerEvent('TouchMove', false, e);
    }
    onTouchEnd(e) {
        this.triggerEvent('TouchEnd', false, e);
    }
    onTouchCancel(e) {
        this.triggerEvent('TouchCancel', false, e);
    }
    onMouseDown(e) {
        // pc simulate mobile
        this.triggerEvent('MouseDown', true, e);
    }
    onMouseUp(e) {
        this.triggerEvent('MouseUp', false, e);
    }
    onMouseLeave(e) {
        this.triggerEvent('MouseLeave', false, e);
    }
    render() {
        const { disabled, activeClassName, activeStyle } = this;
        const events = disabled ? undefined : {
            touchstart: this.onTouchStart,
            touchmove: this.onTouchMove,
            touchend: this.onTouchEnd,
            touchcancel: this.onTouchCancel,
            mousedown: this.onMouseDown,
            mouseup: this.onMouseUp,
            mouseleave: this.onMouseLeave
        };
        const child = this.$slots.default[0];
        if (!disabled && this.active) {
            if (child.elm) {
                const elm = child.elm;
                if (!elm.classList.contains(this.activeClassName)) {
                    elm.classList.add(this.activeClassName);
                }
            }
        }
        else {
            if (child.elm) {
                const elm = child.elm;
                if (elm.classList.contains(this.activeClassName)) {
                    elm.classList.remove(this.activeClassName);
                }
            }
        }
        child.data.on = child.data.on ?
            Object.assign(child.data.on, events) : events;
        return child;
    }
};
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], TouchFeedback.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], TouchFeedback.prototype, "activeClassName", void 0);
tslib_1.__decorate([
    Prop()
], TouchFeedback.prototype, "activeStyle", void 0);
TouchFeedback = tslib_1.__decorate([
    Component({
        name: 'TouchFeedback'
    })
], TouchFeedback);
export default TouchFeedback;
//# sourceMappingURL=feedback.jsx.map