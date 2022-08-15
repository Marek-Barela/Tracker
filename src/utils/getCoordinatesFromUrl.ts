export const getCoordinatesFromUrl = (url: string) => {
  const regExp = /(?=@).*(?=z)/;
  const result = url.match(regExp);

  if (result !== null) {
    return result[0].substring(1).split(",");
  }
};
