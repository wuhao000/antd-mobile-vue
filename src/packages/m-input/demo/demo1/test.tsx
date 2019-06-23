import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'Abc'
})
export default class Test extends Vue {
  public render() {
    const child = this.$slots.default[0];
    child.data.staticClass = child.data.staticClass + ' ff';
    child.data.staticStyle['height'] = '100px';
    return <div>{this.$slots.default}</div>;
  }
}
