import { API } from '../api';

import type { Apod } from './Apod';

const KEY = '';

export const api = new API<Apod>(`https://api.nasa.gov/planetary/apod`, KEY, (request) => fetch(request));
