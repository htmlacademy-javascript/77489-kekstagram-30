const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

const ServerRoutes = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  [HttpMethods.GET]: 'Не удалось загрузить данные',
  [HttpMethods.POST]: 'Не удалось отправить форму',
};

async function request(url, method = HttpMethods.GET, body = null) {
  const response = await fetch(url, { method, body });
  if (!response.ok) {
    throw new Error(ErrorText[method]);
  }

  return await response.json();
}

async function loadPictures() {
  return request(`${SERVER_URL}${ServerRoutes.GET_DATA}`);
}

async function sendPicture(pictureData) {
  return request(
    `${SERVER_URL}${ServerRoutes.SEND_DATA}`,
    HttpMethods.POST,
    pictureData,
  );
}

export { loadPictures, sendPicture };
