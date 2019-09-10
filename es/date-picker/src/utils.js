function formatIt(date, form) {
  var pad = function pad(n) {
    return n < 10 ? "0" + n : n;
  };

  var dateStr = date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
  var timeStr = pad(date.getHours()) + ":" + pad(date.getMinutes());

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

  return dateStr + " " + timeStr;
}

export function formatFn(instance, value) {
  var formatsEnum = {
    date: 'YYYY-MM-DD',
    time: 'HH:mm',
    datetime: 'YYYY-MM-DD HH:mm',
    year: 'YYYY',
    month: 'YYYY-MM'
  };
  var format = instance.$props.format;
  var type = typeof format;

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
    return formatIt(new Date(value), formatsEnum[instance.$props.mode]);
  } else {
    return formatIt(value, formatsEnum[instance.$props.mode]);
  }
}