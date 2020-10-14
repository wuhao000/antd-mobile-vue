import Steps from './src';
import Step from './src/step';
import './style';
const Plugin = Steps;
Steps.Step = Step;
Plugin.install = Vue => {
    Vue.component('MSteps', Steps);
    Vue.component('MStep', Step);
};
export default Plugin;
//# sourceMappingURL=index.js.map