import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
let Test = class Test extends Vue {
    render() {
        const child = this.$slots.default[0];
        child.data.staticClass = child.data.staticClass + ' ff';
        child.data.staticStyle['height'] = '100px';
        return <div>{this.$slots.default}</div>;
    }
};
Test = tslib_1.__decorate([
    Component({
        name: 'Abc'
    })
], Test);
export default Test;
//# sourceMappingURL=test.jsx.map