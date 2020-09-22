import {defineComponent} from 'vue';
import './demo-wrapper.less';

export default defineComponent({
  props: {
    title: {}
  },
  render() {
    return <div class="demo-preview-item">
      <div class="demo-title">
        {this.title}
      </div>
      <div class="demo-container">
        {this.$slots.default?.()}
      </div>
    </div>;
  }
});
