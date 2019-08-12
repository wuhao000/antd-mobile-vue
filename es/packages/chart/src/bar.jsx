import * as tslib_1 from "tslib";
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Base from './mixin';
let VBar = class VBar extends mixins(Base) {
    constructor() {
        super(...arguments);
        this.chartName = 'bar';
    }
};
tslib_1.__decorate([
    Prop({
        type: String,
        default: 'vertical'
    })
], VBar.prototype, "direction", void 0);
VBar = tslib_1.__decorate([
    Component({
        name: 'VBar'
    })
], VBar);
export default VBar;
//# sourceMappingURL=bar.jsx.map