export const getData = async (url, errorHandler) => await fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Ошибка ${response.status}`);
  })
  .catch((err) => errorHandler(err));
