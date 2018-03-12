import { $ } from './bling';
import patchRequest from './patchRequest';

const toggleStatus = async e => {
  e.preventDefault();
  const { target } = e;
  if (target.nodeName.toLowerCase() !== 'input') return;
  const { checked } = target;

  const form = target.closest('form');
  const authenticityToken = $('meta[name="csrf-token"]').content;
  const body = {
    task: {
      status: checked,
    },
  };
  const url = form.action;
  await patchRequest({ url, authenticityToken, body });
};

export default toggleStatus;
