import { Button } from './Button';

export interface ErrorProps {
    title: string;
    onRetry(): void;
}

export function Error(props: ErrorProps): JSX.Element {
    return (
        <div className={'flex flex-col items-center align-center text-red-600'}>
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-14"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
            </div>
            <div className={'mb-5'}>{props.title}</div>
            <Button onClick={props.onRetry}>Retry</Button>
        </div>
    );
}
