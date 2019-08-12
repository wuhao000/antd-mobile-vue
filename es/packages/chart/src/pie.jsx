import * as tslib_1 from "tslib";
const camel = function (key) {
    return key.replace(/(-[a-z])/g, function ($1) {
        return $1.toUpperCase().replace('-', '');
    });
};
const camelBatch = function (attrs) {
    for (const i in attrs) {
        if (attrs) {
            const key = camel(i);
            attrs[key] = attrs[i];
            if (key !== i) {
                delete attrs[i];
            }
        }
    }
    return attrs;
};
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let VPie = class VPie extends Vue {
    created() {
        this.$parent.setPie(Object.assign({}, this.$props, camelBatch(this.$attrs)));
    }
    render() {
    }
};
tslib_1.__decorate([
    Prop({
        type: String,
        default: 'polar'
    })
], VPie.prototype, "coord", void 0);
tslib_1.__decorate([
    Prop({
        type: Boolean,
        default: true
    })
], VPie.prototype, "transposed", void 0);
tslib_1.__decorate([
    Prop({
        type: String
    })
], VPie.prototype, "serialField", void 0);
tslib_1.__decorate([
    Prop({
        type: Array
    })
], VPie.prototype, "colors", void 0);
VPie = tslib_1.__decorate([
    Component({
        name: 'VPie'
    })
], VPie);
export default VPie;
//# sourceMappingURL=pie.jsx.map