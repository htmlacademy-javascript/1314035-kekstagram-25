import {similarItems} from './data.js';

const userFiltersElement = document.querySelector('.img-filters');

const RANDOM_PHOTO_COUNT = 10;

// Комментарии в порядке убывания
const compareComments = (a, b) => b.comments-a.comments;
// Случаные 10 фото
const getRandomThumbnails = () => Math.random() - 0.5;

// Обработчик кнопок
const setButtonsContainerClick = (makeThumbnails) => {
  let filterRandomPhoto;
  let filterDiscussedPhoto;
  userFiltersElement.addEventListener ('click', (evt)  => {
    switch (evt.target.id) {
      case '#filter-random':
        filterRandomPhoto = similarItems
          .slice()
          .sort(getRandomThumbnails)
          .slice(0, RANDOM_PHOTO_COUNT);
        break;
      case '#filter-discussed':
        filterDiscussedPhoto = similarItems
          .slice()
          .sort(compareComments);
    }
    makeThumbnails(filterRandomPhoto, filterDiscussedPhoto);
  });
};

export {userFiltersElement, setButtonsContainerClick};
