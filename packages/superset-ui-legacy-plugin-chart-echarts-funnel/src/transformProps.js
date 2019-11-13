export default function transformProps(chartProps) {
  const { width, height, formData, queryData } = chartProps;
  const { sliceId, colorScheme, groupby, orderDesc } = formData;

  return {
    width,
    height,
    sliceId,
    data: queryData.data,
    colorScheme,
    groupby,
    orderDesc,
  };
}
