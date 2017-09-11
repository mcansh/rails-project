import { $ } from './bling';
import getListTasks from './getListTasks';

function createTask(e) {
  e.preventDefault();
  const description = $('#task_description');
  if (!description) return;
  const url = this.action;
  const CSRF = $('meta[name="csrf-token"]');
  if (!CSRF) {
    console.error('no csrf token 😱');
    return;
  }
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-Token': CSRF.content,
    },
    credentials: 'same-origin',
    body: JSON.stringify({ description: description.value }),
  })
    .then(description.value = '')
    .then(getListTasks('1'));
}

export default createTask;
