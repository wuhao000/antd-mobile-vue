import MSteps from './src';
import Step from './src/step';
import './style';

const Plugin: any = MSteps;

Plugin.install = Vue => {
  Vue.component('MSteps', MSteps);
  Vue.component('MStep', Step);
};

export default Plugin;
