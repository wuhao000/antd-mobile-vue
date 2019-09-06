import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

/*
 * https://github.com/jasonslyvia/react-marquee
 * remove PC
 * support React Element for text prop
*/

export interface MarqueeProps {
  prefixCls?: string;
  text: string;
  loop?: boolean;
  leading?: number;
  trailing?: number;
  fps?: number;
}

@Component({
  name: 'Marquee'
})
class Marquee extends Vue {
  @Prop({type: String})
  public prefixCls?: string;
  @Prop({
    type: [String, Object],
    default: ''
  })
  public text: string | VNode;
  @Prop({
    type: Boolean,
    default: false
  })
  public loop?: boolean;
  @Prop({
    type: Number,
    default: 500
  })
  public leading?: number;
  @Prop({
    type: Number,
    default: 800
  })
  public trailing?: number;
  @Prop({
    type: Number,
    default: 40
  })
  public fps?: number;
  public state = {
    animatedWidth: 0,
    overflowWidth: 0
  };

  get textRef() {
    return this.$refs.textRef;
  }

  private _marqueeTimer: number;

  public mounted() {
    this._measureText();
    this._startAnimation();
  }

  public updated() {
    this._measureText();
    if (!this._marqueeTimer) {
      this._startAnimation();
    }
  }

  public beforeDestroy() {
    clearTimeout(this._marqueeTimer);
  }

  public render() {
    const {prefixCls, text} = this;
    const style = {
      position: 'relative',
      right: this.state.animatedWidth + 'px',
      whiteSpace: 'nowrap',
      display: 'inline-block'
    };
    return (
        <div
            class={`${prefixCls}-marquee-wrap`}
            style={{overflow: 'hidden'}}
            role="marquee"
        >
          <div
              ref="textRef"
              class={`${prefixCls}-marquee`}
              style={style}
          >
            {text}
          </div>
        </div>
    );
  }

  public _startAnimation() {
    if (this._marqueeTimer) {
      window.clearTimeout(this._marqueeTimer);
    }
    const fps = this.fps;
    const TIMEOUT = 1 / fps! * 1000;
    const isLeading = this.state.animatedWidth === 0;
    const timeout = isLeading ? this.leading : TIMEOUT;

    const animate = () => {
      const {overflowWidth} = this.state;
      let animatedWidth = this.state.animatedWidth + 1;
      const isRoundOver = animatedWidth > overflowWidth;
      if (isRoundOver) {
        if (this.loop) {
          animatedWidth = 0;
        } else {
          return;
        }
      }

      if (isRoundOver && this.trailing) {
        this._marqueeTimer = window.setTimeout(() => {
          this.state.animatedWidth = animatedWidth;

          this._marqueeTimer = window.setTimeout(animate, TIMEOUT);
        }, this.trailing);
      } else {
        this.state.animatedWidth = animatedWidth;
        this._marqueeTimer = window.setTimeout(animate, TIMEOUT);
      }
    };

    if (this.state.overflowWidth !== 0) {
      this._marqueeTimer = window.setTimeout(animate, timeout);
    }
  }

  public _measureText() {
    const container = this.$el;
    const node: any = this.textRef;
    if (container && node) {
      const containerWidth = (container as any).offsetWidth;
      const textWidth = node.offsetWidth;
      this.state.overflowWidth = textWidth - containerWidth;
    }
  }
}

export default Marquee as any;
