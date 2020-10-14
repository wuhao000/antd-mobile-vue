import { __decorate } from "tslib";
import { Options, Vue } from 'vue-class-component';
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
        const children = this.$slots.default && this.$slots.default()[0];
        if (children[eventType]) {
            children[eventType](ev);
        }
        if (isActive !== this.active) {
            this.active = isActive;
        }
        if (this[eventType]) {
            this.$emit(type.toLowerCase(), ev);
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
        const { disabled, activeClassName } = this;
        const events = disabled ? undefined : {
            onTouchstart: this.onTouchStart,
            onTouchmove: this.onTouchMove,
            onTouchend: this.onTouchEnd,
            onTouchcancel: this.onTouchCancel,
            onMousedown: this.onMouseDown,
            onMouseup: this.onMouseUp,
            onMouseleave: this.onMouseLeave
        };
        const child = this.$slots.default()[0];
        if (!disabled && this.active) {
            const cls = child.props.class;
            if (cls) {
                const classArray = cls.split(/\s+/);
                if (!classArray.includes(activeClassName)) {
                    classArray.push(activeClassName);
                }
                child.props.class = classArray.join(' ');
            }
            else {
                child.props.class = activeClassName;
            }
        }
        else {
            const cls = child.props.class;
            if (cls) {
                const classArray = cls.split(/\s+/);
                if (classArray.includes(activeClassName)) {
                    classArray.splice(classArray.indexOf(activeClassName), 1);
                }
                child.props.class = classArray.join(' ');
            }
        }
        const on = child.props;
        child.props = on ? Object.assign(on, events) : events;
        return child;
    }
};
TouchFeedback = __decorate([
    Options({
        name: 'TouchFeedback',
        props: {
            disabled: { type: Boolean, default: false },
            activeClassName: { type: String }
        }
    })
], TouchFeedback);
export default TouchFeedback;
//# sourceMappingURL=feedback.jsx.map