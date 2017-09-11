import { $ } from './bling';
import getListTasks from './getListTasks';

function createTask(e) {
  e.preventDefault();
  const description = $('#task_description').value;
  const authenticity_token = this.querySelector('[name="authenticity_token"]').value;
  const body = {
    task: {
      description,
    },
    authenticity_token,
  };
  if (!description) return;
  const url = this.action;
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify(body),
  })
    .then(description.value = '')
    .then(getListTasks('3'))
    .catch(err => console.error(err));
}

export default createTask;
