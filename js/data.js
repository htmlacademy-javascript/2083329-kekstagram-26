import { getRandomInteger, getRandomArrayElement } from './util.js';

const PHOTO_COUNT = 25;
const Like = {
  MIN: 15,
  MAX: 200,
};
const Comment = {
  MIN: 1,
  MAX: 25,
};
const Avatar = {
  MIN: 1,
  MAX: 6,
};
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES_OF_COMMENTATORS = [
  'Матвей',
  'Арсений',
  'Дарья',
  'Клим',
  'Злата',
  'Ярослава'
];

const createCommentIdGenerator = (min, max) => {
  const commentIds = [];
  return () => {
    let commentId;
    do {
      commentId = getRandomInteger(min, max);
    }
    while (commentIds.includes(commentId));
    commentIds.push(commentId);
    return commentId;
  };
};

const getCommentId = createCommentIdGenerator(1, 1000);

const createComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomInteger(Avatar.MIN, Avatar.MAX)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES_OF_COMMENTATORS),
});

const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: `Фото №${id}`,
  likes: getRandomInteger(Like.MIN, Like.MAX),
  comments: Array.from({ length: getRandomInteger(Comment.MIN, Comment.MAX) }, createComment),
});

const createPhotos = () => Array.from({ length: PHOTO_COUNT }, (item, index) => createPhoto(index + 1));

export { createPhotos };
