import EchartsStackChartPlugin from '../../../../superset-ui-legacy-plugin-chart-echarts-stack';
import Stories from './Stories';

new EchartsStackChartPlugin().configure({ key: 'echarts-stack' }).register();

export default {
  examples: [...Stories],
};
