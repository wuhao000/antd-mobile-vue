import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Carousel from '../../carousel';
import Flex from '../../flex';
import TouchFeedback from '../../vmc-feedback';
const Icon = aegis.AeIcon;
let Grid = class Grid extends Vue {
    constructor() {
        super(...arguments);
        this.initialSlideWidth = 0; // only used in carousel model
    }
    mounted() {
        this.initialSlideWidth = document.documentElement.clientWidth;
    }
    renderCarousel(rowsArr, pageCount, rowCount) {
        const { prefixCls } = this;
        const carouselMaxRow = this.carouselMaxRow;
        const pagesArr = [];
        for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
            const pageRows = [];
            for (let ii = 0; ii < carouselMaxRow; ii++) {
                const rowIndex = pageIndex * carouselMaxRow + ii;
                if (rowIndex < rowCount) {
                    pageRows.push(rowsArr[rowIndex]);
                }
                else {
                    // 空节点为了确保末尾页的最后未到底的行有底线(样式中last-child会没线)
                    pageRows.push(<div key={`gridline-${rowIndex}`}/>);
                }
            }
            pagesArr.push(<div key={`pageitem-${pageIndex}`} clas={`${prefixCls}-carousel-page`}>
          {pageRows}
        </div>);
        }
        return pagesArr;
    }
    renderItem(dataItem, index, columnNum) {
        const { prefixCls } = this;
        let itemEl = null;
        if (dataItem) {
            const { icon, text } = dataItem;
            itemEl = (<div class={`${prefixCls}-item-inner-content column-num-${columnNum}`}>
          {this.renderIcon(icon, prefixCls)}
          <div class={`${prefixCls}-text`}>{text}</div>
        </div>);
        }
        return <div class={`${prefixCls}-item-content`}>{itemEl}</div>;
    }
    getRows(rowCount, dataLength) {
        const { cols, prefixCls, activeStyle, activeClassName, itemStyle } = this;
        const rowsArr = [];
        const rowWidth = `${100 / cols}%`;
        const colStyle = Object.assign({ width: rowWidth }, itemStyle);
        for (let i = 0; i < rowCount; i++) {
            const rowArr = [];
            for (let j = 0; j < cols; j++) {
                const dataIndex = i * cols + j;
                let itemEl;
                if (dataIndex < dataLength) {
                    const el = this.data && this.data[dataIndex];
                    const TouchFeedback2 = TouchFeedback;
                    itemEl = (<TouchFeedback2 key={`griditem-${dataIndex}`} activeClassName={activeClassName ? activeClassName : `${prefixCls}-item-active`} activeStyle={activeStyle}>
              <Flex.Item class={`${prefixCls}-item`} nativeOn={{
                        click: () => {
                            this.$emit('click', el, dataIndex);
                        }
                    }} style={colStyle}>
                {this.renderItem(el, dataIndex, cols)}
              </Flex.Item>
            </TouchFeedback2>);
                }
                else {
                    itemEl = (<Flex.Item key={`griditem-${dataIndex}`} class={`${prefixCls}-item ${prefixCls}-null-item`} style={colStyle}/>);
                }
                rowArr.push(itemEl);
            }
            rowsArr.push(<Flex justify={'center'} align={'stretch'} key={`gridline-${i}`}>
          {rowArr}
        </Flex>);
        }
        return rowsArr;
    }
    render() {
        const _a = this, { prefixCls, data, bordered, carousel, square, activeStyle, cols, carouselMaxRow, renderItem, activeClassName } = _a, restPropsForCarousel = tslib_1.__rest(_a, ["prefixCls", "data", "bordered", "carousel", "square", "activeStyle", "cols", "carouselMaxRow", "renderItem", "activeClassName"]);
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
            renderEl = (<Carousel initialSlideWidth={initialSlideWidth} {...restPropsForCarousel} {...carouselProps}>
          {this.renderCarousel(rowsArr, pageCount, rowCount)}
        </Carousel>);
        }
        else {
            renderEl = this.getRows(rowCount, dataLength);
        }
        const cls = classnames(prefixCls, {
            [`${prefixCls}-square`]: square,
            [`${prefixCls}-line`]: bordered,
            [`${prefixCls}-carousel`]: carousel
        });
        return <div class={cls}>{renderEl}</div>;
    }
    renderIcon(icon, prefixCls) {
        if (typeof icon === 'string') {
            if (icon.startsWith('http://') || icon.startsWith('https://')) {
                return <img class={`${prefixCls}-icon`} src={icon} alt={''}/>;
            }
            else {
                return <Icon mobile={true} type={icon} size={'lg'}/>;
            }
        }
        else if (typeof icon === 'object') {
            return <Icon {...{ props: icon }}/>;
        }
    }
};
tslib_1.__decorate([
    Prop({
        type: Array, default: () => {
            return [];
        }
    })
], Grid.prototype, "data", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], Grid.prototype, "bordered", void 0);
tslib_1.__decorate([
    Prop({ type: Number, default: 4 })
], Grid.prototype, "cols", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Grid.prototype, "carousel", void 0);
tslib_1.__decorate([
    Prop({ type: Number, default: 2 })
], Grid.prototype, "carouselMaxRow", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'am-grid' })
], Grid.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], Grid.prototype, "square", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Grid.prototype, "activeClassName", void 0);
tslib_1.__decorate([
    Prop()
], Grid.prototype, "activeStyle", void 0);
tslib_1.__decorate([
    Prop({
        type: Object, default: () => {
            return {};
        }
    })
], Grid.prototype, "itemStyle", void 0);
Grid = tslib_1.__decorate([
    Component({ name: 'Grid' })
], Grid);
export default Grid;
//# sourceMappingURL=index.jsx.map