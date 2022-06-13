const PHOTO_COUNT = 25;
const MIN_COUNT_LIKES = 15;
const MAX_COUNT_LIKES = 200;
const COMMENTATORS_COUNT = 6;
const COMMENTS_COUNT = 3;
const INITIAL_ID_COMMENTS = Math.floor(Math.random() * 100);
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
const TEXT_DESCRIPTIONS = [
  'Мой завтрак',
  'Очередной сансет',
  'Сказочное Бали',
  'Хороший мальчик',
  'Долгожданный отпуск',
  'Вечер пятницы — моя самое любимое время',
  'Как вам мой лук?',
  'Угадайте, где я',
  'Идеальный день',
  'Снова в дороге',
];

const checkMaxLengthString = (string, maxLength) => string.length <= maxLength;
checkMaxLengthString('testString', 10);

const getRandomInteger = (min, max) => {
  const minNumber = Math.min(Math.abs(min), Math.abs(max));
  const maxNumber = Math.max(Math.abs(min), Math.abs(max));
  return Math.floor(minNumber + Math.random() * (maxNumber - minNumber + 1));
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const arrayIdComments = Array.from({ length: COMMENTS_COUNT * PHOTO_COUNT }, (value, index) => index + INITIAL_ID_COMMENTS);

const createComment = (indexComment, indexPhoto) => ({
  id: arrayIdComments[indexComment + COMMENTS_COUNT * (indexPhoto - 1)],
  avatar: `img/avatar-${getRandomInteger(1, COMMENTATORS_COUNT)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES_OF_COMMENTATORS),
});

const createPhotoDescription = (indexPhoto) => ({
  id: indexPhoto,
  url: `photos/${indexPhoto}`,
  description: getRandomArrayElement(TEXT_DESCRIPTIONS),
  likes: getRandomInteger(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
  comments: Array.from({ length: COMMENTS_COUNT }, (value, indexComment) => createComment(indexComment, indexPhoto)),
});

const photoDescriptions = Array.from({ length: PHOTO_COUNT }, (value, indexPhoto) => createPhotoDescription(indexPhoto + 1));
