import ListView from './list-view-data-source';
import IndexedList from './indexed';

ListView.IndexedList = IndexedList;
const DataSource = ListView.DataSource;

export { DataSource, IndexedList };
export default ListView;
