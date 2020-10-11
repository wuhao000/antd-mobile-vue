import Steps from './src';
import Step from './src/step';
import './style';

const Plugin: any = Steps;
Steps.Step = Step;

Plugin.install = Vue => {
  Vue.component('MSteps', Steps);
  Vue.component('MStep', Step);
};

export default Plugin;
