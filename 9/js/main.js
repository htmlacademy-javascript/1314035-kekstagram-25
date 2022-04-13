// import {similarItems} from './data.js';
import {makeThumbnails} from './thumbnail.js';
import './user-modal.js';
import './scale-control.js';
import './slider.js';
import {closeUserModal} from './user-modal.js';
import {setUserFormSubmit} from './user-form.js';
import {getData} from './load.js';
import {setButtonsContainerClick} from './filters.js';
import {debounce} from './util.js';
import {onThumbnailsClick} from './big-picture.js';

const RERENDER_DELAY = 500;

getData((similarItems) => {
  makeThumbnails(similarItems);
  setButtonsContainerClick(debounce(
    (sortedData) => makeThumbnails(sortedData),
    RERENDER_DELAY,
  ));
});
setUserFormSubmit(closeUserModal);
