import { useEffect, useState } from 'react';
import type { LoaderFunction } from 'remix';
import { json, redirect, useLoaderData, useNavigate, useTransition } from 'remix';

import type { Apod } from '../apod';
import { api, savedScopeStorage } from '../apod';
import { BookmarkIcon, Card } from '../components';
import { dateToString, getRandomDate } from '../date';

export const loader: LoaderFunction = async () => {
    return api
        .get(dateToString(getRandomDate()))
        .then((data) => json(data))
        .catch(() => redirect('/error'));
};

export default function Index(): JSX.Element {
    const navigate = useNavigate();
    const apod = useLoaderData<Apod>();
    const transition = useTransition();

    const [updateKey, setUpdateKey] = useState(Date.now());
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setIsSaved(savedScopeStorage(localStorage).exists(apod.url));
    }, [apod, updateKey]);

    return (
        <div>
            <Card
                alt={apod.explanation}
                isLoading={transition.state === 'loading'}
                mediaType={apod.media_type}
                src={apod.url}
                onNextClick={() => navigate('/', { replace: true })}
            >
                <div className={'flex justify-between items-center py-4 px-2'}>
                    {transition.state === 'loading' ? (
                        <div className="animate-pulse flex">
                            <div className="rounded-full bg-slate-200 h-6 w-64" />
                        </div>
                    ) : (
                        <>
                            <div className={'mr-10 image-title'}>{apod.title}</div>
                            <div className={'flex items-center'}>
                                <button
                                    className={'cursor-default'}
                                    onClick={() => {
                                        savedScopeStorage(localStorage).toggle(apod);
                                        setUpdateKey(Date.now());
                                    }}
                                >
                                    <BookmarkIcon isFilled={isSaved} />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </Card>
        </div>
    );
}
