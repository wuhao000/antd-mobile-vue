import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject, Prop, Watch} from 'vue-property-decorator';
import {CellData, ExtraData, Locale, MonthData, SelectType} from '../data-types';

@Component({
  name: 'SingleMonth'
})
class SingleMonth extends Vue {
  @Prop({type: Boolean, default: false})
  public displayMode: boolean;
  @Inject('currentValue')
  public currentValue: Date[];
  @Prop({})
  public locale: Locale;
  @Prop({})
  public monthData: MonthData;
  @Prop({type: String, default: 'normal'})
  public rowSize?: 'normal' | 'xl';
  @Prop({})
  public getDateExtra?: (date: Date, currentValue?: Date[]) => ExtraData;
  @Prop({})
  public callback: (dom) => any;
  public wrapperDivDOM: HTMLDivElement | null;
  public state = {
    weekComponents: []
  };

  public beforeMount() {
    this.monthData.weeks.forEach((week, index) => {
      this.genWeek(week, index);
    });
  }

  public mounted() {
    this.callback(this);
  }

  public genWeek(weeksData: CellData[], index: number) {
    const {getDateExtra, displayMode, monthData, locale, rowSize} = this;
    let rowCls = 'row';
    if (rowSize === 'xl') {
      rowCls += ' row-xl';
    }
    this.state.weekComponents[index] = (
      <div key={index} class={rowCls}>
        {
          weeksData.map((day, dayOfWeek) => {
            const extra = (getDateExtra && getDateExtra(new Date(day.tick),
              [...this.currentValue])) || {};
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
                    this.$emit('cellClick', day, monthData);
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
  }

  public updateWeeks(monthData?: MonthData) {
    (monthData || this.monthData).weeks.forEach((week, index) => {
      this.genWeek(week, index);
    });
  }

  @Watch('monthData')
  public monthDataChanged(data) {
    this.updateWeeks(data);
  }

  public setWarpper(dom: HTMLDivElement) {
    this.wrapperDivDOM = dom;
  }

  public render() {
    const {title} = this.monthData;
    const {weekComponents} = this.state;

    return (
      <div class="single-month" ref={this.setWarpper.bind(this)}>
        <div class="month-title">
          {title}
        </div>
        <div class="date">
          {weekComponents}
        </div>
      </div>
    );
  }
}

export default SingleMonth;
