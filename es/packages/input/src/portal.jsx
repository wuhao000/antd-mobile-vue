import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let Portal = class Portal extends Vue {
    created() {
        this.container = this.getContainer();
    }
    mounted() {
        this.container.appendChild(this.$el);
    }
    render() {
        return this.$slots.default;
    }
};
tslib_1.__decorate([
    Prop({ required: true })
], Portal.prototype, "getContainer", void 0);
Portal = tslib_1.__decorate([
    Component({
        name: 'Portal'
    })
], Portal);
export default Portal;
//# sourceMappingURL=portal.jsx.map