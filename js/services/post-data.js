export const postData = async (url, body) => await fetch(url, {
  method: 'POST',
  'Content-Type': 'multipart/form-data',
  body,
});
