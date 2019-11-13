/* eslint-disable sort-keys, no-magic-numbers */
import React from 'react';
import { SuperChart } from '@superset-ui/chart';
import data from './data';

export default [
  {
    renderStory: () => (
      <SuperChart
        chartType="echarts-line"
        width={1100}
        height={600}
        queryData={{ data }}
        formData={{
          sliceId: 1,
          colorScheme: 'd3Category10',
          pshowMulti: true,
          dshowMulti: true,
        }}
      />
    ),
    storyName: 'Basic',
    storyPath: 'legacy-|plugin-chart-echarts-line|EchartsLineChartPlugin',
  },
];
