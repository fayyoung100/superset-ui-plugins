/* eslint-disable sort-keys, no-magic-numbers */
import React from 'react';
import { SuperChart } from '@superset-ui/chart';
import data from './data';

export default [
  {
    renderStory: () => (
      <SuperChart
        chartType="echarts-line-bar"
        width={1100}
        height={600}
        queryData={{ data }}
        formData={{
          sliceId: 1,
          colorScheme: 'd3Category10',
          yAxisLabel: '左侧Label',
          yAxisMax: 3000,
          yAxisFormat: 'SMART_NUMBER',
          yAxisType: 'line',
          yAxis2Label: '右侧Label',
          yAxis2Max: 2400000,
          yAxis2Format: 'SMART_NUMBER',
          yAxis2Type: 'bar',
          yAxisInterval: 4,
        }}
      />
    ),
    storyName: 'Basic',
    storyPath: 'legacy-|plugin-chart-echarts-line-bar|EchartsLineBarChartPlugin',
  },
];
