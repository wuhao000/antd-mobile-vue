import {useDatePickerBase} from '@/packages/vmc-calendar/date-picker-base';
import {computed, defineComponent, onMounted, ref} from 'vue';
import {Locale, MonthData} from './data-types';
import DatePickerProps from './date-picker-props';
import SingleMonth from './date/single-month';
import WeekPanel from './date/week-panel';

const DatePicker = defineComponent({
  name: 'DatePicker',
  props: {
    ...DatePickerProps,
    displayMode: {type: Boolean, default: false}
  },
  setup(props, {emit}) {
    const genMonthComponent = (data?: MonthData) => {
      if (!data) {
        return;
      }
      // @ts-ignore
      return <SingleMonth key={data.title}
                          locale={props.locale || {} as Locale}
                          monthData={data}
                          displayMode={props.displayMode}
                          rowSize={props.rowSize}
                          onCellClick={(day) => {
                            onCellClick(day);
                          }}
                          getDateExtra={props.getDateExtra}
                          callback={(dom: { updateWeeks: (data?: MonthData) => any }) => {
                            data.componentRef = dom || data.componentRef || undefined;
                            data.updateLayout = () => {
                              computeHeight(data, dom);
                            };
                            data.updateLayout();
                          }}
      />;
    };
    const {genMonthData, updateFlag, visibleMonth, createOnScroll, onCellClick, canLoadPrev, state} = useDatePickerBase(props, {emit}, {genMonthComponent});
    const transform = ref('');
    const wrapper = ref(null);
    const panel = ref(null);
    const touchHandler = computed(() => {
      const initDelta = 0;
      let lastY = 0;
      let delta = initDelta;
      const onFinish = () => {
        if (delta > 40 && canLoadPrev()) {
          genMonthData(state.months[0].firstDate, -1);

          visibleMonth.value = state.months.slice(0, props.initialMonths);

          state.months.forEach((m) => {
            m.updateLayout && m.updateLayout();
          });
          updateFlag.value++;
        }
        setTransform(panel.value.style, `translate3d(0,0,0)`);
        setTransition(panel.value.style, '.3s');
        setTimeout(() => {
          panel.value && setTransition(panel.value.style, '');
        }, 300);
      };
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
            setTransform(panel.value.style, `translate3d(0,${delta}px,0)`);
          }
        },
        onTouchEnd: () => {
          onFinish();
        },
        onTouchCancel: () => {
          onFinish();
        },
        onFinish
      };
    });
    const computeHeight = (data: MonthData, singleMonth) => {
      if (singleMonth && singleMonth.wrapperDivDOM) {
        // preact, ref时dom有可能无height, offsetTop数据。
        if (!data.height && !singleMonth.wrapperDivDOM.clientHeight) {
          setTimeout(() => computeHeight(data, singleMonth), 500);
          return;
        }
        data.height = singleMonth.wrapperDivDOM.clientHeight || data.height || 0;
        data.y = singleMonth.wrapperDivDOM.offsetTop || data.y || 0;
      }
    };
    onMounted(() => {
      if (wrapper.value) {
        emit('layout', wrapper.value.clientHeight);
        const scrollHandler = createOnScroll();
        wrapper.value.onscroll = (evt) => {
          scrollHandler({
            client: wrapper.value.clientHeight,
            full: (evt.currentTarget as HTMLDivElement).clientHeight,
            top: (evt.currentTarget as HTMLDivElement).scrollTop
          });
        };
      }
    });
    const setTransform = (nodeStyle: CSSStyleDeclaration, value: any) => {
      transform.value = value;
      nodeStyle.transform = value;
      nodeStyle.webkitTransform = value;
    };
    const setTransition = (nodeStyle: CSSStyleDeclaration, value: any) => {
      nodeStyle.transition = value;
      nodeStyle.webkitTransition = value;
    };
    return {
      canLoadPrev, state, visibleMonth,
      setPanel(el) {
        panel.value = el;
      },
      setWrapper(el) {
        wrapper.value = el;
      },
      transform,
      touchHandler,
      genMonthComponent
    };
  },
  render() {
    const {prefixCls = '', locale = {} as Locale} = this;
    const style: any = {
      transform: this.transform
    };
    const wrapperEvents = {
      onTouchstart: this.touchHandler.onTouchStart,
      onTouchmove: this.touchHandler.onTouchMove,
      onTouchend: this.touchHandler.onTouchEnd,
      onTouchcancel: this.touchHandler.onTouchCancel
    };
    return (
      <div class={`${prefixCls} date-picker`}>
        <WeekPanel locale={locale}/>
        <div class="wrapper"
             style={{
               overflowX: 'hidden',
               overflowY: 'visible'
             }}
             ref={this.setWrapper}
             {...wrapperEvents}>
          <div style={style} ref={this.setPanel}>
            {
              this.canLoadPrev() && <div class="load-tip">{locale.loadPrevMonth}</div>
            }
            <div class="months">
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
});
export default DatePicker as any;
