const userFiltersElement = document.querySelector('.img-filters');
const filterElement = document.querySelectorAll('.img-filters__button');

const RANDOM_PHOTO_COUNT = 10;

// Комментарии в порядке убывания
const compareComments = (a, b) => b.comments.length-a.comments.length;
// Случаные 10 фото
const getRandomThumbnails = () => Math.random() - 0.5;

// Обработчик кнопок
const setButtonsContainerClick = (makeThumbnails, similarItems) => {
  let sortedData;
  userFiltersElement.addEventListener ('click', (evt)  => {
    switch (evt.target.id) {
      case 'filter-random':
        sortedData = similarItems
          .slice()
          .sort(getRandomThumbnails)
          .slice(0, RANDOM_PHOTO_COUNT);
        for (const button of filterElement) {
          button.classList.remove('img-filters__button--active');
        }
        evt.target.classList.add('img-filters__button--active');
        break;
      case 'filter-discussed':
        sortedData = similarItems
          .slice()
          .sort(compareComments);
        for (const button of filterElement) {
          button.classList.remove('img-filters__button--active');
        }
        evt.target.classList.add('img-filters__button--active');
        break;
      case 'filter-default':
        sortedData = similarItems;
        for (const button of filterElement) {
          button.classList.remove('img-filters__button--active');
        }
        evt.target.classList.add('img-filters__button--active');
    }
    if (sortedData) {
      makeThumbnails(sortedData);
    }
  });
};

export {userFiltersElement, setButtonsContainerClick};
