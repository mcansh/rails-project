const patchRequest = async ({ url, body, authenticityToken }) => {
  if (!url || !body || !authenticityToken) {
    throw new Error('Must supply a url, body and Authenticity Token');
  }

  try {
    await fetch(url, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-csrf-token': authenticityToken,
      },
      credentials: 'same-origin',
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(error);
  }
};

export default patchRequest;
