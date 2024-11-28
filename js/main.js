const descriptions = [
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

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

const names = ['Иван','Анастасия','Ольга','Сергей','Антон','Марина','Евгений','Евгения'];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomUniqueInt = (min, max) => {
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
  const CallQty = {
    MIN: 1,
    MAX: 2,
  };
  const Message = {
    MIN: 0,
    MAX: 7,
  };
  let message = '';
  const quantityCall = getRandomInt(CallQty.MIN, CallQty.MAX);
  for (let i = 0; i < quantityCall; i++) {
    message += ` ${ data[getRandomInt(Message.MIN, Message.MAX)]}`;
  }
  return message;
};

const createComments = (quantity, dataMessage, dataName) => {
  const DataName = {
    MIN: 0,
    MAX: 7,
  };
  const randomId = getRandomUniqueInt(1, quantity);
  const randomUrl = getRandomUniqueInt(1, quantity);
  return Array.from({ length: quantity }).map(() => ({
    id: randomId(),
    avatar: createUrl(randomUrl(), true),
    message: createRandomMassege(dataMessage),
    name: dataName[getRandomInt(DataName.MIN, DataName.MAX)],
  }));
};

const createPhotos = (quantity) => {
  const Descriptions = {
    MIN: 0,
    MAX: 24,
  };
  const Likes = {
    MIN: 15,
    MAX: 200,
  };
  const Comments = {
    MIN: 0,
    MAX: 30,
  };
  const randomId = getRandomUniqueInt(1, quantity);
  const randomUrl = getRandomUniqueInt(1, quantity);
  return Array.from({ length: quantity }).map(() => ({
    id: randomId(),
    url: createUrl(randomUrl()),
    description: descriptions[getRandomInt(Descriptions.MIN, Descriptions.MAX)],
    likes: getRandomInt(Likes.MIN, Likes.MAX),
    comments: createComments(getRandomInt(Comments.MIN, Comments.MAX), messages, names),
  }));
};

const result = createPhotos(25);

console.log(result);
