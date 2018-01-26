import { $ } from './bling';

function createTask(e) {
  e.preventDefault();
  const taskDescription = $('#task_description').value;
  if (!taskDescription) return;
  const authenticityToken = this.querySelector('[name="authenticity_token"]').value;
  const body = {
    task: {
      description: taskDescription,
    },
    authenticity_token: authenticityToken,
  };
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
    .then(this.reset())
    .then(blob => blob.json())
    .then((data) => {
      const {tasks} = data;
      const lastIndex = tasks.length - 1;
      const task = tasks[lastIndex];
      const { description, id } = task;
      const { id: listId } = data;

      console.log(task);

      $('.task__list').innerHTML += `
        <li class="task__list--item">
          <form class="edit_task" id="edit_task_${id}" action="/lists/${listId}/tasks/${id}" method="post">
            <input id="task-${id}" type="checkbox" value="1" name="task[status]" />
            <label><span>${description}</span></label>
          </form>
          <button class="button task__form--destroy" id="delete__task" data-task-id="${id}" data-list-id="${listId}">Delete Task</button>
        </li>`;
    })
    .catch(err => console.error(err));
}

export default createTask;
