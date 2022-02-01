import { useEffect, useRef, useState } from 'react';

import type { ResourceState } from '../resource';

import { Error } from './Error';
import { Spinner } from './Spinner';

export interface LoadableImageProps {
    src: string;
    alt: string;
    initialImageState: ResourceState;
    children?: JSX.Element;
    rounded?: 'top' | 'full';
}

export function LoadableImage(props: LoadableImageProps): JSX.Element {
    const [imageState, setImageState] = useState<ResourceState>(props.initialImageState);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>();
    const [retryKey, setRetryKey] = useState(Date.now());

    useEffect(() => {
        setImageState(props.initialImageState);
    }, [props.initialImageState]);

    useEffect(() => {
        setImageState('loading');
        const image = new Image();
        imageRef.current = image;
        image.className = `object-cover absolute top-0 left-0 h-full w-full ${
            props.rounded === 'top' ? ' rounded-t-md' : ' rounded-md'
        }`;
        image.src = props.src;
        image.alt = props.alt;
        image.addEventListener('load', onLoad);
        image.addEventListener('error', onError);
        return () => {
            image.removeEventListener('load', onLoad);
            image.removeEventListener('error', onError);
            image.remove();
        };
    }, [props.src, retryKey]);

    return (
        <>
            {imageState === 'error' ? (
                <div
                    className={
                        'h-full w-full rounded-md text-slate-400 bg-slate-50 flex items-center justify-center flex-col'
                    }
                >
                    <Error title={"Couldn't load a image."} onRetry={() => setRetryKey(Date.now())} />
                </div>
            ) : (
                <div
                    data-testid={'image-container'}
                    className={`h-full w-full rounded-md relative ${imageState === 'loading' ? 'hidden' : ''}`}
                    ref={imageContainerRef}
                />
            )}
            {imageState === 'loading' ? (
                <div className={'h-full w-full rounded-md text-slate-400 bg-slate-50 flex items-center justify-center'}>
                    <Spinner />
                </div>
            ) : (
                props.children
            )}
        </>
    );

    function onLoad() {
        setImageState('idle');
        if (imageRef.current && imageContainerRef.current) imageContainerRef.current.appendChild(imageRef.current);
    }

    function onError() {
        setImageState('error');
    }
}
