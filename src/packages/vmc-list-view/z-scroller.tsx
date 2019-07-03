import Component from 'vue-class-component';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Vue from 'vue';
import {Prop, Watch} from 'vue-property-decorator';
import DOMScroller from 'zscroller';
import {throttle} from './util';

/* eslint react/prop-types: 0, react/sort-comp: 0, no-unused-expressions: 0 */
const h = new Vue().$createElement;
export default @Component({
  name: ''
})

class ScrollView extends Vue {
  @Prop({type: String, default: 'zscroller'})
  public prefixCls: PropTypes.string;
  @Prop({type: String})
  public listPrefixCls: PropTypes.string;
  @Prop({type: String})
  public listViewPrefixCls: PropTypes.string;
  @Prop({type: Object})
  public contentContainerStyle: PropTypes.object;
  @Prop({type: Function})
  public onScroll: any;
  @Prop({type: Boolean})
  public refreshControl: boolean;
  @Prop({
    default: () => [
      <div key="0" class="zscroller-refresh-control-pull">
        ↓ 下拉
      </div>,
      <div key="1" class="zscroller-refresh-control-release">
        ↑ 释放
      </div>
    ]
  })
  public icon: any;
  @Prop({default: () => <div>loading...</div>})
  public loading: any;
  @Prop({type: Number, default: 25})
  public distanceToRefresh: number;
  @Prop({type: Boolean, default: false})
  public refreshing: boolean;

  public state = {
    active: false,
    deactive: false,
    loadingState: false
  };
  private _refreshControlTimer: any;

  @Watch('refreshing')
  public refreshingChanged(value, oldValue){
    if (this.refreshControl) {
      if (oldValue && !value && !this._refreshControlTimer) {
        this.domScroller.scroller.finishPullToRefresh();
      } else if (!this.manuallyRefresh && !preRefreshing && nowRefreshing) {
        this.domScroller.scroller.triggerPullToRefresh();
      }
    }
  }

  public updated() {

  }

  public mounted() {
    let handleScroll = () =>
        this.onScroll && this.props.onScroll(this.domScroller, this.getMetrics());
    if (this.scrollEventThrottle) {
      handleScroll = throttle(handleScroll, this.props.scrollEventThrottle);
    }
    this.handleScroll = handleScroll;
    this.renderZscroller();
  }

  public componentWillUnmount() {
    this.domScroller.destroy();
  }

  public getMetrics = () => {
    const isVertical = !this.horizontal;
    return {
      visibleLength: this.domScroller.container[isVertical ? 'clientHeight' : 'clientWidth'],
      contentLength: this.domScroller.content[isVertical ? 'offsetHeight' : 'offsetWidth'],
      offset: this.domScroller.scroller.getValues()[isVertical ? 'top' : 'left']
    };
  };
  public getInnerViewNode = () => this.InnerScrollViewRef;
  public scrollTo = (...args) => {
    // it will change zScroller's dimensions on data loaded, so it needs fire reflow.
    this.domScroller.reflow();
    this.domScroller.scroller.scrollTo(...args);
  };

  public renderZscroller() {
    const {scrollerOptions, refreshControl, distanceToRefresh, onRefresh} = this;
    const {scrollingComplete, ...restProps} = scrollerOptions;
    this.domScroller = new DOMScroller(this.getInnerViewNode(), {
      scrollingX: false,
      onScroll: this.handleScroll,
      scrollingComplete: () => {
        if (refreshControl && this.state.deactive) {
          this.setState({deactive: false});
        }
        if (scrollingComplete) {
          scrollingComplete();
        }
      },
      ...restProps
    });
    if (refreshControl) {
      const scroller = this.domScroller.scroller;
      scroller.activatePullToRefresh(distanceToRefresh,
          () => {
            // console.log('reach to the distance');
            this.manuallyRefresh = true;
            this.overDistanceThenRelease = false;
            this.setState({active: true});
          },
          () => {
            // console.log('back to the distance');
            this.manuallyRefresh = false;
            this.setState({
              deactive: this.overDistanceThenRelease,
              active: false,
              loadingState: false
            });
          },
          () => {
            // console.log('Over distance and release to loading');
            this.overDistanceThenRelease = true;
            this.setState({
              deactive: false,
              loadingState: true
            });
            this._refreshControlTimer = setTimeout(() => {
              if (!this.props.refreshing) {
                scroller.finishPullToRefresh();
              }
              this._refreshControlTimer = undefined;
            }, 1000);
            onRefresh();
          });
      if (this.refreshing) {
        scroller.triggerPullToRefresh();
      }
    }
  }

  public render() {
    const {
      children, className, prefixCls, listPrefixCls, listViewPrefixCls,
      style = {}, contentContainerStyle = {}, refreshControl,
      icon, loading, refreshing
    } = this;

    const preCls = prefixCls || listViewPrefixCls || '';

    const containerProps = {
      ref: el => this.ScrollViewRef = el,
      style: {position: 'relative', overflow: 'hidden', ...style},
      className: classNames(className, `${preCls}-scrollview`)
    };
    const contentContainerProps = {
      ref: el => this.InnerScrollViewRef = el,
      style: {position: 'absolute', minWidth: '100%', ...contentContainerStyle},
      className: classNames(`${preCls}-scrollview-content`, listPrefixCls)
    };

    const {active, deactive, loadingState} = this.state;
    const wrapCls = classNames(`${preCls}-refresh-control-indicator`, {
      [`${preCls}-refresh-control-active`]: active,
      [`${preCls}-refresh-control-deactive`]: deactive,
      [`${preCls}-refresh-control-loading`]: loadingState || refreshing
    });

    if (refreshControl) {
      return (
          <div {...containerProps}>
            <div {...contentContainerProps}>
              <div ref={el => this.RefreshControlRef = el} className={wrapCls}>
                <div className={`${preCls}-refresh-control-indicator-icon-wrapper`}>{icon}</div>
                <div className={`${preCls}-refresh-control-indicator-loading-wrapper`}>{loading}</div>
              </div>
              {children}
            </div>
          </div>
      );
    }

    return (
        <div {...containerProps}>
          <div {...contentContainerProps}>
            {children}
          </div>
        </div>
    );
  }
}
