import { getRandomInteger, getRandomArrayElement, createIdGenerator } from './utils.js';
import {
  data,
  PICTURE_COUNT,
  AVATAR_COUNT,
  LIKE_MIN_COUNT,
  LIKE_MAX_COUNT,
  COMMENT_COUNT } from './data.js';

const generateCommentId = createIdGenerator();

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: getRandomArrayElement(data().COMMENT_LINES),
  name: getRandomArrayElement(data().NAMES_ARRAY),
});

const generatePhotoId = createIdGenerator();

const createPicture = (index) => ({
  id: generatePhotoId(),
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(data().DESCRIPTION_ARRAY),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from(
    { length: getRandomInteger(0, COMMENT_COUNT) },
    createComment,
  ),
});

const getPictures = () => Array.from(
  { length: PICTURE_COUNT },
  (_, pictureIndex) => createPicture(pictureIndex + 1),
);

export { getPictures };
