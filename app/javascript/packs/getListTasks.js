import { $ } from './bling';

function getListTasks(listID) {
  const url = `/lists/${listID}.json`;
  const CSRF = $('meta[name="csrf-token"]').content;
  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-Token': CSRF,
    },
    credentials: 'same-origin',
  })
    .then(blob => blob.json())
    .then((data) => {
      const { tasks } = data;
      tasks.forEach(task => console.log(task));
    });
}

export default getListTasks;
