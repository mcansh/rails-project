function deleteList(e) {
  e.preventDefault();
  // eslint-disable-next-line no-alert, no-restricted-globals
  if (confirm('Are you sure you want to delete this list?')) {
    this.form.submit();
  }
}

export default deleteList;
