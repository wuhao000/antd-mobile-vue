import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import zhCN from '../src/locale/zh_CN';
const extra = {
    '2017/07/15': { info: 'Disable', disable: true }
};
const now = new Date();
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5)] = { info: 'Disable', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6)] = { info: 'Disable', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)] = { info: 'Disable', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8)] = { info: 'Disable', disable: true };
Object.keys(extra).forEach((key) => {
    const info = extra[key];
    const date = new Date(key);
    if (!Number.isNaN(+date) && !extra[+date]) {
        extra[+date] = info;
    }
});
let Test = class Test extends Vue {
    constructor() {
        super(...arguments);
        this.originbodyScrollY = document.getElementsByTagName('body')[0].style.overflowY;
        this.state = {
            en: false,
            show: false,
            config: {},
            startTime: null,
            endTime: null
        };
    }
    renderBtn(zh, en, config = {}) {
        config.locale = zhCN;
        return (<m-calendar-item attrs={config} title={this.state.en ? en : zh} onCancel={this.onCancel} onConfirm={this.onConfirm} onSelectHasDisableDate={this.onSelectHasDisableDate} getDateExtra={this.getDateExtra} defaultDate={now} minDate={new Date(+now - 5184000000)} maxDate={new Date(+now + 31536000000)}>
        </m-calendar-item>);
    }
    changeLanguage() {
        this.state.en = !this.state.en;
    }
    onSelectHasDisableDate(dates) {
        console.warn('onSelectHasDisableDate', dates);
    }
    onConfirm(startTime, endTime) {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.state.show = false;
        this.state.startTime = startTime;
        this.state.endTime = endTime;
    }
    onCancel() {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.state.show = false;
        this.state.startTime = undefined;
        this.state.endTime = undefined;
    }
    getDateExtra(date) {
        return extra[+date];
    }
    render() {
        return (<div>
          <m-list class="calendar-list" style={{ backgroundColor: 'white' }}>
            {this.renderBtn('选择日期区间', 'Select Date Range')}
            {this.renderBtn('选择日期时间区间', 'Select DateTime Range', { pickTime: true })}
            {this.renderBtn('选择日期', 'Select Date', { type: 'one' })}
            {this.renderBtn('选择日期时间', 'Select DateTime', { type: 'one', pickTime: true })}
            {this.renderBtn('选择日期区间(快捷)', 'Select Date Range (Shortcut)', { showShortcut: true })}
            {this.renderBtn('选择日期时间区间(快捷)', 'Select DateTime Range (Shortcut)', { pickTime: true, showShortcut: true })}
            {this.renderBtn('大行距', 'XL row size', { rowSize: 'xl' })}
            {this.renderBtn('不无限滚动', 'infinite: false', { infinite: false })}
            {this.renderBtn('水平进入', 'Horizontal enter', { enterDirection: 'horizontal' })}
            {this.renderBtn('默认选择范围', 'Selected Date Range', { value: [new Date(+now - 86400000), new Date(+now - 345600000)] })}
            {this.renderBtn('onSelect API', 'onSelect API', {
            onSelect: (date, state) => {
                console.log('onSelect', date, state);
                return [date, new Date(+now - 604800000)];
            }
        })}
            {this.state.startTime &&
            <m-list-item>Time1: {this.state.startTime.toLocaleString()}</m-list-item>}
            {this.state.endTime &&
            <m-list-item>Time2: {this.state.endTime.toLocaleString()}</m-list-item>}
          </m-list>
        </div>);
    }
};
Test = tslib_1.__decorate([
    Component({
        name: 'Test'
    })
], Test);
export default Test;
//# sourceMappingURL=demo1.jsx.map