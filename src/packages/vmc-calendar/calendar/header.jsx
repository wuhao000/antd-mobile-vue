import { defineComponent } from 'vue';
const Header = defineComponent({
    name: 'Header',
    props: {
        title: { type: String },
        locale: { type: Object },
        showClear: { type: Boolean },
        closeIcon: { default: 'X' },
        clearIcon: {}
    },
    render() {
        const { title, locale = {}, showClear, closeIcon, clearIcon } = this;
        return (<div class="header">
        <span class="left" onClick={() => this.$emit('cancel')}>{closeIcon}</span>
        <span class="title">{title || locale.title}</span>
        {showClear &&
            <span class="right" onClick={() => this.$emit('clear')}>{clearIcon || locale.clear}</span>}
      </div>);
    }
});
export default Header;
//# sourceMappingURL=header.jsx.map