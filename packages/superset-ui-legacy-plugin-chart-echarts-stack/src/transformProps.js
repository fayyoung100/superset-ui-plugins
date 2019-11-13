export default function transformProps(chartProps) {
  const { width, height, formData, queryData } = chartProps;
  const {
    sliceId,
    colorScheme,
    pshowPercent,
    pshowMulti,
    pshowThumbnail,
    dshowPercent,
    dshowMulti,
    dshowThumbnail,
  } = formData;

  return {
    width,
    height,
    sliceId,
    data: queryData.data,
    colorScheme,
    pshowPercent,
    pshowMulti,
    pshowThumbnail,
    dshowPercent,
    dshowMulti,
    dshowThumbnail,
  };
}
