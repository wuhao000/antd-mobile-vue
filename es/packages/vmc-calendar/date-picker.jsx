import * as tslib_1 from "tslib";
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import DatePickerBase from './date-picker-base';
import SingleMonth from './date/single-month';
import WeekPanel from './date/week-panel';
let DatePicker = class DatePicker extends mixins(DatePickerBase) {
    constructor() {
        super(...arguments);
        this.transform = '';
    }
    get panel() {
        return this.$refs['panel'];
    }
    genMonthComponent(data) {
        if (!data) {
            return;
        }
        // @ts-ignore
        return <SingleMonth key={data.title} locale={this.locale || {}} monthData={data} displayMode={this.displayMode} rowSize={this.rowSize} onCellClick={(day) => {
            this.onCellClick(day);
        }} getDateExtra={this.getDateExtra} callback={(dom) => {
            data.componentRef = dom || data.componentRef || undefined;
            data.updateLayout = () => {
                this.computeHeight(data, dom);
            };
            data.updateLayout();
        }}/>;
    }
    computeHeight(data, singleMonth) {
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
    mounted() {
        const wrapper = this.$refs['wrapper'];
        if (wrapper) {
            this.$emit('layout', wrapper.clientHeight);
            const scrollHandler = this.createOnScroll();
            wrapper.onscroll = (evt) => {
                scrollHandler({
                    client: wrapper.clientHeight,
                    full: evt.currentTarget.clientHeight,
                    top: evt.currentTarget.scrollTop
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
                    }
                    else {
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
    setTransform(nodeStyle, value) {
        this.transform = value;
        nodeStyle.transform = value;
        nodeStyle.webkitTransform = value;
    }
    setTransition(nodeStyle, value) {
        nodeStyle.transition = value;
        nodeStyle.webkitTransition = value;
    }
    render() {
        const { prefixCls = '', locale = {} } = this;
        const style = {
            transform: this.transform
        };
        const wrapperEvents = {
            touchstart: this.touchHandler.onTouchStart,
            touchmove: this.touchHandler.onTouchMove,
            touchend: this.touchHandler.onTouchEnd,
            touchcancel: this.touchHandler.onTouchCancel
        };
        return (<div class={`${prefixCls} date-picker`}>
          <WeekPanel locale={locale}/>
          <div class={'wrapper'} style={{
            overflowX: 'hidden',
            overflowY: 'visible'
        }} ref={'wrapper'} on={wrapperEvents}>
            <div style={style} ref={'panel'}>
              {this.canLoadPrev() && <div class={'load-tip'}>{locale.loadPrevMonth}</div>}
              <div class={'months'}>
                {this.state.months.map((m) => {
            const hidden = m.height && this.visibleMonth.indexOf(m) < 0;
            if (hidden) {
                return <div key={m.title + '_shallow'} style={{ height: m.height }}/>;
            }
            return m.component;
        })}
              </div>
            </div>
          </div>
        </div>);
    }
};
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], DatePicker.prototype, "displayMode", void 0);
DatePicker = tslib_1.__decorate([
    Component({
        name: 'DatePicker'
    })
], DatePicker);
export default DatePicker;
//# sourceMappingURL=date-picker.jsx.map