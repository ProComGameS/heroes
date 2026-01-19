import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL + '/api' });

export const fetchHeroes = (offset) => API.get(`/heroes?offset=${offset}`);
export const fetchHero = (id) => API.get(`/heroes/${id}`);
export const createHero = (formData) => API.post('/heroes', formData);
export const updateHero = (id, formData) => API.put(`/heroes/${id}`, formData);
export const deleteHero = (id) => API.delete(`/heroes/${id}`);