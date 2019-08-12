import {getPanDirection} from '../tabs/src';
import {setPxStyle} from '../tabs/src/utils';
import {IGestureStatus} from '../vmc-gesture';
import classNames from 'classnames';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

function getOffset(ele) {
  let el = ele;
  let _x = 0;
  let _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return {top: _y, left: _x};
}

const CANCEL_DISTANCE_ON_SCROLL = 20;


@Component({
  name: 'Drawer'
})
export default class Index extends Vue {
  @Prop({
    type: String,
    default: 'rmc-drawer'
  })
  public prefixCls: string;
  @Prop({
    default: () => {
      return {};
    }
  })
  public sidebarStyle: object;
  @Prop({
    default: () => {
      return {};
    }
  })
  public contentStyle: object;
  @Prop({
    default: () => {
      return {};
    }
  })
  public overlayStyle: object;
  @Prop({
    default: () => {
      return {};
    }
  })
  public dragHandleStyle: object;
  @Prop({})
  public sidebar: VNode;
  @Prop({
    type: Boolean,
    default: false
  })
  public docked: boolean;
  @Prop({
    type: Boolean,
    default: false
  })
  public open: boolean;
  @Prop({
    type: Boolean,
    default: true
  })
  public transitions: boolean;
  @Prop({
    type: Boolean,
    default: true
  })
  public touch: boolean;
  @Prop({
    type: Boolean,
    default: true
  })
  public enableDragHandle: boolean;
  @Prop({default: 'left'})
  public position: 'left' | 'right' | 'top' | 'bottom';
  @Prop({
    type: Number,
    default: 30
  })
  public dragToggleDistance: number;
  @Prop({
    default: () => {
      return () => {
      };
    }
  })
  public onOpenChange: any;

  get contentRef() {
    return this.$refs.content;
  }

  get overlayRef(): any {
    return this.$refs.overlay;
  }

  public state = {
    // the detected width of the sidebar in pixels
    sidebarWidth: 0,
    sidebarHeight: 0,
    sidebarTop: 0,
    dragHandleTop: 0,

    // keep track of touching params
    touchIdentifier: null,
    touchStartX: null,
    touchStartY: null,
    touchCurrentX: null,
    touchCurrentY: null,

    // if touch is supported by the browser
    touchSupported: typeof window === 'object' && 'ontouchstart' in window,
    notTouch: true
  };

  public mounted() {
    this.saveSidebarSize();
  }

  public updated() {
    // filter out the updates when we're touching
    if (!this.isTouching()) {
      this.saveSidebarSize();
    }
  }

  public onOverlayClicked() {
    if (this.open) {
      // see https://github.com/react-component/drawer/issues/9
      setTimeout(() => {
        this.$emit('open', false, {overlayClicked: true});
      }, 0);
    }
  }

  public onTouchStart(ev) {
    // filter out if a user starts swiping with a second finger
    if (!this.isTouching()) {
      const touch = ev.targetTouches[0];
      this.state.touchIdentifier = this.state.notTouch ? touch.identifier : null;
      this.state.touchStartX = touch.clientX;
      this.state.touchStartY = touch.clientY;
      this.state.touchCurrentX = touch.clientX;
      this.state.touchCurrentY = touch.clientY;
    }
  }

  public onTouchMove(ev) {
    // ev.preventDefault(); // cannot touchmove with FastClick
    if (this.isTouching()) {
      for (let ind = 0; ind < ev.targetTouches.length; ind++) {
        // we only care about the finger that we are tracking
        if (ev.targetTouches[ind].identifier === this.state.touchIdentifier) {
          this.state.touchCurrentX = ev.targetTouches[ind].clientX;
          this.state.touchCurrentY = ev.targetTouches[ind].clientY;
          break;
        }
      }
    }
  }

  public onTouchEnd() {
    this.state.notTouch = false;
    if (this.isTouching()) {
      // trigger a change to open if sidebar has been dragged beyond dragToggleDistance
      const touchWidth = this.touchSidebarWidth();

      if (this.open && touchWidth < this.state.sidebarWidth - this.dragToggleDistance ||
        !this.open && touchWidth > this.dragToggleDistance) {
        this.$emit('open', !this.open);
      }

      const touchHeight = this.touchSidebarHeight();

      if (this.open &&
        touchHeight < this.state.sidebarHeight - this.dragToggleDistance ||
        !this.open && touchHeight > this.dragToggleDistance) {
        this.$emit('open', !this.open);
      }

      this.state.touchIdentifier = null;
      this.state.touchStartX = null;
      this.state.touchStartY = null;
      this.state.touchCurrentX = null;
      this.state.touchCurrentY = null;
    }
  }

  public onScroll() {
    if (this.isTouching() && this.inCancelDistanceOnScroll()) {
      this.state.touchIdentifier = null;
      this.state.touchStartX = null;
      this.state.touchStartY = null;
      this.state.touchCurrentX = null;
      this.state.touchCurrentY = null;
    }
  }

  public inCancelDistanceOnScroll() {
    let cancelDistanceOnScroll;
    switch (this.position) {
      case 'right':
        cancelDistanceOnScroll = Math.abs(this.state.touchCurrentX - this.state.touchStartX) <
          CANCEL_DISTANCE_ON_SCROLL;
        break;
      case 'bottom':
        cancelDistanceOnScroll = Math.abs(this.state.touchCurrentY - this.state.touchStartY) <
          CANCEL_DISTANCE_ON_SCROLL;
        break;
      case 'top':
        cancelDistanceOnScroll = Math.abs(this.state.touchStartY - this.state.touchCurrentY) <
          CANCEL_DISTANCE_ON_SCROLL;
        break;
      case 'left':
      default:
        cancelDistanceOnScroll = Math.abs(this.state.touchStartX - this.state.touchCurrentX) <
          CANCEL_DISTANCE_ON_SCROLL;
    }
    return cancelDistanceOnScroll;
  }

  public isTouching() {
    return this.state.touchIdentifier !== null;
  }

  public saveSidebarSize() {
    const sidebar = this.$refs.sidebar as HTMLElement;
    const width = sidebar.offsetWidth;
    const height = sidebar.offsetHeight;
    const sidebarTop = getOffset(this.$refs.sidebar as HTMLElement).top;
    const dragHandleTop = getOffset(this.$refs.dragHandle as HTMLElement).top;

    if (width !== this.state.sidebarWidth) {
      this.state.sidebarWidth = width;
    }
    if (height !== this.state.sidebarHeight) {
      this.state.sidebarHeight = height;
    }
    if (sidebarTop !== this.state.sidebarTop) {
      this.state.sidebarTop = sidebarTop;
    }
    if (dragHandleTop !== this.state.dragHandleTop) {
      this.state.dragHandleTop = dragHandleTop;
    }
  }

  public touchSidebarWidth() {
    // if the sidebar is open and start point of drag is inside the sidebar
    // we will only drag the distance they moved their finger
    // otherwise we will move the sidebar to be below the finger.
    if (this.position === 'right') {
      if (this.open && window.innerWidth - this.state.touchStartX < this.state.sidebarWidth) {
        if (this.state.touchCurrentX > this.state.touchStartX) {
          return this.state.sidebarWidth + this.state.touchStartX - this.state.touchCurrentX;
        }
        return this.state.sidebarWidth;
      }
      return Math.min(window.innerWidth - this.state.touchCurrentX, this.state.sidebarWidth);
    }

    if (this.position === 'left') {
      if (this.open && this.state.touchStartX < this.state.sidebarWidth) {
        if (this.state.touchCurrentX > this.state.touchStartX) {
          return this.state.sidebarWidth;
        }
        return this.state.sidebarWidth - this.state.touchStartX + this.state.touchCurrentX;
      }
      return Math.min(this.state.touchCurrentX, this.state.sidebarWidth);
    }
  }

  public touchSidebarHeight() {
    // if the sidebar is open and start point of drag is inside the sidebar
    // we will only drag the distance they moved their finger
    // otherwise we will move the sidebar to be below the finger.
    if (this.position === 'bottom') {
      if (this.open &&
        window.innerHeight - this.state.touchStartY < this.state.sidebarHeight) {
        if (this.state.touchCurrentY > this.state.touchStartY) {
          return this.state.sidebarHeight + this.state.touchStartY - this.state.touchCurrentY;
        }
        return this.state.sidebarHeight;
      }
      return Math.min(window.innerHeight - this.state.touchCurrentY, this.state.sidebarHeight);
    }

    if (this.position === 'top') {
      const touchStartOffsetY = this.state.touchStartY - this.state.sidebarTop;
      if (this.open && touchStartOffsetY < this.state.sidebarHeight) {
        if (this.state.touchCurrentY > this.state.touchStartY) {
          return this.state.sidebarHeight;
        }
        return this.state.sidebarHeight - this.state.touchStartY + this.state.touchCurrentY;
      }
      return Math.min(this.state.touchCurrentY - this.state.dragHandleTop,
        this.state.sidebarHeight);
    }
  }

  public renderStyle({sidebarStyle = null, isTouching = null, overlayStyle = null, contentStyle = null}) {
    if (this.position === 'right' || this.position === 'left') {
      sidebarStyle.transform = `translateX(0%)`;
      sidebarStyle.WebkitTransform = `translateX(0%)`;
      if (isTouching) {
        const percentage = this.touchSidebarWidth() / this.state.sidebarWidth;
        // slide open to what we dragged
        if (this.position === 'right') {
          sidebarStyle.transform = `translateX(${(1 - percentage) * 100}%)`;
          sidebarStyle.WebkitTransform = `translateX(${(1 - percentage) * 100}%)`;
        }
        if (this.position === 'left') {
          sidebarStyle.transform = `translateX(-${(1 - percentage) * 100}%)`;
          sidebarStyle.WebkitTransform = `translateX(-${(1 - percentage) * 100}%)`;
        }
        // fade overlay to match distance of drag
        overlayStyle.opacity = percentage;
        overlayStyle.visibility = 'visible';
      }
      if (contentStyle) {
        contentStyle[this.position] = `${this.state.sidebarWidth}px`;
      }
    }
    if (this.position === 'top' || this.position === 'bottom') {
      sidebarStyle.transform = `translateY(0%)`;
      sidebarStyle.WebkitTransform = `translateY(0%)`;
      if (isTouching) {
        const percentage = this.touchSidebarHeight() / this.state.sidebarHeight;
        // slide open to what we dragged
        if (this.position === 'bottom') {
          sidebarStyle.transform = `translateY(${(1 - percentage) * 100}%)`;
          sidebarStyle.WebkitTransform = `translateY(${(1 - percentage) * 100}%)`;
        }
        if (this.position === 'top') {
          sidebarStyle.transform = `translateY(-${(1 - percentage) * 100}%)`;
          sidebarStyle.WebkitTransform = `translateY(-${(1 - percentage) * 100}%)`;
        }
        // fade overlay to match distance of drag
        overlayStyle.opacity = percentage;
        overlayStyle.visibility = 'visible';
      }
      if (contentStyle) {
        contentStyle[this.position] = `${this.state.sidebarHeight}px`;
      }
    }
  }

  public isMoving = false;

  get onPan() {
    let lastOffset: number | string = 0;
    let finalOffset = 0;
    let panDirection: string;

    const getLastOffset = () => {
      let offset = +`${lastOffset}`.replace('%', '');
      if (`${lastOffset}`.indexOf('%') >= 0) {
        offset /= 100;
        offset *= this.overlayRef.clientWidth;
      }
      return offset;
    };

    return {
      onPanStart: (status: IGestureStatus) => {
        panDirection = getPanDirection(status.direction);
        this.isMoving = true;
      },
      onPanMove: (status: IGestureStatus) => {
        if (!status.moveStatus) {
          return;
        }
        let offset = getLastOffset();
        offset += panDirection === 'vertical' ? 0 : status.moveStatus.x;
        const canScrollOffset =
          -this.overlayRef.scrollWidth + this.overlayRef.clientWidth;
        offset = Math.min(offset, 0);
        offset = Math.max(offset, canScrollOffset);
        setPxStyle(this.overlayRef, offset, 'px', false, false);
        finalOffset = offset;
      },

      onPanEnd: () => {
        lastOffset = finalOffset;
        // const offsetIndex = this.getOffsetIndex(finalOffset, this.overlayRef.clientWidth);
        this.isMoving = false;
      },
      setCurrentOffset: (offset: number | string) => lastOffset = offset
    };
  }

  public startX = 0;
  public startY = 0;
  public touchOffsetX = 0;
  public touchOffsetY = 0;
  public transformOffset = 0;

  public render() {
    const {
      prefixCls, position, transitions,
      touch, enableDragHandle, sidebar, docked, open
    } = this;

    const sidebarStyle: any = {...this.sidebarStyle};
    const contentStyle: any = {...this.contentStyle};
    const overlayStyle: any = {...this.overlayStyle};

    const rootCls = {
      [prefixCls]: true,
      [`${prefixCls}-${position}`]: true
    };
    const rootProps: any = {};
    const isTouching = this.isTouching();

    if (isTouching) {
      this.renderStyle({sidebarStyle, isTouching: true, overlayStyle});
    } else if (this.docked) {
      if (this.open) {
        rootCls[`${prefixCls}-docked`] = true;
        this.renderStyle({sidebarStyle, contentStyle});
      }
    } else if (open && !docked) {
      rootCls[`${prefixCls}-open`] = true;
      this.renderStyle({sidebarStyle});
      overlayStyle.opacity = 1;
      overlayStyle.visibility = 'visible';
    }

    if (isTouching || !transitions) {
      sidebarStyle.transition = undefined;
      sidebarStyle.webkitTransition = undefined;
      contentStyle.transition = undefined;
      overlayStyle.transition = undefined;
    }

    let dragHandle = null;
    if (this.state.touchSupported && touch) {
      if (open) {
        rootProps.touchstart = (ev) => {
          this.state.notTouch = true;
          this.onTouchStart(ev);
        };
        rootProps.touchmove = this.onTouchMove;
        rootProps.touchend = this.onTouchEnd;
        rootProps.touchcancel = this.onTouchEnd;
        rootProps.scroll = this.onScroll;
      } else if (enableDragHandle) {
        dragHandle = (
          <div class={`${prefixCls}-draghandle`} style={this.dragHandleStyle}
               onTouchStart={this.onTouchStart.bind(this)} onTouchMove={this.onTouchMove.bind(this)}
               onTouchEnd={this.onTouchEnd.bind(this)} onTouchCancel={this.onTouchEnd.bind(this)}
               ref={'dragHandle'}
          />);
      }
    }
    return (
      <div class={classNames(rootCls)}
           on={rootProps}>
        <div class={`${prefixCls}-sidebar`} style={sidebarStyle}
             ref={'sidebar'}>
          {sidebar}
        </div>
        <div class={`${prefixCls}-overlay`}
             style={overlayStyle}
             role={'presentation'}
             ref={'overlay'}
             onclick={this.onOverlayClicked.bind(this)}
        />
        <div class={`${prefixCls}-content`} style={contentStyle}
             ref={'content'}>
          {dragHandle}
          {this.$slots.default}
        </div>
      </div>
    );
  }
}
