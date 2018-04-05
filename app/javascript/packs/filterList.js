import { $ } from './bling';

const filterList = async e => {
  e.preventDefault();

  const authenticityToken = $('[name="csrf-token"]').content;
  const url = $('form').action;
  const { tasks } = await fetch(`${url}.json`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-csrf-token': authenticityToken,
    },
    credentials: 'same-origin',
  }).then(r => r.json());

  const tasksLongerThan5 = tasks.filter(task => task.description.length >= 5);

  const html = tasksLongerThan5
    .map(
      task =>
        `
    <li class="task__list--item">
      <form class="edit_task" id="edit_task_${task.id}" action="/lists/${
          task.list_id
        }/tasks/${task.id}" method="post">
        <input id="task-${task.id}" type="checkbox" ${
          task.status ? 'checked' : ''
        } value="1" name="task[status]" />
        <label><span>${task.description}</span></label>
      </form>
      <button class="button task__form--destroy" id="delete__task" data-task-id="${
        task.id
      }" data-list-id="${task.list_id}">Delete Task</button>
      <a class="button" href="/lists/${task.list_id}/tasks/${
          task.id
        }">View Task</a>
    </li>`
    )
    .join('');

  $('.task__list').innerHTML = html;
};

export default filterList;
