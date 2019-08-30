import {VNode} from 'vue';

export default interface ITriggerProps {
  afterPopupVisibleChange?: Function;
  builtinPlacements?: any;
  defaultPopupVisible?: boolean;
  destroyPopupOnHide?: boolean;
  getDocument?: Function;
  getPopupClassNameFromAlign?: any;
  getPopupContainer?: Function;
  mask?: boolean;
  maskAnimation?: string;
  maskClosable?: boolean;
  maskTransitionName?: string | {};
  onPopupAlign?: Function;
  onPopupVisibleChange?: Function;
  popup: VNode | Function;
  popupAlign?: any;
  popupAnimation?: any;
  popupClassName?: string;
  popupPlacement?: string;
  popupStyle?: any;
  popupTransitionName?: string | {};
  popupVisible?: boolean;
  prefixCls?: string;
  zIndex?: number;
}
