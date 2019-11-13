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

const propTypes = {
  data: PropTypes.shape({
    raw_data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
    percent_data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
    pic_data: PropTypes.object,
  }),
  sliceId: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  colorScheme: PropTypes.string,
  pshowPercent: PropTypes.bool,
  pshowMulti: PropTypes.bool,
  pshowThumbnail: PropTypes.bool,
  dshowPercent: PropTypes.bool,
  dshowMulti: PropTypes.bool,
  dshowThumbnail: PropTypes.bool,
};

function formatSeries(seriesData) {
  const dimensions = seriesData[0];
  const timeKey = 'timestamp';
  const series = [];
  dimensions.forEach(item => {
    if (item !== timeKey) {
      series.push({
        type: 'line',
        stack: 'value',
        areaStyle: {},
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

function EchartsStack(element, props) {
  const {
    data,
    sliceId,
    width,
    height,
    colorScheme,
    pshowPercent,
    pshowMulti,
    pshowThumbnail,
    dshowPercent,
    dshowMulti,
    dshowThumbnail,
  } = props;

  const div = d3.select(element);
  const Id = 'echarts_slice_' + sliceId;
  const html = '<div id=' + Id + ' style="width:' + width + 'px;height:' + height + 'px;"></div>';
  div.html(html);

  const myChart = echarts.init(document.getElementById(Id));

  const dataDict = data;
  const picDict = dataDict['pic_data'];
  const seriesName = dataDict['raw_data'][0];

  let mouseCurValue = 0;

  let showMultiSeries = dshowMulti;
  let showPercent = dshowPercent;
  let showPic = dshowThumbnail;

  const option = {
    color: CategoricalColorNamespace.getScale(colorScheme).colors,
    legend: {
      type: 'scroll',
      data: formatLegend(seriesName),
      scrollDataIndex: 1,
    },
    toolbox: {
      show: true,
      itemSize: 20,
      feature: {
        myTool1: {
          show: pshowPercent,
          title: 'percent view',
          icon:
            'path://M804.571429 731.428571c0-40.009143-33.133714-73.142857-73.142858-73.142857s-73.142857 33.133714-73.142857 73.142857 33.133714 73.142857 73.142857 73.142858 73.142857-33.133714 73.142858-73.142858zM365.714286 292.571429c0-40.009143-33.133714-73.142857-73.142857-73.142858s-73.142857 33.133714-73.142858 73.142858 33.133714 73.142857 73.142858 73.142857 73.142857-33.133714 73.142857-73.142857z m585.142857 438.857142c0 121.161143-98.304 219.428571-219.428572 219.428572s-219.428571-98.304-219.428571-219.428572 98.304-219.428571 219.428571-219.428571 219.428571 98.304 219.428572 219.428571zM896 109.714286c0 8.009143-2.852571 15.433143-7.424 21.723428l-603.428571 804.571429C278.308571 945.152 267.446857 950.857143 256 950.857143H164.571429c-20.004571 0-36.571429-16.566857-36.571429-36.571429 0-8.009143 2.852571-15.433143 7.424-21.723428l603.428571-804.571429C745.691429 78.848 756.553143 73.142857 768 73.142857h91.428571c20.004571 0 36.571429 16.566857 36.571429 36.571429zM512 292.571429c0 121.161143-98.304 219.428571-219.428571 219.428571s-219.428571-98.304-219.428572-219.428571 98.304-219.428571 219.428572-219.428572 219.428571 98.304 219.428571 219.428572z',
          iconStyle: {
            color: '#cdcdcd',
          },
          onclick: function() {
            showPercent = !showPercent;
            myChart.setOption({
              toolbox: {
                feature: {
                  myTool1: {
                    iconStyle: {
                      color: showPercent ? '#7CFC00' : '#cdcdcd',
                    },
                  },
                },
              },
              dataset: {
                source: showPercent ? dataDict['percent_data'] : dataDict['raw_data'],
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  formatter: showPercent ? '{value}%' : null,
                },
                max: showPercent ? 100 : null,
              },
              series: showPercent
                ? formatSeries(dataDict['percent_data'])
                : formatSeries(dataDict['raw_data']),
            });
          },
        },
        myTool2: {
          show: pshowMulti,
          title: 'multi series',
          icon:
            'path://M102.4 0h819.2C977.92 0 1024 46.08 1024 102.4v614.4c0 56.32-46.08 102.4-102.4 102.4H716.8L512 1024 307.2 819.2H102.4C46.08 819.2 0 773.12 0 716.8V102.4C0 46.08 46.08 0 102.4 0z m51.2 153.6V256h716.8V153.6H153.6z m0 204.8v102.4h512V358.4h-512z m0 204.8v102.4H768V563.2H153.6z',
          iconStyle: {
            color: '#7CFC00',
          },
          onclick: function() {
            showMultiSeries = !showMultiSeries;
            myChart.setOption({
              toolbox: {
                feature: {
                  myTool2: {
                    iconStyle: {
                      color: showMultiSeries ? '#7CFC00' : '#cdcdcd',
                    },
                  },
                },
              },
            });
          },
        },
        myTool3: {
          show: pshowThumbnail,
          title: 'show thumbnail',
          icon:
            'path://M146.7136 55.68512C65.68448 55.68512 0 121.65632 0 202.5984v583.89504c0 81.13664 65.6128 146.91328 146.7136 146.91328h730.5728c81.02912 0 146.7136-65.9712 146.7136-146.91328V202.59328c0-81.13664-65.6128-146.91328-146.7136-146.91328H146.7136z m596.40832 390.5536s-11.65824-22.85056-52.65408-22.85056c-46.51008 0-60.49792 22.144-60.49792 22.144l-175.9232 286.47936s-9.56928 19.19488-33.04448 19.19488c-24.576 0-36.31104-19.19488-36.31104-19.19488l-92.51328-111.55968s-23.7056-33.11616-54.50752-33.11616c-30.67392 0-56.15616 36.64896-56.15616 36.64896l-71.80288 89.98912V238.24896c0-40.23296 32.5376-72.84736 72.82176-72.84736h658.93376c40.2176 0 72.81664 32.0256 72.81664 73.35936v438.64064l-171.1616-231.16288zM475.42784 384.80384c0 60.62592-49.11104 109.73696-109.696 109.73696S256 445.39392 256 384.80384c0-60.544 49.14688-109.69088 109.73184-109.69088 60.58496 0.03584 109.696 49.14688 109.696 109.69088z',
          iconStyle: {
            color: '#7CFC00',
          },
          onclick() {
            showPic = !showPic;
            myChart.setOption({
              toolbox: {
                feature: {
                  myTool3: {
                    iconStyle: {
                      color: showPic ? '#7CFC00' : '#cdcdcd',
                    },
                  },
                },
              },
            });
          },
        },
      },
      top: '3%',
      right: '3%',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
      // enterable: true,
      // extraCssText: 'overflow-y: auto; max-height: ' + height + 'px;',
      position: function(pos, params, dom, rect, size) {
        const topPercent = 0.05; // equal 5% in grid option
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
      formatter: function(params) {
        const time = echarts.format.formatTime('MM-dd yyyy', new Date(params[0].data[0]));
        let str = time + '<br/>';
        if (showMultiSeries) {
          for (let p = params.length - 1; p >= 0; p--) {
            const marker = echarts.format.getTooltipMarker(params[p].color);
            const name = params[p].seriesName;
            const tooltipData = params[p].data[seriesName.indexOf(name)];
            str +=
              marker +
              name +
              ': ' +
              (showPercent ? tooltipData.toFixed(2) + '%' : tooltipData) +
              '<br/>';
          }
        }
        let sum = 0;
        let curSeries = '';
        let findSeries = true;
        for (let p = 0; p < params.length; p++) {
          const marker = echarts.format.getTooltipMarker(params[p].color);
          const name = params[p].seriesName;
          const tooltipData = params[p].data[seriesName.indexOf(name)];
          sum += tooltipData;
          if (findSeries && sum >= mouseCurValue) {
            curSeries = name;
            findSeries = !findSeries;
            if (!showMultiSeries) {
              str +=
                marker +
                name +
                ': ' +
                (showPercent ? tooltipData.toFixed(2) + '%' : tooltipData) +
                '<br/>';
            }
            break;
          }
        }
        if (curSeries !== '' && curSeries !== 'other') {
          str += curSeries + '<br/>';
          const pic = picDict[curSeries];
          if (showPic && pic !== '' && pic !== undefined)
            str += "<img style='width:150px; height:205px; ' src='https://" + pic + "'/>";
        }
        return str;
      },
      // confine: true,
    },
    dataset: {
      source: showPercent ? dataDict['percent_data'] : dataDict['raw_data'],
    },
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: showPercent ? '{value}%' : null,
      },
      max: showPercent ? 100 : null,
    },
    grid: {
      left: '3%',
      right: '3%',
      top: '5%',
      bottom: '5%',
      containLabel: true,
    },
    series: showPercent
      ? formatSeries(dataDict['percent_data'])
      : formatSeries(dataDict['raw_data']),
    dataZoom: [
      {
        id: 'dataZoomX',
        type: 'inside',
        xAxisIndex: [0],
        filterMode: 'filter',
        start: 0,
        end: 100,
      },
    ],
    useUTC: true,
  };
  myChart.setOption(option);

  myChart.on('showTip', function(params) {
    mouseCurValue = myChart.convertFromPixel({ yAxisIndex: 0 }, params.y);
  });

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

EchartsStack.displayName = 'EchartsStack';
EchartsStack.propTypes = propTypes;

export default EchartsStack;
