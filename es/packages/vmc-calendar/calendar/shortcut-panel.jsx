import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let ShortcutPanel = class ShortcutPanel extends Vue {
    onClick(type) {
        const today = new Date();
        switch (type) {
            case 'today':
                this.$emit('select', new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0), new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12));
                break;
            case 'yesterday':
                this.$emit('select', new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 0), new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 12));
                break;
            case 'lastweek':
                this.$emit('select', new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6, 0), new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12));
                break;
            case 'lastmonth':
                this.$emit('select', new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29, 0), new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12));
                break;
        }
    }
    render() {
        const { locale } = this;
        return (<div class={'shortcut-panel'}>
          <div class={'item'} onClick={() => this.onClick('today')}>{locale.today}</div>
          <div class={'item'} onClick={() => this.onClick('yesterday')}>{locale.yesterday}</div>
          <div class={'item'} onClick={() => this.onClick('lastweek')}>{locale.lastWeek}</div>
          <div class={'item'} onClick={() => this.onClick('lastmonth')}>{locale.lastMonth}</div>
        </div>);
    }
};
tslib_1.__decorate([
    Prop({})
], ShortcutPanel.prototype, "locale", void 0);
tslib_1.__decorate([
    Prop({})
], ShortcutPanel.prototype, "onSelect", void 0);
ShortcutPanel = tslib_1.__decorate([
    Component({
        name: 'ShortcutPanel'
    })
], ShortcutPanel);
export default ShortcutPanel;
//# sourceMappingURL=shortcut-panel.jsx.map