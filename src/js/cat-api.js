import axios from 'axios';

const API_KEY = `live_YOdYp91Tfjvlhslz4HIkq6evEOnY3tvkSNaz6ISVetxCXOzhSl0VjQetQuEYCZfy`;
axios.defaults.headers.common["x-api-key"] = API_KEY;

const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`).then(resp => {
    return resp.data; 
  });  
};

export function fetchCatByBreed(breedId) {
  const params = new URLSearchParams({
    breed_ids: breedId,
  });

  return axios.get(`${BASE_URL}/images/search?${params}`).then(resp => {
   
    return resp.data;
  }); 
     
}; 