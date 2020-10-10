/* tslint:disable:jsx-no-multiline-js */
import classnames from 'classnames';
import {defineComponent, PropType} from 'vue';
import Checkbox from '../../checkbox';
import List from '../../list';
import Radio from '../../radio';
import {DataItem} from './props-type';

const SubMenu = defineComponent({
  inheritAttrs: false,
  name: 'SubMenu',
  props: {
    subMenuPrefixCls: {
      type: String as PropType<string>
    },
    radioPrefixCls: {
      type: String as PropType<string>
    },
    subMenuData: {
      type: Object
    },
    showSelect: {
      type: Boolean as PropType<boolean>
    },
    onSel: {},
    selItem: {
      type: Object
    },
    multiSelect: {
      type: Boolean as PropType<boolean>
    }
  },
  setup(props, {emit, slots}) {
    const onClick = (dataItem: DataItem) => {
      emit('click', dataItem);
    };
    return {
      onClick
    };
  },
  render() {
    const {
      subMenuPrefixCls,
      radioPrefixCls,
      subMenuData,
      showSelect,
      selItem,
      multiSelect
    } = this;
    const selected = (dataItem: DataItem) =>
      showSelect &&
      (selItem.length > 0 && selItem.indexOf(dataItem.value) !== -1);

    const ItemComponent = !multiSelect ? Radio : Checkbox;

    return (
      <List style={{paddingTop: 0}}
            class={subMenuPrefixCls}>
        {subMenuData.map((dataItem, idx) => (
          <List.Item
            class={classnames(`${radioPrefixCls}-item`, {
              [`${subMenuPrefixCls}-item-selected`]: selected(dataItem),
              [`${subMenuPrefixCls}-item-disabled`]: dataItem.disabled
            })}
            key={idx}
            extra={
              <ItemComponent
                value={selected(dataItem)}
                disabled={dataItem.disabled}
                onChange={() => this.onClick(dataItem)}
              />
            }
          >
            {dataItem.label}
          </List.Item>
        ))}
      </List>
    );
  }
});

export default SubMenu as any;
