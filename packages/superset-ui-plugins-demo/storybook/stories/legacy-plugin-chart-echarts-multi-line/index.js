import EchartsMultiLineChartPlugin from '../../../../superset-ui-legacy-plugin-chart-echarts-multi-line';
import Stories from './Stories';

new EchartsMultiLineChartPlugin().configure({ key: 'echarts-multi-line' }).register();

export default {
  examples: [...Stories],
};
