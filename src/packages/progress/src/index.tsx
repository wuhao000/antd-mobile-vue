import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'Progress'
})
class Progress extends Vue {
  @Prop({
    type: String,
    default: 'am-progress'
  })
  public prefixCls?: string;
  @Prop({})
  public barStyle?: any;
  @Prop({
    type: Number,
    default: 0
  })
  public percent?: number;
  @Prop({default: 'fixed'})
  public position?: 'fixed' | 'normal';
  @Prop({
    type: Boolean,
    default: true
  })
  public unfilled?: boolean;
  @Prop({
    type: Boolean,
    default: false
  })
  public appearTransition?: boolean;
  public barRef: HTMLDivElement | null;
  private noAppearTransition: boolean = true;
  public static install: (Vue) => void;

  public mounted() {
    if (this.appearTransition) {
      setTimeout(() => {
        if (this.barRef) {
          this.barRef.style.width = `${this.percent}%`;
        }
      }, 10);
    }
  }

  public render() {
    const {
      prefixCls,
      position,
      unfilled,
      barStyle = {}
    } = this;
    const percentStyle = {
      width:
          this.noAppearTransition || !this.appearTransition
              ? `${this.percent}%`
              : 0,
      height: 0
    };

    const wrapCls = classnames(`${prefixCls}-outer`, {
      [`${prefixCls}-fixed-outer`]: position === 'fixed',
      [`${prefixCls}-hide-outer`]: !unfilled
    });

    return (
        <div
            class={wrapCls}
            role="progressbar"
            aria-valuenow={this.percent}
            aria-valuemin={0}
            aria-valuemax={100}
        >
          <div
              ref={el => (this.barRef = el)}
              class={`${prefixCls}-bar`}
              style={{...barStyle, ...percentStyle}}
          />
        </div>
    );
  }
}

export default Progress;
