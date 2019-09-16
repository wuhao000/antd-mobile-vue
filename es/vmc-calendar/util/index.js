import { SelectType } from '../data-types';
export var mergeDateTime = function mergeDateTime(date, time) {
  var copyDate = date || new Date();

  if (!time) {
    return copyDate;
  }

  return new Date(copyDate.getFullYear(), copyDate.getMonth(), copyDate.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
};
export var formatDate = function formatDate(date, format, locale) {
  var week = locale && locale.week;
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'w+': week && week[date.getDay()],
    'S': date.getMilliseconds()
  };
  var copyFormat = format;

  if (/(y+)/.test(copyFormat)) {
    copyFormat = copyFormat.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp('(' + k + ')').test(copyFormat)) {
      copyFormat = copyFormat.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }

  return copyFormat;
};
var hasOwnProperty = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

export function shallowEqual(objA, objB, exclude) {
  if (exclude === void 0) {
    exclude = [];
  }

  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (var i = 0; i < keysA.length; i++) {
    if (exclude.indexOf(keysA[i]) >= 0) {
      continue;
    }

    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}
export var getMonthDate = function getMonthDate(date, addMonth) {
  if (date === void 0) {
    date = new Date();
  }

  if (addMonth === void 0) {
    addMonth = 0;
  }

  var y = date.getFullYear();
  var m = date.getMonth();
  return {
    firstDate: new Date(y, m + addMonth, 1),
    lastDate: new Date(y, m + 1 + addMonth, 0)
  };
};
export var getDateWithoutTime = function getDateWithoutTime(date) {
  if (!date) {
    return 0;
  }

  return +new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
export var genWeekData = function genWeekData(firstDate, minDate, maxDate) {
  var minDateTime = getDateWithoutTime(minDate);
  var maxDateTime = getDateWithoutTime(maxDate) || Number.POSITIVE_INFINITY;
  var weeks = [];
  var nextMonth = getMonthDate(firstDate, 1).firstDate;
  var currentDay = firstDate;
  var currentWeek = [];
  weeks.push(currentWeek);
  var startWeekday = currentDay.getDay();

  if (startWeekday > 0) {
    for (var i = 0; i < startWeekday; i++) {
      currentWeek.push({});
    }
  }

  while (currentDay < nextMonth) {
    if (currentWeek.length === 7) {
      currentWeek = [];
      weeks.push(currentWeek);
    }

    var dayOfMonth = currentDay.getDate();
    var tick = +currentDay;
    currentWeek.push({
      tick: tick,
      dayOfMonth: dayOfMonth,
      selected: SelectType.None,
      isFirstOfMonth: dayOfMonth === 1,
      isLastOfMonth: false,
      outOfDate: tick < minDateTime || tick > maxDateTime
    });
    currentDay = new Date(currentDay.getTime() + 3600 * 24 * 1000);
  }

  currentWeek[currentWeek.length - 1].isLastOfMonth = true;
  return weeks;
};