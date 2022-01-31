import { useEffect, useState } from 'react';

import { api } from './api';
import type { Apod } from './Apod';
import { savedStorageWrapper } from './storage';

export type ApodState =
    | { data: Apod; state: 'ready' }
    | { data: null; state: 'loading' }
    | { data: null; state: 'error' };

export function useLoadApod(key: number) {
    const [apodState, setApodState] = useState<ApodState>({ data: null, state: 'loading' });
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setIsSaved(apodState.state === 'ready' ? savedStorageWrapper(localStorage).exists(apodState.data.url) : false);
    }, [apodState.state, key]);

    function fetchApod() {
        setApodState({ state: 'loading', data: null });
        const date = new Date();
        api.get([date.getUTCFullYear() - 1, date.getUTCMonth() + 2, date.getUTCDate() - 10].join('-'))
            .then((apod) => setApodState({ data: apod, state: 'ready' }))
            .catch(() => setApodState({ data: null, state: 'error' }));
    }

    useEffect(() => {
        fetchApod();
    }, []);

    return {
        load: fetchApod,
        state: apodState,
        isSaved,
    };
}
