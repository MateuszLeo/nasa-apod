import { useState } from 'react';

import { savedStorageWrapper, useLoadApod } from '../apod';
import { BookmarkIcon, Card, Error, Spinner } from '../components';

export default function Index() {
    const [key, setKey] = useState(Date.now());
    const loadApod = useLoadApod(key);

    return (
        <div>
            {loadApod.state.state === 'ready' ? (
                <Card imageSrc={loadApod.state.data.url} onNextClick={loadApod.load}>
                    <div className={'flex justify-between items-center py-4 px-2'}>
                        <div className={'mr-10 image-title'}>{loadApod.state.data.title}</div>
                        <div className={'flex items-center'}>
                            <button
                                className={'cursor-default'}
                                onClick={() => {
                                    savedStorageWrapper(localStorage).toggle(loadApod.state.data!);
                                    setKey(Date.now());
                                }}
                            >
                                <BookmarkIcon isFilled={loadApod.isSaved} />
                            </button>
                        </div>
                    </div>
                </Card>
            ) : loadApod.state.state === 'loading' ? (
                <Spinner />
            ) : (
                <Error title={"Couldn't fetch a data."} onRetry={loadApod.reload} />
            )}
        </div>
    );
}
