import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let Progress = class Progress extends Vue {
    constructor() {
        super(...arguments);
        this.noAppearTransition = true;
    }
    mounted() {
        if (this.appearTransition) {
            setTimeout(() => {
                if (this.barRef) {
                    this.barRef.style.width = `${this.percent}%`;
                }
            }, 10);
        }
    }
    render() {
        const { prefixCls, position, unfilled, barStyle = {} } = this;
        const percentStyle = {
            width: this.noAppearTransition || !this.appearTransition
                ? `${this.percent}%`
                : 0,
            height: 0
        };
        const wrapCls = classnames(`${prefixCls}-outer`, {
            [`${prefixCls}-fixed-outer`]: position === 'fixed',
            [`${prefixCls}-hide-outer`]: !unfilled
        });
        return (<div class={wrapCls} role="progressbar" aria-valuenow={this.percent} aria-valuemin={0} aria-valuemax={100}>
          <div ref={el => (this.barRef = el)} class={`${prefixCls}-bar`} style={Object.assign({}, barStyle, percentStyle)}/>
        </div>);
    }
};
tslib_1.__decorate([
    Prop({
        type: String,
        default: 'am-progress'
    })
], Progress.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({})
], Progress.prototype, "barStyle", void 0);
tslib_1.__decorate([
    Prop({
        type: Number,
        default: 0
    })
], Progress.prototype, "percent", void 0);
tslib_1.__decorate([
    Prop({ default: 'fixed' })
], Progress.prototype, "position", void 0);
tslib_1.__decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Progress.prototype, "unfilled", void 0);
tslib_1.__decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Progress.prototype, "appearTransition", void 0);
Progress = tslib_1.__decorate([
    Component({
        name: 'Progress'
    })
], Progress);
export default Progress;
//# sourceMappingURL=index.jsx.map