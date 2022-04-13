import {similarItems} from './data.js';

const userFiltersElement = document.querySelector('.img-filters');

const RANDOM_PHOTO_COUNT = 10;

// Комментарии в порядке убывания
const compareComments = (a, b) => b.comments.length-a.comments.length;
// Случаные 10 фото
const getRandomThumbnails = () => Math.random() - 0.5;

// Обработчик кнопок
const setButtonsContainerClick = (makeThumbnails) => {
  let sortedData;
  userFiltersElement.addEventListener ('click', (evt)  => {
    switch (evt.target.id) {
      case 'filter-random':
        sortedData = similarItems
          .slice()
          .sort(getRandomThumbnails)
          .slice(0, RANDOM_PHOTO_COUNT);
        break;
      case 'filter-discussed':
        sortedData = similarItems
          .slice()
          .sort(compareComments);
        break;
      case 'filter-default':
        sortedData = similarItems;
    }
    if (sortedData) {
      makeThumbnails(sortedData);
    }
  });
};

export {userFiltersElement, setButtonsContainerClick};
