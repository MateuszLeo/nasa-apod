import { ChevronRightIcon } from './ChevronRightIcon';
import { LoadableImage } from './Image';

export interface CardProps {
    imageSrc: string;
    onNextClick: () => void;
    children: JSX.Element;
}

export function Card(props: CardProps): JSX.Element {
    return (
        <div className={'border border-slate-200 shadow rounded-md justify-center'}>
            <div className={'border-slate-200 border-b relative h-96 w-96'}>
                <LoadableImage rounded={'top'} size={'L'} src={props.imageSrc}>
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
                </LoadableImage>
            </div>
            {props.children}
        </div>
    );
}
