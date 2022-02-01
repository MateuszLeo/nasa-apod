import { useEffect, useState } from 'react';

import { dateToString, getRandomDate } from '../date';
import type { ResourceState } from '../resource';

import { api } from './api';
import type { Apod } from './Apod';
import { savedStorageWrapper } from './storage';

export type ApodState =
    | { data: Apod; state: Extract<ResourceState, 'ready'> }
    | { data: null; state: Extract<ResourceState, 'loading'> }
    | { message: string; state: Extract<ResourceState, 'error'> };

export function useLoadApod(key: number) {
    const [apodState, setApodState] = useState<ApodState>({ data: null, state: 'loading' });
    const [isSaved, setIsSaved] = useState(false);
    const [randomDate, setRandomDate] = useState(getRandomDate());
    const [reloadKey, setReloadKey] = useState(Date.now());

    useEffect(() => {
        setIsSaved(apodState.state === 'ready' ? savedStorageWrapper(localStorage).exists(apodState.data.url) : false);
    }, [apodState.state, key]);

    function fetchApod(randomDate: Date) {
        setApodState({ state: 'loading', data: null });
        api.get(dateToString(randomDate))
            .then((apod) => setApodState({ data: apod, state: 'ready' }))
            .catch((error) => setApodState({ message: error.message, state: 'error' }));
    }

    useEffect(() => {
        fetchApod(randomDate);
    }, [randomDate, reloadKey]);

    return {
        reload: () => {
            setReloadKey(Date.now());
        },
        load: () => {
            setRandomDate(getRandomDate());
        },
        state: apodState,
        isSaved,
    };
}
