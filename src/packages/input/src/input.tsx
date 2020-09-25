import {defineComponent, PropType, ref, Ref, watch} from 'vue';

const Input = defineComponent({
  name: 'Input',
  props: {
    value: {type: [String, Number] as PropType<string | number>},
    disabled: Boolean,
    placeholder: String,
    readonly: Boolean,
    type: {type: String},
    textAlign: {type: String, default: 'left'}
  },
  setup(props, {emit}) {
    const currentValue: Ref<string> = ref(props.value?.toString() ?? '');
    const inputRef = ref(null);
    const onInputBlur = (e) => {
      const value = (e.target as any).value;
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
      currentValue.value = value?.toString();
    });
    return {currentValue, inputRef, onInputBlur, focus, onInputFocus};
  },
  render(): any {
    const {currentValue} = this;
    const type = this.type === 'number' ? 'text' : this.type;
    const props: any = {
      ...this.$props,
      ...this.$attrs,
      value: currentValue,
      type,
      ref: (el) => {
        this.inputRef = el;
      },
      disabled: this.disabled,
      readonly: this.readonly,
      placeholder: this.placeholder,
      onBlur: (e) => {
        this.onInputBlur(e);
      },
      onInput: e => {
        this.$emit('change', e);
      },
      style: {textAlign: this.textAlign}
    };
    return <input {...props}/>;
  }
});

export default Input as any;
