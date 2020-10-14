import { __decorate } from "tslib";
import { Options, Vue } from 'vue-class-component';
let Portal = class Portal extends Vue {
    created() {
        if (!this.container) {
            this.container = this.getContainer();
        }
    }
    mounted() {
        this.container.appendChild(this.$el);
    }
    render() {
        if (this.$slots.default && this.$slots.default.length) {
            return this.$slots.default[0];
        }
        else {
            return <div />;
        }
    }
};
Portal = __decorate([
    Options({
        name: 'Portal',
        props: {
            getContainer: {
                type: Function, default: () => {
                    const container = document.createElement('div');
                    document.body.appendChild(container);
                    return container;
                }
            }
        }
    })
], Portal);
export default Portal;
//# sourceMappingURL=portal.jsx.map