import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'TouchFeedback'
})
class TouchFeedback extends Vue {
  @Prop({type: Boolean, default: false})
  public disabled?: boolean;
  @Prop({type: String})
  public activeClassName?: string;
  @Prop()
  public activeStyle?: any;
  public active: boolean = false;

  public updated() {
    if (this.disabled && this.active) {
      this.active = false;
    }
  }

  public triggerEvent(type, isActive, ev) {
    const eventType = `on${type}`;
    const children = this.$slots.default && this.$slots.default[0];
    if (children[eventType]) {
      children[eventType](ev);
    }
    if (isActive !== this.active) {
      this.active = isActive;
    }
  }

  public onTouchStart(e) {
    this.triggerEvent('TouchStart', true, e);
  }

  public onTouchMove(e) {
    this.triggerEvent('TouchMove', false, e);
  }

  public onTouchEnd(e) {
    this.triggerEvent('TouchEnd', false, e);
  }

  public onTouchCancel(e) {
    this.triggerEvent('TouchCancel', false, e);
  }

  public onMouseDown(e) {
    // pc simulate mobile
    this.triggerEvent('MouseDown', true, e);
  }

  public onMouseUp(e) {
    this.triggerEvent('MouseUp', false, e);
  }

  public onMouseLeave(e) {
    this.triggerEvent('MouseLeave', false, e);
  }

  public render() {
    const {disabled, activeClassName, activeStyle} = this;
    const events = disabled ? undefined : {
      touchstart: this.onTouchStart,
      touchmove: this.onTouchMove,
      touchend: this.onTouchEnd,
      touchcancel: this.onTouchCancel,
      mousedown: this.onMouseDown,
      mouseup: this.onMouseUp,
      mouseleave: this.onMouseLeave
    };
    const child: VNode = this.$slots.default[0];
    if (!disabled && this.active) {
      if (child.elm) {
        const elm = child.elm as HTMLElement;
        if (!elm.classList.contains(this.activeClassName)) {
          elm.classList.add(this.activeClassName);
        }
      }
    } else {
      if (child.elm) {
        const elm = child.elm as HTMLElement;
        if (elm.classList.contains(this.activeClassName)) {
          elm.classList.remove(this.activeClassName);
        }
      }
    }
    child.data.on = child.data.on ?
        Object.assign(child.data.on, events) : events;
    return child;
  }
}
export default TouchFeedback as any;
