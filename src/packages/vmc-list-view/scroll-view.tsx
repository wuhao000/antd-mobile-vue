import {cloneElement} from '@/packages/utils/vnode';
import classNames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import {throttle} from './util';

@Component({
  name: 'ScrollView'
})
export default class ScrollView extends Vue {

  @Prop({type: String})
  public prefixCls: string;
  @Prop({type: String})
  public listPrefixCls: string;
  @Prop({type: String})
  public listViewPrefixCls: string;
  @Prop()
  public initialListSize: number;
  @Prop()
  public dataSource: any;
  public contentContainerStyle: object;

  public state = {
    dataSource: this.dataSource,
    initialListSize: this.initialListSize
  };
  @Prop({type: Function})
  public handleScroll: any;
  @Prop({type: Boolean})
  private useBodyScroll: boolean;
  @Prop()
  private scrollEventThrottle: any;
  @Prop()
  public pullToRefresh: any;
  @Prop({type: Boolean})
  private horizontal: boolean;
  private onLayout: () => void;

  get ScrollViewRef(): any {
    return this.$refs.ScrollViewRef;
  }

  get InnerScrollViewRef() {
    return this.$refs.InnerScrollViewRef;
  }

  @Watch('dataSource')
  public dataSourceChanged() {
    this.setEvent();
  }

  @Watch('initialListSize')
  public initialListSizeChanged() {
    this.setEvent();
  }

  @Watch('handleScroll')
  public handleScrollChanged() {
    this.setEvent();
  }

  public setEvent() {
    if ((this.state.dataSource !== this.dataSource || this.initialListSize !== this.state.initialListSize) && this.handleScroll) {
      // console.log('componentWillUpdate');
      if (this.useBodyScroll) {
        window.removeEventListener('scroll', this.handleScroll);
      } else {
        this.ScrollViewRef.removeEventListener('scroll', this.handleScroll);
      }
    }
  }

  public updated(prevProps) {
    // handle componentWillUpdate accordingly
    if ((this.dataSource !== prevProps.dataSource ||
        this.initialListSize !== prevProps.initialListSize) && this.handleScroll) {
      setTimeout(() => {
        if (this.useBodyScroll) {
          window.addEventListener('scroll', this.handleScroll);
        } else {
          this.ScrollViewRef.addEventListener('scroll', this.handleScroll);
        }
      }, 0);
    }
  }

  public mounted() {
    let handleScroll: any = e => this.$emit('scroll', e, this.getMetrics());
    if (this.scrollEventThrottle) {
      handleScroll = throttle(handleScroll, this.scrollEventThrottle);
    }
    this.handleScroll = handleScroll;

    // IE supports onresize on all HTML elements.
    // In all other Browsers the onresize is only available at the window object
    this.onLayout = () => {
      this.$emit('layout', {
        nativeEvent: {layout: {width: window.innerWidth, height: window.innerHeight}}
      });
    };

    if (this.useBodyScroll) {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.onLayout);
    } else {
      this.ScrollViewRef.addEventListener('scroll', this.handleScroll);
    }
  }

  public beforeDestroy() {
    if (this.useBodyScroll) {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.onLayout);
    } else {
      this.ScrollViewRef.removeEventListener('scroll', this.handleScroll);
    }
  }

  public getMetrics() {
    const isVertical = !this.horizontal;
    if (this.useBodyScroll) {
      // In chrome61 `document.body.scrollTop` is invalid,
      // and add new `document.scrollingElement`(chrome61, iOS support).
      // In old-android-browser and iOS `document.documentElement.scrollTop` is invalid.
      const scrollNode = document.scrollingElement ? document.scrollingElement : document.body;
      // todos: Why sometimes do not have `this.ScrollViewRef` ?
      return {
        visibleLength: window[isVertical ? 'innerHeight' : 'innerWidth'],
        contentLength: this.ScrollViewRef ?
            this.ScrollViewRef[isVertical ? 'scrollHeight' : 'scrollWidth'] : 0,
        offset: scrollNode[isVertical ? 'scrollTop' : 'scrollLeft']
      };
    }
    return {
      visibleLength: this.ScrollViewRef[isVertical ? 'offsetHeight' : 'offsetWidth'],
      contentLength: this.ScrollViewRef[isVertical ? 'scrollHeight' : 'scrollWidth'],
      offset: this.ScrollViewRef[isVertical ? 'scrollTop' : 'scrollLeft']
    };
  }

  public getInnerViewNode = () => this.InnerScrollViewRef;

  public scrollTo(...args) {
    if (this.useBodyScroll) {
      window.scrollTo(...args);
    } else {
      this.ScrollViewRef.scrollLeft = args[0];
      this.ScrollViewRef.scrollTop = args[1];
    }
  }


  public render() {
    const {
      prefixCls, listPrefixCls, listViewPrefixCls,
      contentContainerStyle = {}, useBodyScroll, pullToRefresh
    } = this;

    const styleBase = {
      position: 'relative',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch'
    };
    const preCls = prefixCls || listViewPrefixCls || '';

    const containerProps = {
      style: {...(useBodyScroll ? {} : styleBase)},
      class: classNames(`${preCls}-scrollview`)
    };
    const contentContainerProps = {
      style: {position: 'absolute', minWidth: '100%', ...contentContainerStyle},
      class: classNames(`${preCls}-scrollview-content`, listPrefixCls)
    };

    const clonePullToRefresh = isBody => {
      const node = cloneElement(pullToRefresh, {
        getScrollContainer: isBody ? () => document.body : () => this.ScrollViewRef
      });
      node.children = this.$slots.default;
      return node;
    };

    if (useBodyScroll) {
      if (pullToRefresh) {
        return (
            <div {...containerProps} ref={'ScrollViewRef'}>
              {clonePullToRefresh(true)}
            </div>
        );
      }
      return (
          <div {...containerProps}>
            {this.$slots.default}
          </div>
      );
    }

    if (pullToRefresh) {
      return (
          <div {...containerProps}>
            <div {...contentContainerProps}>
              {clonePullToRefresh(false)}
            </div>
          </div>
      );
    }

    return (
        <div {...containerProps}>
          <div {...contentContainerProps} ref="InnerScrollViewRef">
            {this.$slots.default}
          </div>
        </div>
    );
  }
}
