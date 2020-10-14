import { __decorate } from "tslib";
import Component, { mixins } from 'vue-class-component';
import Base from './mixin';
let VLine = class VLine extends mixins(Base) {
    constructor() {
        super(...arguments);
        this.chartName = 'line';
    }
};
VLine = __decorate([
    Component({
        name: 'VLine'
    })
], VLine);
export default VLine;
//# sourceMappingURL=line.jsx.map