import { $ } from './bling';

const deleteTask = async e => {
  if (!e.target.classList.toString().match('.task__form--destroy')) return;
  e.preventDefault();
  const { target: { dataset: { taskId, listId } } } = e;
  const URL = `${window.location.origin}/lists/${listId}/tasks/${taskId}`;
  const authenticityToken = $('meta[name="csrf-token"]').content;
  try {
    fetch(URL, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-csrf-token': authenticityToken,
      },
      credentials: 'same-origin',
    })
      .then(() => e.target.parentElement.remove())
      .catch(err => console.error(err));
  } catch (error) {
    console.error(error);
  }
};

export default deleteTask;
