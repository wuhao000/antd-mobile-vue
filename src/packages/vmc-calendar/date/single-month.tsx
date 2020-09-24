import {defineComponent, inject, onBeforeMount, onMounted, PropType, reactive, Ref, ref, watch} from 'vue';
import {CellData, ExtraData, Locale, MonthData, SelectType} from '../data-types';

const SingleMonth = defineComponent({
  name: 'SingleMonth',
  props: {
    displayMode: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    locale: {
      type: Object as PropType<Locale>
    },
    monthData: {
      type: Object as PropType<MonthData>
    },
    rowSize: {
      type: String as PropType<'normal' | 'xl'>,
      default: 'normal'
    },
    getDateExtra: {
      type: Function as PropType<(date: Date, currentValue?: Date[]) => ExtraData>
    },
    callback: {
      type: Function as PropType<(dom) => any>
    }
  },
  setup(props, {emit}) {
    const currentValue: Date[] = inject('currentValue');
    const wrapperDivDOM: Ref<HTMLDivElement | null> = ref(null);
    const state = reactive({
      weekComponents: []
    });
    watch(() => props.monthData, (data) => {
      updateWeeks(data);
    });

    onBeforeMount(() => {
      props.monthData.weeks.forEach((week, index) => {
        genWeek(week, index);
      });
    });
    onMounted(() => {
      props.callback(this);
    });
    const genWeek = (weeksData: CellData[], index: number) => {
      const {getDateExtra, displayMode, monthData, locale, rowSize} = props;
      let rowCls = 'row';
      if (rowSize === 'xl') {
        rowCls += ' row-xl';
      }
      state.weekComponents[index] = (
        <div key={index} class={rowCls}>
          {
            weeksData.map((day, dayOfWeek) => {
              const extra = (getDateExtra && getDateExtra(new Date(day.tick),
                [...currentValue])) || {};
              let info = extra.info;
              const disable = extra.disable || day.outOfDate;

              let cls = 'date';
              let lCls = 'left';
              let rCls = 'right';
              let infoCls = 'info';

              if (dayOfWeek === 0 || dayOfWeek === 6) {
                cls += ' grey';
              }

              if (disable) {
                cls += ' disable';
              } else if (info) {
                cls += ' important';
              }
              if (displayMode && extra.selected) {
                cls += ' date-selected selected-single';
              }
              if (day.selected) {
                cls += ' date-selected';
                let styleType = day.selected;
                switch (styleType) {
                  case SelectType.Only:
                    info = locale.begin;
                    infoCls += ' date-selected';
                    break;
                  case SelectType.All:
                    info = locale.begin_over;
                    infoCls += ' date-selected';
                    break;

                  case SelectType.Start:
                    info = locale.begin;
                    infoCls += ' date-selected';
                    if (dayOfWeek === 6 || day.isLastOfMonth) {
                      styleType = SelectType.All;
                    }
                    break;
                  case SelectType.Middle:
                    if (dayOfWeek === 0 || day.isFirstOfMonth) {
                      if (day.isLastOfMonth || dayOfWeek === 6) {
                        styleType = SelectType.All;
                      } else {
                        styleType = SelectType.Start;
                      }
                    } else if (dayOfWeek === 6 || day.isLastOfMonth) {
                      styleType = SelectType.End;
                    }
                    break;
                  case SelectType.End:
                    info = locale.over;
                    infoCls += ' date-selected';
                    if (dayOfWeek === 0 || day.isFirstOfMonth) {
                      styleType = SelectType.All;
                    }
                    break;
                }

                switch (styleType) {
                  case SelectType.Single:
                  case SelectType.Only:
                  case SelectType.All:
                    cls += ' selected-single';
                    break;
                  case SelectType.Start:
                    cls += ' selected-start';
                    rCls += ' date-selected';
                    break;
                  case SelectType.Middle:
                    cls += ' selected-middle';
                    lCls += ' date-selected';
                    rCls += ' date-selected';
                    break;
                  case SelectType.End:
                    cls += ' selected-end';
                    lCls += ' date-selected';
                    break;
                }
              }

              const defaultContent = [
                <div key="wrapper" class="date-wrapper">
                  <span class={lCls}/>
                  <div class={cls}>
                    {day.dayOfMonth}
                  </div>
                  <span class={rCls}/>
                </div>
                ,
                <div key="info" class={infoCls}>{info}</div>
              ];

              return (
                <div key={dayOfWeek} class={`cell ${extra.cellCls || ''}`} onClick={() => {
                  if (!disable) {
                    if (!displayMode) {
                      emit('cellClick', day, monthData);
                    }
                  }
                }}>
                  {
                    extra.cellRender ?
                      extra.cellRender(new Date(day.tick))
                      :
                      defaultContent
                  }
                </div>
              );
            })
          }
        </div>
      );
    };
    const updateWeeks = (monthData?: MonthData) => {
      (monthData || props.monthData).weeks.forEach((week, index) => {
        genWeek(week, index);
      });
    };
    const setWrapper = (dom) => {
      wrapperDivDOM.value = dom;
    };
    return {state, setWrapper};
  },
  render() {
    const {title} = this.monthData;
    const {weekComponents} = this.state;
    return (
      <div class="single-month" ref={this.setWrapper}>
        <div class="month-title">
          {title}
        </div>
        <div class="date">
          {weekComponents}
        </div>
      </div>
    );
  }
});
export default SingleMonth as any;
