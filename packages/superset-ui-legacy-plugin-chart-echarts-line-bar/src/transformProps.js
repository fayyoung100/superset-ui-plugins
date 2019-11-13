import { getNumberFormatter, NumberFormats } from '@superset-ui/number-format';

export default function transformProps(chartProps) {
  console.log(`.......... chartProps;`, chartProps);
  const { width, height, formData, queryData } = chartProps;
  const {
    sliceId,
    colorScheme,
    yAxisLabel,
    yAxisMax,
    yAxisFormat,
    yAxisType,
    yAxis2Label,
    yAxis2Max,
    yAxis2Format,
    yAxis2Type,
    yAxisInterval,
  } = formData;

  return {
    width,
    height,
    sliceId,
    data: queryData.data,
    colorScheme,
    yAxisLabel,
    yAxis2Label,
    yAxisMax,
    yAxis2Max,
    formatYAxisFormat: getNumberFormatter(yAxisFormat),
    formatYAxis2Format: getNumberFormatter(yAxis2Format),
    yAxisInterval,
    types: [yAxisType, yAxis2Type],
  };
}
