import { defineComponent } from 'vue';
export default defineComponent({
    name: 'ShortcutPanel',
    props: {
        locale: { type: Object },
        onSelect: {}
    },
    setup(props, { emit }) {
        const onClick = (type) => {
            const today = new Date();
            switch (type) {
                case 'today':
                    emit('select', new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0), new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12));
                    break;
                case 'yesterday':
                    emit('select', new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 0), new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 12));
                    break;
                case 'lastweek':
                    emit('select', new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6, 0), new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12));
                    break;
                case 'lastmonth':
                    emit('select', new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29, 0), new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12));
                    break;
            }
        };
        return { onClick };
    },
    render() {
        const { locale } = this;
        return (<div class="shortcut-panel">
        <div class="item" onClick={() => this.onClick('today')}>{locale.today}</div>
        <div class="item" onClick={() => this.onClick('yesterday')}>{locale.yesterday}</div>
        <div class="item" onClick={() => this.onClick('lastweek')}>{locale.lastWeek}</div>
        <div class="item" onClick={() => this.onClick('lastmonth')}>{locale.lastMonth}</div>
      </div>);
    }
});
//# sourceMappingURL=shortcut-panel.jsx.map