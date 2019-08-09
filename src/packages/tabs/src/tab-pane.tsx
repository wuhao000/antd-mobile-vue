import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {getPxStyle, getTransformPropValue} from './utils';

@Component({
  name: 'TabPane'
})
class TabPane extends Vue {
  public layout: HTMLDivElement;
  public offsetX = 0;
  public offsetY = 0;

  @Prop()
  public role?: string;
  @Prop()
  public active: boolean;
  @Prop({type: Boolean, default: true})
  public fixX?: boolean;
  @Prop({type: Boolean, default: true})
  public fixY?: boolean;

  public beforeUpdate() {
    if (this.active !== this.active) {
      if (this.active) {
        this.offsetX = 0;
        this.offsetY = 0;
      } else {
        this.offsetX = this.layout.scrollLeft;
        this.offsetY = this.layout.scrollTop;
      }
    }
  }

  public setLayout(div: HTMLDivElement) {
    this.layout = div;
  }

  public render() {
    const {active, fixX, fixY, ...props} = this;
    const style = {
      ...fixX && this.offsetX ? getTransformPropValue(getPxStyle(-this.offsetX, 'px', false)) : {},
      ...fixY && this.offsetY ? getTransformPropValue(getPxStyle(-this.offsetY, 'px', true)) : {}
    };

    return <div {...props} style={style} ref={this.setLayout}>
      {this.$slots.default}
    </div>;
  }
}
export default TabPane as any;
