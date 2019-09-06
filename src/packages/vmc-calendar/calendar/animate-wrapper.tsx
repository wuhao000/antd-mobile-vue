import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'AnimateWrapper'
})
export default class AnimateWrapper extends Vue {
  @Prop({type: Boolean})
  public visible: boolean;
  @Prop({type: String})
  public displayType?: string;

  public render() {
    const {displayType, visible} = this;

    return <div
      class="animate"
      style={{display: visible ? displayType : 'none'}}>
      {visible && this.$slots.default}
    </div>;
  }
}
