import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let AnimateWrapper = class AnimateWrapper extends Vue {
    render() {
        const { displayType, visible } = this;
        return <div class={'animate'} style={{ display: visible ? displayType : 'none' }}>
      {visible && this.$slots.default}
    </div>;
    }
};
tslib_1.__decorate([
    Prop({ type: Boolean })
], AnimateWrapper.prototype, "visible", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], AnimateWrapper.prototype, "displayType", void 0);
AnimateWrapper = tslib_1.__decorate([
    Component({
        name: 'AnimateWrapper'
    })
], AnimateWrapper);
export default AnimateWrapper;
//# sourceMappingURL=animate-wrapper.jsx.map