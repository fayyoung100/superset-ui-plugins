/* eslint-disable no-param-reassign */
/* eslint dot-notation: "off" */
/* eslint object-shorthand: "off" */
/* eslint no-nested-ternary: "off" */
/* eslint max-len: "off" */
/* eslint no-else-return: "off" */
/* eslint no-console: "off" */
import d3 from 'd3';
import PropTypes from 'prop-types';
import echarts from 'echarts';
import { CategoricalColorNamespace } from '@superset-ui/color';
import dateUtil from './dateUtil';

const propTypes = {
  sliceId: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  colorScheme: PropTypes.string,
  yAxisLabel: PropTypes.string,
  yAxis2Label: PropTypes.string,
  formatYAxisFormat: PropTypes.func,
  formatYAxis2Format: PropTypes.func,
  yAxisMax: PropTypes.number,
  yAxis2Max: PropTypes.number,
  yAxisInterval: PropTypes.number,
  types: PropTypes.array,
};

function buildChartsSeries(opts) {
  console.log(`buildChartsSeries opts:`, opts);
  let { data, names, types } = opts;
  if (!Array.isArray(data) || data.length < 1) {
    return;
  }
  let categoryArr = [],
    firstCreate = true;
  let seriesData = [];
  data.map(({ values, yAxis }, index) => {
    if (Array.isArray(values)) {
      // 拼凑data
      let dataArr = [];
      values.map(({ x, y }) => {
        firstCreate && categoryArr.push(x);
        dataArr.push(y);
      });
      firstCreate = false;
      // 拼凑series
      let seriesObj = {};
      seriesObj.data = dataArr;
      // TODO
      seriesObj.type = types[index];
      seriesObj.name = names[index];
      seriesObj.yAxisIndex = yAxis - 1;
      seriesData.push(seriesObj);
    }
  });
  return {
    categoryArr,
    seriesData,
  };
}

function EchartsLineBar(element, props) {
  const {
    data,
    sliceId,
    width,
    height,
    colorScheme,
    yAxisLabel,
    yAxis2Label,
    formatYAxisFormat,
    formatYAxis2Format,
    yAxisMax,
    yAxis2Max,
    yAxisInterval,
    types,
  } = props;
  let names = [yAxisLabel, yAxis2Label];
  let { seriesData, categoryArr } = buildChartsSeries({
    data,
    names,
    types,
  });
  console.log('seriesData:', seriesData);
  console.log('categoryArr:', categoryArr);

  const div = d3.select(element);
  const Id = 'echarts_slice_' + sliceId;
  const html = '<div id=' + Id + ' style="width:' + width + 'px;height:' + height + 'px;"></div>';
  div.html(html);

  const myChart = echarts.init(document.getElementById(Id));
  let colors = CategoricalColorNamespace.getScale(colorScheme).colors;
  console.log('echarts-line-bar colors======', colors);
  const option = {
    color: colors,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
        // label: {
        //   formatter: options => {
        //     console.log(`options=`, options);
        //   },
        // },
      },
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    legend: {
      data: names,
    },
    xAxis: [
      {
        type: 'category',
        data: categoryArr,
        // axisPointer: {
        //   type: 'shadow'
        // },
        axisLabel: {
          // value是字符串，比如转为number，否则NaN
          formatter: value => dateUtil.formatYear(+value),
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: yAxisLabel,
        min: 0,
        max: yAxisMax,
        interval: Math.ceil(yAxisMax / yAxisInterval),
        axisLabel: {
          formatter: value => formatYAxisFormat(value),
        },
      },
      {
        type: 'value',
        name: yAxis2Label,
        min: 0,
        max: yAxis2Max,
        interval: Math.ceil(yAxis2Max / yAxisInterval),
        axisLabel: {
          formatter: value => formatYAxis2Format(value),
        },
      },
    ],
    series: seriesData,
  };
  myChart.setOption(option);
}

EchartsLineBar.displayName = 'EchartsLineBar';
EchartsLineBar.propTypes = propTypes;

export default EchartsLineBar;
