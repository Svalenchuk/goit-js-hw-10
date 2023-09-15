import axios from 'axios';

const API_KEY = `live_YOdYp91Tfjvlhslz4HIkq6evEOnY3tvkSNaz6ISVetxCXOzhSl0VjQetQuEYCZfy`;
axios.defaults.headers.common["x-api-key"] = API_KEY;

const BASE_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`).then(resp => {
    return resp.data; 
  });  
};

function fetchCatByBreed(breedId) {
  const params = new URLSearchParams({
    breed_ids: breedId,
  });

  return axios.get(`${BASE_URL}/images/search?${params}`).then(resp => {
    if (!resp.data.length) {
      throw new Error(resp.statusText);
    }
    return resp.data;
  }); 
    
}; 
export { fetchBreeds, fetchCatByBreed };    