import {VNode} from 'vue';
import SingleMonth from './date/single-month';

export enum SelectType {
  None,
  /** 单选 */
  Single,
  /** 起/止 */
  All,
  /** 区间仅选择了 起 */
  Only,
  /** 区间起 */
  Start,
  /** 区间中 */
  Middle,
  /** 区间止 */
  End,
}

export interface CellData {
  dayOfMonth: number;
  isFirstOfMonth: boolean;
  isLastOfMonth: boolean;
  outOfDate: boolean;
  selected: SelectType;
  tick: number;
}

export interface ExtraData {
  /** (web only) 附加cell样式 className */
  cellCls?: any;
  cellRender?: (date: Date) => VNode;
  /** 是否禁止选择 */
  disable?: boolean;
  /** 扩展信息 */
  info?: string;
  /**
   * 是否被选中，静态展示模式下有效
   */
  selected?: boolean;
}

export interface MonthData {
  component?: VNode;
  componentRef?: SingleMonth;
  firstDate: Date;
  height?: number;
  lastDate: Date;
  title: string;
  updateLayout?: any;
  weeks: CellData[][];
  y?: number;
}

export interface Locale {
  am: string;
  begin: string;
  begin_over: string;
  clear: string;
  confirm: string;
  dateFormat: string;
  dateTimeFormat: string;
  end: string;
  lastMonth: string;
  lastWeek: string;
  loadPrevMonth: string;
  month: string;
  monthTitle: string;
  noChoose: string;
  over: string;
  pm: string;
  selectEndTime: string;
  selectStartTime: string;
  selectTime: string;
  start: string;
  title: string;
  today: string;
  week: string[];
  year: string;
  yesterday: string;
}
