import EchartsFunnelChartPlugin from '../../../../superset-ui-legacy-plugin-chart-echarts-funnel';
import Stories from './Stories';

new EchartsFunnelChartPlugin().configure({ key: 'echarts-funnel' }).register();

export default {
  examples: [...Stories],
};
