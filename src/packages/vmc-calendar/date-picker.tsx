import {VNode} from 'vue';
import Component, {mixins} from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import DatePickerBase from './date-picker-base';
import {Models} from './date/data-types';
import SingleMonth from './date/single-month';
import WeekPanel from './date/week-panel';

@Component({
  name: 'DatePicker'
})
class DatePicker extends mixins(DatePickerBase) {

  @Prop({type: Boolean, default: false})
  public displayMode: boolean;

  public get panel(): HTMLDivElement {
    return this.$refs['panel'] as HTMLDivElement;
  }

  public transform: string = '';

  public genMonthComponent(data?: Models.MonthData): VNode {
    if (!data) {
      return;
    }
    // @ts-ignore
    return <SingleMonth key={data.title}
                        locale={this.locale || {} as Models.Locale}
                        monthData={data}
                        displayMode={this.displayMode}
                        rowSize={this.rowSize}
                        onCellClick={(day) => {
                          this.onCellClick(day);
                        }}
                        getDateExtra={this.getDateExtra}
                        callback={(dom) => {
                          data.componentRef = dom || data.componentRef || undefined;
                          data.updateLayout = () => {
                            this.computeHeight(data, dom);
                          };
                          data.updateLayout();
                        }}
    />;
  }

  public computeHeight(data: Models.MonthData, singleMonth) {
    if (singleMonth && singleMonth.wrapperDivDOM) {
      // preact, ref时dom有可能无height, offsetTop数据。
      if (!data.height && !singleMonth.wrapperDivDOM.clientHeight) {
        setTimeout(() => this.computeHeight(data, singleMonth), 500);
        return;
      }
      data.height = singleMonth.wrapperDivDOM.clientHeight || data.height || 0;
      data.y = singleMonth.wrapperDivDOM.offsetTop || data.y || 0;
    }
  }

  public mounted() {
    const wrapper = this.$refs['wrapper'] as HTMLDivElement;
    if (wrapper) {
      this.$emit('layout', wrapper.clientHeight);
      const scrollHandler = this.createOnScroll();
      wrapper.onscroll = (evt) => {
        scrollHandler({
          client: wrapper.clientHeight,
          full: (evt.currentTarget as HTMLDivElement).clientHeight,
          top: (evt.currentTarget as HTMLDivElement).scrollTop
        });
      };
    }
  }

  get touchHandler() {
    const initDelta = 0;
    let lastY = 0;
    let delta = initDelta;

    return {
      onTouchStart: (evt) => {
        lastY = evt.touches[0].screenY;
        delta = initDelta;
      },
      onTouchMove: (evt) => {
        const ele = evt.currentTarget;
        const isReachTop = ele.scrollTop === 0;

        if (isReachTop) {
          delta = evt.touches[0].screenY - lastY;
          if (delta > 0) {
            evt.preventDefault();
            if (delta > 80) {
              delta = 80;
            }
          } else {
            delta = 0;
          }
          this.setTransform(this.panel.style, `translate3d(0,${delta}px,0)`);
        }
      },

      onTouchEnd: () => {
        this.touchHandler.onFinish();
      },

      onTouchCancel: () => {
        this.touchHandler.onFinish();
      },

      onFinish: () => {
        if (delta > 40 && this.canLoadPrev()) {
          this.genMonthData(this.state.months[0].firstDate, -1);

          this.visibleMonth = this.state.months.slice(0, this.initialMonths);

          this.state.months.forEach((m) => {
            m.updateLayout && m.updateLayout();
          });
          this.$forceUpdate();
        }
        this.setTransform(this.panel.style, `translate3d(0,0,0)`);
        this.setTransition(this.panel.style, '.3s');
        setTimeout(() => {
          this.panel && this.setTransition(this.panel.style, '');
        }, 300);
      }
    };
  }

  public setTransform(nodeStyle: CSSStyleDeclaration, value: any) {
    this.transform = value;
    nodeStyle.transform = value;
    nodeStyle.webkitTransform = value;
  }

  public setTransition(nodeStyle: CSSStyleDeclaration, value: any) {
    nodeStyle.transition = value;
    nodeStyle.webkitTransition = value;
  }

  public render() {
    const {prefixCls = '', locale = {} as Models.Locale} = this;
    const style: any = {
      transform: this.transform
    };
    const wrapperEvents = {
      touchstart: this.touchHandler.onTouchStart,
      touchmove: this.touchHandler.onTouchMove,
      touchend: this.touchHandler.onTouchEnd,
      touchcancel: this.touchHandler.onTouchCancel
    };
    return (
        <div class={`${prefixCls} date-picker`}>
          <WeekPanel locale={locale}/>
          <div class={'wrapper'}
               style={{
                 overflowX: 'hidden',
                 overflowY: 'visible'
               }}
               ref={'wrapper'}
               on={wrapperEvents}>
            <div style={style} ref={'panel'}>
              {
                this.canLoadPrev() && <div class={'load-tip'}>{locale.loadPrevMonth}</div>
              }
              <div class={'months'}>
                {
                  this.state.months.map((m) => {
                    const hidden = m.height && this.visibleMonth.indexOf(m) < 0;
                    if (hidden) {
                      return <div key={m.title + '_shallow'} style={{height: m.height}}/>;
                    }
                    return m.component;
                  })
                }
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default DatePicker as any;
