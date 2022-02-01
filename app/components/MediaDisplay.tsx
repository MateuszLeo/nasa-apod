import type { LoadableImageProps } from './LoadableImage';
import { LoadableImage } from './LoadableImage';

export interface MediaDisplayProps extends Pick<LoadableImageProps, 'initialImageState'> {
    src: string;
    alt: string;
    type: 'video' | 'image' | 'other';
    children?: JSX.Element;
    rounded?: 'top' | 'full';
}

export function MediaDisplay(props: MediaDisplayProps): JSX.Element {
    switch (props.type) {
        case 'video':
            return (
                <>
                    <iframe
                        className={`h-full w-full relative ${props.rounded === 'top' ? 'rounded-t-md' : 'rounded-md'}`}
                        src={props.src}
                    />
                    {props.children}
                </>
            );
        case 'image':
            return (
                <LoadableImage
                    initialImageState={props.initialImageState}
                    src={props.src}
                    alt={props.alt}
                    rounded={props.rounded}
                >
                    {props.children}
                </LoadableImage>
            );
        default:
            return (
                <>
                    <div
                        className={
                            'h-full w-full overflow-y-auto overflow-x-hidden rounded-md text-slate-400 bg-slate-50 text-xs flex items-center justify-center'
                        }
                    >
                        <div className={'h-full px-10 py-4'}>{props.alt}</div>
                    </div>
                    {props.children}
                </>
            );
    }
}
