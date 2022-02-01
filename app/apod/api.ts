import { API } from '../api';

import type { Apod } from './Apod';

const KEY = '7sYEfJfhhr4B1Bi7jpfwkytcHsqmKArLRaxahnGS';

export const api = new API<Apod>(`https://api.nasa.gov/planetary/apod`, KEY, (request) => fetch(request));
