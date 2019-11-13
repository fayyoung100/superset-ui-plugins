import EchartsBarBrushChartPlugin from '../../../../superset-ui-legacy-plugin-chart-echarts-bar-brush';
import Stories from './Stories';

new EchartsBarBrushChartPlugin().configure({ key: 'echarts-bar-brush' }).register();

export default {
  examples: [...Stories],
};
