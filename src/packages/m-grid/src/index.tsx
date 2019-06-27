import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

import Carousel from '../../m-carousel';
import Flex from '../../m-flex';
import TouchFeedback from '../../vmc-feedback';

const Icon = aegis.AeIcon;

interface DataItem {
  icon?: string | object;
  text?: any;

  [key: string]: any;
}

@Component({name: 'Grid'})
export default class Grid extends Vue {
  /**
   * 宫格数据列表
   */
  @Prop({
    type: Array, default: () => {
      return [];
    }
  })
  public data?: Array<DataItem | undefined>;
  /**
   * 是否有边框
   */
  @Prop({type: Boolean, default: true})
  public bordered?: boolean;
  /**
   * 列数
   */
  @Prop({type: Number, default: 4})
  public cols?: number;
  @Prop({type: Boolean, default: false})
  public carousel?: boolean;
  @Prop({type: Number, default: 2})
  public carouselMaxRow?: number;
  @Prop({type: String, default: 'am-grid'})
  public prefixCls?: string;
  @Prop({type: Boolean, default: true})
  public square?: boolean;
  @Prop({type: String})
  public activeClassName?: string;
  @Prop()
  public activeStyle?: boolean | object;
  @Prop({
    type: Object, default: () => {
      return {};
    }
  })
  public itemStyle?: object;
  public initialSlideWidth: number = 0; // only used in carousel model

  public mounted() {
    this.initialSlideWidth = document.documentElement.clientWidth;
  }

  public renderCarousel(rowsArr: any[], pageCount: number, rowCount: number) {
    const {prefixCls} = this;
    const carouselMaxRow = this.carouselMaxRow as number;
    const pagesArr: any[] = [];
    for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
      const pageRows: any[] = [];
      for (let ii = 0; ii < carouselMaxRow; ii++) {
        const rowIndex = pageIndex * carouselMaxRow + ii;
        if (rowIndex < rowCount) {
          pageRows.push(rowsArr[rowIndex]);
        } else {
          // 空节点为了确保末尾页的最后未到底的行有底线(样式中last-child会没线)
          pageRows.push(<div key={`gridline-${rowIndex}`}/>);
        }
      }
      pagesArr.push(
        <div
          key={`pageitem-${pageIndex}`}
          clas={`${prefixCls}-carousel-page`}
        >
          {pageRows}
        </div>
      );
    }
    return pagesArr;
  }

  public renderItem(dataItem: DataItem | any,
                    index: number,
                    columnNum: number) {
    const {prefixCls} = this;
    let itemEl: any = null;
    if (dataItem) {
      const {icon, text} = dataItem;
      itemEl = (
        <div
          class={`${prefixCls}-item-inner-content column-num-${columnNum}`}
        >
          {this.renderIcon(icon, prefixCls)}
          <div class={`${prefixCls}-text`}>{text}</div>
        </div>
      );
    }
    return <div class={`${prefixCls}-item-content`}>{itemEl}</div>;
  }

  public getRows(rowCount: number, dataLength: number) {
    const {
      cols,
      prefixCls,
      activeStyle,
      activeClassName,
      itemStyle
    } = this;
    const rowsArr: any[] = [];
    const rowWidth = `${100 / cols}%`;
    const colStyle = {
      width: rowWidth,
      ...itemStyle
    };
    for (let i = 0; i < rowCount; i++) {
      const rowArr: any[] = [];
      for (let j = 0; j < cols; j++) {
        const dataIndex = i * cols + j;
        let itemEl;
        if (dataIndex < dataLength) {
          const el = this.data && this.data[dataIndex];
          const TouchFeedback2 = TouchFeedback as any;
          itemEl = (
            <TouchFeedback2
              key={`griditem-${dataIndex}`}
              activeClassName={
                activeClassName ? activeClassName : `${prefixCls}-item-active`}
              activeStyle={activeStyle}
            >
              <Flex.Item
                class={`${prefixCls}-item`}
                nativeOn={
                  {
                    click: () => {
                      this.$emit('click', el, dataIndex);
                    }
                  }
                }
                style={colStyle}
              >
                {this.renderItem(el, dataIndex, cols)}
              </Flex.Item>
            </TouchFeedback2>
          );
        } else {
          itemEl = (
            <Flex.Item
              key={`griditem-${dataIndex}`}
              class={`${prefixCls}-item ${prefixCls}-null-item`}
              style={colStyle}
            />
          );
        }
        rowArr.push(itemEl);
      }
      rowsArr.push(
        <Flex justify={'center'} align={'stretch'} key={`gridline-${i}`}>
          {rowArr}
        </Flex>
      );
    }
    return rowsArr;
  }

  public render() {
    const {
      prefixCls,
      data,
      bordered,
      carousel,
      square,
      activeStyle,
      cols,
      carouselMaxRow,
      renderItem,
      activeClassName,
      ...restPropsForCarousel
    } = this;
    const initialSlideWidth = this.initialSlideWidth;
    const dataLength = (data && data.length) || 0;
    let rowCount = Math.ceil(dataLength / cols);
    let rowsArr;
    let renderEl;
    if (carousel) {
      if (initialSlideWidth < 0) {
        // carousel  server render. because carousel dependes on document
        return null;
      }
      if (rowCount % carouselMaxRow !== 0) {
        rowCount = rowCount + carouselMaxRow - rowCount % carouselMaxRow;
      }
      const pageCount = Math.ceil(rowCount / carouselMaxRow);
      rowsArr = this.getRows(rowCount, dataLength);
      let carouselProps = {};
      if (pageCount <= 1) {
        carouselProps = {
          dots: false,
          dragging: false,
          swiping: false
        };
      }
      renderEl = (
        <Carousel
          initialSlideWidth={initialSlideWidth}
          {...restPropsForCarousel}
          {...carouselProps}
        >
          {this.renderCarousel(rowsArr, pageCount, rowCount)}
        </Carousel>
      );
    } else {
      renderEl = this.getRows(rowCount, dataLength);
    }
    const cls = classnames(prefixCls, {
      [`${prefixCls}-square`]: square,
      [`${prefixCls}-line`]: bordered,
      [`${prefixCls}-carousel`]: carousel
    });
    return <div class={cls}>{renderEl}</div>;
  }

  private renderIcon(icon: any, prefixCls: string) {
    if (typeof icon === 'string') {
      if (icon.startsWith('http://') || icon.startsWith('https://')) {
        return <img class={`${prefixCls}-icon`}
                    src={icon} alt={''}/>;
      } else {
        return <Icon mobile={true}
                     type={icon} size={'lg'}/>;
      }
    } else if (typeof icon === 'object') {
      return <Icon {...{props: icon}}/>;
    }
  }
}
