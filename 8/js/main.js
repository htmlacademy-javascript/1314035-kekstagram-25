// import {similarItems} from './data.js';
import {makeThumbnails} from './thumbnail.js';
import './user-modal.js';
import './scale-control.js';
import './slider.js';
import {closeUserModal} from './user-modal.js';
import {setUserFormSubmit} from './user-form.js';
import {getData} from './load.js';

getData(makeThumbnails);

setUserFormSubmit(closeUserModal);
