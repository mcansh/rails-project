import { $ } from './bling';

const createTask = async e => {
  const { target: form } = e;
  e.preventDefault();
  const taskDescription = form.querySelector('#task_description').value;

  if (!taskDescription) return;
  const authenticityToken = $('[name="csrf-token"]').content;
  const body = {
    description: taskDescription,
  };

  const url = `${form.action}/tasks`;

  try {
    const task = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-csrf-token': authenticityToken,
      },
      body: JSON.stringify(body),
      credentials: 'same-origin',
    }).then(r => r.json());

    form.reset();

    const { tasks } = task;

    console.log(tasks);

    const newestTask = tasks[tasks.length - 1];
    console.log(newestTask);

    const { description, id: taskId } = newestTask;
    const { id: listId } = task;

    $('.task__list').innerHTML += `
      <li class="task__list--item">
        <form class="edit_task" id="edit_task_${taskId}" action="/lists/${listId}/tasks/${taskId}" method="post">
          <input id="task-${taskId}" type="checkbox" value="1" name="task[status]" />
          <label><span>${description}</span></label>
        </form>
        <button class="button task__form--destroy" id="delete__task" data-task-id="${taskId}" data-list-id="${listId}">Delete Task</button>
        <a class="button" href="/lists/${listId}/tasks/${taskId}">View Task</a>
      </li>
    `;
  } catch (error) {
    console.error(error);
  }
};

export default createTask;
