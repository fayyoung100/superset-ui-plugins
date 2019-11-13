/* eslint-disable no-param-reassign */
/* eslint dot-notation: "off" */
/* eslint object-shorthand: "off" */
/* eslint no-nested-ternary: "off" */
/* eslint max-len: "off" */
/* eslint no-console: "off" */
import d3 from 'd3';
import PropTypes from 'prop-types';
import echarts from 'echarts';
import { CategoricalColorNamespace } from '@superset-ui/color';

const propTypes = {
  data: PropTypes.shape({
    sortby: PropTypes.string,
    col_index: PropTypes.arrayOf(PropTypes.string),
    raw_data_col: PropTypes.arrayOf(PropTypes.string),
    raw_data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
    percent_col: PropTypes.arrayOf(PropTypes.string),
    percent_data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
  }),
  sliceId: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  colorScheme: PropTypes.string,
  groupby: PropTypes.arrayOf(PropTypes.string),
  orderDesc: PropTypes.bool,
};

function formatShowData(nameList, dataList) {
  const data = [];
  for (let i = 0; i < nameList.length; i++) {
    data.push({
      name: nameList[i],
      value: dataList[i],
    });
  }
  return data;
}

function EchartsFunnel(element, props) {
  const { data, sliceId, width, height, colorScheme, groupby, orderDesc } = props;

  const div = d3.select(element);
  const Id = 'echarts_slice_' + sliceId;
  const html = '<div id=' + Id + ' style="width:' + width + 'px;height:' + height + 'px;"></div>';
  div.html(html);

  const myChart = echarts.init(document.getElementById(Id));

  const payloadData = data;
  const sortBy = data['sortby'];
  const funnelIndex = payloadData['col_index'];
  const funnelDataCol = payloadData['raw_data_col'];
  const funnelData = payloadData['raw_data'];
  const funnelPercentCol = payloadData['percent_col'];
  const funnelPercent = payloadData['percent_data'];

  let showPercent = true;
  let asPercent = true;
  let nfid = 0; // now funnel id

  const option = {
    color: CategoricalColorNamespace.getScale(colorScheme).colors,
    title: {
      show: true,
      text: `${groupby}: ${funnelIndex[nfid]}
 No.${nfid + 1} with ${sortBy} ${orderDesc ? 'DESC' : 'ASC'}`,
      bottom: 'bottom',
      left: 'right',
    },
    toolbox: {
      show: true,
      itemSize: 20,
      feature: {
        myTool0: {
          show: true,
          title: 'use data as percent',
          icon:
            'path://M96 174.4c0 11.6 4 22.8 11.2 31.4l304.4 359.6c7.2 8.6 11.2 19.8 11.2 31.4v214c0 20 11.8 37.6 29.2 44l110 39.6c19.2 7 39.2-8.6 39.2-30.6V596.6c0-11.6 4-22.8 11.2-31.4l304.4-359.6c7.2-8.6 11.2-19.8 11.2-31.4 0-25.6-19.2-46.4-42.8-46.4H138.8C115.2 128 96 148.8 96 174.4z',
          iconStyle: {
            color: '#7CFC00',
          },
          onclick: function() {
            asPercent = !asPercent;
            myChart.setOption({
              toolbox: {
                feature: {
                  myTool0: {
                    iconStyle: {
                      color: asPercent ? '#7CFC00' : '#cdcdcd',
                    },
                  },
                },
              },
              title: {
                text: `${groupby}: ${funnelIndex[nfid]}
 No.${nfid + 1} with ${sortBy} ${orderDesc ? 'DESC' : 'ASC'}`,
              },
              series: {
                label: {
                  normal: {
                    formatter: showPercent
                      ? function(params) {
                          const percentName = params.name;
                          const percentIndex = funnelPercentCol.indexOf(percentName);
                          const spiltName = percentName.split('/');
                          const data1Name = spiltName[0];
                          const data2Name = spiltName[1];
                          const data1Index = funnelDataCol.indexOf(data1Name);
                          const data2Index = funnelDataCol.indexOf(data2Name);
                          let str = data2Name + ': ' + funnelData[nfid][data2Index] + '\n';
                          str += funnelPercent[nfid][percentIndex] + '%\n';
                          str += data1Name + ': ' + funnelData[nfid][data1Index];
                          return str;
                        }
                      : function(params) {
                          const dataName = params.name;
                          const dataIndex = funnelDataCol.indexOf(dataName);
                          return dataName + '\n' + funnelData[nfid][dataIndex];
                        },
                  },
                },
                data: showPercent
                  ? asPercent
                    ? formatShowData(funnelPercentCol, funnelData[nfid], true)
                    : formatShowData(funnelPercentCol, funnelPercent[nfid], false)
                  : formatShowData(funnelDataCol, funnelData[nfid]),
              },
            });
          },
        },
        myTool1: {
          show: true,
          title: 'percent view',
          icon:
            'path://M804.571429 731.428571c0-40.009143-33.133714-73.142857-73.142858-73.142857s-73.142857 33.133714-73.142857 73.142857 33.133714 73.142857 73.142857 73.142858 73.142857-33.133714 73.142858-73.142858zM365.714286 292.571429c0-40.009143-33.133714-73.142857-73.142857-73.142858s-73.142857 33.133714-73.142858 73.142858 33.133714 73.142857 73.142858 73.142857 73.142857-33.133714 73.142857-73.142857z m585.142857 438.857142c0 121.161143-98.304 219.428571-219.428572 219.428572s-219.428571-98.304-219.428571-219.428572 98.304-219.428571 219.428571-219.428571 219.428571 98.304 219.428572 219.428571zM896 109.714286c0 8.009143-2.852571 15.433143-7.424 21.723428l-603.428571 804.571429C278.308571 945.152 267.446857 950.857143 256 950.857143H164.571429c-20.004571 0-36.571429-16.566857-36.571429-36.571429 0-8.009143 2.852571-15.433143 7.424-21.723428l603.428571-804.571429C745.691429 78.848 756.553143 73.142857 768 73.142857h91.428571c20.004571 0 36.571429 16.566857 36.571429 36.571429zM512 292.571429c0 121.161143-98.304 219.428571-219.428571 219.428571s-219.428571-98.304-219.428572-219.428571 98.304-219.428571 219.428572-219.428572 219.428571 98.304 219.428571 219.428572z',
          iconStyle: {
            color: '#7CFC00',
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
              legend: {
                data: showPercent ? funnelPercentCol : funnelDataCol,
              },
              series: {
                label: {
                  normal: {
                    formatter: showPercent
                      ? function(params) {
                          const percentName = params.name;
                          const percentIndex = funnelPercentCol.indexOf(percentName);
                          const spiltName = percentName.split('/');
                          const data1Name = spiltName[0];
                          const data2Name = spiltName[1];
                          const data1Index = funnelDataCol.indexOf(data1Name);
                          const data2Index = funnelDataCol.indexOf(data2Name);
                          let str = data2Name + ': ' + funnelData[nfid][data2Index] + '\n';
                          str += funnelPercent[nfid][percentIndex] + '%\n';
                          str += data1Name + ': ' + funnelData[nfid][data1Index];
                          return str;
                        }
                      : function(params) {
                          const dataName = params.name;
                          const dataIndex = funnelDataCol.indexOf(dataName);
                          return dataName + '\n' + funnelData[nfid][dataIndex];
                        },
                  },
                },
                data: showPercent
                  ? asPercent
                    ? formatShowData(funnelPercentCol, funnelData[nfid])
                    : formatShowData(funnelPercentCol, funnelPercent[nfid])
                  : formatShowData(funnelDataCol, funnelData[nfid]),
              },
            });
          },
        },
        myTool2: {
          show: true,
          title: groupby + ' prev',
          icon:
            'path://M573.056 272l308.8 404.608A76.8 76.8 0 0 1 820.736 800H203.232a76.8 76.8 0 0 1-61.056-123.392L450.976 272a76.8 76.8 0 0 1 122.08 0z',
          iconStyle: {
            color: '#cdcdcd',
          },
          onclick: function() {
            nfid = nfid - 1 < 0 ? funnelIndex.length - 1 : nfid - 1;
            myChart.setOption({
              title: {
                text: `${groupby}: ${funnelIndex[nfid]}
 No.${nfid + 1} with ${sortBy} ${orderDesc ? 'DESC' : 'ASC'}`,
              },
              series: {
                label: {
                  normal: {
                    formatter: showPercent
                      ? function(params) {
                          const percentName = params.name;
                          const percentIndex = funnelPercentCol.indexOf(percentName);
                          const spiltName = percentName.split('/');
                          const data1Name = spiltName[0];
                          const data2Name = spiltName[1];
                          const data1Index = funnelDataCol.indexOf(data1Name);
                          const data2Index = funnelDataCol.indexOf(data2Name);
                          let str = data2Name + ': ' + funnelData[nfid][data2Index] + '\n';
                          str += funnelPercent[nfid][percentIndex] + '%\n';
                          str += data1Name + ': ' + funnelData[nfid][data1Index];
                          return str;
                        }
                      : function(params) {
                          const dataName = params.name;
                          const dataIndex = funnelDataCol.indexOf(dataName);
                          return dataName + '\n' + funnelData[nfid][dataIndex];
                        },
                  },
                },
                data: showPercent
                  ? asPercent
                    ? formatShowData(funnelPercentCol, funnelData[nfid])
                    : formatShowData(funnelPercentCol, funnelPercent[nfid])
                  : formatShowData(funnelDataCol, funnelData[nfid]),
              },
            });
          },
        },
        myTool3: {
          show: true,
          title: groupby + ' next',
          icon:
            'path://M573.056 752l308.8-404.608A76.8 76.8 0 0 0 820.736 224H203.232a76.8 76.8 0 0 0-61.056 123.392l308.8 404.608a76.8 76.8 0 0 0 122.08 0z',
          iconStyle: {
            color: '#cdcdcd',
          },
          onclick: function() {
            nfid = nfid + 1 === funnelIndex.length ? 0 : nfid + 1;
            myChart.setOption({
              title: {
                text: `${groupby}: ${funnelIndex[nfid]}
 No.${nfid + 1} with ${sortBy} ${orderDesc ? 'DESC' : 'ASC'}`,
              },
              series: {
                label: {
                  normal: {
                    formatter: showPercent
                      ? function(params) {
                          const percentName = params.name;
                          const percentIndex = funnelPercentCol.indexOf(percentName);
                          const spiltName = percentName.split('/');
                          const data1Name = spiltName[0];
                          const data2Name = spiltName[1];
                          const data1Index = funnelDataCol.indexOf(data1Name);
                          const data2Index = funnelDataCol.indexOf(data2Name);
                          let str = data2Name + ': ' + funnelData[nfid][data2Index] + '\n';
                          str += funnelPercent[nfid][percentIndex] + '%\n';
                          str += data1Name + ': ' + funnelData[nfid][data1Index];
                          return str;
                        }
                      : function(params) {
                          const dataName = params.name;
                          const dataIndex = funnelDataCol.indexOf(dataName);
                          return dataName + '\n' + funnelData[nfid][dataIndex];
                        },
                  },
                },
                data: showPercent
                  ? asPercent
                    ? formatShowData(funnelPercentCol, funnelData[nfid])
                    : formatShowData(funnelPercentCol, funnelPercent[nfid])
                  : formatShowData(funnelDataCol, funnelData[nfid]),
              },
            });
          },
        },
      },
      top: '3%',
      right: '3%',
    },
    tooltip: {
      trigger: 'item',
      formatter: function(params) {
        const name = params.name;
        let str = name + '<br/>';
        const tooltipIndex = showPercent
          ? funnelPercentCol.indexOf(name)
          : funnelDataCol.indexOf(name);
        const tooltipData = showPercent
          ? 'CR: ' + funnelPercent[nfid][tooltipIndex] + '%'
          : funnelData[nfid][tooltipIndex];
        str += tooltipData + '<br/>';
        return str;
      },
      confine: true,
    },
    legend: {
      data: showPercent ? funnelPercentCol : funnelDataCol,
      selectedMode: false,
    },
    calculable: true,
    series: {
      name: funnelIndex[nfid],
      type: 'funnel',
      left: '10%',
      top: '10%',
      width: '80%',
      minSize: showPercent ? Math.min(...funnelPercent[nfid]) + '%' : Math.min(...funnelData[nfid]),
      sort: 'none',
      gap: 2,
      label: {
        normal: {
          show: true,
          position: 'inside',
          formatter: showPercent
            ? function(params) {
                const percentName = params.name;
                const percentIndex = funnelPercentCol.indexOf(percentName);
                const spiltName = percentName.split('/');
                const data1Name = spiltName[0];
                const data2Name = spiltName[1];
                const data1Index = funnelDataCol.indexOf(data1Name);
                const data2Index = funnelDataCol.indexOf(data2Name);
                let str = data2Name + ': ' + funnelData[nfid][data2Index] + '\n';
                str += funnelPercent[nfid][percentIndex] + '%\n';
                str += data1Name + ': ' + funnelData[nfid][data1Index];
                return str;
              }
            : function(params) {
                const dataName = params.name;
                const dataIndex = funnelDataCol.indexOf(dataName);
                return dataName + '\n' + funnelData[nfid][dataIndex];
              },
        },
        emphasis: {
          textStyle: {
            fontSize: 20,
          },
        },
      },
      labelLine: {
        normal: {
          length: 30,
          lineStyle: {
            width: 3,
            type: 'solid',
          },
        },
      },
      itemStyle: {
        normal: {
          borderColor: '#fff',
          borderWidth: 1,
        },
      },
      data: showPercent
        ? asPercent
          ? formatShowData(funnelPercentCol, funnelData[nfid])
          : formatShowData(funnelPercentCol, funnelPercent[nfid])
        : formatShowData(funnelDataCol, funnelData[nfid]),
    },
  };

  myChart.setOption(option);
}

EchartsFunnel.displayName = 'EchartsFunnel';
EchartsFunnel.propTypes = propTypes;

export default EchartsFunnel;
