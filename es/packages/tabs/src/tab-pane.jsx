import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { getPxStyle, getTransformPropValue } from './utils';
let TabPane = class TabPane extends Vue {
    constructor() {
        super(...arguments);
        this.offsetX = 0;
        this.offsetY = 0;
    }
    beforeUpdate() {
        if (this.active !== this.active) {
            if (this.active) {
                this.offsetX = 0;
                this.offsetY = 0;
            }
            else {
                this.offsetX = this.layout.scrollLeft;
                this.offsetY = this.layout.scrollTop;
            }
        }
    }
    setLayout(div) {
        this.layout = div;
    }
    render() {
        const _a = this, { active, fixX, fixY } = _a, props = tslib_1.__rest(_a, ["active", "fixX", "fixY"]);
        const style = Object.assign({}, fixX && this.offsetX ? getTransformPropValue(getPxStyle(-this.offsetX, 'px', false)) : {}, fixY && this.offsetY ? getTransformPropValue(getPxStyle(-this.offsetY, 'px', true)) : {});
        return <div {...props} style={style} ref={this.setLayout}>
      {this.$slots.default}
    </div>;
    }
};
tslib_1.__decorate([
    Prop()
], TabPane.prototype, "role", void 0);
tslib_1.__decorate([
    Prop()
], TabPane.prototype, "active", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], TabPane.prototype, "fixX", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], TabPane.prototype, "fixY", void 0);
TabPane = tslib_1.__decorate([
    Component({
        name: 'TabPane'
    })
], TabPane);
export default TabPane;
//# sourceMappingURL=tab-pane.jsx.map