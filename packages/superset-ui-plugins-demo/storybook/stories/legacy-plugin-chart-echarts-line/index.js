import EchartsLineChartPlugin from '../../../../superset-ui-legacy-plugin-chart-echarts-line';
import Stories from './Stories';

new EchartsLineChartPlugin().configure({ key: 'echarts-line' }).register();

export default {
  examples: [...Stories],
};
