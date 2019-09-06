import {VNode} from 'vue';

export interface PopoverPropsType {
  onSelect?: (node: any, index?: number) => void;
  overlay: VNode;
  disabled?: boolean;
}
