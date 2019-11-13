import EchartsStackedBarChartPlugin from '../../../../superset-ui-legacy-plugin-chart-echarts-stacked-bar';
import Stories from './Stories';

new EchartsStackedBarChartPlugin().configure({ key: 'echarts-stacked-bar' }).register();

export default {
  examples: [...Stories],
};
