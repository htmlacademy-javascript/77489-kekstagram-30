const REMOVE_MESSAGE_TIMEOUT = 5000;

const errorMesageTemplate = document
  .querySelector('#data-error')
  .content
  .querySelector('data-error');

function showErrorMesage() {
  const errorElement = errorMesageTemplate.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
}

export { showErrorMesage };
