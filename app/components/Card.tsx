import { ChevronRightIcon } from './ChevronRightIcon';
import type { MediaDisplayProps } from './MediaDisplay';
import { MediaDisplay } from './MediaDisplay';

export interface CardProps extends Pick<MediaDisplayProps, 'alt' | 'rounded' | 'src'> {
    onNextClick: () => void;
    children: JSX.Element;
    mediaType: MediaDisplayProps['type'];
    isLoading: boolean;
}

export function Card(props: CardProps): JSX.Element {
    return (
        <div className={'border border-slate-200 shadow rounded-md justify-center'}>
            <div className={`border-slate-200 border-b relative w-96 h-96`}>
                {props.mediaType === 'other' ? (
                    <div>{props.alt}</div>
                ) : (
                    <MediaDisplay
                        initialImageState={props.isLoading ? 'loading' : 'idle'}
                        alt={props.alt}
                        type={props.mediaType}
                        rounded={'top'}
                        src={props.src}
                    >
                        <button
                            className={'w-30 h-30 absolute inset-y-1/2 right-2 cursor-default'}
                            onClick={props.onNextClick}
                        >
                            <div
                                className={
                                    'flex shadow-slate-200 text-slate-500 rounded-full justify-center items-center bg-slate-50 next-btn shadow-slate-50'
                                }
                            >
                                <ChevronRightIcon />
                            </div>
                        </button>
                    </MediaDisplay>
                )}
            </div>
            {props.children}
        </div>
    );
}
