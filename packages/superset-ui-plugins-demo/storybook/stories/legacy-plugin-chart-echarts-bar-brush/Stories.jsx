/* eslint-disable sort-keys, no-magic-numbers */
import React from 'react';
import { SuperChart } from '@superset-ui/chart';
import data from './data';
export default [
  {
    renderStory: () => (
      <SuperChart
        chartType="echarts-bar-brush"
        chartProps={{
          formData: {
            sliceId: 1,
            colorScheme: 'd3Category10',
          },
          height: 500,
          width: 1000,
          queryData: {
            data,
          },
        }}
      />
    ),
    storyName: 'Basic',
    storyPath: 'legacy-|plugin-chart-echarts-bar-brush|EchartsBarBrushChartPlugin',
  },
];
