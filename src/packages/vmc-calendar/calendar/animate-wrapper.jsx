import { defineComponent } from 'vue';
export default defineComponent({
    name: 'AnimateWrapper',
    props: {
        visible: { type: Boolean },
        displayType: { type: String }
    },
    render() {
        const { displayType, visible } = this;
        return <div class="animate" style={{ display: visible ? displayType : 'none' }}>
      {visible && this.$slots.default}
    </div>;
    }
});
//# sourceMappingURL=animate-wrapper.jsx.map