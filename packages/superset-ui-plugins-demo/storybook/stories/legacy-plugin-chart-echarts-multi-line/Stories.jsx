/* eslint-disable sort-keys, no-magic-numbers */
import React from 'react';
import { SuperChart } from '@superset-ui/chart';
import data from './data';

export default [
  {
    renderStory: () => (
      <SuperChart
        chartType="echarts-multi-line"
        width={1100}
        height={600}
        formData={{
          sliceId: 1,
          colorScheme: 'd3Category10',
          numberFormat: '.3s',
          showEnlarge: true,
          rowNumber: 3,
        }}
        queryData={{
          data,
        }}
      />
    ),
    storyName: 'Basic',
    storyPath: 'legacy-|plugin-chart-echarts-multi-line|EchartsMultiLineChartPlugin',
  },
];
