interface ButtonProps {
    children: string;
    onClick(): void;
}

export function Button(props: ButtonProps): JSX.Element {
    return (
        <button
            className={'bg-blue-500 hover:bg-blue-600 rounded-full cursor-default text-white px-4 py-2 text-sm'}
            onClick={props.onClick}
        >
            Retry
        </button>
    );
}
