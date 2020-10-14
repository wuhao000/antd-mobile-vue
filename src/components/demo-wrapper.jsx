import { defineComponent } from 'vue';
import './demo-wrapper.less';
export default defineComponent({
    props: {
        title: {}
    },
    render() {
        var _a, _b;
        return <div class="demo-preview-item">
      <div class="demo-title">
        {this.title}
      </div>
      <div class="demo-container">
        {(_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)}
      </div>
    </div>;
    }
});
//# sourceMappingURL=demo-wrapper.jsx.map