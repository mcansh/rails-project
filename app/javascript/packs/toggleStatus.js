import { $ } from './bling';

function toggleStatus(e) {
  e.preventDefault();
  const target = e.target;
  const { checked } = target;

  const form = target.closest('form');
  const authenticityToken = $('[name="csrf-token"]').content;
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
  }).catch(err => console.error(err));
}

export default toggleStatus;
