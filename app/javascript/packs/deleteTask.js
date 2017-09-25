import { $ } from './bling';

function deleteList(e) {
  e.preventDefault();
  const target = e.target;
  const { taskId, listId } = target.dataset;

  const URL = `/lists/${listId}/tasks/${taskId}`;
  const authenticityToken = $('meta[name="csrf-token"]').content;

  const body = {
    authenticity_token: authenticityToken,
  };

  fetch(URL, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify(body),
  })
    .then(data => console.log(data))
    .then(() => target.parentElement.remove())
    .catch(err => console.error(err));
}

export default deleteList;
