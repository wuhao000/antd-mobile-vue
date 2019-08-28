function formatIt(date: Date, form: string) {
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
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

export function formatFn(instance: any, value: Date | number) {
  const formatsEnum = {
    date: 'YYYY-MM-DD',
    time: 'HH:mm',
    datetime: 'YYYY-MM-DD HH:mm',
    year: 'YYYY',
    month: 'YYYY-MM'
  };
  const {format} = instance.$props;
  const type = typeof format;
  if (type === 'string') {
    if (typeof value === 'number') {
      return formatIt(new Date(value), format);
    } else {
      return formatIt(value, format);
    }
  }
  if (type === 'function') {
    return format(value);
  }
  if (typeof value === 'number') {
    return formatIt(new Date(value), (formatsEnum as any)[instance.$props.mode]);
  } else {
    return formatIt(value, (formatsEnum as any)[instance.$props.mode]);
  }
}
