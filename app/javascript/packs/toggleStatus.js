function toggleStatus(e) {
  e.preventDefault();
  const { checked } = this;
  const form = this.closest('form');
  const authenticityToken = form.querySelector('[name="authenticity_token"]').value;
  const body = {
    task: {
      status: checked,
    },
    authenticity_token: authenticityToken,
  };
  const url = form.action;
  fetch(url, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify(body),
  })
    .catch(err => console.error(err));
}

export default toggleStatus;
