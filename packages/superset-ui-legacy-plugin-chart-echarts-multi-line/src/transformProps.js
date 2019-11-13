export default function transformProps(chartProps) {
  const { width, height, formData, queryData } = chartProps;
  const { sliceId, colorScheme, numberFormat, showEnlarge, rowNumber } = formData;

  return {
    width,
    height,
    sliceId,
    data: queryData.data,
    colorScheme,
    numberFormat,
    rowNumber,
    showEnlarge,
  };
}
