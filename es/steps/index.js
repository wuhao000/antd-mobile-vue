import MSteps from './src';
import Step from './src/step';
import './style';
var Plugin = MSteps;

Plugin.install = function (Vue) {
  Vue.component('MSteps', MSteps);
  Vue.component('MStep', Step);
};

export default Plugin;