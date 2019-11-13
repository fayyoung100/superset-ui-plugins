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
import { formatNumber } from '@superset-ui/number-format';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
  sliceId: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  colorScheme: PropTypes.string,
  numberFormat: PropTypes.string,
};

function formatSeries(seriesData) {
  const dimensions = seriesData[0];
  const timeKey = 'timestamp';
  const series = [];
  dimensions.forEach(item => {
    if (item !== timeKey) {
      series.push({
        type: 'line',
        name: item,
        encode: {
          x: timeKey,
          y: item,
        },
      });
    }
  });
  return series;
}

function formatLegend(seriesName) {
  const legend = seriesName.slice();
  legend.push('timestamp');
  return legend.reverse().slice(0, -1);
}

function EchartsLine(element, props) {
  const { data, sliceId, width, height, colorScheme, numberFormat } = props;

  const div = d3.select(element);
  const Id = 'echarts_slice_' + sliceId;
  const html = '<div id=' + Id + ' style="width:' + width + 'px;height:' + height + 'px;"></div>';
  div.html(html);

  const myChart = echarts.init(document.getElementById(Id));

  const seriesName = data[0];

  const option = {
    color: CategoricalColorNamespace.getScale(colorScheme).colors,
    legend: {
      type: 'scroll',
      data: formatLegend(seriesName),
      scrollDataIndex: 1,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
      formatter: function(params) {
        const time = echarts.format.formatTime('MM-dd yyyy', new Date(params[0].data[0]));
        let str = time + '<br/>';
        for (let p = 0; p < params.length; p++) {
          const marker = echarts.format.getTooltipMarker(params[p].color);
          const name = params[p].seriesName;
          const tooltipData = params[p].data[seriesName.indexOf(name)];
          const format = numberFormat || '.3s';
          str += marker + name + ': ' + formatNumber(format, tooltipData) + '<br/>';
        }
        return str;
      },
      position: function(pos, params, dom, rect, size) {
        const topPercent = 0.08; // equal 8% in grid option
        const offset =
          pos[1] < size.viewSize[1] / 2
            ? +(size.viewSize[1] * topPercent * 2)
            : -(size.viewSize[1] * topPercent * 2);
        return {
          // top: (pos[1] + size.contentSize[1] < size.viewSize[1]) ? pos[1] : (pos[1] < size.viewSize[1] / 2) ? pos[1] : pos[1] - (pos[1] + size.contentSize[1] - size.viewSize[1]),
          top:
            pos[1] -
            (pos[1] / (size.viewSize[1] * (1 - topPercent * 2))) * size.contentSize[1] +
            offset,
          left:
            pos[0] + size.contentSize[0] < size.viewSize[0]
              ? pos[0]
              : pos[0] < size.viewSize[0] / 2
              ? pos[0]
              : pos[0] - (pos[0] + size.contentSize[0] - size.viewSize[0]),
        };
      },
    },
    dataset: {
      source: data,
    },
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        // formatter: function(value) {
        //   const format = numberFormat || '.3s';
        //   return d3format(format, value);
        // },
      },
    },
    grid: {
      left: '3%',
      right: '3%',
      top: '8%',
      bottom: '5%',
      containLabel: true,
    },
    series: formatSeries(data),
    // dataZoom: [
    //   {
    //     id: 'dataZoomX',
    //     type: 'inside',
    //     xAxisIndex: [0],
    //     filterMode: 'filter',
    //     start: 0,
    //     end: 100,
    //   },
    // ],
    useUTC: true,
  };
  myChart.setOption(option);

  let allSelect = true;
  myChart.on('dblclick', function(params) {
    allSelect = !allSelect;
    const dynamicSelected = {};
    for (const index in seriesName) {
      if (params.seriesName !== seriesName[index]) {
        dynamicSelected[seriesName[index]] = allSelect;
      }
    }
    myChart.setOption({
      legend: {
        selected: dynamicSelected,
      },
    });
  });
}

EchartsLine.displayName = 'EchartsLine';
EchartsLine.propTypes = propTypes;

export default EchartsLine;
