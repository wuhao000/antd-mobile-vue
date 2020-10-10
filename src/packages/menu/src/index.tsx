import classnames from 'classnames';
import {defineComponent, onMounted, PropType, reactive, watch} from 'vue';
import Button from '../../button';
import Flex from '../../flex';
import List from '../../list';
import {getComponentLocale} from '../../utils/getLocale';
import {DataItem, ValueType} from './props-type';
import SubMenu from './sub-menu';

export interface StateType {
  value?: ValueType;
  firstLevelSelectValue: string;
  height?: number;
}

const Menu = defineComponent({
  install: null,
  name: 'Menu',
  props: {
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-menu'
    },
    subMenuPrefixCls: {
      type: String as PropType<string>,
      default: 'am-sub-menu'
    },
    radioPrefixCls: {
      type: String as PropType<string>,
      default: 'am-radio'
    },
    multiSelectMenuBtnsCls: {
      type: String as PropType<string>,
      default: 'am-multi-select-btns'
    },
    MenuSelectContanerPrefixCls: {
      type: String as PropType<string>,
      default: 'am-menu-select-container'
    },
    data: {
      default: () => {
        return [];
      }
    },
    defaultValue: {},
    value: {
      type: Array as PropType<any[]>
    },
    level: {
      default: 2
    },
    height: {
      type: Number as PropType<number>
    },
    multiSelect: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, {emit, slots}) {
    const getNewFsv = () => {
      const {value, data} = props;
      let firstValue = '';
      if (value && value.length) {
        // if has init path, chose init first value
        firstValue = value[0] as string; // this is a contract
      } else if (data && data.length && !data[0].isLeaf) {
        // chose the first menu item if it's not leaf.
        firstValue = data[0].value;
      }
      return firstValue;
    };
    const state = reactive({
      firstLevelSelectValue: getNewFsv(),
      value: props.value,
      height: props.height
    });
    watch(() => props.value, (value) => {
      state.firstLevelSelectValue = getNewFsv();
      state.value = value;
    });
    watch(() => props.height, (height) => {
      state.height = height;
    });

    const onMenuOk = () => {
      emit('ok', state.value);
    };
    const onMenuCancel = () => {
      emit('cancel');
    };

    const onClickFirstLevelItem = (dataItem: DataItem) => {
      state.firstLevelSelectValue = dataItem.value;
      if (dataItem.isLeaf) {
        emit('change', [dataItem.value]);
      }
    };
    const getSelectValue = (dataItem: DataItem) => {
      const {level, multiSelect} = props;
      if (multiSelect) {
        const {value, firstLevelSelectValue} = state;
        if (value && value.length > 0) {
          if (level === 2 && value[0] !== firstLevelSelectValue) {
            /* if level is 2, when first level is reselect, reset submenu array */
            return [firstLevelSelectValue, [dataItem.value]];
          } else {
            /* if level is 1, or first level isn't changed when level is 2, just do add or delete for submenu array  */
            const chosenValues = level === 2 ? (value[1] as string[]) : value; // FIXME: hack type
            const existIndex = chosenValues.indexOf(dataItem.value);
            if (existIndex === -1) {
              chosenValues.push(dataItem.value);
            } else {
              chosenValues.splice(existIndex, 1);
            }
            return value;
          }
        } else {
          /* if value is not exist before, init value */
          return level === 2
            ? [firstLevelSelectValue, [dataItem.value]]
            : [dataItem.value];
        }
      }

      return level === 2
        ? [state.firstLevelSelectValue, dataItem.value]
        : [dataItem.value];
    };
    const onClickSubMenuItem = (dataItem: DataItem) => {
      const value = getSelectValue(dataItem);
      state.value = value;
      setTimeout(() => {
        // if onChange will close the menu, set a little time to show its selection state.
        emit('change', value);
      }, 300);
    };
    onMounted(() => {
      if (props.height === undefined) {
        state.height = Math.round(document.documentElement.clientHeight / 2);
      }
    });
    return {
      state, onClickFirstLevelItem, onClickSubMenuItem,
      onMenuCancel, onMenuOk
    };
  },
  render() {
    const {
      data = [],
      prefixCls,
      level,
      multiSelect,
      multiSelectMenuBtnsCls,
      MenuSelectContanerPrefixCls
    } = this;
    const {firstLevelSelectValue, value, height} = this.state;
    let subMenuData = data; // menu only has one level as init

    if (level === 2) {
      let parent = data;
      if (firstLevelSelectValue && firstLevelSelectValue !== '') {
        parent = data.filter(
          dataItem => dataItem.value === firstLevelSelectValue
        );
      }

      // tslint:disable-next-line:prefer-conditional-expression
      if (parent[0] && parent[0].children && parent[0].isLeaf !== true) {
        subMenuData = parent[0].children;
      } else {
        subMenuData = [];
      }
    }

    let subValue = (value && value.length > 0 && [...value]) || [];
    if (level === 2 && subValue.length > 1) {
      subValue.shift();
      if (multiSelect) {
        /* example: [[1,2,3]] -> [1,2,3] */
        subValue = subValue[0] as string[]; // FIXME: hack type
      }
    }

    const parentValue =
      value && value.length > 1 && level === 2 ? value[0] : null;
    const subSelInitItem = subMenuData
      .filter(dataItem => subValue.indexOf(dataItem.value) !== -1)
      .map(item => {
        return item.value;
      });

    let showSelect = true;
    if (level === 2 && parentValue !== firstLevelSelectValue) {
      showSelect = false;
    }

    // tslint:disable-next-line:variable-name
    const _locale = getComponentLocale(
      this.$props,
      this,
      'Menu',
      () => require('./locale/zh_CN')
    );

    const heightStyle =
      height !== undefined
        ? {
          height: `${height}px`
        }
        : {};

    return (
      <Flex
        class={prefixCls}
        style={{
          ...heightStyle
        }}
        direction="column"
        align="stretch"
      >
        <Flex
          align="start"
          class={classnames({
            [MenuSelectContanerPrefixCls as string]: true
          })}
        >
          {level === 2 && (
            <Flex.Item>
              <List role="tablist">
                {data.map((dataItem, index) => (
                  <List.Item
                    class={
                      dataItem.value === firstLevelSelectValue
                        ? `${prefixCls}-selected`
                        : ''
                    }
                    onClick={() => this.onClickFirstLevelItem(dataItem)}
                    key={`listitem-1-${index}`}
                    role="tab"
                    aria-selected={dataItem.value === firstLevelSelectValue}
                  >
                    {dataItem.label}
                  </List.Item>
                ))}
              </List>
            </Flex.Item>
          )}
          <Flex.Item
            role="tabpanel"
            aria-hidden="false"
            class={`${MenuSelectContanerPrefixCls}-submenu`}
          >
            <SubMenu
              subMenuPrefixCls={this.subMenuPrefixCls}
              radioPrefixCls={this.radioPrefixCls}
              subMenuData={subMenuData}
              selItem={subSelInitItem}
              onClick={this.onClickSubMenuItem}
              showSelect={showSelect}
              multiSelect={multiSelect}
            />
          </Flex.Item>
        </Flex>
        {multiSelect && (
          <div class={multiSelectMenuBtnsCls}>
            <Button
              inline
              class={`${multiSelectMenuBtnsCls}-btn`}
              onClick={this.onMenuCancel}
            >
              {_locale.cancelText}
            </Button>
            <Button
              inline
              type="primary"
              class={`${multiSelectMenuBtnsCls}-btn`}
              onClick={this.onMenuOk}
            >
              {_locale.okText}
            </Button>
          </div>
        )}
      </Flex>
    );
  }
});

export default Menu as any;
