import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';

@Component({
  name: 'Input'
})
export default class Input extends Vue {

  @Prop({type: [String, Number]})
  public value: string;
  @Prop(Boolean)
  public disabled: boolean;
  @Prop(String)
  public placeholder: string;
  @Prop(Boolean)
  public readonly: boolean;
  @Prop({type: String})
  public type: string;
  private currentValue: string = this.value || '';
  @Prop({type: String, default: 'left'})
  private textAlign: 'left' | 'right' | 'center';

  @Watch('value')
  public valueChanged(value: string) {
    this.currentValue = value;
  }

  get inputRef(): HTMLInputElement {
    return this.$refs['input'] as HTMLInputElement;
  }

  public onInputBlur(e) {
    const value = (e.target as any).value;
    this.inputRef.blur();
    this.$emit('blur', value);
  }

  public onInputFocus(e) {
    this.inputRef.focus();
    this.$emit('focus');
  }

  public focus() {
    if (this.inputRef) {
      this.inputRef.focus();
    }
  }

  public render() {
    const value = this.currentValue + '';
    return (
      <input ref={'input'}
             value={value}
             oninput={e => {
               this.$emit('change', e);
             }}
             type={this.type}
             disabled={this.disabled}
             readonly={this.readonly}
             placeholder={this.placeholder}
             onblur={this.onInputBlur}
             onfocus={this.onInputFocus}
             style={{textAlign: this.textAlign}}
             {...this.$props}
             {...this.$attrs}
      />
    );
  }
}
