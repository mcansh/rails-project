function getListTasks(listID) {
  const url = `/lists/${listID}.json`;
  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  })
    .then(blob => blob.json())
    .then((data) => {
      const { tasks } = data;
      tasks.forEach(task => console.log(task));
    })
    .catch(err => console.error(err));
}

export default getListTasks;
