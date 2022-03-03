const DESCRIPTIONS = [
  'Девочка с шариками',
  'Котята  спят в корзинке',
  'Футболисты на тренировке',
  'Девушка задувает свечи на торте',
  'Мужчина курит трубку',
  'Детский хор на сцене',
  'Восход',
  'Лазурное море'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Катя',
  'Маша',
  'Антон',
  'Александр',
  'Максим',
  'Денис',
];

const SIMILAR_ITEM_COUNT = 25;

const LIKES_MIN = 15;

const LIKES_MAX = 200;

const COMMENTS_MIN = 1;

const COMMENTS_MAX = 5;

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createComment = (element, i) => ({
  id: i + 1,
  avatar: `img/avatar-${  i + 1  }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createItem = (element, i) => ({
  id: i + 1,
  url: `photos/${  i + 1 }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(LIKES_MIN, LIKES_MAX),
  comments: Array.from({length: getRandomPositiveInteger(COMMENTS_MIN, COMMENTS_MAX)}, createComment)
});

const similarItems = Array.from({length: SIMILAR_ITEM_COUNT}, createItem);
similarItems;

function checkLengthString(string, max) {
  return (string.length <= max);
}
checkLengthString('Привет', 140);
