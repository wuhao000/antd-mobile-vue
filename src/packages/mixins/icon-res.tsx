import {VNode} from 'vue';
import {Options, Vue} from 'vue-class-component';
import Icon from '../icon';

const httpReg = /^http(s)?:\/\//;

export interface IconResProps {
  iconType: 'img' | 'icon';

  [key: string]: any;
}

@Options({
  name: 'IconRes',
  props: {
    type: [String, Object]
  }
})
class IconRes extends Vue {
  public type: any;

  public render() {
    const icon = this.type;
    if (typeof icon === 'string') {
      if (httpReg.test(icon)) {
        return <img src={icon} alt={''}/>;
      } else {
        return <Icon type={icon} size={'md'}/>;
      }
    } else if (typeof icon === 'object') {
      if (icon.context) {
        return icon;
      } else if ((icon as IconResProps).iconType === 'img') {
        return <img src={icon} {...icon} alt={''}/>;
      } else if ((icon as IconResProps).iconType === 'icon') {
        return <Icon {...{props: icon}}/>;
      }
    }
  }
}

export default IconRes as any;
