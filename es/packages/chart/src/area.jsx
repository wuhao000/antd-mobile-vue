import * as tslib_1 from "tslib";
import Component, { mixins } from 'vue-class-component';
import base from './mixin';
let VArea = class VArea extends mixins(base) {
    constructor() {
        super(...arguments);
        this.chartName = 'area';
    }
};
VArea = tslib_1.__decorate([
    Component({
        name: 'VArea'
    })
], VArea);
export default VArea;
//# sourceMappingURL=area.jsx.map