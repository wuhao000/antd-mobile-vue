import {VNode} from 'vue';

export interface ResultPropsType {
  imgUrl?: string;
  img?: string | VNode;
  title?: string | VNode;
  message?: string | VNode;
  buttonText?: string;
  buttonType?: 'primary' | 'ghost';
  onButtonClick?: () => void;
}
