import { __decorate } from "tslib";
import Component, { mixins } from 'vue-class-component';
import base from './mixin';
let VArea = class VArea extends mixins(base) {
    constructor() {
        super(...arguments);
        this.chartName = 'area';
    }
};
VArea = __decorate([
    Component({
        name: 'VArea'
    })
], VArea);
export default VArea;
//# sourceMappingURL=area.jsx.map