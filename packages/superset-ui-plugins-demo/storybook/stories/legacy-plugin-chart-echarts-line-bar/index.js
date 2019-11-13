import EchartsLineBarChartPlugin from '../../../../superset-ui-legacy-plugin-chart-echarts-line-bar';
import Stories from './Stories';

new EchartsLineBarChartPlugin().configure({ key: 'echarts-line-bar' }).register();

export default {
  examples: [...Stories],
};
