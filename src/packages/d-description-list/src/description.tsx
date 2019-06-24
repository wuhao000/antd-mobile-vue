import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {Col} from '../../ae-grid';
import responsive from './responsive';

@Component({
  name: 'Description'
})
class Description extends Vue {
  @Prop({type: String, default: 'd-description-list'})
  public prefixCls: string;
  @Prop({type: String, default: ''})
  public term: string;
  @Prop({type: Number})
  public column: number;

  public render() {
    const {term} = this;

    const attrs = {
      ...responsive[this.column],
      ...this.$attrs
    };
    return <Col attrs={attrs}>
      {
        this.term && <div class={this.prefixCls + '-term'}>{term}</div>
      }
      {this.$slots.default !== null && this.$slots.default !== undefined &&
      <div class={this.prefixCls + '-detail'}>{this.$slots.default}</div>}
    </Col>;
  }
}

export default Description;
