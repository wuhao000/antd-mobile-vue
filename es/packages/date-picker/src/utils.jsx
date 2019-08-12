function formatIt(date, form) {
    const pad = (n) => (n < 10 ? `0${n}` : n);
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    if (form === 'YYYY') {
        return date.getFullYear() + '';
    }
    if (form === 'YYYY-MM-DD') {
        return dateStr;
    }
    if (form === 'YYYY-MM') {
        return dateStr.substring(0, 7);
    }
    if (form === 'HH:mm') {
        return timeStr;
    }
    return `${dateStr} ${timeStr}`;
}
export function formatFn(instance, value) {
    const formatsEnum = {
        date: 'YYYY-MM-DD',
        time: 'HH:mm',
        datetime: 'YYYY-MM-DD HH:mm',
        year: 'YYYY',
        month: 'YYYY-MM'
    };
    const { format } = instance.$props;
    const type = typeof format;
    if (type === 'string') {
        return formatIt(value, format);
    }
    if (type === 'function') {
        return format(value);
    }
    return formatIt(value, formatsEnum[instance.$props.mode]);
}
//# sourceMappingURL=utils.jsx.map