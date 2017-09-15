function deleteList(e) {
  e.preventDefault();
  if (confirm('Are you sure you want to delete this list?')) { // eslint-disable-line no-alert, no-restricted-globals
    this.form.submit();
  }
}

export default deleteList;
