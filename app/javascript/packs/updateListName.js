import { $ } from './bling';
import patchRequest from './patchRequest';

const updateListName = async e => {
  e.preventDefault();
  const input = $('#list__name');
  const editButton = $('#edit__button');
  const authenticityToken = $('meta[name="csrf-token"]').content;
  const { readOnly } = input;
  editButton.textContent = readOnly ? 'Update List' : 'Edit List';
  input.readOnly = !input.readOnly;
  input.disabled = !input.disabled;
  const URL = editButton.pathname.split('/');
  const id = URL[2];

  const url = `/lists/${id}`;

  if (!readOnly) {
    const name = input.value;
    const body = {
      list: {
        name,
      },
    };

    await patchRequest({ url, body, authenticityToken });
  }
};

export default updateListName;
