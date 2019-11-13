import { t } from '@superset-ui/translation';
import { ChartMetadata, ChartPlugin } from '@superset-ui/chart';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';

const metadata = new ChartMetadata({
  name: 'Echarts Bar Brush',
  description: '',
  thumbnail,
  useLegacyApi: true,
});

export default class EchartsBarBrushChartPlugin extends ChartPlugin {
  constructor() {
    super({
      metadata,
      transformProps,
      loadChart: () => import('./ReactEchartsBarBrush'),
    });
  }
}
