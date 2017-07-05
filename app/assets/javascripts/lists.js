function markComplete(input) {
  const form = input.closest('form');
  form.submit();
}

document.querySelectorAll('input[type="checkbox"]').forEach((input) => {
  input.addEventListener('change', function () {
    markComplete(this);
  });
});
