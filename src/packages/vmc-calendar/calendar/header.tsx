import {defineComponent, PropType, VNode} from 'vue';
import {Locale} from '../data-types';

export interface PropsType {
  title?: string;
  locale?: Locale;
  showClear?: boolean;
  onCancel?: () => void;
  onClear?: () => void;
  closeIcon?: VNode;
  clearIcon?: VNode;
}

const Header = defineComponent({
  name: 'Header',
  props: {
    title: {type: String},
    locale: {type: Object as PropType<Locale>},
    showClear: {type: Boolean},
    closeIcon: {default: 'X'},
    clearIcon: {}
  },
  render() {
    const {
      title,
      locale = {} as Locale,
      showClear,
      closeIcon,
      clearIcon
    } = this;

    return (
      <div class="header">
        <span class="left" onClick={() => this.$emit('cancel')}>{closeIcon}</span>
        <span class="title">{title || locale.title}</span>
        {
          showClear &&
          <span class="right"
                onClick={() => this.$emit('clear')}
          >{clearIcon || locale.clear}</span>
        }
      </div>
    );
  }
});

export default Header as any;
