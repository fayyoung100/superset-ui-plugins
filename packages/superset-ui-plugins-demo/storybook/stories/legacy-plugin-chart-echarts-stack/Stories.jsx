/* eslint-disable sort-keys, no-magic-numbers */
import React from 'react';
import { SuperChart } from '@superset-ui/chart';
import data from './data';

export default [
  {
    renderStory: () => (
      <SuperChart
        chartType="echarts-stack"
        width={1100}
        height={600}
        formData={{
          sliceId: 1,
          colorScheme: 'd3Category10',
          pshowPercent: true,
          pshowMulti: true,
          pshowThumbnail: true,
          dshowPercent: true,
          dshowMulti: true,
          dshowThumbnail: false,
        }}
        queryData={{
          data,
        }}
      />
    ),
    storyName: 'Basic',
    storyPath: 'legacy-|plugin-chart-echarts-stack|EchartsStackChartPlugin',
  },
];
