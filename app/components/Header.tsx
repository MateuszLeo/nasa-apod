export interface HeaderProps {
    title: JSX.Element;
    children: JSX.Element;
}

export function Header(props: HeaderProps): JSX.Element {
    return (
        <div className={'flex relative justify-center items-center border-b border h-12'}>
            <div>{props.title}</div>
            <div className={'absolute right-2'}>{props.children}</div>
        </div>
    );
}
