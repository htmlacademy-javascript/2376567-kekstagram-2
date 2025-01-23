const DATA_PATH = 'https://32.javascript.htmlacademy.pro/kekstagram';
const GET_ROUTE = '/data';
const POST_ROUTE = '/';

const load = (path, route, method, body = null) =>
  fetch(`${path}${route}`, {
    method: method,
    body: body
  }).then((response) => {
    if (response.ok) {
      const data = response.json();
      return data;
    }
    throw new Error(`Ошибка загрузки: ${response.status}`);
  });

const postData = (body) => load(DATA_PATH, POST_ROUTE, 'POST', body);
const getData = () => load(DATA_PATH, GET_ROUTE, 'GET');

export { postData, getData };
