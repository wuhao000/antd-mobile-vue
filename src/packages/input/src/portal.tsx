import {Options, Vue} from 'vue-class-component';

@Options({
  name: 'Portal',
  props: {
    getContainer: {required: true}
  }
})

class Portal extends Vue {
  public getContainer: () => Element;
  public container: Element;

  public created() {
    this.container = this.getContainer();
  }

  public mounted() {
    this.container.appendChild(this.$el);
  }

  public render(): any {
    return this.$slots.default?.();
  }
}

export default Portal as any;
