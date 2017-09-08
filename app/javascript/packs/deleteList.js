function deleteList(e) {
  e.preventDefault();
  if (confirm('Are you sure you want to delete this list?')) { // eslint-disable-line no-alert
    this.form.submit();
  }
}

export default deleteList;
