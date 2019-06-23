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
