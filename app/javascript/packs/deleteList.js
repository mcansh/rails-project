function deleteList(e) {
  e.preventDefault();
  // eslint-disable-next-line no-alert
  if (window.confirm('Are you sure you want to delete this list?')) {
    this.form.submit();
  }
}

export default deleteList;
