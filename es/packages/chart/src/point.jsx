import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let VPoint = class VPoint extends Vue {
    created() {
        this.$parent.setPoint(Object.assign({}, this.$props, this.$attrs));
    }
    render() {
    }
};
tslib_1.__decorate([
    Prop({
        type: Object
    })
], VPoint.prototype, "styles", void 0);
tslib_1.__decorate([
    Prop({
        type: Array
    })
], VPoint.prototype, "colors", void 0);
tslib_1.__decorate([
    Prop(String)
], VPoint.prototype, "seriesField", void 0);
VPoint = tslib_1.__decorate([
    Component({
        name: 'VPoint'
    })
], VPoint);
export default VPoint;
//# sourceMappingURL=point.jsx.map