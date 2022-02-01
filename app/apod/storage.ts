import { createStorageScope } from '../storage';

import type { Apod } from './Apod';

export const savedScopeStorage = createStorageScope<Apod>('saved', 'url');
