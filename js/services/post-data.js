export const postData = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    'Content-Type': 'multipart/form-data',
    body,
  });

  return await response;
};
