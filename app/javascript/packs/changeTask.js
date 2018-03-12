import { $ } from './bling';

const nextTask = async () => {
  const [, listId, , taskId] = window.location.pathname
    .split('/')
    .filter(e => e);

  const authenticityToken = $('[name="csrf-token"]').content;
  const { tasks } = await fetch(`/lists/${listId}.json`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-csrf-token': authenticityToken,
    },
    credentials: 'same-origin',
  }).then(r => r.json());

  const taskIdNumber = parseInt(taskId, 10);

  const currentIndex = tasks.findIndex(task => task.id === taskIdNumber);

  const nextIndex =
    currentIndex + 1 === tasks.length ? tasks[0] : tasks[currentIndex + 1];
  console.log(nextIndex);

  $('h1#task-description').textContent = nextIndex.description;
  window.history.pushState(
    {},
    nextIndex.description,
    `${window.location.origin}/lists/${listId}/tasks/${nextIndex.id}`
  );
};

export default nextTask;
