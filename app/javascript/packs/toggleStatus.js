import { $ } from './bling';

const toggleStatus = e => {
  e.preventDefault();
  const { target } = e;
  if (target.nodeName.toLowerCase() !== 'input') return;
  const { checked } = target;

  const form = target.closest('form');
  const authenticityToken = $('[name="csrf-token"]').content;
  const body = {
    task: {
      status: checked,
    },
  };
  const url = form.action;
  fetch(url, {
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

export default toggleStatus;
