// http://localhost:3000/lists.json
import { $ } from './bling';

const nextList = async () => {
  const [, listId] = window.location.pathname.split('/').filter(e => e);

  const authenticityToken = $('[name="csrf-token"]').content;
  const lists = await fetch('/lists.json', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-csrf-token': authenticityToken,
    },
    credentials: 'same-origin',
  }).then(r => r.json());

  const listIdNumber = parseInt(listId, 10);

  const currentIndex = lists.findIndex(list => list.id === listIdNumber);

  const nextIndex =
    currentIndex + 1 === lists.length ? lists[0] : lists[currentIndex + 1];

  $('#new_task').action = `/lists/${nextIndex.id}`;
  $('#edit__button').href = `/lists/${nextIndex.id}/edit`;

  const tasks = nextIndex.tasks
    .map(
      task =>
        `
      <li class="task__list--item">
        <form class="edit_task" id="edit_task_${task.id}" action="/lists/${
          task.list_id
        }/tasks/${task.id}" method="post">
          <input id="task-${
            task.id
          }" type="checkbox" value="1" name="task[status]" />
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

  $('.task__list').innerHTML = tasks;

  $('#list__name').value = nextIndex.name;
  window.history.pushState(
    {},
    nextIndex.description,
    `${window.location.origin}/lists/${nextIndex.id}`
  );
};

export default nextList;
