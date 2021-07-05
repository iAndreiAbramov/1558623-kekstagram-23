export const getData = async (url, errorHandler) => {
  const result = await fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch(() => errorHandler());

  return await result;
};
