import { getNumberFormatter, NumberFormats } from '@superset-ui/number-format';

export default function transformProps(chartProps) {
  const { width, height, formData, queryData } = chartProps;
  const { sliceId, colorScheme } = formData;

  return {
    width,
    height,
    sliceId,
    data: queryData.data,
    colorScheme,
  };
}
