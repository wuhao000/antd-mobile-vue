import MIcon from './src';
import './style';

const Plugin: any = MIcon;

Plugin.install = app => {
  app.component('MIcon', MIcon);
};

export default Plugin;
