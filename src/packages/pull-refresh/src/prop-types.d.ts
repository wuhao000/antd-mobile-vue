import {VNode} from 'vue';

export interface Indicator {
  activate?: any;
  deactivate?: any;
  release?: any;
  finish?: any;
}

export interface IPropsType {
  onRefresh: () => void;
  getScrollContainer?: () => VNode;
  direction?: 'down' | 'up';
  refreshing?: boolean;
  distanceToRefresh?: number;
  indicator?: Indicator;
  prefixCls?: string;
  damping?: number;
}
