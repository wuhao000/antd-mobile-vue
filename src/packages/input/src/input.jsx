import { defineComponent, ref, watch } from 'vue';
const Input = defineComponent({
    name: 'Input',
    props: {
        value: { type: [String, Number] },
        disabled: Boolean,
        placeholder: String,
        readonly: Boolean,
        type: { type: String },
        textAlign: { type: String, default: 'left' }
    },
    setup(props, { emit }) {
        var _a, _b;
        const currentValue = ref((_b = (_a = props.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '');
        const inputRef = ref(null);
        const onInputBlur = (e) => {
            const value = e.target.value;
            emit('blur', value);
        };
        const onInputFocus = (e) => {
            emit('focus');
        };
        const focus = () => {
            if (inputRef.value) {
                inputRef.value.focus();
            }
        };
        watch(() => props.value, (value) => {
            currentValue.value = value === null || value === void 0 ? void 0 : value.toString();
        });
        return { currentValue, inputRef, onInputBlur, focus, onInputFocus };
    },
    render() {
        const { currentValue } = this;
        const type = this.type === 'number' ? 'text' : this.type;
        const props = Object.assign(Object.assign(Object.assign({}, this.$props), this.$attrs), { value: currentValue, type, ref: (el) => {
                this.inputRef = el;
            }, disabled: this.disabled, readonly: this.readonly, placeholder: this.placeholder, onBlur: (e) => {
                this.onInputBlur(e);
            }, onInput: e => {
                this.$emit('change', e);
            }, style: { textAlign: this.textAlign } });
        return <input {...props}/>;
    }
});
export default Input;
//# sourceMappingURL=input.jsx.map