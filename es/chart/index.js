import MChart from './src';
import Area from './src/area';
import Axis from './src/axis';
import Bar from './src/bar';
import Guide from './src/guide';
import Legend from './src/legend';
import Line from './src/line';
import Pie from './src/pie';
import Point from './src/point';
import Scale from './src/scale';
import Tooltip from './src/tooltip';
MChart.Area = Area;
MChart.Axis = Axis;
MChart.Bar = Bar;
MChart.Guide = Guide;
MChart.Legend = Legend;
MChart.Line = Line;
MChart.Pie = Pie;
MChart.Point = Point;
MChart.Scale = Scale;
MChart.Tooltip = Tooltip;

MChart.install = function (Vue) {
  Vue.component('MChart', MChart);
  Vue.component('MChartArea', MChart.Area);
  Vue.component('MChartAxis', MChart.Axis);
  Vue.component('MChartBar', MChart.Bar);
  Vue.component('MChartGuide', MChart.Guide);
  Vue.component('MChartLegend', MChart.Legend);
  Vue.component('MChartLine', MChart.Line);
  Vue.component('MChartPie', MChart.Pie);
  Vue.component('MChartPoint', MChart.Point);
  Vue.component('MChartScale', MChart.Scale);
  Vue.component('MChartTooltip', MChart.Tooltip);
};

export default MChart;