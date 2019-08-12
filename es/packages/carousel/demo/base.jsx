import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
let BaseDemo = class BaseDemo extends Vue {
    constructor() {
        super(...arguments);
        this.state = {
            data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            imgHeight: '176px',
            slideIndex: 2
        };
    }
    afterChange(index) {
        this.state.slideIndex = index;
    }
    beforeChange(from, to) {
        console.log(`slide from ${from} to ${to}`);
    }
    onLoad() {
        // fire window resize event to change height
        window.dispatchEvent(new Event('resize'));
        this.state.imgHeight = 'auto';
    }
};
BaseDemo = tslib_1.__decorate([
    Component({
        name: 'BaseDemo'
    })
], BaseDemo);
export default BaseDemo;
//# sourceMappingURL=base.jsx.map