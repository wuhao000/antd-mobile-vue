import {Models} from '../date/data-types';

export const mergeDateTime = (date?: Date, time?: Date) => {
  const copyDate = date || new Date();
  if (!time) {
    return copyDate;
  }
  return new Date(
      copyDate.getFullYear(),
      copyDate.getMonth(),
      copyDate.getDate(),
      time.getHours(),
      time.getMinutes(),
      time.getSeconds()
  );
};

export const formatDate = (date: Date, format: string, locale?: Models.Locale) => {
  const week = locale && locale.week;

  const o: { [key: string]: any } = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'w+': week && week[date.getDay()],
    'S': date.getMilliseconds()
  };
  let copyFormat = format;
  if (/(y+)/.test(copyFormat)) {
    copyFormat = copyFormat.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(copyFormat)) {
      copyFormat = copyFormat.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return copyFormat;
};

const hasOwnProperty = Object.prototype.hasOwnProperty;

function is(x: any, y: any): boolean {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

export function shallowEqual(objA: any, objB: any, exclude: string[] = []): boolean {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    if (exclude.indexOf(keysA[i]) >= 0) {
      continue;
    }
    if (
        !hasOwnProperty.call(objB, keysA[i]) ||
        !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }

  return true;
}

export const getMonthDate = (date = new Date(), addMonth = 0) => {
  const y = date.getFullYear();
  const m = date.getMonth();
  return {
    firstDate: new Date(y, m + addMonth, 1),
    lastDate: new Date(y, m + 1 + addMonth, 0)
  };
};

export const getDateWithoutTime = (date?: Date) => {
  if (!date) {
    return 0;
  }
  return +new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
  );
};



export const genWeekData = (firstDate: Date, minDate?: Date, maxDate?: Date) => {
  const minDateTime = getDateWithoutTime(minDate);
  const maxDateTime = getDateWithoutTime(maxDate) || Number.POSITIVE_INFINITY;

  const weeks: Models.CellData[][] = [];
  const nextMonth = getMonthDate(firstDate, 1).firstDate;
  let currentDay = firstDate;
  let currentWeek: Models.CellData[] = [];
  weeks.push(currentWeek);

  const startWeekday = currentDay.getDay();
  if (startWeekday > 0) {
    for (let i = 0; i < startWeekday; i++) {
      currentWeek.push({} as Models.CellData);
    }
  }
  while (currentDay < nextMonth) {
    if (currentWeek.length === 7) {
      currentWeek = [];
      weeks.push(currentWeek);
    }
    const dayOfMonth = currentDay.getDate();
    const tick = +currentDay;
    currentWeek.push({
      tick,
      dayOfMonth,
      selected: Models.SelectType.None,
      isFirstOfMonth: dayOfMonth === 1,
      isLastOfMonth: false,
      outOfDate: tick < minDateTime || tick > maxDateTime
    });
    currentDay = new Date(currentDay.getTime() + 3600 * 24 * 1000);
  }
  currentWeek[currentWeek.length - 1].isLastOfMonth = true;
  return weeks;
};
