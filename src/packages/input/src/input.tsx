import {Options, Vue} from 'vue-class-component';

@Options({
  name: 'Input',
  props: {
    value: {type: [String, Number]},
    disabled: Boolean,
    placeholder: String,
    readonly: Boolean,
    type: {type: String},
    textAlign: {type: String, default: 'left'}
  },
  watch: {
    value(value: string) {
      this.currentValue = value;
    }
  }
})

class Input extends Vue {
  public value: string;
  public disabled: boolean;
  public placeholder: string;
  public readonly: boolean;
  public type: string;
  private currentValue: string = this.value || '';
  private textAlign: 'left' | 'right' | 'center';

  get inputRef(): HTMLInputElement {
    return this.$refs['input'] as HTMLInputElement;
  }

  public onInputBlur(e) {
    const value = (e.target as any).value;
    this.$emit('blur', value);
  }

  public onInputFocus(e) {
    this.$emit('focus');
  }

  public focus() {
    if (this.inputRef) {
      this.inputRef.focus();
    }
  }

  public render(): any {
    const value = this.currentValue + '';
    const type = this.type === 'number' ? 'text' : this.type;
    const props: any = {
      value,type,
      ref: 'input',
      disabled: this.disabled,
      readonly: this.readonly,
      placeholder: this.placeholder,
      onBlur: (e) => {
        this.onInputBlur(e);
      },
      onInput: e => {
        this.$emit('change', e);
      },
      style: {textAlign: this.textAlign},
      ...this.$props,
      ...this.$attrs
    }
    return <input {...props}/>;
  }
}

export default Input as any;
