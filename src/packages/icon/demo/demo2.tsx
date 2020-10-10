import {defineComponent} from 'vue';
import Icon from '../index';
import Grid from '@/packages/grid';

const size = ['xxs', 'xs', 'sm', 'md', 'lg'];
export default defineComponent({
  render() {
    const data = size.map(item => ({
      icon: <Icon type="search" size={item}/>,
      text: item
    }));
    return (
      <Grid data={data} cols={5} hasLine={false} activeStyle={false} />
    );
  }
});
