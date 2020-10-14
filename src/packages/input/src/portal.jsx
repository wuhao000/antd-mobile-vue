import { __decorate } from "tslib";
import { Options, Vue } from 'vue-class-component';
let Portal = class Portal extends Vue {
    created() {
        this.container = this.getContainer();
    }
    mounted() {
        this.container.appendChild(this.$el);
    }
    render() {
        var _a, _b;
        return (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
};
Portal = __decorate([
    Options({
        name: 'Portal',
        props: {
            getContainer: { required: true }
        }
    })
], Portal);
export default Portal;
//# sourceMappingURL=portal.jsx.map