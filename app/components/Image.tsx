import { useEffect, useRef, useState } from 'react';

import { Error } from './Error';
import { Spinner } from './Spinner';

interface ImageProps {
    src: string;
    size: 'S' | 'L';
    children?: JSX.Element;
    rounded?: 'top' | 'full';
}

type ImageState = 'ready' | 'loading' | 'error';

export function LoadableImage(props: ImageProps): JSX.Element {
    const [imageState, setImageState] = useState<ImageState>('loading');
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>();
    const [key, setKey] = useState(Date.now());

    function onLoad() {
        setImageState('ready');
        if (imageRef.current && imageContainerRef.current) imageContainerRef.current.appendChild(imageRef.current);
    }

    function onError() {
        setImageState('error');
    }

    useEffect(() => {
        setImageState('loading');
        const image = new Image();
        imageRef.current = image;
        image.className = `object-cover absolute top-0 left-0 h-full w-full ${
            props.rounded === 'top' ? ' rounded-t-md' : ' rounded-md'
        }`;
        image.src = props.src;
        image.addEventListener('load', onLoad);
        image.addEventListener('error', onError);
        return () => {
            image.removeEventListener('load', onLoad);
            image.removeEventListener('error', onError);
        };
    }, [props.src, key]);

    return (
        <>
            {imageState === 'error' ? null : (
                <div
                    className={`h-full w-full rounded-md relative ${imageState === 'loading' ? 'hidden' : ''}`}
                    ref={imageContainerRef}
                />
            )}
            {imageState === 'loading' ? (
                <div className={'h-full w-full rounded-md text-slate-400 bg-slate-50 flex items-center justify-center'}>
                    <Spinner />
                </div>
            ) : imageState === 'error' ? (
                <div
                    className={
                        'h-full w-full rounded-md text-slate-400 bg-slate-50 flex items-center justify-center flex-col'
                    }
                >
                    <Error title={"Couldn't load image"} onRetry={() => setKey(Date.now)} />
                </div>
            ) : (
                props.children
            )}
        </>
    );
}
