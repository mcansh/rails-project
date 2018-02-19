const patchRequest = async ({ url, body, authenticityToken }) => {
  if (!url || !body || !authenticityToken) {
    throw new Error('Must supply a list url, body and Authenticity Token');
  }

  await fetch(url, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-csrf-token': authenticityToken,
    },
    credentials: 'same-origin',
    body: JSON.stringify(body),
  }).catch(err => console.error(err));
};

export default patchRequest;
