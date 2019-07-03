/* eslint no-unused-vars: 0, react/no-multi-comp: 0
react/prop-types: 0, react/sort-comp: 0, no-unused-expressions: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ListViewDataSource from './ListViewDataSource';
import ScrollView from './ScrollView';

const DEFAULT_PAGE_SIZE = 1;
const DEFAULT_INITIAL_ROWS = 10;
const DEFAULT_SCROLL_RENDER_AHEAD = 1000;
const DEFAULT_END_REACHED_THRESHOLD = 1000;
const DEFAULT_SCROLL_CALLBACK_THROTTLE = 50;
// const SCROLLVIEW_REF = 'ListViewRef';

class StaticRenderer extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.shouldUpdate;
  }
  render() {
    return this.props.render();
  }
}
// https://github.com/facebook/react-native/blob/0.26-stable/Libraries/CustomComponents/ListView/ListView.js
export default class ListView extends React.Component {
  static DataSource = ListViewDataSource
  static propTypes = {
    ...ScrollView.propTypes,
    dataSource: PropTypes.instanceOf(ListViewDataSource).isRequired,
    renderSeparator: PropTypes.func,
    renderRow: PropTypes.func.isRequired,
    initialListSize: PropTypes.number,
    onEndReached: PropTypes.func,
    onEndReachedThreshold: PropTypes.number,
    pageSize: PropTypes.number,
    renderFooter: PropTypes.func,
    renderHeader: PropTypes.func,
    renderSectionHeader: PropTypes.func,
    renderScrollComponent: PropTypes.func,
    scrollRenderAheadDistance: PropTypes.number,
    onChangeVisibleRows: PropTypes.func,
    scrollEventThrottle: PropTypes.number,
    // another added
    renderBodyComponent: PropTypes.func,
    renderSectionWrapper: PropTypes.func,
    renderSectionBodyWrapper: PropTypes.func,
    sectionBodyClassName: PropTypes.string,
    listViewPrefixCls: PropTypes.string,
    useBodyScroll: PropTypes.bool,
  }

  static defaultProps = {
    initialListSize: DEFAULT_INITIAL_ROWS,
    pageSize: DEFAULT_PAGE_SIZE,
    renderScrollComponent: props => <ScrollView {...props} />,
    renderBodyComponent: () => <div />,
    renderSectionBodyWrapper: (sectionID) => <div key={sectionID} />,
    sectionBodyClassName: 'list-view-section-body',
    listViewPrefixCls: 'rmc-list-view',
    scrollRenderAheadDistance: DEFAULT_SCROLL_RENDER_AHEAD,
    onEndReachedThreshold: DEFAULT_END_REACHED_THRESHOLD,
    scrollEventThrottle: DEFAULT_SCROLL_CALLBACK_THROTTLE,
    scrollerOptions: {},
  }

  state = {
    curRenderedRowsCount: this.props.initialListSize,
    highlightedRow: {},
  }

  /**
   * Exports some data, e.g. for perf investigations or analytics.
   */
  getMetrics = () => {
    return {
      contentLength: this.scrollProperties.contentLength,
      totalRows: this.props.dataSource.getRowCount(),
      renderedRows: this.state.curRenderedRowsCount,
      visibleRows: Object.keys(this._visibleRows).length,
    };
  }

  getInnerViewNode = () => {
    return this.ListViewRef.getInnerViewNode();
  }

  scrollTo = (...args) => {
    this.ListViewRef &&
    this.ListViewRef.scrollTo.bind(this.ListViewRef) &&
    this.ListViewRef.scrollTo(...args);
  }

  componentWillMount() {
    // this data should never trigger a render pass, so don't put in state
    this.scrollProperties = {
      visibleLength: null,
      contentLength: null,
      offset: 0,
    };
    this._childFrames = [];
    this._visibleRows = {};
    this._prevRenderedRowsCount = 0;
    this._sentEndForContentLength = null;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dataSource !== nextProps.dataSource ||
        this.props.initialListSize !== nextProps.initialListSize) {
      this.setState((state, props) => {
        this._prevRenderedRowsCount = 0;
        return {
          curRenderedRowsCount: Math.min(
              Math.max(
                  state.curRenderedRowsCount,
                  nextProps.initialListSize // for preact
              ),
              nextProps.dataSource.getRowCount() // for preact
          ),
        };
      }, () => this._renderMoreRowsIfNeeded());
    }
  }

  onRowHighlighted = (sectionID, rowID) => {
    this.setState({ highlightedRow: { sectionID, rowID } });
  }

  render() {
    const dataSource = this.props.dataSource;
    const allRowIDs = dataSource.rowIdentities;
    const bodyComponents = [];
    let rowCount = 0;

    for (let sectionIdx = 0; sectionIdx < allRowIDs.length; sectionIdx++) {
      const sectionID = dataSource.sectionIdentities[sectionIdx];
      const rowIDs = allRowIDs[sectionIdx];
      if (rowIDs.length === 0) {
        continue;
      }

      let renderSectionHeader;
      if (this.props.renderSectionHeader) {
        const shouldUpdateHeader = rowCount >= this._prevRenderedRowsCount &&
            dataSource.sectionHeaderShouldUpdate(sectionIdx);

        renderSectionHeader = (
            <StaticRenderer
                key={`s_${sectionID}`}
                shouldUpdate={!!shouldUpdateHeader}
                render={this.props.renderSectionHeader.bind(
                    null,
                    dataSource.getSectionHeaderData(sectionIdx),
                    sectionID
                )}
            />
        );
      }

      const sectionBody = [];
      for (let rowIdx = 0; rowIdx < rowIDs.length; rowIdx++) {
        const rowID = rowIDs[rowIdx];
        const comboID = `${sectionID}_${rowID}`;
        const shouldUpdateRow = rowCount >= this._prevRenderedRowsCount &&
            dataSource.rowShouldUpdate(sectionIdx, rowIdx);
        const row = (<StaticRenderer
            key={`r_${comboID}`}
            shouldUpdate={!!shouldUpdateRow}
            render={this.props.renderRow.bind(
                null,
                dataSource.getRowData(sectionIdx, rowIdx),
                sectionID,
                rowID,
                this.onRowHighlighted
            )}
        />);
        sectionBody.push(row);

        if (this.props.renderSeparator &&
            (rowIdx !== rowIDs.length - 1 || sectionIdx === allRowIDs.length - 1)) {
          const adjacentRowHighlighted =
              this.state.highlightedRow.sectionID === sectionID && (
                  this.state.highlightedRow.rowID === rowID ||
                  this.state.highlightedRow.rowID === rowIDs[rowIdx + 1]
              );
          const separator = this.props.renderSeparator(
              sectionID,
              rowID,
              adjacentRowHighlighted
          );
          if (separator) {
            sectionBody.push(separator);
          }
        }
        if (++rowCount === this.state.curRenderedRowsCount) {
          break;
        }
      }

      const rowsAndSeparators = React.cloneElement(this.props.renderSectionBodyWrapper(sectionID), {
        className: this.props.sectionBodyClassName,
      }, sectionBody);

      if (this.props.renderSectionWrapper) {
        bodyComponents.push(
            React.cloneElement(
                this.props.renderSectionWrapper(sectionID), {}, renderSectionHeader, rowsAndSeparators
            )
        );
      } else {
        bodyComponents.push(renderSectionHeader);
        bodyComponents.push(rowsAndSeparators);
      }
      if (rowCount >= this.state.curRenderedRowsCount) {
        break;
      }
    }

    const { renderScrollComponent, ...props } = this.props;

    return React.cloneElement(
        renderScrollComponent({ ...props, onScroll: this._onScroll }),
        {
          ref: el => this.ListViewRef = el,
          onContentSizeChange: this._onContentSizeChange,
          onLayout: this._onLayout,
        },
        this.props.renderHeader ? this.props.renderHeader() : null,
        React.cloneElement(props.renderBodyComponent(), {}, bodyComponents),
        this.props.renderFooter ? this.props.renderFooter() : null,
        props.children
    );
  }

  _onContentSizeChange = (width, height) => {
    const contentLength = !this.props.horizontal ? height : width;
    if (contentLength !== this.scrollProperties.contentLength) {
      this.scrollProperties.contentLength = contentLength;
      this._renderMoreRowsIfNeeded();
    }
    this.props.onContentSizeChange && this.props.onContentSizeChange(width, height);
  }

  _onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    const visibleLength = !this.props.horizontal ? height : width;
    if (visibleLength !== this.scrollProperties.visibleLength) {
      this.scrollProperties.visibleLength = visibleLength;
      this._renderMoreRowsIfNeeded();
    }
    this.props.onLayout && this.props.onLayout(event);
  }

  _maybeCallOnEndReached = (event) => {
    // console.log(this.scrollProperties, this._getDistanceFromEnd(this.scrollProperties));
    if (this.props.onEndReached &&
        this.scrollProperties.contentLength !== this._sentEndForContentLength &&
        this._getDistanceFromEnd(this.scrollProperties) < this.props.onEndReachedThreshold &&
        this.state.curRenderedRowsCount === this.props.dataSource.getRowCount()) {
      this._sentEndForContentLength = this.scrollProperties.contentLength;
      this.props.onEndReached(event);
      return true;
    }
    return false;
  }

  _renderMoreRowsIfNeeded = () => {
    if (this.scrollProperties.contentLength === null ||
        this.scrollProperties.visibleLength === null ||
        this.state.curRenderedRowsCount === this.props.dataSource.getRowCount()) {
      this._maybeCallOnEndReached();
      return;
    }

    const distanceFromEnd = this._getDistanceFromEnd(this.scrollProperties);
    // console.log(distanceFromEnd, this.props.scrollRenderAheadDistance);
    if (distanceFromEnd < this.props.scrollRenderAheadDistance) {
      this._pageInNewRows();
    }
  }

  _pageInNewRows = () => {
    this.setState((state, props) => {
      const rowsToRender = Math.min(
          state.curRenderedRowsCount + props.pageSize,
          props.dataSource.getRowCount()
      );
      this._prevRenderedRowsCount = state.curRenderedRowsCount;
      return {
        curRenderedRowsCount: rowsToRender,
      };
    }, () => {
      this._prevRenderedRowsCount = this.state.curRenderedRowsCount;
    });
  }

  _getDistanceFromEnd = (scrollProperties) => {
    return scrollProperties.contentLength -
        scrollProperties.visibleLength - scrollProperties.offset;
  }

  _onScroll = (e, metrics) => {
    // when the ListView is destroyed,
    // but also will trigger scroll event after `scrollEventThrottle`
    if (!this.ListViewRef) {
      return;
    }

    this.scrollProperties = metrics;

    if (!this._maybeCallOnEndReached(e)) {
      this._renderMoreRowsIfNeeded();
    }

    if (this.props.onEndReached &&
        this._getDistanceFromEnd(this.scrollProperties) > this.props.onEndReachedThreshold) {
      // Scrolled out of the end zone, so it should be able to trigger again.
      this._sentEndForContentLength = null;
    }

    this.props.onScroll && this.props.onScroll(e);
  }
}
