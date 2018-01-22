function deleteList(e) {
  e.preventDefault();
  if (confirm('Are you sure you want to delete this list?')) {
    this.form.submit();
  }
}


export default deleteList;
