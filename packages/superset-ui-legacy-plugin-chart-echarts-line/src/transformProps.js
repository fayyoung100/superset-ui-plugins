export default function transformProps(chartProps) {
  const { width, height, formData, queryData } = chartProps;
  const { sliceId, colorScheme, numberFormat, pshowMulti, dshowMulti } = formData;

  return {
    width,
    height,
    sliceId,
    data: queryData.data,
    colorScheme,
    numberFormat,
    pshowMulti,
    dshowMulti,
  };
}
