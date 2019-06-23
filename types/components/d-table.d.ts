import {VNode} from 'vue';
import {UIComponent} from './component';

export declare class DTableComponent extends UIComponent {
}


interface Action {
  label?: string;
  icon?: string;
  onClick: (...args: any) => any;
}

export interface TableColumn {
  align?: 'left' | 'right' | 'center';
  colSpan?: number;
  dataType?: 'date' | 'number' | 'index';
  dataTypeOptions: { [key: string]: any };
  dataIndex?: string;
  filterDropdown?: VNode;
  filterDropdownVisible?: boolean;
  filtered?: boolean;
  /** 筛选的受控属性，外界可用此控制列的筛选状态，值为已筛选的 value 数组 */
  filteredValue?: string[];
  filterIcon?: VNode | ((filtered: boolean, column: TableColumn) => VNode);
  filterMultiple?: boolean;
  /** 表头的筛选菜单项 */
  filters?: object[];
  /** 列是否固定，可选 true(等效于 left) 'left' 'right' */
  fixed?: boolean | string;
  /** Vue 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性 */
  key?: string;
  /**
   * 自定义渲染函数
   * @param text 渲染的字段，指定dataIndex时为dataIndex指向的字段，未指定dataIndex时同record
   * @param record 当前行渲染的数据对象
   * @param index 行索引
   * @returns {VNode | string | number | boolean}
   */
  customRender?: (text, record, index) => VNode | string | number | boolean;
  /** 排序函数，本地排序使用一个函数(参考 Array.sort 的 compareFunction)，需要服务端排序可设为 true */
  sorter?: boolean | ((...args: any) => any);
  /**
   * 排序的受控属性，外界可用此控制列的排序，可设置为 'ascend' 'descend' false
   */
  sortOrder?: boolean | string;
  /**
   * 列头显示文字
   */
  title?: string | VNode;
  width?: string | number;
  customCell?: (record: any, rowIndex: any) => any;
  customHeaderCell?: (column: TableColumn) => any;
  scopedSlots?: { [key: string]: any };
  actions: Array<Action | Action[]>;
}
