import PropTypes from 'prop-types';
import classNames from 'classnames';
import ListView from './list-view';
import { getOffsetTop, _event } from './util';

function setDocumentScrollTop(val) {
  window.document.body.scrollTop = val;  // chrome61 is invalid
  window.document.documentElement.scrollTop = val;
}

/* eslint react/prop-types: 0 */
export default class IndexedList extends React.Component {
  static propTypes = {
    ...ListView.propTypes,
    children: PropTypes.any,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    sectionHeaderClassName: PropTypes.string,
    quickSearchBarTop: PropTypes.object,
    quickSearchBarStyle: PropTypes.object,
    onQuickSearch: PropTypes.func,
    showQuickSearchIndicator: PropTypes.bool,
  }

  static defaultProps = {
    prefixCls: 'rmc-indexed-list',
    quickSearchBarTop: { value: '#', label: '#' },
    onQuickSearch: () => { },
    showQuickSearchIndicator: false,
    delayTime: 100,
    // delayActivityIndicator: <div style={{padding: 5, textAlign: 'center'}}>rendering more</div>,
    delayActivityIndicator: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      pageSize: props.pageSize,
      _delay: false,
    };
  }

  componentDidMount() {
    this.dataChange(this.props);
    // handle quickSearchBar
    this.getQsInfo();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dataSource !== nextProps.dataSource) {
      this.dataChange(nextProps);
    }
  }

  componentDidUpdate() {
    this.getQsInfo();
  }

  componentWillUnmount() {
    if (this._timer) {
      clearTimeout(this._timer);
    }
    this._hCache = null;
  }

  onQuickSearchTop = (sectionID, topId) => {
    if (this.props.useBodyScroll) {
      setDocumentScrollTop(0);
    } else {
      ReactDOM.findDOMNode(this.indexedListViewRef.ListViewRef).scrollTop = 0;
    }
    this.props.onQuickSearch(sectionID, topId);
  }

  onQuickSearch = (sectionID) => {
    const lv = ReactDOM.findDOMNode(this.indexedListViewRef.ListViewRef);
    const sec = ReactDOM.findDOMNode(this.sectionComponents[sectionID]);
    if (this.props.useBodyScroll) {
      setDocumentScrollTop(
          sec.getBoundingClientRect().top - lv.getBoundingClientRect().top + getOffsetTop(lv)
      );
    } else {
      lv.scrollTop += sec.getBoundingClientRect().top - lv.getBoundingClientRect().top;
    }
    this.props.onQuickSearch(sectionID);
  }

  onTouchStart = (e) => {
    this._target = e.target;
    this._basePos = this.quickSearchBarRef.getBoundingClientRect();
    document.addEventListener('touchmove', this._disableParent, false);
    document.body.className = `${document.body.className} ${this.props.prefixCls}-qsb-moving`;
    this.updateIndicator(this._target);
  }
  onTouchMove = (e) => {
    e.preventDefault();
    if (this._target) {
      const ex = _event(e);
      const basePos = this._basePos;
      let _pos;
      if (ex.clientY >= basePos.top && ex.clientY <= (basePos.top + this._qsHeight)) {
        _pos = Math.floor((ex.clientY - basePos.top) / this._avgH);
        let target;
        if (_pos in this._hCache) {
          target = this._hCache[_pos][0];
        }
        if (target) {
          const overValue = target.getAttribute('data-qf-target');
          if (this._target !== target) {
            if (this.props.quickSearchBarTop.value === overValue) {
              this.onQuickSearchTop(undefined, overValue);
            } else {
              this.onQuickSearch(overValue);
            }
            this.updateIndicator(target);
          }
          this._target = target;
        }
      }
    }
  }
  onTouchEnd = () => {
    if (!this._target) {
      return;
    }
    document.removeEventListener('touchmove', this._disableParent, false);
    document.body.className = document.body.className.replace(
        new RegExp(`\\s*${this.props.prefixCls}-qsb-moving`, 'g'), '');
    this.updateIndicator(this._target, true);
    this._target = null;
  }

  getQsInfo = () => {
    const quickSearchBar = this.quickSearchBarRef;
    const height = quickSearchBar.offsetHeight;
    const hCache = [];
    [].slice.call(quickSearchBar.querySelectorAll('[data-qf-target]')).forEach((d) => {
      hCache.push([d]);
    });
    const _avgH = height / hCache.length;
    let _top = 0;
    for (let i = 0, len = hCache.length; i < len; i++) {
      _top = i * _avgH;
      hCache[i][1] = [_top, _top + _avgH];
    }
    this._qsHeight = height;
    this._avgH = _avgH;
    this._hCache = hCache;
  }
  sectionComponents = {}

  dataChange = (props) => {
    // delay render more
    const rowCount = props.dataSource.getRowCount();
    if (!rowCount) {
      return;
    }
    this.setState({
      _delay: true,
    });
    if (this._timer) {
      clearTimeout(this._timer);
    }
    this._timer = setTimeout(() => {
      this.setState({
        pageSize: rowCount,
        _delay: false,
      }, () => this.indexedListViewRef._pageInNewRows());
    }, props.delayTime);
  }

  updateIndicator = (ele, end) => {
    let el = ele;
    if (!el.getAttribute('data-qf-target')) {
      el = el.parentNode;
    }
    if (this.props.showQuickSearchIndicator) {
      this.qsIndicatorRef.innerText = el.innerText.trim();
      this.setState({
        showQuickSearchIndicator: true,
      });
      if (this._indicatorTimer) {
        clearTimeout(this._indicatorTimer);
      }
      this._indicatorTimer = setTimeout(() => {
        this.setState({
          showQuickSearchIndicator: false,
        });
      }, 1000);
    }

    const cls = `${this.props.prefixCls}-quick-search-bar-over`;
    // can not use setState to change className, it has a big performance issue!
    this._hCache.forEach((d) => {
      d[0].className = d[0].className.replace(cls, '');
    });
    if (!end) {
      el.className = `${el.className} ${cls}`;
    }
  }

  _disableParent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  renderQuickSearchBar(quickSearchBarTop, quickSearchBarStyle) {
    const { dataSource, prefixCls } = this.props;
    const sectionKvs = dataSource.sectionIdentities.map(i => {
      return {
        value: i,
        label: dataSource._getSectionHeaderData(dataSource._dataBlob, i),
      };
    });
    return (
        <ul
            ref={el => this.quickSearchBarRef = el}
            className={`${prefixCls}-quick-search-bar`} style={quickSearchBarStyle}
            onTouchStart={this.onTouchStart}
            onTouchMove={this.onTouchMove}
            onTouchEnd={this.onTouchEnd}
            onTouchCancel={this.onTouchEnd}
        >
          <li data-qf-target={quickSearchBarTop.value}
              onClick={() => this.onQuickSearchTop(undefined, quickSearchBarTop.value) }
          >
            {quickSearchBarTop.label}
          </li>
          {sectionKvs.map(i => {
            return (
                <li key={i.value} data-qf-target={i.value}
                    onClick={() => this.onQuickSearch(i.value) }
                >
                  {i.label}
                </li>
            );
          })}
        </ul>
    );
  }

  render() {
    const { _delay, pageSize } = this.state;
    const {
      className, prefixCls, children, quickSearchBarTop, quickSearchBarStyle,
      initialListSize = Math.min(20, this.props.dataSource.getRowCount()),
      showQuickSearchIndicator,
      renderSectionHeader, sectionHeaderClassName, ...other,
    } = this.props;

    // initialListSize={this.props.dataSource.getRowCount()}
    return (<div className={`${prefixCls}-container`}>
      {_delay && this.props.delayActivityIndicator}
      <ListView
          {...other}
          ref={el => this.indexedListViewRef = el}
          className={classNames(prefixCls, className)}
          initialListSize={initialListSize}
          pageSize={pageSize}
          renderSectionHeader={(sectionData, sectionID) => React.cloneElement(
              renderSectionHeader(sectionData, sectionID),
              {
                ref: c => this.sectionComponents[sectionID] = c,
                className: sectionHeaderClassName || `${prefixCls}-section-header`,
              }
          )}
      >
        {children}
      </ListView>
      {this.renderQuickSearchBar(quickSearchBarTop, quickSearchBarStyle)}
      {showQuickSearchIndicator ? <div className={classNames({
        [`${prefixCls}-qsindicator`]: true,
        [`${prefixCls}-qsindicator-hide`]:
        !showQuickSearchIndicator || !this.state.showQuickSearchIndicator,
      })} ref={el => this.qsIndicatorRef = el}
      /> : null}
    </div>);
  }
}
