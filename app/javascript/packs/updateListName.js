import { $ } from './bling';

function updateListName(e) {
  e.stopImmediatePropagation()
  const input = $('#list__name');
  const editButton = $('#edit__button');
  const authenticityToken = $('meta[name="csrf-token"]').content;
  const {readOnly} = input;
  editButton.textContent = readOnly ? 'Update List' : 'Edit List';
  input.readOnly = !input.readOnly;
  const URL = editButton.pathname.split('/');
  const listId = URL[2];

  if (!readOnly) {
    const name = input.value;
    const body = {
      list: {
        name,
      },
      authenticity_token: authenticityToken,
    };
    fetch(`/lists/${listId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(body),
    }).catch(err => console.error(err));
  }
}

export default updateListName;
