import { storageWrapper } from '../storage';

import type { Apod } from './Apod';

export const savedStorageWrapper = storageWrapper<Apod>('saved', 'url');
