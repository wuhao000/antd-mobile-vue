import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'Portal'
})
export default class Portal extends Vue {
  @Prop({
    type: Function, default: () => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      return container;
    }
  })
  public getContainer: () => Element;
  public container: Element;

  public created() {
    if (!this.container) {
      this.container = this.getContainer();
    }
  }

  public mounted() {
    this.container.appendChild(this.$el);
  }

  public render() {
    if (this.$slots.default && this.$slots.default.length) {
      return this.$slots.default[0];
    } else {
      return <div/>;
    }
  }
}
