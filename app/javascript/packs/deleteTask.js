import { $ } from './bling';

function deleteTask(e) {
  e.preventDefault();
  const { target: { dataset: { taskId, listId } } } = e;

  const URL = `${window.location.origin}/lists/${listId}/tasks/${taskId}`;
  const authenticityToken = $('meta[name="csrf-token"]').content;

  const body = {
    authenticity_token: authenticityToken,
  };

  console.log(URL);


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
    .then(() => e.target.parentElement.remove())
    .catch(err => console.error(err));
}

export default deleteTask;
