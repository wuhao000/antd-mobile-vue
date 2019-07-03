import {VNode} from 'vue';
import { CascaderValue } from '../../vmc-cascader/cascader-types';
import { IPopupPickerProps } from '../../vmc-picker/popup-picker-types';
export interface PickerData {
  value: string | number;
  label: VNode | string;
  children?: PickerData[];
}
export interface PickerPropsType extends IPopupPickerProps {
  data: PickerData[] | PickerData[][];
  cascade?: boolean;
  value?: Array<string | number>;
  format?: (values: VNode[]) => string | VNode;
  cols?: number;
  extra?: string;
  onChange?: (date?: CascaderValue) => void;
  onPickerChange?: (value: CascaderValue) => void;
  itemStyle?: any;
  indicatorStyle?: any;
}
