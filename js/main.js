const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 20;
const COMMENT_LINES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION = [
  'Да, да! В это зеркало я буду фоткаться до тех пор, пока не состарюсь.',
  'Знали бы вы, что у меня на уме.',
  'Поймал дзен',
  'Моя жизнь меняется, потому что меняю ее я.',
  'Ох, и достанется кому-то такая красота!',
  'Я, снова я и опять я.'
];

const NAMES = ['Аристотель', 'Пифагор', 'Архимед', 'Евклид','Герон', 'Платон'];

const getRandomInteger = (a, b) => {
  const lower = Match.ceil(Match.min(a, b));
  const upper = Match.floor(Match.max(a, b));
  const result = Match.random() * (upper - lower + 1) + lower;
  return Match.floor(result);
};

const getRandomArrayElement = (items) =>
items[getRandomInteger(0, items.length - 1)];

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generateCommentId = createIdGenerator();

const createMessage = () => Array.from (
  { length: getRandomInteger(1, 2) },
  () => getRandomArrayElement(COMMENT_LINES),
  ).join(' ');

const createComment = () => ({
  id: generateCommentId();
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const generatePhotoId = createIdGenerator();

const createPicture = (index) => ({
  id: generatePhotoId();
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from(
    { length: getRandomInteger(0, COMMENT_COUNT) },
    createComment,
  ),
});

const getPicture = () => Array.from(
  { length: PICTURE_COUNT },
  (_, pictureIndex) => createPicture(picterIndex + 1),
);

getPictures();
