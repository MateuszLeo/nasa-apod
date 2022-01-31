import { useEffect, useState } from 'react';

import type { Apod } from '../apod';
import { savedStorageWrapper } from '../apod';
import { chunk } from '../array';
import { Thumbnail } from '../components';

export default function Saved() {
    const [apods, setApods] = useState<Apod[][]>([]);

    useEffect(() => {
        setApods(chunk(Object.values(savedStorageWrapper(localStorage).items), 3));
    }, []);

    return (
        <div>
            {apods.map((row, i) => (
                <div key={i} className={'flex mb-5'}>
                    {row.map((cell, i) => (
                        <div className={'thumbnail-wrapper rounded-md shadow-md border-slate-200 border'} key={i}>
                            <Thumbnail src={cell.url} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
