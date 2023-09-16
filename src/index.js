import './css/styles.css'; 
import SlimSelect from 'slim-select'
import '/node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

function slim() {
  new SlimSelect({
    select: refs.select,
    settings: {
      showSearch: false, 
      searchText: 'Sorry nothing to see here',
      searchPlaceholder: 'Search for the good stuff!',
      searchHighlight: true,
    },
  });
}; 

refs.error.classList.add('is-hidden');
refs.catInfo.classList.add('is-hidden');
refs.select.classList.add('is-hidden');

fetchBreeds()
  .then(data => {
    refs.select.innerHTML = createList(data);
    slim();
    refs.select.classList.remove('is-hidden');
    refs.loader.classList.replace('loader', 'is-hidden');
  })
  .catch(onFetchError);

refs.select.addEventListener('change', onSelectBreed);
  
function onSelectBreed(event) {
  refs.loader.classList.replace('is-hidden', 'loader');
  refs.select.classList.add('is-hidden');
  refs.catInfo.classList.add('is-hidden');
  const breedId = event.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      refs.loader.classList.replace('loader', 'is-hidden');
      refs.select.classList.remove('is-hidden');
      createMarkup(data);

      refs.catInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
};

function createList(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
};

function createMarkup(data) {
  const card = data
    .map(el => {
      return `<li><img src="${el.url}" alt="${el.breeds[0].name}" width="400"/><h2>${el.breeds[0].name}</h2><p>${el.breeds[0].description}</p><h3>Temperament</h3><p>${el.breeds[0].temperament}</p></li>`;
    })
    .join('');
  refs.catInfo.innerHTML = card;
};

function onFetchError(error) {
  refs.select.classList.remove('is-hidden');
  refs.loader.classList.replace('loader', 'is-hidden');
  console.log(error);
  refs.catInfo.innerHTML = '';

  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      position: 'center-center',
      timeout: 5000,
      width: '400px',
      fontSize: '24px',
    }
  );
};  