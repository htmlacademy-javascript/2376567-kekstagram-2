const arrDescription = [
  'закат и море',
  'горы и пикник',
  'портрет и пейзаж',
  'цветы и животные',
  'архитектура и природа',
  'семья и друзья',
  'путешествие и приключения',
  'кулинария и рецепты',
  'искусство и культура',
  'спорт и тренировки',
  'музыка и концерты',
  'свадьба и праздник',
  'дети и игры',
  'животные и питомцы',
  'мода и стиль',
  'еда и напитки',
  'вечеринка и танцы',
  'фотография и композиция',
  'книги и чтение',
  'кино и сериалы',
  'путешествия и туризм',
  'природа и экология',
  'искусство и арт-проекты',
  'портрет знаменитости и интервью',
  'закат и пляж'
];

const arrMessage = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

const arrName = ['Иван','Анастасия','Ольга','Сергей','Антон','Марина','Евгений','Евгения'];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomUniqeInt = (min, max) => {
  const uinqueIntArr = [];
  return function () {
    while (uinqueIntArr.length < max - min + 1) {
      const randomInt = getRandomInt(min, max);
      if (!uinqueIntArr.includes(randomInt)) {
        uinqueIntArr.push(randomInt);
        return randomInt;
      }
    }
  };
};

const createUrl = (index, isAvatar = false) => isAvatar ? `img/avatar-${index}.svg` : `photos/${index}.jpg`;

const createRandomMassege = (data) => {
  let message = '';
  const quantityCall = getRandomInt(1, 2);
  for (let i = 0; i < quantityCall; i++) {
    message += ` ${ data[getRandomInt(0,7)]}`;
  }
  return message;
};

const createComments = (quantity, dataMessage, dataName) => {
  const randomId = getRandomUniqeInt(1, quantity);
  const randomUrl = getRandomUniqeInt(1, quantity);
  return Array.from({ length: quantity }).map(() => ({
    id: randomId(),
    avatar: createUrl(randomUrl(), true),
    message: createRandomMassege(dataMessage),
    name: dataName[getRandomInt(0, 7)],
  }));
};

const createPhotos = (quantity) => {
  const randomId = getRandomUniqeInt(1, quantity);
  const randomUrl = getRandomUniqeInt(1, quantity);
  return Array.from({ length: quantity }).map(() => ({
    id: randomId(),
    url: createUrl(randomUrl()),
    description: arrDescription[getRandomInt(0, 24)],
    likes: getRandomInt(15, 200),
    comments: createComments(getRandomInt(0, 30), arrMessage, arrName),
  }));
};

const result = createPhotos(25);

console.log(result);
