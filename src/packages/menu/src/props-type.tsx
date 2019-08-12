import {VNode} from 'vue';

export interface DataItem {
  label?: string | VNode;
  value?: any;
  isLeaf?: boolean;
  disabled?: boolean;
  [key: string]: any;
}

export type ValueType = Array<string | string[]>;
