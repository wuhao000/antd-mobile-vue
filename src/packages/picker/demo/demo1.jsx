import { defineComponent } from 'vue';
// 如果不是使用 List.Item 作为 children
export default defineComponent({
    name: 'CustomChildren',
    props: {
        extra: {}
    },
    render() {
        return <div onClick={(e) => {
            this.$emit('click', e);
        }} style={{ backgroundColor: '#fff', paddingLeft: '15px' }}>
      <div class="test" style={{ display: 'flex', height: '45px', lineHeight: '45px' }}>
        <div style={{
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        }}>{this.$slots.default}</div>
        <div style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{this.extra}</div>
      </div>
    </div>;
    }
});
//# sourceMappingURL=demo1.jsx.map