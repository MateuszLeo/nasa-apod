import { useEffect, useState } from 'react';

import type { Apod } from '../apod';
import { savedScopeStorage } from '../apod';
import { chunk } from '../array';
import { Thumbnail } from '../components';

export default function Saved(): JSX.Element {
    const [apods, setApods] = useState<Apod[][]>([]);

    useEffect(() => {
        setApods(chunk(Object.values(savedScopeStorage(localStorage).items), 3));
    }, []);

    return (
        <div>
            {apods.map((row, i) => (
                <div key={i} className={'flex mb-5'}>
                    {row.map((cell) => (
                        <div
                            className={'thumbnail-wrapper rounded-md shadow-md border-slate-200 border'}
                            key={cell.url}
                        >
                            <Thumbnail alt={cell.explanation} src={cell.url} mediaType={cell.media_type} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
